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
//---------------------thêm class active cho nav----------------------
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener(
  "click",
  (e) => {
    const x = e.target.parentElement.closest(".components");
    if (!x) {
      sidebar.classList.toggle("active");
      console.log(!x);
    }
  },
  true
);

//function tạo key/value cho các chuỗi trên localstorage nếu chưa có
// tránh hàm trả về null khi chưa có key/value trên localStorage
function create_key(key) {
  const arr = get_from_store(key);
  if (!arr) save_to_store(key, []);
}
create_key("petarr");
create_key("breed_cat");
create_key("id_arr");
create_key("healthy_pet_arr");
create_key("breed");
create_key("breed_dog");
create_key("type");
