"use strict";
// --------------------------khai báo các biến sử dụng DOM--------------
const container_form = document.getElementById("container-form");
const id_input = document.getElementById("input-id");
const name_input = document.getElementById("input-name");
const age_input = document.getElementById("input-age");
const type_input = document.getElementById("input-type");
const weight_input = document.getElementById("input-weight");
const length_input = document.getElementById("input-length");
const color_input = document.getElementById("input-color-1");
const breed_input = document.getElementById("input-breed");
const vaccin_input = document.getElementById("input-vaccinated");
const dewormed_input = document.getElementById("input-dewormed");
const sterilized_input = document.getElementById("input-sterilized");
const submit_btn = document.getElementById("submit-btn");
// các biến được dùng
let petarr = [];
let id_arr = [];
get_data();
//----------hàm hiển thị thông tin edit-----------
// chọn checkbox
function checkbox(value, name_check, i) {
  if (value)
    document
      .querySelector(`.${name_check}_${i}`)
      .classList.remove("bi-x-circle-fill");
  else
    document
      .querySelector(`.${name_check}_${i}`)
      .classList.remove("bi-check-circle-fill");
}
//hiển thị
function show_data(arr) {
  // xóa table củ
  document.getElementById("tbody").innerHTML = "";
  // tạo tr cho table
  for (let i = 0; i <= arr.length - 1; i++) {
    const x = document.createElement("tr");
    //x.setAttribute("id", `${id_arr[i]}`);
    //code HTML
    x.innerHTML = `
    <td>${arr[i].id}</td>
    <td>${arr[i].name}</td>
    <td>${arr[i].age}</td>
    <td>${arr[i].type}</td>
    <td>${arr[i].weight} kg</td>
    <td>${arr[i].length} cm</td>
    <td>${arr[i].breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${arr[i].color}"></i></td>
    <td><i class="bi bi-check-circle-fill bi-x-circle-fill td_vaccin_${i}"></i></td>
    <td><i class="bi bi-check-circle-fill bi-x-circle-fill td_dewormed_${i}"></i></td>
    <td><i class="bi bi-check-circle-fill bi-x-circle-fill td_sterilized_${i}"></i></td>
    <td>${arr[i].date}</td>
    <td>
      <button type="button" class="btn btn-warning" onclick="startEditPet('${arr[i].id}')">Edit</button>
    </td>
      `;
    document.getElementById("tbody").appendChild(x);
    checkbox(arr[i].vaccin, "td_vaccin", i);
    checkbox(arr[i].dewormed, "td_dewormed", i);
    checkbox(arr[i].sterilized, "td_sterilized", i);
  }
}
show_data(petarr);

//---------------------hàm edit pet ------------------------
function startEditPet(petid) {
  // lấy vị trí lưu trữ từ mảng
  const x = id_arr.indexOf(petid);
  // tạo form hiển thị
  container_form.classList.remove("hide");
  id_input.value = petarr[x].id; // không cho phép đổi id
  id_input.readOnly = true;
  name_input.value = petarr[x].name;
  age_input.value = petarr[x].age;
  type_input.value = petarr[x].type;
  renderBreed();
  weight_input.value = petarr[x].weight;
  length_input.value = petarr[x].length;
  color_input.value = petarr[x].color;
  breed_input.value = petarr[x].breed;
  vaccin_input.checked = petarr[x].vaccin;
  dewormed_input.checked = petarr[x].dewormed;
  sterilized_input.checked = petarr[x].sterilized;
}

//----------------hiển thị breed theo type-----------------
function renderBreed() {
  breed_input.innerHTML = "";
  const breed_dog = get_from_store("breed_dog");
  const breed_cat = get_from_store("breed_cat");
  const arr = type_input.value == "Dog" ? breed_dog : breed_cat;
  for (let i = 0; i <= arr.length - 1; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${arr[i]}</option>`;
    breed_input.appendChild(option);
  }
}
type_input.addEventListener("click", renderBreed);

//----------------------submit button-------------------
submit_btn.addEventListener("click", function () {
  const x = id_arr.indexOf(id_input.value);
  console.log(x);
  // validate dữ liệu hợp lệ
  if (
    !name_input.value ||
    !age_input.value ||
    !weight_input.value ||
    !length_input.value
  )
    alert("Please fill out the information completely!");
  else {
    if (age_input.value < 1 || age_input.value > 15)
      alert("Age must be between 1 and 15!");
    else if (weight_input.value < 1 || weight_input.value > 15)
      alert("Weight must be between 1 and 15!");
    else if (length_input.value < 1 || length_input.value > 100)
      alert("Length must be between 1 and 100!");
    else if (type_input.value == "Select Type") alert("Please select Type!");
    else {
      petarr[x].name = name_input.value;
      petarr[x].age = age_input.value;
      petarr[x].type = type_input.value;
      petarr[x].weight = weight_input.value;
      petarr[x].length = length_input.value;
      petarr[x].color = color_input.value;
      petarr[x].breed = breed_input.value;
      petarr[x].vaccin = vaccin_input.checked;
      petarr[x].dewormed = dewormed_input.checked;
      petarr[x].sterilized = sterilized_input.checked;
      container_form.classList.add("hide");
      show_data(petarr);
      save_data();
    }
  }
});

// lấy dữ liệu
function get_data() {
  id_arr = get_from_store("id_arr");
  petarr = get_from_store("petarr");
}
// lưu dữ liệu
function save_data() {
  save_to_store("id_arr", id_arr);
  save_to_store("petarr", petarr);
}
