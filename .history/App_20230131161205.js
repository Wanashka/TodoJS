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
    displayMessage += `
    <li id=${item.id}>
    <input type='checkbox' >
    <label for='${item.id}'>${item.todo}</label>
    <button class='button-delete'>X</button>
    </li>`;

    });
    todo.innerHTML = displayMessage;
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


todo.addEventListener('click', deleteTask)
function deleteTask(event){
    if(event.target.classList.contains("button-delete")){
        const taskId = event.target.parentNode.id
        arr = arr.filter((item)=>item.id !== taskId)
}
    render();
}

//arr.find(item.id) === taskId
// checkbox

    
