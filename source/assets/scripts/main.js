// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
// Starts the program, all function calls trace back here
function init() {
    // add collapsible function to list titles
    addCollapsibleControls();
    // add event listener when user want to add task
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
 * Add event handler to all Add buttons of each day. When user click add btn,
 * a new task div will appear
 */
function addTasks(){
    let addBtns = document.getElementsByClassName("addBtn");
    Array.from(addBtns).forEach(addBtn => {
        addBtn.addEventListener("click", (event) => {
            // find corresponding sibling text element
            let taskBoard = addBtn.parentNode;
            let newTask = document.createElement("div");
            newTask.innerHTML = `<input type="checkbox">
            <input type="text" name="taskName" class="input">
            <i class="fa fa-trash icon deleteBtn"></i>
            <i class="fas fa-edit icon editBtn"></i>
            <button type="submit" class="confirmBtn">Confirm</button>`;
            taskBoard.insertBefore(newTask, addBtn);
            // add function to icons of new task
            addtaskFunction();
        });
    });
}
/**
 * add delete, edit, confirm functionality to newly added html elements
 */
function addtaskFunction(){
    deleteTasks();
    editTasks();
    confirmTasks();
}

/**
 * give newest delete btn functionality to remove relevant task
 */
function deleteTasks(){
    let deleteBtns = document.getElementsByClassName("deleteBtn");
    let deleteBtn = deleteBtns[deleteBtns.length-1];
    deleteBtn.addEventListener("click", (event) => {
        let currtask = deleteBtn.parentNode;
        currtask.remove();
    });
}

/**
 * give newest edit btn functionality to edit relevant task input
 */
function editTasks(){
    let editBtns = document.getElementsByClassName("editBtn");
    let editBtn = editBtns[editBtns.length-1];
    editBtn.addEventListener("click", (event) => {
        let currtask = editBtn.parentNode;
        // find input btn
        let input = currtask.querySelectorAll("input")[1];
        let confirmBtn = currtask.querySelector("button");
        input.disabled = false;
        confirmBtn.disabled = false;
    });
    
}

/**
 * give newest confirm btn functionality to confirm and block task input 
 */
function confirmTasks(){
    let confirmBtns = document.getElementsByClassName("confirmBtn");
    let confirmBtn = confirmBtns[confirmBtns.length-1];
    confirmBtn.addEventListener("click", (event) => {
        let currtask = confirmBtn.parentNode;
        let input = currtask.querySelectorAll("input")[1];
        input.disabled = true;
    });
    
}