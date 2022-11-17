// login.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
// Starts the program, all function calls trace back here
function init() {
  // when user enter their information and submit form
  // save their relavant taskDB into storage if credential match
  getUserDB();
}

/**
 * get credential from user input and save user's taskDB if relevant
 * record is found
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
 * Find and save user's task DB if user's input credential match a record in
 * todolistDB. If can't find a match in record, hint user possible cause of
 * error.
 * @param string username Input username
 * @param string password Input password
 */
function findAndSetUsersDB(username, password) {
  // get todoListDB from localstorage to check credentials
  let found = false;
  const todoListDB = localStorage.getItem("todoListDB");
  if (todoListDB) {
    const db = JSON.parse(todoListDB);
    for (let i = 0; i < db.length; i++) {
      if (db[i].username === username && db[i].password === password) {
        found = true;
        break;
      }
    }
    
    if (found) console.log("user found");
    else console.log("user not found");
  } else {
    console.log("no db");
  }

  // else {
  //   location.replace("homePage.html");
  // }
}
