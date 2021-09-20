"use strict";

const data = document.querySelector(".todo-input-data");
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
  localStorage.setItem("todoList", JSON.stringify(banco));

function criarTarefa(tarefa, check, data, indice) {
  const criaTask = document.createElement("label");
  criaTask.classList.add("todo-criado");
  criaTask.innerHTML = `
            <input type="checkbox" ${check} data-indice=${indice}>
            <div><p class="texto">${tarefa}</p>
            <p class="texto-data">Data limite: ${data}</p></div>
            <input type="button" value="X" class="botao-check" data-indice=${indice}>
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
    criarTarefa(criarTask.task, criarTask.check, criarTask.deadLine, indice)
  );
};

const cadastrarTarefa = function (evento) {
  const tecla = evento.key;
  const text = evento.target.value;
  const dataVer = data.value;

  if (tecla === "Enter") {
    const banco = getBanco();
    banco.push({ task: text, check: "", deadLine: dataVer });
    setBanco(banco);
    renderTela();
    evento.target.value = "";
  }
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
  if (elemento.type === "button") {
    const indice = elemento.dataset.indice;
    removerItem(indice);
    renderTela();
  } else if (elemento.type === "checkbox") {
    const banco = getBanco();
    const indice = elemento.dataset.indice;
    setBanco(banco);
    atualizarItem(indice);
    renderTela();
  }
};


const deletaTudo = function(){
  let banco = getBanco();
  banco = [];
  setBanco(banco);
  renderTela();
}


document.getElementById("novoItem").addEventListener("keypress", cadastrarTarefa);
document.getElementById("todoList").addEventListener("click", clickItem);
document.getElementById("delete").addEventListener("click", deletaTudo);


renderTela();
