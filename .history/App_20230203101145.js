const addTodo = document.querySelector('#todo');
const btn = document.querySelector('#btn');
const todo = document.querySelector('#myUL');
const checkboxAll = document.querySelector('.checkbox-all');
const deleteAll = document.querySelector('.delete-all');
const buttonAll = document.querySelector('.button-all');
const buttonActive = document.querySelector('.button-active');
const buttonCompleted = document.querySelector('.button-completed');
const buttonFilter = document.querySelector('.button-filter');
let arr = [];

function counterTodo() {
  const counterAll = arr.length;
  let counterCompleted = 0;
  let counterActive = 0;
  arr.forEach((item) => {
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
    render(arr);
  }
  if (event.target.classList.contains('button-completed')) {
    arrFilter = arr.filter((item) => item.checked === true);
    render(arrFilter);
  }
  if (event.target.classList.contains('button-active')) {
    arrFilter = arr.filter((item) => item.checked !== true);
    render(arrFilter);
  }
}
function valid(value) {
  const text = value.trim().replace(/\s+/g, ' ');
  return (text);
}

function createTodo() {
  const text = valid(addTodo.value);
  if (text === '') {
    return;
  }
  const newTodo = {
    id: String(Date.now()),
    todo: text,
    checked: false,
  };
  arr.push(newTodo);
  render(arr);
  addTodo.value = '';
}

function editTask(event) {
  if (event.target.classList.contains('input-todo')) {
    const taskToEdit = event.target;
    const taskId = event.target.parentNode.id;
    const inputTask = document.createElement('input');
    inputTask.classList.add('input-edit-task');
    taskToEdit.replaceWith(inputTask);
    const task = arr.find((item) => item.id === taskId);
    inputTask.value = task.todo;
    inputTask.focus();

    function keyup(event) {
      if (event.key === 'Escape') {
        inputTask.removeEventListener('blur', save);
        render(arr);
      }
      if (event.key === 'Enter') {
        save();
      }
    }
    function save() {
      const text = valid(inputTask.value);
      if (text === '') {
        render(arr);
      }
      task.todo = text;
      render(arr);
    }

    inputTask.addEventListener('keyup', keyup);
    inputTask.addEventListener('blur', save);
  }
}

function deleteCheckTask(event) {
  const taskId = event.target.parentNode.id;
  if (event.target.classList.contains('button-delete')) {
    arr = arr.filter((item) => item.id !== taskId);
    render(arr);
  } else if (event.target.classList.contains('checkbox')) {
    const task = arr.find((item) => item.id === taskId);
    task.checked = !task.checked;
    console.log(arr);
    render(arr);
  }
}

function completedAllTodo(event) {
  arr.forEach((item) => {
    item.checked = checkboxAll.checked;
  });
  console.log(checkboxAll.checked);
  console.log(arr);
  render(arr);
}

deleteAll.addEventListener('click', deleteAllCompleted);

function deleteAllCompleted() {
  arr = arr.filter((item) => item.checked !== true);
  render(arr);
}

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
