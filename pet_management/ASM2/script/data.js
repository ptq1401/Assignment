"use strict";

//--------------các biến sử dụng DOM-----------------
const export_btn = document.getElementById("export-btn");
const input_file = document.getElementById("input-file");
const import_btn = document.getElementById("import-btn");
// -------------các biến dùng -----------------------
let petarr = get_from_store("petarr");
let id_arr = get_from_store("id_arr");
let pet_import = [];

// console.log(petarr, id_arr);
//------------------lưu file text về máy------------------
function saveDataToFile() {
  const file_text = JSON.stringify(get_from_store("petarr"));
  const blob = new Blob([file_text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "pet-info.txt");
}
//tạo sự kiện nhấn nút export

export_btn.addEventListener("click", saveDataToFile);

//----------------import file-------------------
import_btn.addEventListener("click", function () {
  if (!input_file.files[0]) return;
  let reader = new FileReader();
  reader.readAsText(input_file.files[0], "UTF-8");
  reader.onload = function (e) {
    pet_import = JSON.parse(e.target.result);
    //cập nhật dữ liệu vào petarr
    pet_import.forEach((cur) => {
      // console.log(cur.id);
      const x = id_arr.indexOf(cur.id);
      if (x < 0) {
        petarr.push(cur);
        id_arr.push(cur.id);
      } else {
        petarr[x] = cur;
        id_arr[x] = cur.id;
      }
    });

    save_to_store("petarr", petarr);
    save_to_store("id_arr", id_arr);
  };
});
