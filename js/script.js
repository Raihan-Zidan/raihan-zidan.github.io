const searchWrapper = document.querySelector(".search-input");

const inputBox = searchWrapper.querySelector("input");

const suggBox = searchWrapper.querySelector(".autocom-box");

inputBox.addEventListener('keyup', ()=> {

  var query = inputBox.value;

  suggBox.innerHTML = "";

  fetch(`https://api.swisscows.com/suggest?query=${inputBox.value}`)

    .then(response => response.json())

    .then(response => {

      for (var i = 1; i < response.length; i++) {

        suggBox.innerHTML += `<li>${response[i]}</li>`;

      }

    });

});
