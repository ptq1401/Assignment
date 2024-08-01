"use strict";
//-----------------------DOM--------------------
const input_username = document.getElementById("input-username");
const input_password = document.getElementById("input-password");
const btn = document.getElementById("btn-submit");

//-----------------------variable--------------
import { userarr, check, currentuser, save_to_store } from "./storage.js";
// console.log(userarr);

//--------------------Event Login Button---------------
btn.addEventListener("click", () => {
  if (!input_username.value || !input_password.value) {
    alert("Please fill in all the information");
    return;
  }
  if (check("username", input_username.value)) {
    if (currentuser[0].password === input_password.value) {
      save_to_store("currentuser", currentuser);
      window.location.href = "../index.html";
    } else alert("wrong password");
  } else alert("username does not exist");
});
