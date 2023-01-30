let arr = [];
//let todo = todo.value;

function createTodo(todo){
let task = todo.value.trim();
task = task.replace(/\s+/g, ' ');
arr.push(task);
console.log(arr);
}

// function validTest(todo){
// todo = trim(todo.value)
// console.log(todo)
// }