"use strict";
//-------------------DOM-----------------------------
const btn_submit = document.getElementById("btn-submit");
const input_category = document.getElementById("input-category");
const input_pagesize = document.getElementById("input-page-size");

//--------------variable/function----------------------
import { userarr, currentuser, save_to_store } from "./storage.js";
let index;

//-----------------hiện pagesize và category đã lưu---------------
if (currentuser.length == 1) {
  input_category.value = currentuser[0].category;
  input_pagesize.value = currentuser[0].pagesize;
}
//--------------------------Event-----------------------
btn_submit.addEventListener("click", () => {
  if (currentuser == 0) {
    alert("Please login to save setting");
    return;
  }
  userarr.forEach((cur, i) => {
    if (cur.username == currentuser[0].username) index = i;
  });
  // console.log(userarr[index]);
  userarr[index].category = input_category.value;
  currentuser[0].category = input_category.value;
  userarr[index].pagesize = input_pagesize.value ? input_pagesize.value : 5;
  currentuser[0].pagesize = userarr[index].pagesize;
  save_to_store("userarr", userarr);
  save_to_store("currentuser", currentuser);
  btn_submit.textContent = "Saved";
});
