// Get references to the DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Initialize Firebase Firestore
const db = firebase.firestore();

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Save the task to Firestore
    db.collection('todos').add({
        task: taskText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Store the timestamp for ordering
    }).then(() => {
        console.log("Task added!");
    }).catch((error) => {
        console.error("Error adding task: ", error);
    });

    // Clear the input field after adding the task
    taskInput.value = '';
}

// Function to display tasks in the UI
function renderTask(doc) {
    const li = document.createElement('li');
    li.textContent = doc.data().task;

    // Create a delete button for the task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";

    // Add delete functionality (removes from Firestore)
    deleteBtn.addEventListener('click', function() {
        db.collection('todos').doc(doc.id).delete().then(() => {
            console.log("Task deleted");
        }).catch((error) => {
            console.error("Error removing task: ", error);
        });
    });

    // Append the delete button and task to the list item
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Fetch and display tasks from Firestore
db.collection('todos').orderBy('timestamp').onSnapshot((snapshot) => {
    taskList.innerHTML = ''; // Clear the current list before rendering
    snapshot.forEach((doc) => {
        renderTask(doc); // Render each task
    });
});

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
