let addTodo = document.querySelector('#todo'),
    btn = document.querySelector('#btn'),
    todo = document.querySelector('#myUL');


let arr = [];

btn.addEventListener('click',createTodo)
addTodo.addEventListener('keyup', function(event){
    if(event.code == 'Enter'){
        createTodo();
    }
});

function createTodo(){
let task = addTodo.value.trim();
task = task.replace(/\s+/g, ' ');
if (task == ""){
    alert("Напишите задачу")
}else{
let newTodo = {
    todo: task,
    checked: false
};
arr.push(newTodo)
displayTodo();
//console.log(arr)
}};
function displayTodo(){
    let displayMessage = '';
    arr.forEach(function(item, i){
    displayMessage += `
    <li>
    <input type='checkbox' id='item_${i}'>
    <label for='item_${i}'>${item.todo}</label>
    </li>`;

    todo.innerHTML = displayMessage;
    });
};

function deleteTodo(){
    arr.forEach(function(item, i){
        arr.splice(i,1);
        displayMessage();
    });
};
