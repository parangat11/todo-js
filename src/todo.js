function createTodo(serialNumber, name, check) {
    return {serialNumber, name, check};
}

function changeNumber(newSerialNumber, todo) {
    todo.serialNumber = newSerialNumber;
}