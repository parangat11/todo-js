/*
    1. Use index.js to render DOM elements.
    2. Make sure the logic is handled only by projects/todo and rendering is done
    only by index module.
*/


import "./styles.css"
import {addProject, addTodo, deleteProject, getProjects} from "./projects.js"

const addProjectButton = document.querySelector('#plus');
const projectDiv = document.querySelector('.projects');
const confirmButton = document.querySelector('#conf');
const confirmTodo = document.querySelector('#conf-todo');
const dialogBox = document.querySelector('.add-proj');
const todoDialog = document.querySelector('.add-todo');
const todoNameDiv = document.querySelector('#todo-name');
const todoDateDiv = document.querySelector('#todo-dl');
const todoCheck = document.querySelector('#todo-check');
const nameDiv = document.querySelector('#name');
const dateDiv = document.querySelector('#dl');
const showProject = document.querySelector('.show-project');

let currProject = null, currDiv = null; // current project & div in which todo task is to be added.

function clearProjectsInDOM() {
    projectDiv.innerHTML = "";
}

let correspondingName = {
    serialNumber: "Project: ",
    name: "Task: ",
    deadline: "Deadline: ",
}

function addProjectsToDiv(projects) {
    projects.forEach((project) => {
        const div = document.createElement('div');
        div.classList.add('project');
        for(const property in project) {
            if(property==="todos")
                continue;
            const childDiv = document.createElement('div');
            childDiv.textContent += correspondingName[property] + String(project[property]);
            div.appendChild(childDiv);
        }
        projectDiv.appendChild(div);
        
        // Add event listeners to the created div for each project
        div.addEventListener('click', (e) => clickHandlerProject(e, project, div));
    })
}

function renderProjectsInDOM() {
    clearProjectsInDOM();

    const projects = getProjects();
    addProjectsToDiv(projects);

    projectDiv.appendChild(addProjectButton);
}

renderProjectsInDOM();

addProjectButton.addEventListener('click', (e) => {
    // console.log(e);
    dialogBox.showModal();
})

confirmButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(nameDiv.value.length===0||dateDiv.value.length===0) {
        dialogBox.close();
        alert('Please enter valid project parameters');
        return ;
    }
    addProject(nameDiv.value, dateDiv.value);
    nameDiv.value = null;
    dateDiv.value = null;
    renderProjectsInDOM();
    dialogBox.close();
})

// Testing if local storage is available:
// function storageAvailable(type) {
//   let storage;
//   try {
//     storage = window[type];
//     const x = "__storage_test__";
//     storage.setItem(x, x);
//     storage.removeItem(x);
//     return true;
//   } catch (e) {
//     return (
//       e instanceof DOMException &&
//       e.name === "QuotaExceededError" &&
//       // acknowledge QuotaExceededError only if there's something already stored
//       storage &&
//       storage.length !== 0
//     );
//   }
// }

// if (storageAvailable("localStorage")) {
//   console.log("Yes");
// } else {
//     console.log("NO");
// } 
  

// Add event listeners to each project rendering each in dashboard
function clickHandlerProject(e, project, div) {
    if(currDiv) {
        currDiv.classList.remove('current-project');
    }
    currDiv = div;
    currDiv.classList.add('current-project');
    const card = document.createElement('div');
    card.classList.add('card');
    console.log(project)
    const cardHeader = prepareHeader(project);
    console.log(project)
    const cardBody = prepareBody(project);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    const addTodoButton = document.createElement('div');
    addTodoButton.textContent = "+";
    addTodoButton.addEventListener('click', (e) => clickHandlerAddTodo(e, project));
    card.appendChild(addTodoButton);
    showProject.innerHTML = "";
    showProject.appendChild(card);
}

function clickHandlerAddTodo(e, project) {
    currProject = project;
    todoDialog.showModal();
}

confirmTodo.addEventListener('click', (e) => {
    e.preventDefault();
    const nameOfTodo = todoNameDiv.value;
    const deadlineOfTodo = todoDateDiv.value;
    const doneTodo = todoCheck.checked ? true : false;
    addTodo(currProject, nameOfTodo, deadlineOfTodo, doneTodo);
    todoNameDiv.value = null;
    todoDateDiv.value = null;
    todoCheck.value = false;
    currDiv.click();
    todoDialog.close();
})

function prepareHeader(project) {
    const cardHeader = document.createElement('div');
    cardHeader.textContent += project.name;
    cardHeader.textContent += ' ';
    cardHeader.textContent += project.deadline;
    return cardHeader;
}

function prepareBody(project) {
    const cardBody = document.createElement('div');
    console.log(project.todos)
    for(let i = 0; i < project.todos.length; i++) {
        const todoTask = document.createElement('div');
        for(const prop in project.todos[i]) {
            const newDiv = document.createElement('div');
            newDiv.textContent += project.todos[i][prop];
            todoTask.appendChild(newDiv);
        }
        cardBody.appendChild(todoTask);
    }
    return cardBody;
}