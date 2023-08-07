(() => {
  const inputSearch = document.querySelector('#search-input');
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
  const openModalWindowCreate = document.querySelector('#button-open-modal-window');
  const myModalBlock = document.querySelector('#myModal');
  let modalTask = '';
  const { _ } = window;
  let arrTodo = [];
  let currentPage = 1;
  let showLastPage = false;
  let showButtonOffFilter = true;
  const rows = 5;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  function modalOpenCreateTasks() {
    myModalBlock.style.display = 'flex';
    modalTask = `
    <div class="modal-content">
    
      <h2>Create a task</h2>
      <p>Title</p>
      <input type="text" class="form-control" id="task-title" />
      <p>Description</p>
      <input type="text" class="form-control" id="task-description" />
      <br/>
      <p>Complete the task before</p>
      <input type="datetime-local" class="form-control" id="task-time-completed" />
          
    <button type="button" class="button-create-todo btn btn-outline-secondary"> add </button>
    <button type="button" class="close-modal-task btn btn-outline-secondary">cancel</button>
    </div>`;
    myModalBlock.innerHTML = modalTask;
  }

  function closeModalCreateTasks() {
    myModalBlock.style.display = 'none';
  }

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
      function selectStyleCompletedTask() {
        if (new Date(item.TaskCompletionTime).getTime() < new Date().getTime()) {
          return 'background: red';
        }
        return 'background: rgb(156, 224, 236)';
      }

      taskLi += `
      <li id=${item.id} class='task-li' draggable='true' style='${selectStyleCompletedTask()}' >
        <input type='checkbox' ${completed} class='checkbox'>
        <label for='${item.id}' class='input-todo'>${_.escape(item.todo)}</label>
        <button class='button-edit'>&#9998</button>
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

  function addTaskOnObject(textTitle, descriptionText, inputTime) {
    const newTodo = {
      id: String(Date.now()),
      todo: textTitle,
      description: descriptionText,
      TaskCompletionTime: inputTime,
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
      addTaskOnObject('Hello', 'world', new Date());
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

  function removeFilterSearch() {
    const buttonSearchRemove = document.querySelector('.remove-filter-search');
    showButtonOffFilter = true;
    buttonSearchRemove.remove();
    arrTodo = JSON.parse(localStorage.getItem('todo'));
    notification.style.display = 'none';
    showLastPage = true;
    filtration(arrTodo);
  }

  function selectFilterSearch(event) {
    if (event.target.classList.contains('remove-filter-search')) {
      removeFilterSearch();
    }
  }

  function createTodo() {
    const inputTaskTitle = document.querySelector('#task-title');
    const inputTaskDescription = document.querySelector('#task-description');
    const inputTaskTimeCompleted = document.querySelector('#task-time-completed');
    const title = inputValidation(inputTaskTitle.value);
    const description = inputValidation(inputTaskDescription.value);
    if (title === '') {
      inputTaskTitle.placeholder = 'Enter a title';
      inputTaskTitle.focus();
    } else if (description === '') {
      inputTaskDescription.placeholder = 'Enter a description';
      inputTaskDescription.focus();
    } else if (new Date(inputTaskTimeCompleted.value).getTime() < new Date().getTime()) {
      inputTaskTimeCompleted.focus();
      inputTaskTimeCompleted.style.color = 'red';
    } else {
      closeModalCreateTasks();
      addTaskOnObject(title, description, inputTaskTimeCompleted.value);
    }
  }

  function showTask() {
    myModalBlock.style.display = 'none';
    filtration(arrTodo);
  }

  function editTask(taskId) {
    const task = arrTodo.find((item) => item.id === taskId);
    myModalBlock.style.display = 'flex';
    modalTask = `
  <div class="modal-content">
    <h2>Edit a task</h2>
    <p>Title</p>
    <input type="text" class="form-control" id="task-title" value="${task.todo}" />
    <p>Description</p>
    <input type="text" class="form-control" id="task-description" value="${task.description}" />
  
    <button type="button" class="button-edit-todo btn btn-outline-secondary"> edit </button>
    <button type="button" class="close-modal-task btn btn-outline-secondary">cancel</button>
  </div>`;
    myModalBlock.innerHTML = modalTask;

    const buttonEditTask = document.querySelector('.button-edit-todo');

    function saveEditTask() {
      const inputTitleText = inputValidation(document.querySelector('#task-title').value);
      const inputDescriptionText = inputValidation(document.querySelector('#task-description').value);
      if (inputTitleText === '') {
        showTask();
      } else if (inputDescriptionText === '') {
        showTask();
      } else {
        task.todo = inputTitleText;
        task.description = inputDescriptionText;
        localStorage.setItem('todo', JSON.stringify(arrTodo));
        showTask();
      }
    }
    buttonEditTask.addEventListener('click', saveEditTask);
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
    } else if (event.target.classList.contains('button-edit')) {
      editTask(taskId);
    } else if (event.target.classList.contains('input-todo')) {
      myModalBlock.style.display = 'flex';
      arrTodo.forEach((item) => {
        if (taskId === item.id) {
          modalTask = `
          <div id=${item.id} class="modal-content"> 
          <h1>Task</h1>
          <h3>Title</h3>
          <p>${item.todo}</p>
          <h3>Description</h3>
          <p>${item.description}</p>
          <h5>Task created</h5>
          <p>${new Date(Number(item.id)).toLocaleString('en-US', options)}</p>
          <h5>Run to</h5>
          <p>${new Date(item.TaskCompletionTime).toLocaleString('en-US', options)}</p>

          <button class="button-edit btn btn-outline-secondary">Editing</button>
          <button class="close-modal-task btn btn-outline-secondary">close</button>
          </div>`;
          myModalBlock.innerHTML = modalTask;
        }
      });
    }
  }

  function closeModalTask(event) {
    const buttonSearchRemove = document.querySelector('.remove-filter-search');
    if (event.target.classList.contains('close-modal-task')) {
      modalTask = '';
      myModalBlock.style.display = 'none';
    } else if (event.target.classList.contains('button-create-todo')) {
      if (buttonSearchRemove) {
        removeFilterSearch();
      }
      createTodo();
    } else if (event.target.classList.contains('button-edit')) {
      editTask(event.target.parentNode.id);
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

  function searchTask() {
    arrTodo = JSON.parse(localStorage.getItem('todo'));
    arrTodo = arrTodo.filter((item) => item.todo === inputSearch.value);
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
    filtration(arrTodo);
  }

  window.addEventListener('load', checkingTheTask);
  deleteAll.addEventListener('click', deleteAllCompleted);
  todo.addEventListener('click', deleteOrCheckTask);
  checkboxAll.addEventListener('click', completedAllTodo);
  buttonFilter.addEventListener('click', filterTasks);
  paginationAllButton.addEventListener('click', paginationPageDisplay);
  buttonSearchTodo.addEventListener('click', searchTask);
  blockCheckAll.addEventListener('click', selectFilterSearch);
  openModalWindowCreate.addEventListener('click', modalOpenCreateTasks);
  myModalBlock.addEventListener('click', closeModalTask);
})();
