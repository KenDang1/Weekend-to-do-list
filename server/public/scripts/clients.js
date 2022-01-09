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
    $(document).on('click', '.deleteBtn', deleteTask);
    $(document).on('change', '.completeCheckbox', completeStatusCheck);

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
        renderTasks(res);
    })
    .catch ((err) => {
        console.log('ERROR in GET /tasks 🤯', err);
    })
}; // end of getTasks

function renderTasks(tasks) {
    console.log('in renderKoalas');

    // Empty the table
    $('#viewTasks').empty();

    for (let task of tasks) {
        console.log('append task is', task);
        
        $('#viewTasks').append(`
            <tr
            data-id="${task.id}"
            data-status="${task.status}" 
            >
                <td class="appendTask">${task.task}</td>
                <td class="appendDescription">${task.description}</td>
                <td>${checkCompleteStatus(task)}</td>
                <td>
                    <button class="deleteBtn">
                    DELETE
                    </button>
                </td>
            </tr>
        `)
    }
}; // end of append Task

// Function to check complete status
function checkCompleteStatus(task) {
    if (task.status) {
    return '<input type="checkbox" class="completeCheckbox" checked>'
    } else {
    return '<input type="checkbox" class="completeCheckbox">'
    }
  } // end checkTransferStatus


function deleteTask() {
    // Grabbing the task ID
    // the ID is from render
    let taskId = $(this).parents('tr').data('id')
    console.log('in complete task');

    // This is sweetAlert2
    // a small window will pop to verify your action
    Swal.fire({
        title: 'This task is done?',
        text: "ARE YOU SURE!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        // When confirmed is the result then it would run $.ajax
        // to delete the item from database
        if (result.isConfirmed) {
          // Create boiler plate ajax request to delete koala
        $.ajax({
            method: 'DELETE',
            url: `/tasks/${taskId}`,
        })
        .then((res) => {
        console.log('DELETE successful! ✅', res);
        getTasks();
        })
        .catch((err) => {
        console.log('DELETE failed 🙀', err);
        })};
    });
    
}; // end of completeTask

// Function to filter/search through to do list
function filterList() {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filterField");
    filter = input.value.toUpperCase();
    table = document.getElementById("toDoTable");
    tr = table.getElementsByTagName("tr");

// Loop through all table rows and hide those who don't match
// the search query
for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1){
            tr[i].style.display = ""
        }
        else{
            tr[i].style.display = "none";
            }
        } 
        }
}; // end of filterList

function completeStatusCheck() {
    console.log('in completeStatusCheck');

    // Pull taskId and transfer status from table
    let taskId = $(this).parents('tr').data('id');
    let checkStatus = $(this).parents('tr').data('status');

    // Check if true/false then reassign to false/true respectively
    if (checkStatus) {
        checkStatus = false;
    } else {
        
        checkStatus = true;
    }

    // Make PUT request to /tasks/status/:id
    $.ajax({
        method: 'PUT',
        url: `/tasks/status/${taskId}`,
        data: {
        status: checkStatus
        }
    })
    .then( () => {
        console.log('PUT /tasks/status success');
        getTasks();
    })
    .catch( err => {
        console.log('PUT /tasks/status failed', err);
    });
} // end 