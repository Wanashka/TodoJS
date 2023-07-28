(() => {
  const inputTodo = document.querySelector('#todo');
  const buttonCreateTodo = document.querySelector('#button-create-todo');
  const todo = document.querySelector('#myUL');
  const checkboxAll = document.querySelector('.checkbox-all');
  const deleteAll = document.querySelector('.delete-all');
  const buttonAllFilter = document.querySelector('.button-all');
  const buttonActiveFilter = document.querySelector('.button-active');
  const buttonCompletedFilter = document.querySelector('.button-completed');
  const buttonFilter = document.querySelector('.button-filter');
  const paginationAllButton = document.querySelector('.pagination');
  const buttonSearchTodo = document.querySelector('#button-search-todo');
  const checkboxAllLabel = document.querySelector('#check-all-label');
  const blockCheckAll = document.querySelector('.block-checkAll');
  const notification = document.querySelector('.notification');
  const ButtonEnter = 'Enter';
  const ButtonEscape = 'Escape';
  const { _ } = window;
  let arrTodo = [];
  let currentPage = 1;
  let showLastPage = false;
  let showButtonOffFilter = true;
  const rows = 5;

  function counterTodo() {
    const counterAll = arrTodo.length;
    let counterCompleted = 0;
    let counterActive = 0;
    arrTodo.forEach((item) => {
      if (item.checked) {
        counterCompleted += 1;
      } else {
        counterActive += 1;
      }
    });

    buttonAllFilter.textContent = `All (${counterAll})`;
    buttonCompletedFilter.textContent = `Completed (${counterCompleted})`;
    buttonActiveFilter.textContent = `Active (${counterActive})`;
  }

  function buttonDisplayPagination(arr) {
    const pagesCount = Math.ceil(arr.length / rows);
    paginationAllButton.innerHTML = '';
    for (let i = 0; i < pagesCount; i += 1) {
      const buttonPagination = document.createElement('button');
      buttonPagination.classList.add('button-pagination');
      paginationAllButton.appendChild(buttonPagination);
      if (currentPage === i + 1) {
        buttonPagination.classList.add('button-pagination-active');
      }
      buttonPagination.innerText = i + 1;
    }
  }

  function render(arr) {
    if (currentPage - 1 === Math.ceil(arr.length / rows) && arr.length % rows === 0) {
      showLastPage = true;
    }
    if (showLastPage) {
      currentPage = Math.ceil(arr.length / rows);
      showLastPage = false;
    }
    buttonDisplayPagination(arr);
    const start = rows * (currentPage - 1);
    const end = start + rows;
    const paginatedArr = arr.slice(start, end);
    checkboxAll.checked = arrTodo.length ? arrTodo.every((item) => item.checked) : false;
    let taskLi = '';
    paginatedArr.forEach((item) => {
      const completed = item.checked ? 'checked' : '';
      taskLi += `
      <li id=${item.id} class='task-li'>
        <input type='checkbox' ${completed} class='checkbox'>
        <label for='${item.id}' class='input-todo'>${_.escape(item.todo)}</label>
        <button class='button-delete'>✕</button>
      </li>`;
    });
    todo.innerHTML = taskLi;
    counterTodo();
  }

  function switchFilterOnAll(arr) {
    buttonCompletedFilter.classList.remove('button-filter-on');
    buttonActiveFilter.classList.remove('button-filter-on');
    buttonAllFilter.classList.add('button-filter-on');
    showLastPage = true;
    render(arr);
  }

  function filterTab(arr) {
    if (arr.length > 0) {
      render(arr);
    } else {
      switchFilterOnAll(arrTodo);
    }
  }

  function filtration(arr) {
    let arrFilter = [];
    const buttonFilterOn = document.querySelector('.button-filter-on');
    switch (buttonFilterOn.id) {
      case 'button-all':
        render(arr);
        break;
      case 'button-active':
        arrFilter = arr.filter((item) => !item.checked);
        filterTab(arrFilter);
        break;
      case 'button-completed':
        arrFilter = arr.filter((item) => item.checked);
        filterTab(arrFilter);
        break;
      default:
        render(arr);
    }
  }

  function addTaskOnObject(text) {
    const newTodo = {
      id: String(Date.now()),
      todo: text,
      checked: false,
    };
    arrTodo.push(newTodo);
    localStorage.setItem('todo', JSON.stringify(arrTodo));
    arrTodo = JSON.parse(localStorage.getItem('todo'));
    showLastPage = true;
    filtration(arrTodo);
  }

  function checkingTheTask() {
    if (localStorage.getItem('todo')) {
      arrTodo = JSON.parse(localStorage.getItem('todo'));
      filtration(arrTodo);
    } else {
      addTaskOnObject('Hello world');
    }
  }

  function paginationPageDisplay(event) {
    if (event.target.classList.contains('button-pagination')) {
      currentPage = Number(event.target.textContent);
      filtration(arrTodo);
    }
  }

  function filterTasks(event) {
    const buttonFilterOn = document.querySelector('.button-filter-on');
    if (event.target.classList.contains('button-filter')) {
      return;
    }
    showLastPage = true;
    buttonFilterOn.classList.remove('button-filter-on');
    event.target.classList.add('button-filter-on');
    filtration(arrTodo);
  }

  function inputValidation(value) {
    const text = value.trim().replace(/\s+/g, ' ');
    return text;
  }

  function createTodo() {
    const text = inputValidation(inputTodo.value);
    if (text === '') {
      inputTodo.placeholder = 'Enter a task';
      inputTodo.focus();
    } else {
      addTaskOnObject(text);
      inputTodo.value = '';
    }
  }

  function editTask(event) {
    const inputTask = document.createElement('input');
    const taskId = event.target.parentNode.id;
    const task = arrTodo.find((item) => item.id === taskId);
    function saveChanges() {
      const text = inputValidation(inputTask.value);
      if (text === '') {
        filtration(arrTodo);
      } else {
        task.todo = text;
        localStorage.setItem('todo', JSON.stringify(arrTodo));
        filtration(arrTodo);
      }
    }
    function buttonClickHandler(e) {
      if (e.key === ButtonEscape) {
        inputTask.removeEventListener('blur', saveChanges);
        filtration(arrTodo);
      }
      if (e.key === ButtonEnter) {
        saveChanges();
      }
    }
    if (event.target.classList.contains('input-todo')) {
      const taskToEdit = event.target;
      inputTask.classList.add('input-edit-task');
      taskToEdit.replaceWith(inputTask);
      inputTask.value = task.todo;
      inputTask.focus();

      inputTask.addEventListener('keyup', buttonClickHandler);
      inputTask.addEventListener('blur', saveChanges);
    }
  }

  function deleteOrCheckTask(event) {
    const taskId = event.target.parentNode.id;
    if (event.target.classList.contains('button-delete')) {
      arrTodo = arrTodo.filter((item) => item.id !== taskId);
      localStorage.setItem('todo', JSON.stringify(arrTodo));
      filtration(arrTodo);
    } else if (event.target.classList.contains('checkbox')) {
      const task = arrTodo.find((item) => item.id === taskId);
      task.checked = !task.checked;
      localStorage.setItem('todo', JSON.stringify(arrTodo));
      filtration(arrTodo);
    }
  }

  function completedAllTodo() {
    arrTodo.forEach((item) => {
      const itemTodo = item;
      itemTodo.checked = checkboxAll.checked;
    });
    localStorage.setItem('todo', JSON.stringify(arrTodo));
    filtration(arrTodo);
  }

  function deleteAllCompleted() {
    arrTodo = arrTodo.filter((item) => !item.checked);
    localStorage.setItem('todo', JSON.stringify(arrTodo));
    showLastPage = true;
    filtration(arrTodo);
  }

  function createTaskByEnter(event) {
    if (event.key === ButtonEnter) {
      createTodo();
    }
  }

  function searchTask() {
    arrTodo = JSON.parse(localStorage.getItem('todo'));
    arrTodo = arrTodo.filter((item) => item.todo === inputTodo.value);
    if (arrTodo.length === 0) {
      notification.style.display = 'inline';
    } else {
      notification.style.display = 'none';
    }
    showLastPage = true;
    const removeFiltration = document.createElement('button');
    removeFiltration.classList.add('remove-filter-search');
    if (showButtonOffFilter) {
      checkboxAllLabel.after(removeFiltration);
      showButtonOffFilter = false;
    }
    removeFiltration.innerText = 'Return tasks';
    buttonCreateTodo.style.display = 'none';
    filtration(arrTodo);
  }

  function removeFilterSearch(event) {
    if (event.target.classList.contains('remove-filter-search')) {
      const buttonSearchRemove = document.querySelector('.remove-filter-search');
      showButtonOffFilter = true;
      buttonSearchRemove.remove();
      arrTodo = JSON.parse(localStorage.getItem('todo'));
      buttonCreateTodo.style.display = 'inline';
      notification.style.display = 'none';
      showLastPage = true;
      filtration(arrTodo);
    }
  }

  window.addEventListener('load', checkingTheTask);
  deleteAll.addEventListener('click', deleteAllCompleted);
  todo.addEventListener('click', deleteOrCheckTask);
  todo.addEventListener('dblclick', editTask);
  checkboxAll.addEventListener('click', completedAllTodo);
  buttonFilter.addEventListener('click', filterTasks);
  buttonCreateTodo.addEventListener('click', createTodo);
  inputTodo.addEventListener('keyup', createTaskByEnter);
  paginationAllButton.addEventListener('click', paginationPageDisplay);
  buttonSearchTodo.addEventListener('click', searchTask);
  blockCheckAll.addEventListener('click', removeFilterSearch);
})();
