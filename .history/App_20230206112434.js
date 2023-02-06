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
let arrTodo = [];

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

const currentPage = 1; // текущая страница
const rows = 5;

function pagination(page) {
  page--;
  const start = rows * page;
  const end = start + rows;
  const paginatedArr = arrTodo.slice(start, end);
  if paginatedArr > 5{
  render(paginatedArr);
  buttonDisplayPagination(currentPage);
}

function buttonDisplayPagination(page) {
  const pagesCount = Math.ceil(arrTodo.length / rows);
  const buttonPagination = document.createElement('button');
  buttonPagination.classList.add('button-pagination');
  console.log(pagesCount);
  if (arrTodo.length > 5) {
    for (let i = 0; i < pagesCount; i++) {
      paginationAllButton.appendChild(buttonPagination);
      buttonPagination.innerText = page + 1;
    }
  }
}

// function pagePagination() {
//   currentPage = page;
// }
// buttonPagination.addEventListener('click', pagePagination);
function test(arr) {
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
      // render(arr);
      pagination(currentPage);
  }
}

function filterTasks(event) {
  buttonAll.classList.remove('button-filter-on');
  buttonCompleted.classList.remove('button-filter-on');
  buttonActive.classList.remove('button-filter-on');
  event.target.classList.add('button-filter-on');
  test(arrTodo);
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
    test(arrTodo);
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
      test(arrTodo);
    } else {
      task.todo = text;
      test(arrTodo);
    }
  }
  function keyup(e) {
    if (e.key === 'Escape') {
      inputTask.removeEventListener('blur', save);
      test(arrTodo);
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
    test(arrTodo);
  } else if (event.target.classList.contains('checkbox')) {
    const task = arrTodo.find((item) => item.id === taskId);
    task.checked = !task.checked;
    test(arrTodo);
  }
}

function completedAllTodo() {
  arrTodo.forEach((item) => {
    item.checked = checkboxAll.checked;
  });
  test(arrTodo);
}

function deleteAllCompleted() {
  arrTodo = arrTodo.filter((item) => item.checked !== true);
  test(arrTodo);
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
btn.addEventListener('click', createTodo);
addTodo.addEventListener('keyup', createTaskByEnter);
