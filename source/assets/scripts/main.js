// main.js

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
 * count number of tasks for each day
 * add task count to each day button.
 */
function taskCount() {
  let addBtns = document.getElementsByClassName("addBtn");
  const taskCount = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };
  const doneCount = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };
  Array.from(addBtns).forEach((btn) => {
    taskCount[btn.parentNode.id] = btn.parentNode.childElementCount - 1;
    let day = btn.parentNode;
    let taskCard = day.getElementsByTagName("task-card");
    Array.from(taskCard).forEach((ts) => {
      let shadowRoot = ts.shadowRoot;
      let checked = shadowRoot.childNodes[0].querySelectorAll(
        "input[type=checkbox]:checked"
      );
      if (checked[0]) doneCount[btn.parentNode.id]++;
    });
  });
  let lists = document.getElementsByClassName("collapsible");
  Array.from(lists).forEach((list) => {
    list.getElementsByTagName("span")[1].textContent = ` 
        (${taskCount[list.getElementsByTagName("span")[0].textContent]} Tasks,
        ${doneCount[list.getElementsByTagName("span")[0].textContent]} Done)
        `;

    list.getElementsByClassName("progress")[0].style.width =
      (doneCount[list.getElementsByTagName("span")[0].textContent] /
        taskCount[list.getElementsByTagName("span")[0].textContent]) *
        100 +
      "%";
  });
  let totalTasks = taskCount["Monday"] + taskCount["Tuesday"]+ taskCount["Wednesday"]+ taskCount["Thursday"]+ 
                    taskCount["Friday"]+ taskCount["Saturday"]+ taskCount["Sunday"];
  let totalDone = doneCount["Monday"] + doneCount["Tuesday"]+ doneCount["Wednesday"]+ doneCount["Thursday"]+ 
                  doneCount["Friday"]+ doneCount["Saturday"]+ doneCount["Sunday"];
  let progBar = document.getElementById("top-progress");
  let progress = totalDone / totalTasks * 100;

  progBar.style.width= progress + "%";
  let progressTxt = document.getElementById('progTxt');
  if(progress < 15) progressTxt.textContent = "A fresh new week! Start working!";
  else if(progress < 30) progressTxt.textContent = "Doing Smth";
  else if(progress < 50) progressTxt.textContent = "On Schedule!";
  else if(progress < 63) progressTxt.textContent = "More than half way through!";
  else if(progress < 100) progressTxt.textContent = "Almost there!";
  else progressTxt.textContent = "ALL DONE!";
}

/**
 * load db from local storage
 * 
 * @returns {Array<Object>} An array of users found in localStorage
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
 * Takes in an array of tasks and for each tasks creates a
 * new <task-card> element, adds the tasks data to that card
 * then appends that new task to it's coresponding days
 * 
 * @param {Array<Object>} savedTasks An array of tasks
 */
function addTasksToDocument(savedTasks) {
  // if no saved tasks return.
  if (savedTasks.length === 0) return;
  const dayIndex = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };
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
      }
      daysWithTasks.add(task["day"]);
      taskCount[task["day"]] += 1; // get task count for each day, need to divide by 7
    });
  });

  // initially uncollapse days with tasks
  let lists = document.getElementsByClassName("collapsible");
  for (const dayBtn of lists) {
    if (daysWithTasks.has(dayBtn.getElementsByTagName("span")[0].textContent)) {
      dayBtn.click();
    }
  }
  taskCount();
}

/**
 * Takes in an array of tasks, converts it to a string, and then
 * saves that string to 'tasks' in todoListDB and user database
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
 * a new task div will appear
 * 
 * @param {object}task a task object with its corresponding properties
 */
function addTasks(task) {
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
      if (task == null) {
        task = {
          day: taskBoard.parentNode.id,
          taskID: newTaskID,
          input: "",
          checkBox: false,
          confirmDisable: false,
          inputDisable: false,
        };
      }
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
  const dayIndex = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };
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
        localTasks[dayIndex[taskBlock.parentNode.id]].splice(i, 1);
      }
    }

    // saved modified tasks to localstorage
    saveTasksToStorage(localTasks);
    taskBlock.remove();
    taskCount();
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
 * check number of tasks marked done
 * update new count to display
 * update to localstorage
 * 
 * @param {string} taskID a string that represents a specific task
 */
function checkTask(taskID) {
  let taskBlock = document.getElementById(taskID);
  let shadowRoot = taskBlock.shadowRoot;
  let checkBox = shadowRoot.childNodes[0].getElementsByClassName("checkbox")[0];
  const dayIndex = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };
  checkBox.addEventListener("click", (event) => {
    // get tasks from localstorage
    let user = JSON.parse(localStorage.getItem("user"));
    let localTasks = user["tasks"];
    Array.from(localTasks[dayIndex[taskBlock.parentNode.id]]).forEach(
      (task) => {
        if (taskID === task["taskID"]) {
          task["checkBox"] =
            shadowRoot.childNodes[0].getElementsByTagName("input")[0].checked;
        }
      }
    );
    taskCount(); // update task count
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
  const dayIndex = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };
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
    }
    saveTasksToStorage(localTasks); // save to localstorage
    taskCount(); // update task count.
  });
}
