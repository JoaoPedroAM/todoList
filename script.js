"use strict";

//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listner
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Functions
function addTodo(event) {
  event.preventDefault();
  //cria a div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //cria o Li
  const novoTodo = document.createElement("li");
  novoTodo.innerText = todoInput.value;
  novoTodo.classList.add("todo-item");
  todoDiv.appendChild(novoTodo);
  //local storage
  saveLocalTodos(todoInput.value);
  //botão Check
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  checkButton.classList.add("check-btn");
  todoDiv.appendChild(checkButton);
  //Botão de lixo
  const lixoButton = document.createElement("button");
  lixoButton.innerHTML = '<i class="fas fa-trash"></i>';
  lixoButton.classList.add("lixo-btn");
  todoDiv.appendChild(lixoButton);
  
  //linkando a lista
  todoList.appendChild(todoDiv);
  //limpar input
  todoInput.value = "";
}

function deleteCheck(botao) {
  const item = botao.target;
  //lixo
  if (item.classList[0] === "lixo-btn") {
    const todo = item.parentElement;
    todo.remove();
    removeLocal(todo)
  }

  //check
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completo");
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //cria a div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //cria o Li
    const novoTodo = document.createElement("li");
    novoTodo.innerText = todo;
    novoTodo.classList.add("todo-item");
    todoDiv.appendChild(novoTodo);
    //botão Check
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    //Botão de lixo
    const lixoButton = document.createElement("button");
    lixoButton.innerHTML = '<i class="fas fa-trash"></i>';
    lixoButton.classList.add("lixo-btn");
    todoDiv.appendChild(lixoButton);
    //linkando a lista
    todoList.appendChild(todoDiv);
  });
}

function removeLocal(todo){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos))

}