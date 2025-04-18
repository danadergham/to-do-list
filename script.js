
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');


let tasks = [];


addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  
  if (taskText === '') return; 

  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = ''; 
  renderTasks(); 
});


function renderTasks(filter = 'all') {
  taskList.innerHTML = ''; 

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; 
  });

  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.classList.toggle('completed', task.completed);

    taskElement.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete-btn">✔️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    
    const completeBtn = taskElement.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks(filter); 
    });


    const deleteBtn = taskElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks(filter); 
    });

    taskList.appendChild(taskElement);
  });
}


filterBtns.forEach(button => {
  button.addEventListener('click', () => {

    filterBtns.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
    

    const filter = button.dataset.filter;
    renderTasks(filter);
  });
});


renderTasks();
