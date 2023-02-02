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

buttonAll.addEventListener('click', render)
// buttonActive.addEventListener('click',)
buttonCompleted.addEventListener('click', renderCompleted)

function renderCompleted(){
arr.forEach(function(item){
    arr_completed = arr.filter((item)=>item.checked === true);
    render(arr_completed);
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
//console.log(arr)
}};

function render(){
    let displayMessage = '';
    arr.forEach(function(item){
    const completed = item.checked? "checked" : ""
    displayMessage += `
    <li id=${item.id}>
    <input type='checkbox' ${completed} class='checkbox'>
    <label for='${item.id}'>${item.todo}</label>
    <button class='button-delete'>X</button>
    </li>`;

    });
    todo.innerHTML = displayMessage;
};

todo.addEventListener('click', deleteTask)
function deleteTask(event){
    const taskId = event.target.parentNode.id
    if(event.target.classList.contains("button-delete")){
        arr = arr.filter((item)=>item.id !== taskId)
        render(arr);
}
    if(event.target.classList.contains("checkbox")){
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
    render()
}

deleteAll.addEventListener('click', deleteAllCompleted)

function deleteAllCompleted(){
    arr.forEach(function(item){
        arr = arr.filter((item)=>item.checked !== true)
    });
    render()
}




//arr.find(item.id) === taskId
// checkbox

    