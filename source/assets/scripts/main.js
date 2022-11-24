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
 * count number of tasks for each day
 * add task count to each day button.
 */
function taskCount(){
    let addBtns = document.getElementsByClassName("addBtn");
    const taskCount = {
        "Monday": 0,
        "Tuesday": 0,
        "Wednesday": 0,
        "Thursday": 0,
        "Friday": 0,
        "Saturday": 0,
        "Sunday": 0
    };
    const doneCount = {
        "Monday": 0,
        "Tuesday": 0,
        "Wednesday": 0,
        "Thursday": 0,
        "Friday": 0,
        "Saturday": 0,
        "Sunday": 0
    };
    Array.from(addBtns).forEach(btn =>{
        taskCount[btn.parentNode.id] = btn.parentNode.childElementCount-1; 
        let day = btn.parentNode;
        let taskCard = day.getElementsByTagName('task-card');
        Array.from(taskCard).forEach(ts =>{
            let shadowRoot = ts.shadowRoot;
            let checked = shadowRoot.childNodes[0].querySelectorAll('input[type=checkbox]:checked');
            if(checked[0]) doneCount[btn.parentNode.id]++;
        })
    });
    let lists = document.getElementsByClassName("collapsible");
    Array.from(lists).forEach(list =>{
        list.getElementsByTagName('span')[1].textContent = ` 
        (${taskCount[list.getElementsByTagName('span')[0].textContent]} Tasks,
        ${doneCount[list.getElementsByTagName('span')[0].textContent]} Done)
        `;
    });
}


/**
 * load tasks from local storage
 * @returns {Array<Object>} An array of tasks found in localStorage
 */
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('savedTasks')) || [[],[],[],[],[],[],[]];
}

/**
 * Takes in an array of tasks and for each tasks creates a
 * new <task-card> element, adds the tasks data to that card
 * then appends that new task to it's coresponding days
 * @param {Array<Object>} savedTasks An array of tasks
 */
function addTasksToDocument(savedTasks) {
    // if no saved tasks return.
    if (savedTasks.length===0) return;    
    const dayIndex = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6
    };
    let addBtns = document.getElementsByClassName("addBtn");
    const daysWithTasks = new Set();
    Array.from(addBtns).forEach(addBtn => {
        Array.from(savedTasks[dayIndex[addBtn.parentNode.id]]).forEach(task =>{
            let taskBoard = addBtn.parentNode;
            if(taskBoard.id==task["day"]){
                let newTask = document.createElement("task-card");
                // get new task id, == Monday0,Tuesday0,......
                let newTaskID = task["taskID"];
                // add <task-card> id = Monday0, Monday1,......
                newTask.setAttribute("id", newTaskID);
                newTask.data = task;
                taskBoard.insertBefore(newTask, addBtn);
                // add function to icons of new task
                addtaskFunction(newTaskID);
            }
            daysWithTasks.add(task["day"]);
        });
    });

    // initially uncollapse days with tasks
    let lists = document.getElementsByClassName("collapsible");
    for(const dayBtn of lists){
        if(daysWithTasks.has(dayBtn.getElementsByTagName('span')[0].textContent)){
            dayBtn.click();
        }
    }
    taskCount();
  }


/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} savedTasks An array of recipes
 */
function saveTasksToStorage(savedTasks) {
    localStorage.setItem('savedTasks',JSON.stringify(savedTasks));
  }

/**
 * Add collapsible controls to the element with collapsible class.
 * When user click on element, hidden sibling text element will be shown,
 * or expanded text element will be hidden.
 */
function addCollapsibleControls() {
  // find all collapsible control element
  let lists = document.getElementsByClassName("collapsible");
  // when the control element is clicked
  Array.from(lists).forEach((dailyList) => {
    dailyList.addEventListener("click", (event) => {
      // find corresponding sibling text element
      let taskBoard = dailyList.nextElementSibling;
      // when task board is hidden, show the text board
      if (taskBoard.classList.contains("shrink")) {
        taskBoard.classList.remove("shrink");
        taskBoard.classList.add("expand");
      }
      // when text board is shown, shrink the text board
      else {
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
  });
}

/**
 * add delete, edit, confirm functionality to newly added task
 */
function addtaskFunction(){
    deleteTasks();
    editTasks();
    confirmTasks();
}

/**
 * give newest delete btn functionality to remove relevant task
 * on click delete, will remove the task shadow dom and remove from
 * localstorage.
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
 * on click edit, will active input box and confirm button.
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
 * give newest confirm btn functionality to confirm and block user from change input 
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

