console.log('in client');

$(document).ready(() => {
    setupClickListeners();
});

function setupClickListeners() {
    $('#js-btn-add').on('click', handleTaskSubmit);
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
        // renderList(response);  
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