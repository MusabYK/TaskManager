// Task array to store tasks
let tasks = [];

// Select DOM elements
const addTaskForm = document.getElementById('addTaskForm');
const taskTableBody = document.querySelector('#taskTable tbody');
const filterPriority = document.getElementById('filterPriority');
const searchTask = document.getElementById('searchTask');

// Function to render tasks on the table with color coding for priority
function renderTasks(filter = 'all', search = '') {
  taskTableBody.innerHTML = '';
  tasks
    .filter(task => {
      return (filter === 'all' || task.priority === filter) &&
             (task.title.toLowerCase().includes(search.toLowerCase()));
    })
    .forEach((task, index) => {
      const row = document.createElement('tr');
      row.classList.add(`priority-${task.priority.toLowerCase()}`); // Add class based on priority

      row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.priority}</td>
        <td>${task.deadline}</td>
        <td>
          <button class="btn-delete" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i> Delete</button>
        </td>
      `;
      taskTableBody.appendChild(row);
    });
}



// Function to add new task
addTaskForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const newTask = {
    title: addTaskForm.title.value,
    description: addTaskForm.description.value,
    priority: addTaskForm.priority.value,
    deadline: addTaskForm.deadline.value
  };

  tasks.push(newTask);
  renderTasks();
  addTaskForm.reset();
});

// Filter tasks by priority
filterPriority.addEventListener('change', function() {
  renderTasks(this.value, searchTask.value);
});

// Search tasks by title
searchTask.addEventListener('input', function() {
  renderTasks(filterPriority.value, this.value);
});

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks(); // Initial render

// Check if user is logged in
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn !== 'true') {
  // If not logged in, redirect to login page
  window.location.href = 'login.html';
}

// Logout function
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', function() {
  // Clear login state
  localStorage.removeItem('isLoggedIn');

  // Redirect to login page
  window.location.href = 'login.html';
});