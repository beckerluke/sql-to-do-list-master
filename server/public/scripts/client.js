console.log('in client');

$(document).ready(() => {
    setupClickListeners();
    getTasks();
});

function setupClickListeners() {
    $('#js-btn-add').on('click', handleTaskSubmit);
    $('#viewTasks').on('click', '.js-btn-delete', handleDelete);
    $('#viewTasks').on('click', '.js-btn-complete', handleComplete);
}

function handleTaskSubmit(event) {
    // object being sent to server
    let taskToSend = {
        task: $('#user-task-entry').val(),
    };

    postTask(taskToSend);

    $('#user-task-entry').val(''); // clear user input fields
}

function handleComplete(event) {
    console.log('in handleComplete function');
    $(this).hide();
    $(this).parent().parent().addClass('addGreen');
    
    const buttonDataObject = $(this).data();
    console.log(buttonDataObject);
    const taskID = buttonDataObject.id;
    
    completeTask(taskID);
}

function handleDelete(event) {
    const buttonDataObject = $(this).data();
    console.log(buttonDataObject);
    const taskID = buttonDataObject.id;

    deleteTask(taskID);
}

// for GET request
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

// PUT request
function completeTask(taskID) {
    $.ajax({
        type: 'PUT',
        url: `tasks/${taskID}`
    }).then((response) => {
        console.log('response from server', response);
        // getTasks();
    }).catch((error) => {
        console.log('error in PUT', error);
        alert('Unable to update list');
    });
}

function deleteTask(taskID) {
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskID}`
    }).then((response) => {
        console.log('response from server: ', response);
        getTasks();
    }).catch((error) => {
        console.log('error in DELETE', error);
        alert('Not able to delete task');
    });
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
        $tr.append(`<td><button class="btn btn-success js-btn-complete" data-id="${task.id}">Complete</button></td>`)
      }else{
        $tr.toggleClass('addGreen').append(`<td>√</td>`);
      }
    
    // append delete button and tie the specific task id to it with data
    $tr.append(`<button class="btn btn-danger js-btn-delete" data-id="${task.id}">Delete</button></td>`);
    $('#viewTasks').append($tr);
    }
}