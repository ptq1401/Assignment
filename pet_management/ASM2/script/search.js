"use strict";
// ----------các biến sử dụng DOM------------
const find_btn = document.getElementById("find-btn");
const id_input = document.getElementById("input-id");
const name_input = document.getElementById("input-name");
const type_input = document.getElementById("input-type");
const breed_input = document.getElementById("input-breed");
const vaccin_input = document.getElementById("input-vaccinated");
const dewormed_input = document.getElementById("input-dewormed");
const sterilized_input = document.getElementById("input-sterilized");

//--------------các chuỗi sử dụng---------------
let petarr = [];
let breed = [];
petarr = get_from_store("petarr");
breed = get_from_store("breed");

//-------------tạo các option breed---------------------
breed_input.innerHTML = `<option>Select Breed</option>`;
for (let i = 0; i <= breed.length - 1; i++) {
  const option = document.createElement("option");
  option.innerHTML = `<option>${breed[i]}</option>`;
  breed_input.appendChild(option);
}

//------------hiển thị dữ liệu---------------
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

function show_data(arr) {
  // xóa table củ
  document.getElementById("tbody").innerHTML = "";
  // tạo tr cho table
  for (let i = 0; i <= arr.length - 1; i++) {
    const x = document.createElement("tr");
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
    <td>${arr[i].date}</td>`;

    document.getElementById("tbody").appendChild(x);
    //console.log(arr[i].vaccin);
    checkbox(arr[i].vaccin, "td_vaccin", i);
    checkbox(arr[i].dewormed, "td_dewormed", i);
    checkbox(arr[i].sterilized, "td_sterilized", i);
  }
}

//---------------nhấn nút find----------------
find_btn.addEventListener("click", function () {
  petarr = get_from_store("petarr");
  //lọc chuỗi với điều kiện ở id
  if (id_input.value) {
    petarr = petarr.filter(function (cur) {
      return cur.id.includes(id_input.value);
    });
  }
  //lọc chuỗi với điều kiện name
  if (name_input.value) {
    petarr = petarr.filter(function (cur) {
      return cur.name.includes(name_input.value);
    });
  }
  //lọc chuỗi với điều kiện type
  if (type_input.value !== "Select Type") {
    petarr = petarr.filter(function (cur) {
      return cur.type == type_input.value;
    });
  }
  //lọc chuỗi với điều kiện breed
  if (breed_input.value !== "Select Breed") {
    petarr = petarr.filter(function (cur) {
      return cur.breed == breed_input.value;
    });
  }
  //lọc chuỗi với các điều kiện khác
  if (vaccin_input.checked) {
    petarr = petarr.filter(function (cur) {
      return cur.vaccin;
    });
  }
  if (dewormed_input.checked) {
    petarr = petarr.filter(function (cur) {
      return cur.dewormed;
    });
  }
  if (sterilized_input.checked) {
    petarr = petarr.filter(function (cur) {
      return cur.sterilized;
    });
  }

  //hiển thị kết quả
  if (petarr.length == 0) {
    document.getElementById("tbody").innerHTML =
      " <tr>Không có kết quả tìm kiếm phù hợp</tr>";
  } else {
    show_data(petarr);
  }
});
