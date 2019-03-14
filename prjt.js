var arr_tasks = [];
var id_current = 0;

window.onload = Init;

function Init() {
    if (localStorage.getItem("id_current")) {
        id_current = localStorage.getItem("id_current");
    }
    if (JSON.parse(localStorage.getItem("tasks")) === null) { return }
    var strg_tasks = localStorage.getItem("tasks");
    arr_tasks = JSON.parse(strg_tasks); // tasks in localstorage in arr_tasks
    AddAllInit()
}

function AddAllInit() {
    var board = document.getElementById("board");
    for (var i = 0; i < arr_tasks.length; i++) {
        board.innerHTML += `<div class="paper">
       
            <a href="#">
            <div id = "xdelete"  class="glyphicon glyphicon-trash" onclick="Delete(${arr_tasks[i].id},event)"></div>
            </a>
            <div class='textePaper'>
            <p id="paper_task">${arr_tasks[i].task}</p>
            </div>
            <p id="paper_date">${arr_tasks[i].date}</p>
            <p id="paper_time">${arr_tasks[i].time}</p>
            
           
            
        </div>`;
    }
}

function Add() {
    if (!Verif()) { return }
    var task = document.getElementById("task").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var board = document.getElementById("board");
    board.innerHTML += `<div class="paper">
        <a href="#">
    
        <div id="xdelete" class="glyphicon glyphicon-trash" onclick="Delete(${id_current},event)"></div>
        </a> 
        <div class='textePaper'>
        <p id="paper_task">${task}</p>
       </div> 
        <p id="paper_date">${date}</p>
        <p id="paper_time">${time}</p>
        
    </div>`;

    var for_arr_task = `{"id":${id_current}, "task":"${task}", "date":"${date}", "time":"${time}"}`;
    arr_tasks.push(JSON.parse(for_arr_task));
    var arr_localstrg = JSON.stringify(arr_tasks);
    localStorage.setItem("tasks", arr_localstrg);

    id_current++;
    localStorage.setItem("id_current", id_current);
    Clear();

}

function Clear() {
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";


}

function Verif() {
    var buffer = "";
    if (document.getElementById("task").value === "") {
        buffer += "Task is empty, ";
    }
    if (document.getElementById("date").value === "") {
        buffer += "Date is empty";
    }
    if (buffer === "") { return true }
    alert(buffer);
    return false;
}

function Delete(id_delete, e) {
    e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
    for (var i = 0; i < arr_tasks.length; i++) {
        if (arr_tasks[i].id === id_delete) {
            arr_tasks.splice(i, 1);
            var arr_localstrg = JSON.stringify(arr_tasks);
            localStorage.setItem("tasks", arr_localstrg);
            return
        }
    }
    // document.getElementById('paper' + id).remove()
    // var divpaper = document.getElementById("paper" + id);
    // divpaper.style.WebkitAnimation = "fadeout 2s 1";
}