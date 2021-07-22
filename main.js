/* add toggle to example */

const example1 = document.getElementById("ex1");
const example2 = document.getElementById("ex2");
example1.addEventListener("click",toggleComplete);
example2.addEventListener("click",toggleComplete);

/* popup layer open and close */

const openBtn = document.getElementById("open");
openBtn.addEventListener("click", popAddWindow);

const cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", closeAddWindow);

function popAddWindow () {
  let openWindow = document.getElementById("add-window");
  openWindow.style.display = "block";
}

function closeAddWindow () {
  let closeWindow = document.getElementById("add-window");
  closeWindow.style.display = "none";
  document.getElementById("todo-item").value = "";
}

/* add todolist */

const toDoList = document.getElementById("list");
const addBtn = document.getElementById("add");
addBtn.addEventListener("click", addItem);

const inputText = document.getElementById("todo-item");
inputText.addEventListener("keydown", (e)=>{if(e.keyCode === 13){addItem();}});

function addItem () {
  if(inputText.value !== ""){
    newItem(inputText.value, false);
  }
  closeAddWindow();
  saveItems();
}

function newItem (itemText, completed) {
  const toDoItem = document.createElement("li");
  const toDoText = document.createTextNode(itemText);
  toDoItem.appendChild(toDoText);
  
  if (completed) {toDoItem.classList.add("completed");}
  
  toDoItem.addEventListener("click",toggleComplete);
  toDoList.appendChild(toDoItem);
}

/* toggle complete or to-do */

function toggleComplete () {
  if(this.classList.contains("completed")){
    this.classList.remove("completed");
  } else {
    this.classList.add("completed");
  }
  
  saveItems();
}

/* clear button */

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearComplete);

const clearAllBtn = document.getElementById("clearall");
clearAllBtn.addEventListener("click", clearAll);
clearAllBtn.addEventListener("click", saveItems);

function clearComplete () {
  const completedItems = toDoList.getElementsByClassName("completed");
  
  while (completedItems.length > 0){
    completedItems.item(0).remove();
  }
  
  saveItems();
}

function clearAll () {
  const allItems = toDoList.children;
  
  while (allItems.length > 0){
    allItems.item(0).remove();
  }
}

/* save list */

function saveItems () {
  const toDos = [];
  for (let i = 0; i < toDoList.children.length; i++){
    const toDo = toDoList.children.item(i);
    
    const toDoObj = {
      "task" : toDo.innerText,
      "completed" : toDo.classList.contains("completed"),
    };
    
    toDos.push(toDoObj);
  }
  
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadItems () {
  if (localStorage.getItem("toDos") !== null) {
    console.log(localStorage.getItem("toDos"));
    const toDos = JSON.parse(localStorage.getItem("toDos"));
    if(toDos.length < 1){return;}
    
    clearAll();
    for (let i = 0; i < toDos.length; i++) {
      const toDo = toDos[i];
      newItem(toDo.task, toDo.completed);
    }
  }
}

loadItems();