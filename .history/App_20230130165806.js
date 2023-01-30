let arr = [];

function createTodo(todo){
let task = todo.value.trim();
task = task.replace(/\s+/g, ' ');
if (task = ""){
    alert("Напишите задачу")
}else{
    arr.push(task);
    console.log(arr);
}
}

// function viewingTodo(){
//     for(let i = 0; i<=arr.length; i++){
// console.log(arr[id])
// }
// }
