window.addEventListener("DOMContentLoaded", init);

function init() {
  getUserSignUpInfo();
}
/**
 * This function rertrieves the information the user inputs.
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

        //create the new user object and put it in database
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
        )

        // redirect to the new page
        location.replace("homePage.html");
      }
    }

    // check if credential exist in db. If match, get and save related taskDB
  });
}

/*
  we need a function to save user input to local storage
  function should ensure the password's match
  ensure that username does not already exist. If it works,
  then save to local storage
*/

function getDB() {
  const db = localStorage.getItem("todoListDB");
  if (db) {
    return JSON.parse(db);
  } else {
    console.log("NO Database Found");
    return {};
  }
}

/**
 *
 * @param {Object[]} db
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
