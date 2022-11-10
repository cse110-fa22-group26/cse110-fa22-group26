// implement collapsible components for example Monday List
var mondayList = document.getElementsByClassName("collapsible")[0];
mondayList.addEventListener("click", (event) => {
    var taskBoard = mondayList.nextElementSibling;
    if (taskBoard.style.display == "none"){
        taskBoard.style.display = "block";
    }
    else{
        taskBoard.style.display = "none";
    }
});


/*
1) add submit event listener for both the welcome and sign up page(on click takes back to sign in?)
2) on click we store information to local storage (?)
    - create array storing all user's information
        - object within an object ?
    - we would set item (username as key and password is value)
3) On login, user is matched to their home page

*/