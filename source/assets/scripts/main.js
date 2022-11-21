// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
// Starts the program, all function calls trace back here
function init() {
    // add collapsible function to list titles
    addCollapsibleControls();
    // add correspondinng event listener when user want to add task
    addTasks();
}

/**
 * Add collapsible controls to the element with collapsible class.
 * When user click on element, hidden sibling text element will be shown,
 * or expanded text element will be hidden. 
 */
function addCollapsibleControls(){
    // find all collapsible control element
    let lists = document.getElementsByClassName("collapsible");
    // when the control element is clicked 
    Array.from(lists).forEach(dailyList => {
        dailyList.addEventListener("click", (event) => {
            // find corresponding sibling text element
            let taskBoard = dailyList.nextElementSibling;
            // when task board is hidden, show the text board
            if (taskBoard.classList.contains("shrink")){
                taskBoard.classList.remove("shrink");
                taskBoard.classList.add("expand");
            }
            // when text board is shown, shrink the text board
            else{
                taskBoard.classList.add("shrink");
                taskBoard.classList.remove("expand");
            }
        });
    });

}

/**
 * Add event handler to all add buttons of each day's list. When user click add btn,
 * a new task div will appear
 */
function addTasks(){
    let addBtns = document.getElementsByClassName("addBtn");
    Array.from(addBtns).forEach(addBtn => {
        addBtn.addEventListener("click", (event) => {
            // find corresponding sibling text element
            let taskBoard = addBtn.parentNode;
            let newTask = document.createElement("task-card");
            // get new task id, == Monday0,Tuesday0,......
            let newTaskID = taskBoard.id+ (document.getElementById(taskBoard.id).getElementsByTagName("task-card").length);
            // add <task-card> id = Monday0, Monday1,......
            newTask.setAttribute("id", newTaskID);
            taskBoard.insertBefore(newTask, addBtn);
            // add function to icons of new task
            addtaskFunction(newTaskID);
        });
    });
}
/**
 * add delete, edit, confirm functionality to newly added task 
 */
function addtaskFunction(taskID){
    deleteTasks(taskID);
    editTasks(taskID);
    confirmTasks(taskID);
}

/**
 * give newest delete btn functionality to remove relevant task
 */
function deleteTasks(taskID){
    let taskBlock = document.getElementById(taskID);
    let shadowRoot = taskBlock.shadowRoot;
    let deleteBtn = shadowRoot.childNodes[0].getElementsByClassName('deleteBtn')[0];
    deleteBtn.addEventListener("click", (event) => {
        taskBlock.remove();
    });
    // update localStorage by remove taks with taskID

}

/**
 * give newest edit btn functionality to edit relevant task input
 */
function editTasks(taskID){
    let taskBlock = document.getElementById(taskID);
    let shadowRoot = taskBlock.shadowRoot;
    let editBtn = shadowRoot.childNodes[0].getElementsByClassName('editBtn')[0];
    editBtn.addEventListener("click", (event) => {
        let input = shadowRoot.childNodes[0].querySelectorAll("input")[1];
        let confirmBtn = shadowRoot.childNodes[0].querySelector("button");
        input.disabled = false;
        confirmBtn.disabled = false;
    });
}

/**
 * give newest confirm btn functionality to confirm and block user from change input 
 */
function confirmTasks(taskID){
    let taskBlock = document.getElementById(taskID);
    let shadowRoot = taskBlock.shadowRoot;
    let confirmBtn = shadowRoot.childNodes[0].getElementsByClassName('confirmBtn')[0];
    confirmBtn.addEventListener("click", (event) => {
        let input = shadowRoot.childNodes[0].querySelectorAll("input")[1];
        let confirmBtn = shadowRoot.childNodes[0].querySelector("button");
        input.disabled = true;
        confirmBtn.disabled = true;
    });
}

