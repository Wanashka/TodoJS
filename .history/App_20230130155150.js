let arr = [];
const li = document.querySelector(#li);

function createTodo(todo){
let task = todo.value.trim();
task = task.replace(/\s+/g, ' ');
arr.push(task);
console.log(arr);
}

function viewingTodo(){
    for(let i = 0; i<=arr.length,i++){
console.log(arr[i])
}
}