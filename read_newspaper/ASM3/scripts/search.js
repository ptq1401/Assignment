"use strict";
//----------------DOM-------------------------
const search = document.getElementById("btn-submit");
const input_query = document.getElementById("input-query");
const page_num = document.getElementById("page-num");
//---------------variable----------------------
import { displaynews, modify } from "./news.js";

//------------------------event----------------------

search.addEventListener("click", () => {
  if (!input_query.value) {
    alert("Please enter Keyword");
    return;
  }
  modify(input_query.value, "everything");
  page_num.textContent = "1";
  displaynews();
});
