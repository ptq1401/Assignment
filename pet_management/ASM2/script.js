"use strict";
// --------------------------khai báo các biến sử dụng DOM--------------
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
const healthy_btn = document.getElementById("healthy-btn");
const cal_BMI_btn = document.getElementById("cal-BMI-btn");

// các biến được dùng
let petarr = [];
let id_arr = [];
let healthy_pet_arr = [];
let healthyCheck = false;
// cập nhật dữ liệu
get_data();
table_data(petarr);

// console.log(id_input, name_input, age_input, type_input, weight_input,length_input, color_input,
// breed_input, vaccin_input, dewormed_input, sterilized_input, submit_btn, healthy_btn);

// --------------function clear input----------------------
function clear_input() {
  id_input.value = "";
  name_input.value = "";
  age_input.value = "";
  document.getElementById("select_type").selected = "true";
  weight_input.value = "";
  length_input.value = "";
  color_input.value = "#000000";
  document.getElementById("select_breed").selected = "true";
  vaccin_input.checked = false;
  dewormed_input.checked = false;
  sterilized_input.checked = false;
}
//-----------------Function cal BMI-------------------
function cal_BMI(arr) {
  if (arr.type == "Cat") {
    arr.BMI = ((arr.weight * 886) / arr.length ** 2).toFixed(2);
  } else {
    arr.BMI = ((arr.weight * 703) / arr.length ** 2).toFixed(2);
  }
}

//----------------function delete-----------------------
function deletearr(arr_1, arr_2, pet_id) {
  const x = arr_1.indexOf(pet_id);
  if (x >= 0) {
    arr_1.splice(x, 1);
    arr_2.splice(x, 1);
  }
}
function deletePet(pet_id) {
  if (confirm("Are you sure?")) {
    deletearr(id_arr, petarr, pet_id);
    if (healthyCheck) {
      table_data(healthy_pet_arr);
    } else {
      table_data(petarr);
    }
    save_data();
  }
}

// -------------function display table----------------------
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
//hiển thị table
function table_data(arr) {
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
    <td>${arr[i].BMI}</td>
    <td>${arr[i].date}</td>
    <td>
      <button type="button" class="btn btn-danger" onclick="deletePet('${arr[i].id}')">Delete</button>
    </td>
      `;
    document.getElementById("tbody").appendChild(x);
    //console.log(arr[i].vaccin);
    checkbox(arr[i].vaccin, "td_vaccin", i);
    checkbox(arr[i].dewormed, "td_dewormed", i);
    checkbox(arr[i].sterilized, "td_sterilized", i);
  }
}

// ----------------nhấn submit-----------------
submit_btn.addEventListener("click", function () {
  // lấy dữ liệu vào object
  let d = new Date();
  const data = {
    id: id_input.value,
    name: name_input.value,
    age: Number(age_input.value),
    type: type_input.value,
    weight: Number(weight_input.value),
    length: Number(length_input.value),
    color: color_input.value,
    breed: breed_input.value,
    vaccin: vaccin_input.checked,
    dewormed: dewormed_input.checked,
    sterilized: sterilized_input.checked,
    BMI: "?",
    date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
  };
  // validate dữ liệu hợp lệ
  if (!data.id || !data.name || !data.age || !data.weight || !data.length) {
    alert("Please fill out the information completely!");
    return;
  } else {
    if (data.age < 1 || data.age > 15) alert("Age must be between 1 and 15!");
    else if (data.weight < 1 || data.weight > 15)
      alert("Weight must be between 1 and 15!");
    else if (data.length < 1 || data.length > 100)
      alert("Length must be between 1 and 100!");
    else if (data.type == "Select Type") alert("Please select Type!");
    else if (data.breed == "Select Breed") alert("Please select Breed!");
    else if (id_arr.includes(data.id)) alert("ID must be unique!");
    //đưa dữ liệu vào array
    else {
      healthyCheck = false; //đảo bảo hiển thị All Pet khi thêm thú cưng
      healthy_btn.textContent = "Show Healthy Pet";
      id_arr.push(data.id);
      petarr.push(data);
      save_data();
      clear_input();
      table_data(petarr);
    }
  }
});

//-----------------Show Healthy Pet/ All Pet--------------

//cập nhật array healthy pet
function check_pet() {
  healthy_pet_arr = petarr.filter((cur) => {
    // console.log(cur.vaccin);
    return cur.vaccin && cur.dewormed && cur.sterilized;
  });
  save_to_store("healthy_pet_arr", healthy_pet_arr);
}
// event button
healthy_btn.addEventListener("click", function () {
  // console.log(healthyCheck);
  check_pet();
  healthyCheck = healthyCheck ? false : true;
  if (healthyCheck) {
    healthy_btn.textContent = "Show All Pet";
    table_data(healthy_pet_arr);
  } else {
    healthy_btn.textContent = "Show Healthy Pet";
    table_data(petarr);
  }
});

// ---------------------calculate BMI------------------------
cal_BMI_btn.addEventListener("click", function () {
  for (let i = 0; i <= petarr.length - 1; i++) {
    cal_BMI(petarr[i]);
  }
  for (let i = 0; i <= healthy_pet_arr.length - 1; i++) {
    cal_BMI(healthy_pet_arr[i]);
  }
  if (healthyCheck) {
    table_data(healthy_pet_arr);
  } else {
    table_data(petarr);
  }
  save_data();
});

//------------------------function lưu và lấy dữ liệu-----------------
// lấy dữ liệu
function get_data() {
  id_arr = get_from_store("id_arr");
  petarr = get_from_store("petarr");
  healthy_pet_arr = get_from_store("healthy_pet_arr");
}
// lưu dữ liệu
function save_data() {
  save_to_store("id_arr", id_arr);
  save_to_store("petarr", petarr);
  save_to_store("healthy_pet_arr", healthy_pet_arr);
}

//----------------hiện các option input breed-------------------
function renderBreed(arr) {
  breed_input.innerHTML = `<option id="select_breed">Select Breed</option>`;
  for (let i = 0; i <= arr.length - 1; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${arr[i]}</option>`;
    breed_input.appendChild(option);
  }
}
//thiết các option khi chọn type
type_input.addEventListener("click", function () {
  const breed_dog = get_from_store("breed_dog");
  const breed_cat = get_from_store("breed_cat");
  renderBreed(type_input.value == "Dog" ? breed_dog : breed_cat);
});
