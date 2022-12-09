// main.js

// global variables
// used to record total number of task in each weekday list

//taskcount
const taskCount = {
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Sunday: 0,
};
// used to record number of task done in each weekday list
const doneCount = {
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Sunday: 0,
};
// used to map each weekday list with index to its stoage place in 2D array db
const dayIndex = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
// Starts the program, all function calls trace back here
function init() {
  // add collapsible function to list titles
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  document.querySelector(
    ".greeting-message"
  ).innerText = `Hi ${user.username}!`;

  addCollapsibleControls();
  // add correspondinng event listener when user want to add task
  let userTasks = user["tasks"];
  // console.log(userTasks);
  addTasksToDocument(userTasks);
  addTasks();

  // handling logout after button is clicked
  const logoutBtn = document.querySelector(".logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    location.replace("welcomePage.html");
  });
}

/**
 * Present current number of tasks done and total task for each weekday list.
 * It works for both text and progress bar on the weekday list title,
 * and also display different message for different progress user have
 * on the entire progress bar.
 */
function countTasks() {
  // find all weekday list title bar
  let lists = document.getElementsByClassName("collapsible");
  Array.from(lists).forEach((list) => {
    // update weekday bar text with current number of task done & total task
    list.getElementsByTagName("span")[1].textContent = ` 
        (${taskCount[list.getElementsByTagName("span")[0].textContent]} Tasks,
        ${doneCount[list.getElementsByTagName("span")[0].textContent]} Done)
        `;
    // if task count / total task is 0/0
    if (
      taskCount[list.getElementsByTagName("span")[0].textContent] == 0 &&
      doneCount[list.getElementsByTagName("span")[0].textContent] == 0
    ) {
      list.getElementsByClassName("progress")[0].style.width = 0 + "%";
    } else {
      // update progress bar with percent of current number of task done / total task
      list.getElementsByClassName("progress")[0].style.width =
        (doneCount[list.getElementsByTagName("span")[0].textContent] /
          taskCount[list.getElementsByTagName("span")[0].textContent]) *
          100 +
        "%";
    }
  });
  // calculate total number of tasks
  let totalTasks =
    taskCount["Monday"] +
    taskCount["Tuesday"] +
    taskCount["Wednesday"] +
    taskCount["Thursday"] +
    taskCount["Friday"] +
    taskCount["Saturday"] +
    taskCount["Sunday"];
  // calculate total number of task done
  let totalDone =
    doneCount["Monday"] +
    doneCount["Tuesday"] +
    doneCount["Wednesday"] +
    doneCount["Thursday"] +
    doneCount["Friday"] +
    doneCount["Saturday"] +
    doneCount["Sunday"];
  // update entire progress bar with current percentage of done/total
  let progBar = document.getElementById("top-progress");
  let progress = (totalDone / totalTasks) * 100;
  // if total done and task 0, reset progress bar
  if (totalDone == 0 & totalTasks == 0){
    progBar.style.width = 0 + "%";
  }
  else{
    progBar.style.width = progress + "%";
  }
  
  // display different text messages for user based on their progress
  let progressTxt = document.getElementById("progTxt");
  if (progress < 15)
    progressTxt.textContent = "A fresh new week! Start working!";
  else if (progress < 30) progressTxt.textContent = "Doing Smth";
  else if (progress < 50) progressTxt.textContent = "On Schedule!";
  else if (progress < 63)
    progressTxt.textContent = "More than half way through!";
  else if (progress < 100) progressTxt.textContent = "Almost there!";
  else progressTxt.textContent = "ALL DONE!";
}

/**
 * load to do list DB (users & their tasks) from the local storage
 *
 * @returns {Array<Object>} An array of user object that contains
 * their username, password, and tasks inside
 */
function getTasksFromStorage() {
  //check if "todoListDB" exist
  if (localStorage.getItem("todoListDB")) {
    return JSON.parse(localStorage.getItem("todoListDB"));
  } else {
    return [];
  }
}

/**
 * Get array of tasks and add them to corresponding week day
 * list as <task-card> objects. Takes in an array of tasks and
 * for each tasks creates a new <task-card> element, adds the
 * tasks data to that card then appends that new task to it's
 * coresponding days
 *
 * @param {Array<Object>} savedTasks An array of tasks
 */
