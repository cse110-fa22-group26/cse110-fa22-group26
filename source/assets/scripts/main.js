// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
var mondayTaskId = 0;
// Starts the program, all function calls trace back here
function init() {
    // add collapsible function to list titles
    addCollapsibleControls();
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
 * add new tasks
 * @param None
 * @return new div block in week days.
 */
function addTasks(){
    // add new task to each week days
    let addButton = document.getElementById("addButtonMonday");
    addButton.addEventListener('click', createNewTask);

    // function to create new task.
    function createNewTask(){
       let newTask = document.createElement('div');
       newTask.id = mondayTaskId;
       newTask.id = mondayTaskId;
       newTask.innerHTML += `
       <input type="checkbox">
       <input type="text" name="taskName" id="mondayInput${mondayTaskId}" class="input" >
       <i id="${mondayTaskId}" onClick="deleteTask(this)" class="fa fa-trash icon"></i>
       <i id="${mondayTaskId}" onClick="editTask(this)" class="fas fa-edit icon"></i>
       <button onClick="confirmButton(this)" id=${mondayTaskId} type="submit">Confirm</button>
       `
       addButton.parentNode.insertBefore(newTask,addButton);
       mondayTaskId += 1;
     }
}
/**
 * This is for your reference to write method header of functions
 * @param {Array<Object>} recipes An array of recipes
 * @return {Array<Object>}  An array of recipes found in localStorage
 */
