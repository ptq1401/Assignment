"use strict";
//-----------------------DOM--------------------
const input_firstname = document.getElementById("input-firstname");
const input_lastname = document.getElementById("input-lastname");
const input_username = document.getElementById("input-username");
const input_password = document.getElementById("input-password");
const pass_confirm = document.getElementById("input-password-confirm");
const btn = document.getElementById("btn-submit");

//-----------------------class--------------
import { userarr, check, save_to_store } from "./storage.js";
import { User } from "../models/User.js";

//-----------------------function create class instance---------------
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  return user;
}

//-----------------------Event register button----------------
btn.addEventListener("click", () => {
  //console.log(input_firstname.value);
  const userdata = {
    firstname: input_firstname.value,
    lastname: input_lastname.value,
    username: input_username.value,
    password: input_password.value,
    password_confirm: pass_confirm.value,
  };

  //validate data
  if (
    !userdata.firstname ||
    !userdata.lastname ||
    !userdata.username ||
    !userdata.password ||
    !userdata.password_confirm
  ) {
    alert("Please fill in all the information");
    return;
  }
  if (userdata.password.length < 9) {
    // console.log(userdata.password.length);
    alert("Password must be longer than 8 characters");
    return;
  }
  if (userdata.password !== userdata.password_confirm) {
    alert("Confirm password is wrong");
    return;
  }
  if (check("username", userdata.username)) {
    alert(`${userdata.username} already exists`);
    return;
  }
  userarr.push(parseUser(userdata));
  save_to_store("userarr", userarr);
  window.location.href = "../pages/login.html";
});