function addTasksToDocument(savedTasks) {
  // if no saved tasks return.
  if (savedTasks.length === 0) return;

  let addBtns = document.getElementsByClassName("addBtn");
  const daysWithTasks = new Set();
  Array.from(addBtns).forEach((addBtn) => {
    Array.from(savedTasks[dayIndex[addBtn.parentNode.id]]).forEach((task) => {
      let taskBoard = addBtn.parentNode;
      if (taskBoard.id == task["day"]) {
        let newTask = document.createElement("task-card");
        // get new task id, == Monday0,Tuesday0,......
        let newTaskID = task["taskID"];
        // add <task-card> id = Monday0, Monday1,......
        newTask.setAttribute("id", newTaskID);
        newTask.data = task;
        taskBoard.insertBefore(newTask, addBtn);
        // add function to icons of new task
        addtaskFunction(newTaskID);
        // add doneCount based on tasks' data
        if (task["checkBox"]) {
          doneCount[task["day"]]++;
        }
      }
      daysWithTasks.add(task["day"]);
      taskCount[task["day"]] += 1; // get task count for each day
    });
  });

  // initially uncollapse days with tasks
  let lists = document.getElementsByClassName("collapsible");
  for (const dayBtn of lists) {
    if (daysWithTasks.has(dayBtn.getElementsByTagName("span")[0].textContent)) {
      dayBtn.click();
    }
  }
  countTasks();
}

/**
 * This function saves the task to todoListDB in localStorage
 *
 * @param {Array<Object>} savedTasks An array of tasks
 */
