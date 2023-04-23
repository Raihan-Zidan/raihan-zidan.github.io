const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const daylabel = document.querySelector(".url a");
let linkTag = searchWrapper.querySelector("a");
let webLink;
var weburl = "https://raihan-zidan.github.io";

inputBox.onkeyup = (e)=> {
  let userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    icon.onclick = ()=>{
      webLink = `${weburl}/search?q=${inputBox.value}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    }
    emptyArray = suggestions.filter((data)=>{
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data)=>{
      return data = `<li>${data}</li>`;
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
    webLink = `${weburl}/search?q=${selectData}`;
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
  webLink = `${weburl}/search?q=${selectData}`;
  linkTag.setAttribute("href", webLink);
  linkTag.click();
}

document.body.addEventListener('click', (e)=> {
    elm = e.target;
    if (!elm.classList.contains("active") && !elm.classList.contains("autocom-box") && !elm.classList.contains("input")) {
      searchWrapper.classList.remove("active");
    }
});

inputBox.addEventListener('keyup', (e)=> {

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

daylabel.innerHTML = "World Book and Copyright Day";
daylabel.ahref = `/search?q=${daylabel.innerHTML}`;
