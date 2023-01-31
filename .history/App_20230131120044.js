let addTodo = document.querySelector('#todo'),
    btn = document.querySelector('#btn'),
    todo = document.querySelector('#myUL'),
    closeLI = document.querySelector('#closeLi')
    ;


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
addTodo.value = '';
//console.log(arr)
}};

function displayTodo(){
    let displayMessage = '';
    arr.forEach(function(item, i){
    displayMessage += `
    <li>
    <input type='checkbox' id='item_${i}'>
    <label for='item_${i}'>${item.todo}</label>
    <span id="closeLi">&times;</span>
    </li>`;

    todo.innerHTML = displayMessage;
    });
};

closeLI.addEventListener('click',function(event){
console.log(event.target)
    // arr.forEach(function(item, i){
    //     arr.splice(i,1)});

    //     displayMessage();
});
    
