"use strict";
//----------------- các biến DOM-----------------------
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const submitbtn = document.getElementById("submit-btn");
const table_body = document.getElementById("tbody");

//----------------khai báo các biến -------------------
let breed = [];
let type = [];

// cập nhật dữ liệu
breed = get_from_store("breed");
type = get_from_store("type");
renderBreedTable(breed, type);

//------------------hiển thị thông tin các breed-------------
function renderBreedTable(arr1, arr2) {
  table_body.innerHTML = "";
  for (let i = 0; i <= arr1.length - 1; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `    
    <td>${i + 1}</td>
    <td>${arr1[i]}</td>
    <td>${arr2[i]}</td>
    <td>
      <button type="button" class="btn btn-danger" 
      onclick="deleteBreed('${arr1[i]}')">Delete</button>
    </td>`;
    table_body.append(tr);
  }
}

//----------------function delete-----------------------
function deletearr(arr1, arr2, breed_name) {
  const x = arr1.indexOf(breed_name);
  if (x >= 0) {
    arr1.splice(x, 1);
    arr2.splice(x, 1);
  }
}
function deleteBreed(breed_name) {
  if (confirm("Are you sure?")) {
    deletearr(breed, type, breed_name);
    renderBreedTable(breed, type);
    save_to_store("breed", breed);
    save_to_store("type", type);
    dog_or_cat();
  }
}

//------------------clear input-----------------------
function clear_input() {
  inputBreed.value = "";
  document.getElementById("select_type").selected = "true";
}

//----------------nhấn submit---------------------------
submitbtn.addEventListener("click", function () {
  const data = {
    breed: inputBreed.value,
    type: inputType.value,
  };
  // console.log(Boolean(data.breed));
  // console.log(data.type);
  //validate dữ liệu hợp lệ
  if (!data.breed || data.type == "Select Type") {
    alert("Please fill out the information completely!");
    return;
  }
  // kiểm tra breed đã có hay chưa
  let check = false;
  if (breed.includes(data.breed)) {
    for (let i = 0; i <= breed.length - 1; i++) {
      if (breed[i] == data.breed && type[i] == data.type) {
        alert("Breed must be unique!");
        check = true;
        break;
      }
    }
  }
  if (check) return;

  breed.push(data.breed);
  type.push(data.type);
  // console.log(breed, type);
  renderBreedTable(breed, type);
  clear_input();
  save_to_store("breed", breed);
  save_to_store("type", type);
  dog_or_cat();
});

//--------tạo array breed theo type để phân loại---------------
function dog_or_cat() {
  let breed_dog = [];
  let breed_cat = [];
  for (let i = 0; i <= type.length - 1; i++) {
    if (type[i] == "Dog") breed_dog.push(breed[i]);
    else breed_cat.push(breed[i]);
    save_to_store("breed_dog", breed_dog);
    save_to_store("breed_cat", breed_cat);
  }
}
