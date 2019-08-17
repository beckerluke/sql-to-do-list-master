console.log('in client');

$(document).ready(() => {
    setupClickListeners();
    getTasks();
});

function setupClickListeners() {
    $('#js-btn-add').on('click', handleTaskSubmit);
    // $('#viewKoalas').on('click', '.js-btn-delete', handleDelete);
    $('#viewKoalas').on('click', '.js-btn-complete', handleComplete);
}

function handleTaskSubmit(event) {
    // object being sent to server
    let taskToSend = {
        task: $('#user-task-entry').val(),
    };

    postTask(taskToSend);

    $('#user-task-entry').val(''); // clear user input fields
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then((response) => {
        // receiving list of tasks from database
        console.log(response);
        renderList(response);  
    }).catch((error) => {
        console.log('error in GET', error);
    });
}

// sending new user input to server 
function postTask(taskToSend) {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then((response) => {
        console.log('Response from server: ', response);
        getTasks();
    }).catch((error) => {
        console.log('Error in POST', error);
        alert('Unable to add task');
    });
}

function handleComplete(event) {

}

function renderList(listOfTasks) {
    $('#viewTasks').empty();

    for (let i = 0; i < listOfTasks.length; i += 1) {
    let task = listOfTasks[i];

    // for each task append a new row in the table
    let $tr = $('<tr></tr>');
    console.log(task.task);
    
    // $tr.data('task', task);
    $tr.append(`<td>${task.task}</td>`);
    $tr.append(`<td>${task.completed}</td>`);

    // append complete button if task completed is 'N' and tie data of the id to it
    if (task.completed == 'N') {
        $tr.append(`<td><button class="js-btn-complete" data-id="${task.id}">Complete</button></td>`)
      }else{
        $tr.append(`<td>  </td>`);
      }
    
    // append delete button and tie the specific task id to it with data
    $tr.append(`<button class="js-btn-delete btn" data-id="${task.id}">Delete</button></td>`);
    $('#viewTasks').append($tr);
    }
}