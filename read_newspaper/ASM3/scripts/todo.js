"use strict";
//-------------------------DOM------------------------
const btn_add = document.getElementById("btn-add");
const input_task = document.getElementById("input-task");
const todo_list = document.getElementById("todo-list");

//----------------------Variable-----------------------
import { todoarr, currentuser, save_to_store } from "./storage.js";
//class
import { Task } from "../models/User.js";
let index = -1;
// tìm vị trí vùng chứa theo username trên todoarr (nếu có)
if (currentuser.length == 1) {
  todoarr.forEach((cur, i) => {
    if (cur[0] == currentuser[0].username) index = i;
  });
}

//---------------------function display tasks-----------------
function displaytask() {
  if (currentuser.length == 0) {
    todo_list.innerHTML = "<li>Please login to use Todolist</li>";
    return;
  }
  if (index < 0) return;
  todo_list.innerHTML = "";
  todoarr[index].forEach((cur, i) => {
    if (i > 0) {
      const x = document.createElement("li");
      x.setAttribute("nb", `${i}`);
      x.innerHTML = `${cur.task}<span class="close">×</span>`;
      if (cur.isdone) x.classList.add("checked");
      todo_list.append(x);
    }
  });
}
displaytask();

//-----------------------Event button Add-----------------
btn_add.addEventListener("click", () => {
  if (currentuser.length == 0) {
    alert("Please login to use Todolist");
    return;
  }
  if (!input_task.value) {
    alert("Please enter the task");
    return;
  }
  //tạo vùng chứa cho username (nếu chưa có)
  if (index < 0) {
    todoarr.push([currentuser[0].username]);
    index = todoarr.length - 1;
    save_to_store("todoarr", todoarr);
  }
  const newtask = new Task(input_task.value, currentuser[0].username);
  todoarr[index].push(newtask);
  input_task.value = "";
  save_to_store("todoarr", todoarr);
  displaytask();
});

//-------------------------Event---------------------------
todo_list.addEventListener("click", (e) => {
  const elm = e.target;
  let pst = elm.getAttribute("nb"); //trả về null nếu click ở <span>
  // console.log(pst);
  if (pst) {
    elm.classList.toggle("checked");
    todoarr[index][pst].isdone = !todoarr[index][pst].isdone;
    save_to_store("todoarr", todoarr);
  }
  //delete task
  else {
    pst = elm.parentElement.getAttribute("nb");
    todoarr[index].splice(pst, 1);
    save_to_store("todoarr", todoarr);
    displaytask();
  }
});
