// login.js

// Event listener runs the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

/**
 * This function is responsible for starting the program and all function
 * calls trace back here.
 * 
 */
function init() {
  // After user submits form, save added tasks to local storage if credentials
  // match existing account
  getUserDB();
}

/**
 * This function is responsible for retriveing a user's credential from
 * user input and saving the user's taks if account exists in database by
 * calling the findAndSetUsersDB function.
 * 
 */
function getUserDB() {
  // find form
  let loginForm = document.querySelector("form");
  // when user click submit btn, check for records in localstorage
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // get form data
    const formData = new FormData(loginForm);
    // save form data into userInput to find relevant credential
    let userInput = {};
    formData.forEach((value, key) => (userInput[key] = value));
    // get user's password and username
    let password = userInput.password;
    let username = userInput.username;

    // check if credential exist in db. If match, get and save related taskDB
    findAndSetUsersDB(username, password);
  });
}

/**
 * Given that a user's input credential matches a record in todolistDb, meaning 
 * the user has created an account, this function will save the user's tasks to
 * the database.
 * 
 * @param string username The user's username
 * @param string password The user's password
 */
function findAndSetUsersDB(username, password) {
  // get todoListDB from localstorage to check credentials
  let found = false;
  let usrname = "";
  let tasks = [];
  const todoListDB = localStorage.getItem("todoListDB");
  if (todoListDB) {
    const db = JSON.parse(todoListDB);
    for (let i = 0; i < db.length; i++) {
      if (db[i].username === username && db[i].password === password) {
        found = true;

        // set the username and tasks
        usrname = db[i].username;
        tasks = [...db[i].tasks];
        break;
      }
    }

    if (found) {
      console.log("user found");

      // on user found add user object with tasks array and username in local storage
      localStorage.setItem(
        "user",
        JSON.stringify({ username: usrname, tasks: tasks })
      );

      // redirect to the new page
      location.replace("homePage.html");
    } else {
      console.log("user not found");
    }
  } else {
    console.log("no db");
  }
}