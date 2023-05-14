const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const url = new URL(window.location.href);
const hl = url.searchParams.get("hl");
const lang = (hl == "id") ? "&hl=id" : "&hl=en";

inputBox.addEventListener('keyup', () => {
  const query = inputBox.value;
  if (!query) {
    searchWrapper.classList.remove("active");
    suggBox.innerHTML = "";
    return;
  }
  fetch(`https://api.swisscows.com/suggest?query=${query}`)
    .then(response => response.json())
    .then(response => {
      for (let i = 1; i < response.length; i++) {
        suggBox.innerHTML += `<li>${response[i]}</li>`;
      }
      searchWrapper.classList.add("active");
    });
});

if (hl == "id") {
  inputBox.placeholder = "Ketik untuk mencari...";
}

suggBox.style.pointerEvents = 'none';
