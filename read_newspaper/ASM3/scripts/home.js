"use strict";
//--------------------------DOM-------------------------
const login_modal = document.getElementById("login-modal");
const main_content = document.getElementById("main-content");
const welcome_message = document.getElementById("welcome-message");
const btn_logout = document.getElementById("btn-logout");

//----------------------Variable-----------------------
import { currentuser, save_to_store } from "./storage.js";

//------------------check login------------------------
if (currentuser.length == 1) {
  //logged
  login_modal.style.display = "none";
  welcome_message.textContent = `Welcome ${currentuser[0].firstname}`;
} else main_content.style.display = "none"; //not logged in

//------------------Event logout button---------------------
btn_logout.addEventListener("click", () => {
  save_to_store("currentuser", []);
  window.location.href = "../pages/login.html";
});
