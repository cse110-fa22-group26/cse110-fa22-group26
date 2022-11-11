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
  let todoListDB = JSON.parse(localStorage.getItem("todoListDB"));
  // get warning message
  let warningTxt = document.getElementById("warningMessage");
  // check if it is password error 
  let pwErr = false;
  // go through each user data stored in DB
  todoListDB.forEach((userObj) => {
    // if input username is found
    if (userObj.username == username) {
      // and password match record in DB
      if (userObj.password == password) {
        // store user's task in taskDB
        console.log("data found");
        localStorage.setItem("taskDB", JSON.stringify(userObj.tasks));
      }
      // if username found but password incorrect
      else{
        // alert user for invalid password & set password error to true
        warningTxt.textContent = "Username and password does not match"
        pwErr = true;
      }
    }
  });
  // if credential does not match any record in DB, alert user.
  if (!localStorage.getItem("taskDB")) {
    // if not a password error
    if (!pwErr){
        // alert user for invalid username
        warningTxt.textContent = "Invalid Username";
    }
  }
  // if credential match and taskDB has saved
  // redirect user to homePage to view tasks
  else {
    location.replace("homePage.html");
  }
}
