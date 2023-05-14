const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
var url = new URL(window.location.href);
var hl = url.searchParams.get("hl");
var lang = (hl == "id") ? "&hl=id" : "&hl=en";

inputBox.addEventListener('keyup', ()=> {
  var query = inputBox.value;
  if (!inputBox.value) {
    suggBox.innerHTML = "";
  }
  searchWrapper.classList.remove("active")
  fetch(`https://api.swisscows.com/suggest?query=${inputBox.value}`)
    .then(response => response.json())
    .then(response => {
      for (var i = 1; i < response.length; i++) {
        suggBox.innerHTML = "";
        suggBox.innerHTML += `<li>${response[i]}</li>`;
        searchWrapper.classList.add("active")
      }
    });
});

if (hl == "id") {
  inputBox.placeholder = "Ketik untuk mencari...";
}
