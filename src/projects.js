import {createTodo, changeNumber} from "./todo.js" 

let projects = [
    {
        serialNumber: 1,
        name: "Learning backend",
        deadline: "31/12/2024",
        todos: [],
    },
];

export function getProjects() {
    return projects;
}

function createProject(name, deadline) {
    let serialNumber = projects.length + 1;
    let todos = [];
    return {serialNumber, name, deadline, todos};
}

export function addProject(name, deadline) {
    const newProject = createProject(name, deadline);
    projects.push(newProject);
}

export function deleteProject(serialNumber) {
    let newProjects = [];
    for(let i = 0; i < projects.length; i++) {
        if(projects[i].serialNumber !== serialNumber) {
            newProjects.push(projects[i]);
        }
    }
    projects = newProjects;
    for(let i = 0; i < projects.length; i++) {
        projects[i].serialNumber = i + 1;
    }
}

export function addTodo(project, name, deadline, done) {
    const todo = createTodo(name, deadline, done);
    project.todos.push(todo);
}