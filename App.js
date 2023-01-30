let addTodo = document.querySelector('#todo'),
    btn = document.querySelector('#btn'),
    todo = document.querySelector('#myUL'),
    MyUL = document.querySelector('#myUL');


let arr = [];

function createTodo(){
let task = addTodo.value.trim();
task = task.replace(/\s+/g, ' ');
if (task == ""){
    alert("Напишите задачу")
}else{
let newTodo = {
    todo: task,
    checked: false,
    important: false
};
arr.push(newTodo)
displayTodo();
//console.log(arr)
}};
function displayTodo(){
    arr.forEach(function(item, i){
console.log(item);
    });
}
