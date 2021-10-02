"use strict";
//variavei
const data = document.querySelector(".todo-input-data");
const tag = document.querySelector(".tags");
const text = document.querySelector(".todo-input");
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
  localStorage.setItem("todoList", JSON.stringify(banco));

function criarTarefa(tarefa, check, data, indice, marcador) {
  const criaTask = document.createElement("label");
  criaTask.classList.add("todo-criado");
  criaTask.innerHTML = `
            <input type="checkbox" ${check} data-indice=${indice}>
            <div><p class="texto">${tarefa}  #${marcador}</p>
            <p class="texto-data">Data limite: ${data}</p></div>
            
            <button class="botao-check" id="delete" data-indice=${indice}><i class="fas fa-trash fa-1x"></i></button> 
            <button class="botao-check" id="edit" data-indice=${indice}><i class="fas fa-pen"></i></button>
    `;
  document.getElementById("todoList").appendChild(criaTask);
}

const limpaTudo = function () {
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const renderTela = function () {
  limpaTudo();
  const banco = getBanco();
  banco.forEach((criarTask, indice) =>
    criarTarefa(
      criarTask.task,
      criarTask.check,
      criarTask.deadLine,
      indice,
      criarTask.marcador
    )
  );
};

const removerItem = function (indice) {
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  renderTela();
};

const atualizarItem = function (indice) {
  const banco = getBanco();
  banco[indice].check = banco[indice].check === "" ? "checked" : "";
  setBanco(banco);
  renderTela();
};

const clickItem = function (evento) {
  const elemento = evento.target;
  if (elemento.id === "delete") {
    deletarSelecionado(evento);
  } else if (elemento.type === "checkbox") {
    checkSelecionado(evento);
  }
  renderTela();
};

const addTask = function (evento) {
  const textValor = text.value;
  const dataVer = data.value;
  const tagVer = tag.value;
  const banco = getBanco();
  banco.push({
    task: textValor,
    check: "",
    deadLine: dataVer,
    marcador: tagVer,
  });
  setBanco(banco);
  renderTela();
  text.value = "";
  tag.value = "";
};

const deletarSelecionado = function (evento) {
  const elemento = evento.target;
  const indice = elemento.dataset.indice;
  removerItem(indice);
  
};

const checkSelecionado = function (evento) {
  const elemento = evento.target;
  const banco = getBanco();
  const indice = elemento.dataset.indice;
  setBanco(banco);
  atualizarItem(indice);
  
};




document.getElementById("todoList").addEventListener("click", clickItem);
document.getElementById("addButton").addEventListener("click", addTask);


renderTela();
