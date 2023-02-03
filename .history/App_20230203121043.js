const addTodo = document.querySelector('#todo');
const btn = document.querySelector('#btn');
const todo = document.querySelector('#myUL');
const checkboxAll = document.querySelector('.checkbox-all');
const deleteAll = document.querySelector('.delete-all');
const buttonAll = document.querySelector('.button-all');
const buttonActive = document.querySelector('.button-active');
const buttonCompleted = document.querySelector('.button-completed');
const buttonFilter = document.querySelector('.button-filter');
const arrTodo = [];

function counterTodo() {
  const counterAll = arrTodo.length;
  let counterCompleted = 0;
  let counterActive = 0;
  arrTodo.forEach((item) => {
    if (item.checked === true) {
      counterCompleted += 1;
    } else {
      counterActive += 1;
    }
  });
  buttonAll.textContent = `All (${counterAll})`;
  buttonCompleted.textContent = `Completed (${counterCompleted})`;
  buttonActive.textContent = `Active (${counterActive})`;
}

function render(arr) {
  let displayMessage = '';
  arr.forEach((item) => {
    const completed = item.checked ? 'checked' : '';
    displayMessage += `
  <li id=${item.id} class='task-li'>
  <input type='checkbox' ${completed} class='checkbox'>
  <label for='${item.id}' class='input-todo'> ${item.todo} </label>
  <button class='button-delete'>✕</button>
  </li>`;
  });
  todo.innerHTML = displayMessage;
  counterTodo();
}

function filterTasks(event) {
  let arrFilter = [];
  if (event.target.classList.contains('button-all')) {
    render(arrTodo);
  }
  if (event.target.classList.contains('button-completed')) {
    arrFilter = arrTodo.filter((item) => item.checked === true);
    render(arrFilter);
  }
  if (event.target.classList.contains('button-active')) {
    arrFilter = arrTodo.filter((item) => item.checked !== true);
    render(arrFilter);
  }
  
  event.target.classList.add('button-filter-on');
}
function valid(value) {
  const text = value.trim().replace(/\s+/g, ' ');
  return (text);
}

function createTodo() {
  const text = valid(addTodo.value);
  if (text === '') {
    alert('Нельзя!');
    return;
  }
  const newTodo = {
    id: String(Date.now()),
    todo: text,
    checked: false,
  };
  arrTodo.push(newTodo);
  render(arrTodo);
  addTodo.value = '';
}

function editTask(event) {
  const inputTask = document.createElement('input');
  const taskId = event.target.parentNode.id;
  const task = arrTodo.find((item) => item.id === taskId);
  function save() {
    const text = valid(inputTask.value);
    if (text === '') {
      render(arrTodo);
    } else {
      task.todo = text;
      render(arrTodo);
    }
  }
  function keyup(event) {
    if (event.key === 'Escape') {
      inputTask.removeEventListener('blur', save);
      render(arrTodo);
    }
    if (event.key === 'Enter') {
      save();
    }
  }
  if (event.target.classList.contains('input-todo')) {
    const taskToEdit = event.target;
    inputTask.classList.add('input-edit-task');
    taskToEdit.replaceWith(inputTask);
    inputTask.value = task.todo;
    inputTask.focus();

    inputTask.addEventListener('keyup', keyup);
    inputTask.addEventListener('blur', save);
  }
}

function deleteCheckTask(event) {
  const taskId = event.target.parentNode.id;
  if (event.target.classList.contains('button-delete')) {
    const arr = arrTodo.filter((item) => item.id !== taskId);
    render(arr);
  } else if (event.target.classList.contains('checkbox')) {
    const task = arrTodo.find((item) => item.id === taskId);
    task.checked = !task.checked;
    render(arrTodo);
  }
}

function completedAllTodo() {
  arrTodo.forEach((item) => {
    item.checked = checkboxAll.checked;
  });
  render(arrTodo);
}

function deleteAllCompleted() {
  const arr = arrTodo.filter((item) => item.checked !== true);
  render(arr);
}

deleteAll.addEventListener('click', deleteAllCompleted);
todo.addEventListener('click', deleteCheckTask);
todo.addEventListener('dblclick', editTask);
checkboxAll.addEventListener('click', completedAllTodo);
buttonFilter.addEventListener('click', filterTasks);
btn.addEventListener('click', createTodo);

addTodo.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    createTodo();
  }
});
