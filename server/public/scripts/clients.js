$(document).ready( function () {
    console.log('To List');
    // Establish Click listeners
    clickListeners();
    // Load existing tasks on page load
    getTasks();

}); // end doc ready


// Start of clickListeners
function clickListeners() {
    $('#toDoForm').on('submit', function (evt) {
        evt.preventDefault();
        // call addTask with the new object
        addTask();
    })
    // Here are some listeners
    $(document).on('click', editTask);
    $(document).on('click', deleteTask);

}; // end of clickListeners


function addTask() {
    console.log('in addTask');

    // creating a newTask object 
    // by accessing input fields with jQuery
    let newTask = {
        task:   $('#taskIn').val(),
        description:   $('#descriptionIn').val(),
    }

    // alert if nothing in inputs
    if (newTask.task === '' || newTask.description === '') {
        alert(`Can't leaving the input blank!! `)
        return;
    }

    // ajax call to server to post task
    // sending to server as "req.body"
    $.ajax ({
        method: 'POST',
        url:    '/tasks',
        data:   newTask,
    })
    .then ((res) => {
        console.log('in POST /tasks', res);
        $('.taskInput').val('');
        getTasks();        
    })
    .catch ((err) => {
        console.log('in POST /tasks failed! 🤯', err);
        alert('Unable to connect to server, please try again!!');
    })
} // end of addTask

function getTasks() {
    console.log('in getTasks');
    // ajax call to server to get tasks
    $.ajax({
        method: 'GET',
        url:    '/tasks',
    })
    .then ((res) => {
        console.log('in GET /tasks', res);
        renderTasks();
    })
    .catch ((err) => {
        console.log('ERROR in GET /tasks 🤯', err);
    })
}; // end of getTasks