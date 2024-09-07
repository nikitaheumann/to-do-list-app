// Get references to the DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new list item (li) for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a delete button for the task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    
    // Add delete functionality
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    // Append the delete button and task to the list item
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = '';
}

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