function saveTasksToStorage(savedTasks) {
  let userDB = JSON.parse(localStorage.getItem("user"));
  let username = userDB.username;
  let todoListDB = getTasksFromStorage();
  for (let i = 0; i < todoListDB.length; i++) {
    if (todoListDB[i].username == username) {
      todoListDB[i]["tasks"] = savedTasks;
      userDB["tasks"] = savedTasks;
      localStorage.setItem("user", JSON.stringify(userDB));
    }
  }
  localStorage.setItem("todoListDB", JSON.stringify(todoListDB));
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
 * a new task-card object with full functionality will appear
 */
function addTasks() {
  let addBtns = document.getElementsByClassName("addBtn");
  Array.from(addBtns).forEach((addBtn) => {
    addBtn.addEventListener("click", (event) => {
      // find corresponding sibling text element
      let taskBoard = addBtn.parentNode;
      let newTask = document.createElement("task-card");
      // get new task id, == Monday0,Tuesday0,......
      let newTaskID =
        taskBoard.id +
        Math.floor(Math.random() * 99999) +
        (Math.random() + 1).toString(36).substring(7);
      // add <task-card> id = Monday0, Monday1,......
      newTask.setAttribute("id", newTaskID);
      let task = {
        day: taskBoard.parentNode.id,
        taskID: newTaskID,
        input: "",
        checkBox: false,
        confirmDisable: false,
        inputDisable: false,
      };
      newTask.data = task;
      taskBoard.insertBefore(newTask, addBtn);
      // add function to icons of new task
      addtaskFunction(newTaskID);
    });
  });
}

/**
 * add delete, edit, confirm functionality to newly added task
 *
 * @param {string} taskID a string that represents a specific task
 */
function addtaskFunction(taskID) {
  deleteTasks(taskID);
  editTasks(taskID);
  confirmTasks(taskID);
  checkTask(taskID);
}

/**
 * give newest delete btn functionality to remove relevant task
 * on click delete, will remove the task shadow dom and remove from
 * localstorage.
 *
 * @param {string} taskID a string that represents a specific task
 */
function deleteTasks(taskID) {
  let taskBlock = document.getElementById(taskID);
  let shadowRoot = taskBlock.shadowRoot;
  let deleteBtn =
    shadowRoot.childNodes[0].getElementsByClassName("deleteBtn")[0];
  deleteBtn.addEventListener("click", (event) => {
    // get current localStorage
    let user = JSON.parse(localStorage.getItem("user"));
    let localTasks = user["tasks"];
    // splice out the deleted task in localstorage
    for (
      let i = 0;
      i < localTasks[dayIndex[taskBlock.parentNode.id]].length;
      i++
    ) {
      if (
        taskID === localTasks[dayIndex[taskBlock.parentNode.id]][i]["taskID"]
      ) {
        // update done count if necessary
        if (localTasks[dayIndex[taskBlock.parentNode.id]][i]["checkBox"]) {
          doneCount[taskBlock.parentNode.id]--;
        }
        localTasks[dayIndex[taskBlock.parentNode.id]].splice(i, 1);
      }
    }

    // saved modified tasks to localstorage
    saveTasksToStorage(localTasks);
    // update task count by -1
    taskCount[taskBlock.parentNode.id]--;

    taskBlock.remove();
    countTasks();
  });
}

/**
 * give newest edit btn functionality to edit relevant task input
 * on click edit, will active input box and confirm button.
 *
 * @param {string} taskID a string that represents a specific task
 */
function editTasks(taskID) {
  let taskBlock = document.getElementById(taskID);
  let shadowRoot = taskBlock.shadowRoot;
  let editBtn = shadowRoot.childNodes[0].getElementsByClassName("editBtn")[0];
  let input = shadowRoot.childNodes[0].getElementsByTagName("input")[1];
  let confirmBtn =
    shadowRoot.childNodes[0].getElementsByClassName("confirmBtn")[0];
  editBtn.addEventListener("click", (event) => {
    input.disabled = false;
    confirmBtn.disabled = false;
  });
}

/**
 * The function updates checkbox status of task and task count of tasks
 * in this function whenever checkbox is clicked.
 *
 * @param {string} taskID a string that represents a specific task
 */
function checkTask(taskID) {
  let taskBlock = document.getElementById(taskID);
  let shadowRoot = taskBlock.shadowRoot;
  let checkBox = shadowRoot.childNodes[0].getElementsByClassName("checkbox")[0];
  checkBox.addEventListener("click", (event) => {
    // get tasks from localstorage
    let user = JSON.parse(localStorage.getItem("user"));
    let localTasks = user["tasks"];
    Array.from(localTasks[dayIndex[taskBlock.parentNode.id]]).forEach(
      (task) => {
        if (taskID === task["taskID"]) {
          task["checkBox"] =
            shadowRoot.childNodes[0].getElementsByTagName("input")[0].checked;
          // update done count based on checkbox status
          if (task["checkBox"]) {
            doneCount[taskBlock.parentNode.id]++;
          } else {
            doneCount[taskBlock.parentNode.id]--;
          }
        }
      }
    );
    countTasks(); // update task count
    saveTasksToStorage(localTasks); // save to localstorage
  });
}

/**
 * give newest confirm btn functionality to confirm and block user from change input
 * on click confirm, will either update the new input in localstorage
 * or create a new task if task does not already exist.
 *
 * @param {string} taskID a string that represents a specific task
 */
function confirmTasks(taskID) {
  let taskBlock = document.getElementById(taskID);
  let shadowRoot = taskBlock.shadowRoot;
  let confirmBtn =
    shadowRoot.childNodes[0].getElementsByClassName("confirmBtn")[0];
  let input = shadowRoot.childNodes[0].getElementsByTagName("input")[1];

  confirmBtn.addEventListener("click", (event) => {
    input.disabled = true;
    confirmBtn.disabled = true;
    let taskObject = {};
    taskObject = {
      day: taskBlock.parentNode.id,
      taskID: taskID,
      input: input.value,
      checkBox:
        shadowRoot.childNodes[0].getElementsByTagName("input")[0].checked,
      confirmDisable: true,
      inputDisable: true,
    };
    // get tasks from localstorage
    let user = JSON.parse(localStorage.getItem("user"));
    let localTasks = user["tasks"];

    let found = false;
    Array.from(localTasks[dayIndex[taskBlock.parentNode.id]]).forEach(
      (task) => {
        if (taskID === task["taskID"]) {
          task["input"] = input.value;
          task["checkBox"] =
            shadowRoot.childNodes[0].getElementsByTagName("input")[0].checked;
          found = true;
        }
      }
    );
    // add new task to localstorage if task does not exist.
    if (found === false) {
      localTasks[dayIndex[taskBlock.parentNode.id]].push(taskObject);
      taskCount[taskBlock.parentNode.id]++;
    }
    saveTasksToStorage(localTasks); // save to localstorage
    countTasks(); // update task count message
  });
}
