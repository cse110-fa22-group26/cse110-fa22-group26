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