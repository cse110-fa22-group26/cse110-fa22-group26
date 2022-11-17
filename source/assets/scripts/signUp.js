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
    // when user click submit btn, check for records in localstorage
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // get form data
      const formData = new FormData(loginForm);
      // save form data into userInput to find relevant credential
      let userInput = {};
      formData.forEach((value, key) => (userInput[key] = value));


      console.log(userInput);

      if(userInput){
        //object exists
        const username = userInput.username;
        const password = userInput.password;
        const confirmPassword = userInput.confirmPassword;
        if(password !== confirmPassword) {
          const checkPass = document.querySelector(".warningMessage");
          checkPass.textContent = "Passwords don't match!";
          loginForm.addEventListener("keypress", (event) => { //clears warning when user types
            checkPass.textContent = "";
          });
          
          }else {
          //handle using local storage and if passwords match, taken to list
          console.log("Passwords match!");
          const checkPass = document.querySelector(".warningMessage");
          checkPass.textContent = "";
        }
      }
      loginForm.reset();
      // check if credential exist in db. If match, get and save related taskDB
      
    });
  }

/*
  we need a function to save user input to local storage
  function should ensure the password's match
  ensure that username does not already exist. If it works,
  then save to local storage
*/



