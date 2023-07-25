const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const daylabel = document.querySelector(".url a");
var idlang = false;
var searchlang = (!idlang) ? "" : "&hl=id";
let linkTag = searchWrapper.querySelector("a");
let webLink;
var weburl = "https://raihan-zidan.github.io";

function getData() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const parts = cookie.split('=');
    if (parts[0] === 'settings') {
      return JSON.parse(parts[1]) || {};
    }
  }
  return {};
}


if (getData().lang == "Indonesia") {
  idlang = true;
  searchLang = "&hl=id";
}

if (getData().theme == "dark") {
  document.body.classList.add("dark");
}

inputBox.onkeyup = (e)=> {
  let userData = e.target.value;
  let emptyArray = [];
  if (userData.length > 1) {
    icon.onclick = ()=>{
      webLink = `${weburl}/search?q=${inputBox.value}${searchlang}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    }
    emptyArray = suggestions.filter((data)=>{
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.slice(0, 5).map((data)=>{
      return `<li>${data}</li>`;
    });
    searchWrapper.classList.add("active");
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active");
  }
  if (e.keyCode == 13) {
    let selectData = inputBox.value;
    webLink = `${weburl}/search?q=${selectData}${searchlang}`;
    linkTag.setAttribute("href", webLink);
    linkTag.click();
  }
}

inputBox.onfocus = (e)=> {
  userData = e.target.value;
  if (userData) {
    searchWrapper.classList.add("active");
  }
}

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  webLink = `${weburl}/search?q=${inputBox.value}${searchlang}`;
  linkTag.setAttribute("href", webLink);
  linkTag.click();
}

document.body.addEventListener('click', (e)=> {
    elm = e.target;
    if (!elm.classList.contains("autocom-box") && !elm.classList.contains("wrapper")) {
      searchWrapper.classList.remove("active");
    }
});

window.addEventListener('load', ()=> {
  var gelembungUrl = `
    <ul class="link">
      <li>
        <a href="translate">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m475-80 181-480h82L924-80h-87l-41-126H604L557-80h-82Zm151-196h142l-70-194h-2l-70 194Zm-466 76-55-55 204-204q-38-44-67.5-88.5T190-640h87q17 33 37.5 62.5T361-517q45-47 75-97.5T487-720H40v-80h280v-80h80v80h280v80H567q-22 69-58.5 135.5T419-458l98 99-30 81-127-122-200 200Z"/></svg>
          </div>
          <span>Terjemah</span>
        </a>
      </li>
      <li>
        <a href="">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/></svg>
          </div>
          <span>Cari</span>
        </a>
      </li>
      <li>
        <a href="https://www.bmkg.go.id/cuaca/prakiraan-cuaca-indonesia.bmkg">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M259.859-210Q243-210 231.5-221.641t-11.5-28.5Q220-267 231.641-278.5t28.5-11.5Q277-290 288.5-278.359t11.5 28.5Q300-233 288.359-221.5t-28.5 11.5Zm120 130Q363-80 351.5-91.64 340-103.283 340-120.142t11.641-28.359q11.641-11.5 28.5-11.5t28.359 11.641q11.5 11.641 11.5 28.5T408.359-91.5Q396.718-80 379.859-80Zm120-130Q483-210 471.5-221.641t-11.5-28.5Q460-267 471.641-278.5t28.5-11.5Q517-290 528.5-278.359t11.5 28.5Q540-233 528.359-221.5t-28.5 11.5Zm240 0Q723-210 711.5-221.641t-11.5-28.5Q700-267 711.641-278.5t28.5-11.5Q757-290 768.5-278.359t11.5 28.5Q780-233 768.359-221.5t-28.5 11.5Zm-120 130Q603-80 591.5-91.64 580-103.283 580-120.142t11.641-28.359q11.641-11.5 28.5-11.5t28.359 11.641q11.5 11.641 11.5 28.5T648.359-91.5Q636.718-80 619.859-80ZM290-380q-86.864 0-148.432-61.52Q80-503.04 80-589.835 80-669 136.5-731 193-793 277-799q32-56 84.5-88.5T480.423-920Q571-920 632.5-862.5T708-720q79 4 125.5 53.5T880-550.377Q880-480 830.417-430 780.833-380 710-380H290Zm0-60h420q46.2 0 78.1-32.5 31.9-32.5 31.9-78T788.1-628q-31.9-32-78.1-32h-60v-30q0-71-49.5-120.5T480.212-860q-51.481 0-93.847 27.5Q344-805 324-758l-8 18h-28q-62 2-105 45.393t-43 104.464Q140-528 183.929-484 227.857-440 290-440Zm190-110Z"/></svg>
          </div>
          <span>Cuaca</span>
        </a>
      </li>
      <li>
        <a href="calendar">
          <div class="icon">
             <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
           </div>
          <span>Kalender</span>
        </a>
      </li>
      <li>
        <a href="/search?q=waktu">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M592-302 450-444v-196h60v171l124 124-42 43ZM450-730v-90h60v90h-60Zm280 280v-60h90v60h-90ZM450-140v-90h60v90h-60ZM140-450v-60h90v60h-90ZM480.266-80q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
          </div>
          <span>Waktu</span>
        </a>
      </li>
      <li>
        <a href="https://mail.google.com">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z"/></svg>
          </div>
          <span>Gmail</span>
        </a>
      </li>
    </ul>`;
  var o = 1;
  if (o == 0) {
    document.querySelector(".wrapper").insertAdjacentHTML('beforeend', gelembungUrl);
  }
});

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
    searchWrapper.classList.remove("active");
  } else {
    listData = list.join('');
  }
  suggBox.innerHTML = listData;
}

if (idlang == true) {
  inputBox.placeholder = "Ketik untuk mencari...";
  document.title = "Mesin pencari";
}

var d = new Date();
var locallang = 'id-ID';
daylabel.innerHTML = d.toLocaleDateString(locallang, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'});
daylabel.href = `https://calendar.google.com/`;

var url = `/search?q=${daylabel.innerHTML}`;
