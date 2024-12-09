export function createTodo(name, done) {
    return {name, done};
}

export function toggleTodo(todo) {
    todo.done = !todo.done;
}