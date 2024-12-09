import {createTodo, toggleTodo} from "./todo.js" 

let projects = [
];

export function getProjects() {
    return projects;
}

export function setProjects(localProjects) {
    projects = localProjects;
}

function createProject(name, deadline) {
    let serialNumber = projects.length + 1;
    let todos = [];
    return {serialNumber, name, deadline, todos};
}

export function addProject(name, deadline) {
    const newProject = createProject(name, deadline);
    const div = document.querySelector('#empty-list');
    if(div) {
        div.remove();
    }
    projects.push(newProject);
    const projString = JSON.stringify(projects);
    localStorage.setItem("projectSave", projString);
}

export function addTodo(project, name, done) {
    const todo = createTodo(name, done);
    project.todos.push(todo);
    const projString = JSON.stringify(projects);
    localStorage.setItem("projectSave", projString);
}

export function toggleTodoInProject(todo) {
    toggleTodo(todo);
    const projString = JSON.stringify(projects);
    localStorage.setItem("projectSave", projString);
}