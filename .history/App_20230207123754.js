const addTodo = document.querySelector('#todo');
const btn = document.querySelector('#btn');
const todo = document.querySelector('#myUL');
const checkboxAll = document.querySelector('.checkbox-all');
const deleteAll = document.querySelector('.delete-all');
const buttonAll = document.querySelector('.button-all');
const buttonActive = document.querySelector('.button-active');
const buttonCompleted = document.querySelector('.button-completed');
const buttonFilter = document.querySelector('.button-filter');
const paginationAllButton = document.querySelector('.pagination');
const { _ } = window;
let arrTodo = [];
let page = 1; // текущая страница
const rows = 5;

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

function buttonDisplayPagination(arr) {
  const pagesCount = Math.ceil(arr.length / rows); // какая страница по счету
  paginationAllButton.innerHTML = '';
  for (let i = 0; i < pagesCount; i += 1) {
    const buttonPagination = document.createElement('button');
    buttonPagination.classList.add('button-pagination');
    paginationAllButton.appendChild(buttonPagination);
    buttonPagination.innerText = i + 1;
  }
}

function render(arr) {
  buttonDisplayPagination(arr);

  const start = rows * (page - 1);
  const end = start + rows;
  const paginatedArr = arr.slice(start, end);

  let displayMessage = '';
  paginatedArr.forEach((item) => {
    const completed = item.checked ? 'checked' : '';
    displayMessage += `
  <li id=${item.id} class='task-li'>
  <input type='checkbox' ${completed} class='checkbox'>
  <label for='${item.id}' class='input-todo'> ${_.escape(item.todo)} </label>
  <button class='button-delete'>✕</button>
  </li>`;
  });
  todo.innerHTML = displayMessage;
  counterTodo();
}

function filtration(arr) {
  let arrFilter = [];
  switch (buttonFilter.classList.contains('button-filter')) {
    case buttonAll.classList.contains('button-filter-on'):
      render(arr);
      break;
    case buttonActive.classList.contains('button-filter-on'):
      arrFilter = arr.filter((item) => item.checked !== true);
      render(arrFilter);
      break;
    case buttonCompleted.classList.contains('button-filter-on'):
      arrFilter = arr.filter((item) => item.checked === true);
      render(arrFilter);
      break;
    default:
      render(arr);
  }
}

function pagination(event) {
  if (event.target.classList.contains('button-pagination')) {
    page = Number(event.target.textContent);
    filtration(arrTodo);
  }
}

function filterTasks(event) {
  buttonAll.classList.remove('button-filter-on');
  buttonCompleted.classList.remove('button-filter-on');
  buttonActive.classList.remove('button-filter-on');
  event.target.classList.add('button-filter-on');
  filtration(arrTodo);
}

function valid(value) {
  const text = value.trim().replace(/\s+/g, ' ');
  return (text);
}

function createTodo() {
  const text = valid(addTodo.value);
  if (text === '') {
    addTodo.placeholder = 'Enter a task';
    addTodo.focus();
  } else {
    const newTodo = {
      id: String(Date.now()),
      todo: text,
      checked: false,
    };
    arrTodo.push(newTodo);
    filtration(arrTodo);
    addTodo.value = '';
  }
}

function editTask(event) {
  const inputTask = document.createElement('input');
  const taskId = event.target.parentNode.id;
  const task = arrTodo.find((item) => item.id === taskId);
  function save() {
    const text = valid(inputTask.value);
    if (text === '') {
      filtration(arrTodo);
    } else {
      task.todo = text;
      filtration(arrTodo);
    }
  }
  function keyup(e) {
    if (e.key === 'Escape') {
      inputTask.removeEventListener('blur', save);
      filtration(arrTodo);
    }
    if (e.key === 'Enter') {
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
    arrTodo = arrTodo.filter((item) => item.id !== taskId);
    filtration(arrTodo);
  } else if (event.target.classList.contains('checkbox')) {
    const task = arrTodo.find((item) => item.id === taskId);
    task.checked = !task.checked;
    filtration(arrTodo);
  }
}

function completedAllTodo() {
  arrTodo.forEach((item) => {
    const itemTodo = item;
    itemTodo.checked = checkboxAll.checked;
  });
  filtration(arrTodo);
}

function deleteAllCompleted() {
  arrTodo = arrTodo.filter((item) => item.checked !== true);
  filtration(arrTodo);
}

function createTaskByEnter(event) {
  if (event.key === 'Enter') {
    createTodo();
  }
}

deleteAll.addEventListener('click', deleteAllCompleted);
todo.addEventListener('click', deleteCheckTask);
todo.addEventListener('dblclick', editTask);
checkboxAll.addEventListener('click', completedAllTodo);
buttonFilter.addEventListener('click', filterTasks);
buttonCreateTodo.addEventListener('click', createTodo);
addTodo.addEventListener('keyup', createTaskByEnter);
paginationAllButton.addEventListener('click', pagination);
