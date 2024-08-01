"use strict";

//--------------class User---------------------
export function User(firstname, lastname, username, password) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.username = username;
  this.password = password;
  this.pagesize = 5;
  this.category = "general";
}

//---------------------class Task-----------------
export function Task(task, owner) {
  this.task = task;
  this.owner = owner;
  this.isdone = false;
}
