// Runs init() when page loads
window.addEventListener("DOMContentLoaded", init);

/**
 * This function is responsible for the sign up functionality using
 * the getUserSignUpInfo function, which relies on the getDB
 * function and usernameExists function.
 */
function init() {
  getUserSignUpInfo();
}

/**
 * This function is responsible for storing the information of a user who
 * signed up, given that the user does not yet exist in the database. Specific
 * functionalities include notifying the user if their passwords do not match,
 * displaying that the user exists if they already signed up, and ultimately
 * redirecting the user to their specific to-do list.
 */
function getUserSignUpInfo() {
  // getting database
  const db = getDB();
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

    console.log(userInput);

    if (userInput) {
      //object exists
      const username = userInput.username;
      const password = userInput.password;
      const confirmPassword = userInput.confirmPassword;
      if (password !== confirmPassword) {
        const checkPass = document.querySelector(".warning-signup");
        checkPass.textContent = "Passwords don't match!";
        loginForm.addEventListener("keypress", (event) => {
          //clears warning when user types
          checkPass.textContent = "";
        });
      }
      // checking for uniquness of username
      else if (usernameExists(db, username)) {
        // show warning message handling
        const checkPass = document.querySelector(".duplicate-username");
        checkPass.textContent = "Username already exists!";
        loginForm.addEventListener("keypress", (event) => {
          //clears warning when user types
          checkPass.textContent = "";
        });
      } else {
        //handle using local storage and if passwords match, taken to list
        console.log("Passwords match!");

        const userObj = {
          username: username,
          password: password,
          tasks: [[], [], [], [], [], [], []],
        };

        db.push({
          username: userObj.username,
          password: userObj.password,
          tasks: [...userObj.tasks],
        });
     
        localStorage.setItem("todoListDB", JSON.stringify(db));

        // clear the form and errors
        const checkPass = document.querySelector(".warning-signup");
        checkPass.textContent = "";
        const userDup = document.querySelector(".duplicate-username");
        userDup.textContent = "";
        loginForm.reset();

        // setting the user as an logged in user in the system
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: userObj.username,
            tasks: [...userObj.tasks],
          })
        );

        // redirect to the new page
        location.replace("homePage.html");
      }
    }
  });
}


/**
 * This function is responsible for retrieving the information of all users who
 * have signed up and then parsing it if the database is populated; otherwise,
 * an empty array is returned.
 * 
 * @returns {object[]} - parsed array storing the information of all the users who 
 * have signed up, if any; otherwise, as noted, an empty array is returned.
 */
function getDB() {
  const db = localStorage.getItem("todoListDB");
  if (db) {
    return JSON.parse(db);
  } else {
    console.log("NO Database Found");
    return [];
  }
}


/**
 * This function is responsible for checking if a user exists in the existing
 * database.
 * 
 * @param {Object[]} db - all existing users who have created an account.
 * @param {string} username - the username we are looking up in the current 
 * database.
 * @returns {boolean} - whether the user exists in the current database or not.
 */
function usernameExists(db, username) {
  //populating username array
  let size = db.length;

  for (let i = 0; i < size; i++) {
    if (db[i].username === username) {
      return true;
    }
  }

  return false;
}