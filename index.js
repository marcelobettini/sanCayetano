"use strict";
import { generateId } from "./helpers/generateId.js";

//Array to store to-do items
let todos = [];

//get elements
//should I reference the table element???
const addTodoForm = document.getElementById("addTodoForm");
const todoModal = document.getElementById("todoModal");
const editTodoForm = document.getElementById("editTodoForm");
const deleteButton = document.getElementById("deleteButton");
const statusButton = document.getElementById("statusButton");
const cancelButton = document.getElementById("cancelButton");

//Event listeners
addTodoForm.addEventListener("submit", handleAddTodoFormSubmit);
deleteButton.addEventListener("click", handleDeleteButtonClick);
editTodoForm.addEventListener("submit", handleUpdateButtonClick);
statusButton.addEventListener("click", handleStatusButtonClick);
cancelButton.addEventListener("click", () => todoModal.close());

//function to render the table
function renderTable() {
  const tableBody = document.querySelector("#todoTable tbody");
  tableBody.innerHTML = "";

  todos.forEach(todo => {
    const row = document.createElement("tr");
    row.setAttribute("data-todo-id", todo.id);
    row.addEventListener("click", handleTodoRowClick);

    const idCell = document.createElement("td");
    idCell.textContent = todo.id;
    row.appendChild(idCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = todo.description;
    row.appendChild(descriptionCell);

    const statusCell = document.createElement("td");
    statusCell.textContent = todo.isCompleted ? "completed" : "pending";
    if (todo.isCompleted) {
      statusCell.classList.add("completed");
      statusCell.classList.remove("pending");
    } else {
      statusCell.classList.add("pending");
      statusCell.classList.remove("completed");
    }

    row.appendChild(statusCell);
    tableBody.appendChild(row);
  });
}

//Function to handle todo row click
function handleTodoRowClick(e) {
  const todoId = e.currentTarget.getAttribute("data-todo-id");
  const todo = todos.find(todo => todo.id === Number(todoId));

  const todoIdInput = editTodoForm.querySelector("#todoId");
  const todoDescriptionInput = editTodoForm.querySelector(
    "#todoDescriptionModal"
  );
  const statusText = document.getElementById("statusText");

  if (todo.isCompleted) {
    statusText.textContent = "Completed";
    statusText.classList.add("completed");
    statusText.classList.remove("pending");
  } else {
    statusText.textContent = "Pending";
    statusText.classList.add("pending");
    statusText.classList.remove("completed");
  }
  todoIdInput.textContent = todo.id;
  todoDescriptionInput.value = todo.description;
  todoModal.showModal();
}

//métodos para actualizar los datos

function handleDeleteButtonClick() {
  const todoId = Number(editTodoForm.querySelector("#todoId").textContent);
  todos = todos.filter(todo => todo.id !== todoId);
  todoModal.close();
  renderTable();
}
function handleUpdateButtonClick(e) {
  e.preventDefault();
  const todoDescriptionInput = editTodoForm.querySelector(
    "#todoDescriptionModal"
  );
  const todoId = Number(editTodoForm.querySelector("#todoId").textContent);
  const todo = todos.find(todo => todo.id === todoId);
  todo.description = todoDescriptionInput.value;
  renderTable();
  todoModal.close();
}
function handleStatusButtonClick() {
  const todoId = Number(editTodoForm.querySelector("#todoId").textContent);
  const todo = todos.find(todo => todo.id === todoId);
  if (todo.isCompleted === true) {
    todo.isCompleted = false;
  } else {
    todo.isCompleted = true;
  }
  todoModal.close();
  renderTable();
}

//Function to handle add to-do form submission
function handleAddTodoFormSubmit(e) {
  e.preventDefault();

  const todoDescriptionInput = addTodoForm.querySelector("#todoDescription");
  const todoDescription = todoDescriptionInput.value.trim();
  if (todoDescription !== "") {
    const newTodo = {
      id: generateId(todos),
      description: todoDescription,
      isCompleted: false,
    };
    todos.push(newTodo);
    renderTable();
    addTodoForm.reset();
  }
}
