document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskDateInput = document.getElementById('task-date');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`;
      
      const taskInfo = document.createElement('div');
      taskInfo.className = 'd-flex align-items-center';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input me-2';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      const title = document.createElement('span');
      title.className = 'task-title me-3';
      title.textContent = task.title;

      const date = document.createElement('small');
      date.className = 'text-muted';
      date.textContent = task.date ? `Due: ${task.date}` : '';

      taskInfo.appendChild(checkbox);
      taskInfo.appendChild(title);
      taskInfo.appendChild(date);

      const actions = document.createElement('div');

      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-sm btn-outline-secondary me-2';
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => {
        const newTitle = prompt('Edit task title:', task.title);
        if (newTitle !== null) {
          task.title = newTitle.trim() || task.title;
          saveTasks();
          renderTasks();
        }
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-sm btn-outline-danger';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(taskInfo);
      li.appendChild(actions);
      taskList.appendChild(li);
    });
  };

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitleInput.value.trim();
    const date = taskDateInput.value;
    if (title) {
      tasks.push({ title, date, completed: false });
      saveTasks();
      renderTasks();
      taskForm.reset();
    }
  });

  renderTasks();
});
