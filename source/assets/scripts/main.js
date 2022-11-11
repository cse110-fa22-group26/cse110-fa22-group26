// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
var dayTaskCount = new Map([
    ["MondayId", 0],
    ["TuesdayId", 0],
    ["WednesdayId", 0],
    ["ThursdayId", 0],
    ["FridayId", 0],
    ["SaturdayId", 0],
    ["SundayId", 0]
]);

// Starts the program, all function calls trace back here
function init() {
    // add collapsible function to list titles
    addCollapsibleControls();
    addTasks();
    let mondayFunc = document.getElementById("mFunc");
    mondayFunc.innerHTML+=`
    function deleteTask(t){
        let id = t.id.substring(1,t.id.length);
        let day = t.parentNode;
        day.remove();
    }
    function editTask(t){
        let id = t.id.substring(1,t.id.length);
        let day = t.parentNode;
        // inputRef[0] is checkbox, inputRef[1] is input text box.
        let inputRef = day.getElementsByTagName('input')[1];
        inputRef.disabled = false;
        let confirmBut = day.getElementsByTagName('button')[0];
        confirmBut.disabled = false;
    }
    function confirmButton(t){
        let id = t.id.substring(1,t.id.length);
        let day =t.parentNode;
        // inputRef[0] is checkbox, inputRef[1] is input text box.
        let inputRef = day.getElementsByTagName("input")[1];
        // t.remove();
        t.disabled = true;
        inputRef.disabled = true;
    }
    `
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
    // let elementId = new Map();
    let daysDiv = document.getElementById("weekdays").getElementsByTagName("div");
    // add (plus button id, taskcount id) pair to dayToTask.
    let dayToTask = new Map();
    for(const day of daysDiv){
        dayToTask.set("addButton" + day.id, day.id+"Id")
    };
    // add event listener to all days
    for(const [key,value] of dayToTask){
        document.getElementById(key).addEventListener('click', function(){createNewTask(value,key.substring(9,key.length))}, false);
    }
    
    /**
     * EventListener function to add new task everytime click add button.
     * @param string taskCount and dayOfWeek
     * @return new task div block in week days.
     */
    function createNewTask(taskCount, dayOfWeek){
        let addButton = document.getElementById("addButton"+dayOfWeek);
        console.log(dayOfWeek);
        let newTask = document.createElement('div');
        newTask.id = dayOfWeek+dayTaskCount.get(taskCount);
        newTask.innerHTML += `
        <input type="checkbox">
        <input type="text" name="taskName" id="${dayOfWeek}Input${dayTaskCount.get(taskCount)}" class="input" >
        <i id="a${dayTaskCount.get(taskCount)}" onClick="deleteTask(this)" class="fa fa-trash icon"></i>
        <i id="b${dayTaskCount.get(taskCount)}" onClick="editTask(this)" class="fas fa-edit icon"></i>
        <button onClick="confirmButton(this)" id=c${dayTaskCount.get(taskCount)} type="submit">Confirm</button>
        `
        addButton.parentNode.insertBefore(newTask,addButton);
        dayTaskCount.set(taskCount, dayTaskCount.get(taskCount) + 1);
      }
}

/**
 * This is for your reference to write method header of functions
 * @param {Array<Object>} recipes An array of recipes
 * @return {Array<Object>}  An array of recipes found in localStorage
 */
