const todoInput = document.getElementById("user-input");
const todoList = document.querySelector("ul");
const todoListItem = document.getElementsByTagName("li");

function createListItem() {
  let listItem = document.createElement("li"); 
  listItem.appendChild(document.createTextNode(todoInput.value)); 
  todoList.appendChild(listItem); 
  todoInput.value = "";

  listItem.addEventListener("click", function() {
    listItem.classList.toggle("done");
  })
  
  let deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("X"));
  listItem.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function() {
    listItem.classList.add("delete");
  })
}

todoInput.addEventListener("keypress", function(event) {
  if (todoInput.value.length && event.which === 13) {
    createListItem();
  }
})