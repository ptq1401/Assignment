"use strict";
///----------Lưu dữ liệu LocalStorage--------------

// function lưu dữ liệu
function save_to_store(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// function lấy dữ liệu
function get_from_store(key) {
  return JSON.parse(localStorage.getItem(key));
}

//function tạo key/value cho các chuỗi trên localstorage nếu chưa có
// tránh hàm trả về null khi chưa có key/value trên localStorage
function create_key(key) {
  const arr = get_from_store(key);
  if (!arr) save_to_store(key, []);
}
create_key("userarr");
create_key("currentuser");
create_key("todoarr");

// variable và function dùng chung cho các file
//-----------------------variable--------------
let userarr = get_from_store("userarr");
let currentuser = get_from_store("currentuser");
let todoarr = get_from_store("todoarr");

//-------------------------function check data -------------------------
function check(str, value) {
  currentuser = userarr.filter((cur) => cur[str] == value);
  if (currentuser.length == 1) return true;
}

export { userarr, currentuser, todoarr, check, save_to_store };
