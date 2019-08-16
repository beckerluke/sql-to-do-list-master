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

    taskToSend.task.val(''); // clear user input fields
}

function postTask(taskToSend) {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then((response) => {
        console.log('Response from server: ', response);
    }).catch((error) => {
        console.log('Error in POST', error);
        alert('Unable to add task');
    });
}