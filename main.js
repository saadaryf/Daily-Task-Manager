const tasksTab = document.querySelector('.tasks-tab');
const addButton = document.getElementById('add-task-button');
const removeButton = document.getElementById('remove-task-button');
const editButton = document.getElementById('edit-tasks-button');
const saveButton = document.getElementById('save-tasks-button');

document.addEventListener('DOMContentLoaded', loadSavedTasks);
addButton.addEventListener('click', addAnotherTaskField);
removeButton.addEventListener('click', removeLastTaskField);
editButton.addEventListener('click', makeFieldsEditable);
saveButton.addEventListener('click', saveFields);

const initialFieldCount = localStorage.getItem('fieldCount') || 3;

for (let i = 0; i < initialFieldCount; i++) {
    addAnotherTaskField();
}

function addAnotherTaskField() {
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.placeholder = 'new task'; 
    tasksTab.appendChild(newField);

    updateFieldCount();
}
function removeLastTaskField() {
    const taskFields = tasksTab.querySelectorAll('input');
    const lastField = taskFields[taskFields.length - 1];
    if (lastField) {
        const lastIndex = taskFields.length - 1;
        localStorage.removeItem(`savedTasksData${lastIndex}`);

        tasksTab.removeChild(lastField);
    }

    updateFieldCount();
}
function makeFieldsEditable() {
    const taskFields = tasksTab.querySelectorAll('input');
    taskFields.forEach(input =>{
        input.readOnly = false;
    });
}
function saveFields() {
    const taskFields = tasksTab.querySelectorAll('input');
    taskFields.forEach((input, index) => {
        localStorage.setItem(`savedTasksData${index}`, input.value);
        input.readOnly = true; 
    });
}
function updateFieldCount() {
    const fieldCount = tasksTab.querySelectorAll('input').length;
    localStorage.setItem('fieldCount', fieldCount);
}
function loadSavedTasks() {
    const taskFields = tasksTab.querySelectorAll('input');
    taskFields.forEach((input, index) => {
        input.value = localStorage.getItem(`savedTasksData${index}`);
    });
}
