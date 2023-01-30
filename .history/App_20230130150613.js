let arr = [];
//let todo = todo.value;

function createTodo(todo){
let task = validTest(todo)
arr.push(task);
console.log(arr);
}

function validTest(todo){
todo = trim(todo.value)
console.log(todo)
}