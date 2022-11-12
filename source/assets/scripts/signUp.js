window.addEventListener("DOMContentLoaded", init);

function init(){
    getUserSignUpInfo();
}
/**
 * This function rertrieves the information the user inputs.
 */
function getUserSignUpInfo() {
    // find form
    let loginForm = document.querySelector("form");
    console.log('yo');
    // when user click submit btn, check for records in localstorage
    loginForm.addEventListener("submit", (event) => {
      alert("test");
      event.preventDefault();
      // get form data
      
      const formData = new FormData(loginForm);
      // save form data into userInput to find relevant credential
      let userInput = {};
      formData.forEach((value, key) => (userInput[key] = value));
      console.log(userInput.password);
      // get user's password and username
      let password = userInput.password;
      let username = userInput.username;
      //console.log(username);
      //console.log(password);
      // check if credential exist in db. If match, get and save related taskDB
    });
  }

/*
  we need a function to save user input to local storage
  function should ensure the password's match
  ensure that username does not already exist. If it works,
  then save to local storage
*/



