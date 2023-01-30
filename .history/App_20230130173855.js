let addTodo = document.querySelector('#todo'),
    btn = document.querySelector('#btn'),
    todo = document.querySelector('#myUL')


let arr = [];

function createTodo(){

let newTodo = {
    todo: addTodo.value,
    checked: false,
    important: false
};

arr.push(newTodo)
console.log(arr)
};

