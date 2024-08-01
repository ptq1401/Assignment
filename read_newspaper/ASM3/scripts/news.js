"use strict";
//API KEY = ca8784eb4e304f46a44b8c6b36b35997
//-----------------------DOM-------------------------
const container = document.getElementById("news-container");
const btn_prev = document.getElementById("btn-prev");
const btn_next = document.getElementById("btn-next");
const page_num = document.getElementById("page-num");

//----------------------Variable----------------------
//các đối số của function loadnews
let domain = "top-headlines"; //top-headlines(get news) or everything(search)
let country = "us";
let category = "";
let pagesize = 5;
let page = 1;
let q = "";
export { domain, q, country, displaynews, loadnews };
//cập nhật pagesize và category thep user
import { currentuser } from "./storage.js";
if (currentuser.length == 1) {
  pagesize = currentuser[0].pagesize;
  category = currentuser[0].category;
}

//----------------------function fecth API-----------------------
const loadnews = async function (
  namef,
  countryf,
  categoryf,
  pagesizef,
  pagef,
  qf
) {
  //create parameters in url
  const paramet1 = countryf == "" ? "" : "country=" + countryf + "&";
  const paramet2 = categoryf == "" ? "" : "category=" + categoryf + "&";
  const paramet3 = pagesizef == "" ? "" : "pageSize=" + pagesizef + "&";
  const paramet4 = pagef == "" ? "" : "page=" + pagef + "&";
  const paramet5 = qf == "" ? "" : "q=" + qf + "&";
  try {
    const news = await fetch(
      `https://newsapi.org/v2/${namef}?${paramet1}${paramet2}${paramet3}${paramet4}${paramet5}apiKey=ca8784eb4e304f46a44b8c6b36b35997`
    );
    const data = await news.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

//------------------------function display news-------------------------
function htmlcode(news) {
  const x = document.createElement("div");
  x.setAttribute("class", "card flex-row flex-wrap");
  //code HTML
  x.innerHTML = `
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${news.urlToImage}"
          class="card-img"
          alt="${news.title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.description}
          </p>
          <a href="${news.url}" target="blank"
            class="btn btn-primary">View</a>
        </div>
      </div>
    </div>
  </div>
      `;
  container.append(x);
}

function displaynews() {
  container.innerHTML = "";
  loadnews(domain, country, category, pagesize, page, q).then((data) => {
    data.articles.forEach((cur) => htmlcode(cur));
    //hide button next/ previous
    if (page * pagesize >= data.totalResults) btn_next.style.display = "none";
    else btn_next.style.display = "";
    if (page == 1) btn_prev.style.display = "none";
    else btn_prev.style.display = "";
    // console.log(data.articles);
  });
}

displaynews();

//-----------------------event button next/ previous--------------------
function fc() {
  container.innerHTML = "";
  page_num.textContent = page;
  displaynews();
}
btn_next.addEventListener("click", () => {
  page += 1;
  fc();
});

btn_prev.addEventListener("click", () => {
  page -= 1;
  fc();
});

//import make variable to constant variable
//==> function cập nhật giá trị
export function modify(value1, value2) {
  q = value1;
  domain = value2;
  country = "";
  page = 1;
  category = "";
}
