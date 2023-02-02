const addTodo = document.querySelector('#todo'),
    btn = document.querySelector('#btn'),
    todo = document.querySelector('#myUL'),
    closeLI = document.querySelector('#closeLi'),
    checkboxAll = document.querySelector('.checkbox-all'),
    deleteAll = document.querySelector('.delete-all'),
    buttonAll = document.querySelector('.button-all'),
    buttonActive = document.querySelector('.button-active'),
    buttonCompleted = document.querySelector('.button-completed'),
    buttonFilter = document.querySelector('.button-filter')
    ;

let arr = [];

buttonFilter.addEventListener('click', filterTasks)

function filterTasks(event) {
    let arrFilter = [];
    if (event.target.classList.contains("button-all")) {
        render(arr);
    }
    if (event.target.classList.contains("button-completed")) {
        arrFilter = arr.filter((item) => item.checked === true);
        render(arrFilter);
    }
    if (event.target.classList.contains("button-active")) {
        arrFilter = arr.filter((item) => item.checked !== true);
        render(arrFilter);
    }
}

function renderActive() {
    arrActive = arr.filter((item) => item.checked !== true);
    render(arrActive);
}

btn.addEventListener('click', createTodo)

addTodo.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        createTodo();
    }
});

checkboxAll.addEventListener('click', completedAllTodo)

function createTodo() {
    //let text = addTodo.
    if (text == "") {
        alert("Напишите задачу")
    } else {
        let newTodo = {
            id: String(Date.now()),
            todo: text,
            checked: false
        };
        arr.push(newTodo)

        render(arr);
        addTodo.value = '';
    }
};
function valid(){
    value.trim().replace(/\s+/g, ' ');
    if(text.)
}

function render(arr) {
    let displayMessage = '';
    arr.forEach(function (item) {
        const completed = item.checked ? "checked" : ""
        displayMessage += `
    <li id=${item.id} class='task-li'>
    <input type='checkbox' ${completed} class='checkbox'>
    <label for='${item.id}' class='input-todo'> ${item.todo} </label>
    <button class='button-delete'>✕</button>
    </li>`;
    });
    todo.innerHTML = displayMessage;
    counterTodo();
};

todo.addEventListener('click', deleteCheckTask)
todo.addEventListener('dblclick', editTask)

function editTask(event) {
    if (event.target.classList.contains("input-todo")) {
        const taskToEdit = event.target;
        const taskId = event.target.parentNode.id;
        const inputTask = document.createElement('input');
        inputTask.classList.add('input-edit-task');
        taskToEdit.replaceWith(inputTask);
        const task = arr.find((item) => item.id === taskId);
        inputTask.value = task.todo;
        inputTask.focus();


        function keyup(event) {
            if (event.key == 'Escape') {
                inputTask.removeEventListener('blur', save);
                render(arr)
            }
            if (event.key == 'Enter') {
                save();
            }
        }
        function save() {
            task.todo = inputTask.value;
            render(arr)
        };

        inputTask.addEventListener('keyup', keyup);
        inputTask.addEventListener('blur', save);
    }
}

function deleteCheckTask(event) {
    const taskId = event.target.parentNode.id
    if (event.target.classList.contains("button-delete")) {
        arr = arr.filter((item) => item.id !== taskId)
        render(arr);
    }
    else if (event.target.classList.contains("checkbox")) {
        const task = arr.find((item) => item.id === taskId)
        task.checked = !task.checked;
        console.log(arr)
        render(arr);
    }
}

function completedAllTodo(event) {
    arr.forEach(function (item) {
        item.checked = checkboxAll.checked
    })
    console.log(checkboxAll.checked)
    console.log(arr)
    render(arr)
}

deleteAll.addEventListener('click', deleteAllCompleted)

function deleteAllCompleted() {
        arr = arr.filter((item) => item.checked !== true)
    render(arr)
}

function counterTodo() {
    let counterAll = arr.length
    let counterCompleted = 0;
    let counterActive = 0;
    arr.forEach(function (item) {
        if (item.checked === true) {
            counterCompleted += 1;
        }
        else {
            counterActive += 1;
        }
    });
    buttonAll.textContent = `All (${counterAll})`;
    buttonCompleted.textContent = `Completed (${counterCompleted})`
    buttonActive.textContent = `Active (${counterActive})`
}