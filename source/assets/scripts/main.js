// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
// Starts the program, all function calls trace back here
function init() {
    // add collapsible function to list titles
    addCollapsibleControls();
    addTasks();
}

// deleteBtn function call that remove the task
window.deleteTask = function(t){
    t.parentNode.remove();
}

// edit button functino call that edit input text
window.editTask = function(t){
    let day = t.parentNode;
    // inputRef[0] is checkbox, inputRef[1] is input text box.
    let inputRef = day.getElementsByTagName('input')[1];
    inputRef.disabled = false;
    let confirmBut = day.getElementsByTagName('button')[2];
    confirmBut.disabled = false;
}

// confirm button function call that lock input box
window.confirmFunc = function(t){
    let day =t.parentNode;
    // inputRef[0] is checkbox, inputRef[1] is input text box.
    let inputRef = day.getElementsByTagName("input")[1];
    // t.remove();
    t.disabled = true;
    inputRef.disabled = true;
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
 * Add event handler to all Add buttons of each day.
 */
function addTasks(){
    let addBtn = document.getElementsByClassName("addBtn");
    // when the control element is clicked 
    Array.from(addBtn).forEach(button => {
        button.addEventListener("click", function(){createNewTask(this)});
    });
}

/**
     * call back function of Add buttons, that 
     * create a new task div every click.
     * @return new task div block in week days.
     */
function createNewTask(t){
    let newTask = document.createElement('div');
    newTask.innerHTML += `
    <input type="checkbox">
    <input type="text" name="taskName" class="input" >
    <button type="button" onClick="deleteTask(this)" class="deleteBtn"><i class="fa fa-trash icon"></i> </button>
    <button type="button" onClick="editTask(this)" class="editBtn"><i class="fas fa-edit icon"></i> </button>
    <button type="button" onClick="confirmFunc(this)" class="confirmBtn" type="submit">Confirm</button>
    `
    t.parentNode.insertBefore(newTask,t);
}
/**
 * This is for your reference to write method header of functions
 * @param {Array<Object>} recipes An array of recipes
 * @return {Array<Object>}  An array of recipes found in localStorage
 */
