let addTodo = document.querySelector('#todo'),
    btn = document.querySelector('#btn'),
    todo = document.querySelector('#myUL'),
    closeLI = document.querySelector('#closeLi')
    ;


let arr = [];

btn.addEventListener('click',createTodo)
addTodo.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        createTodo();
    }
});

function createTodo(){
let text = addTodo.value.trim().replace(/\s+/g, ' ');
if (text == ""){
    alert("Напишите задачу")
}else{
let newTodo = {
    todo: text,
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
    <button id='item_${i}' onclick=deleteTask()>X</button>
    </li>`;

    todo.innerHTML = displayMessage;
    });
};

todo.addEventListener('change', function(event){
let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') +']').innerHTML;
arr.forEach(function(item){
    if(item.todo === valueLabel){
        item.checked = !item.checked;
        console.log(arr)
    }
})
});

function deleteTask(event){
console.log()
    // arr.forEach(function(item, i){
    //    if(i === ) 
    // })
}


    
