let addTodo = document.querySelector('#todo'),
    btn = document.querySelector('#btn'),
    todo = document.querySelector('#myUL'),
    closeLI = document.querySelector('#closeLi'),
    checkAllTodos = document.querySelector('.check-all-todos')
    ;


let arr = [];

btn.addEventListener('click',createTodo)
addTodo.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        createTodo();
    }
});

checkAllTodos.addEventListener('click',complitedAllTodo)
function complitedAllTodo(){
    console.log("!")
}

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

render();
addTodo.value = '';
//console.log(arr)
}};

function render(){
    let displayMessage = '';
    arr.forEach(function(item){
    const complited = item.checked? "checked" : ""
    displayMessage += `
    <li id=${item.id}>
    <input type='checkbox' ${complited} class='checkbox'>
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
        render();
}
    if(event.target.classList.contains("checkbox")){
         const task = arr.find((item)=>item.id === taskId)
         task.checked = !task.checked;
         console.log(arr)
         render();
    }
}


//arr.find(item.id) === taskId
// checkbox

    
