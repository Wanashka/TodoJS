let addTodo = document.querySelector('#todo'),
    btn = document.querySelector('#btn'),
    todo = document.querySelector('#myUL'),
    closeLI = document.querySelector('#closeLi'),
    checkboxAll = document.querySelector('.checkbox-all'),
    deleteAll = document.querySelector('.delete-all'),
    buttonAll = document.querySelector('.button-all'),
    buttonActive = document.querySelector('.button-active'),
    buttonCompleted = document.querySelector('.button-completed')
    ;


let arr = [];

buttonAll.addEventListener('click', () => {render(arr)})
buttonActive.addEventListener('click',renderActive)
buttonCompleted.addEventListener('click', renderCompleted)

function renderCompleted(){
    arr.forEach(function(item){
        arr_completed = arr.filter((item)=>item.checked === true);
    render(arr_completed);
    });
}

function renderActive(){
    arr.forEach(function(item){
        arr_active = arr.filter((item)=>item.checked !== true);
        render(arr_active);
    });

}

btn.addEventListener('click',createTodo)

addTodo.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        createTodo();
    }
});

checkboxAll.addEventListener('click',completedAllTodo)

function createTodo(){
let text = addTodo.value.trim().replace(/\s+/g, ' ');
if (text == ""){
    alert("Напишите задачу")
}else{
let newTodo = {
    id: String(Date.now()),
    todo: text,
    checked: false
};
arr.push(newTodo)

render(arr);
addTodo.value = '';
}};

function render(arr){
    let displayMessage = '';
    arr.forEach(function(item){
    const completed = item.checked? "checked" : ""
    displayMessage += `
    <li id=${item.id} class='task-li'>
    <input type='checkbox' ${completed} class='checkbox'>
    <label for='${item.id}' class='input-todo'> ${item.todo}</label>
    <button class='button-delete'>X</button>
    </li>`;
    });
    todo.innerHTML = displayMessage;
};

todo.addEventListener('click', deleteTask)
todo.addEventListener('dblclick', editTask)

function editTask(event){
    const taskToEdit = event.target;
    const taskId = event.target.parentNode.id
    const inputTask = document.createElement('input');
    inputTask.classList.add('input-edit-task');
    taskToEdit.replaceWith(inputTask);
    const task = arr.find((item)=>item.id === taskId)
    const inputEditTask = document.querySelector('.input-edit-task');
    console.log(inputEditTask.value)
    inputEditTask.addEventListener('blur', ()=> {
        task.todo = inputEditTask.value;
        render(arr)
    })
    inputEditTask.addEventListener('keyup', function(event){
        if(event.key == 'Enter'){
            task.todo = inputEditTask.value;
            render(arr)        
        }
    });

    //event.target.textContent.hidden;
    // const taskId = event.target.parentNode.id
    // arr.forEach(function(item){
    // if(event.target.classList.contains("input-todo")){
    //     if(item.id === taskId){
    //todo.querySelector(".input-todo").hidden = true;
    // const inputTask = document.createElement('input')
    // todo.querySelector(".input-todo").replaceWith(inputTask)
    //console.log( todo.querySelector(""))
}
//     }
//     }
// })
// }

function deleteTask(event){
    const taskId = event.target.parentNode.id
    if(event.target.classList.contains("button-delete")){
        arr = arr.filter((item)=>item.id !== taskId)
        render(arr);
    }
    else if(event.target.classList.contains("checkbox")){
         const task = arr.find((item)=>item.id === taskId)
         task.checked = !task.checked;
         console.log(arr)
         render(arr);
    }
}

function completedAllTodo(event){
    arr.forEach(function(item){
        item.checked = checkboxAll.checked
    })
    console.log(checkboxAll.checked)
    console.log(arr)
    render(arr)
}

deleteAll.addEventListener('click', deleteAllCompleted)

function deleteAllCompleted(){
    arr.forEach(function(item){
        arr = arr.filter((item)=>item.checked !== true)
    });
    render(arr)
}
