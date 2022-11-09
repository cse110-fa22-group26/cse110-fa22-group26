// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
    // add collapsible function to list titles
    addCollapsibleControls();
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

    // add new task to each week days
    let addButton = document.getElementById("addButtonMonday");
    addButton.addEventListener('click', createNewTask);
    // function to create new task.
    function createNewTask(){
       let newTask = document.createElement('div');
       newTask.innerHTML += `
       <input type="checkbox">
       <input type="text" name="taskName" id="" class="input">
       <button type="submit">Confirm</button>
       `
       document.getElementById("Monday").appendChild(newTask);
     }
}

/**
 * This is for your reference to write method header of functions
 * @param {Array<Object>} recipes An array of recipes
 * @return {Array<Object>}  An array of recipes found in localStorage
 */
