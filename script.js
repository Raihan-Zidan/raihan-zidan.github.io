searchInput = document.querySelector(".search-input");
searchItem = document.querySelectorAll(".tab-wrapper");
cleartext = document.querySelector(".cleartext");

searchInput.addEventListener('keyup', ()=> {
  if (searchInput.value != '') {
    cleartext.style.display = "block";
  } else {
    cleartext.style.display = "none";
  }
});

window.addEventListener('load', ()=> {
  var url = new URL(window.location.href);
  var q = url.searchParams.get("q");
  searchInput.value = q;
  submit();
  if (searchInput.value != '') {
    cleartext.style.display = "block";
  } else {
    cleartext.style.display = "none";
  }
  searchItem.forEach(tab => {
    if (tab.id === "all") {
      tab.href = `/search?q=${q}`;
    } else if (tab.id === "images") {
      tab.href = `/images?q=${q}`;
    } else if (tab.id === "videos") {
      tab.href = `/videos?q=${q}`;
    } else if (tab.id === "maps") {
      tab.href = `https://google.com/maps/search/${q}`;
    }
  });
});

cleartext.addEventListener('click', ()=> {
  searchInput.value = '';
  cleartext.style.display = "none";
  searchInput.focus();
});

searchInput.addEventListener('keyup', ()=> {
  if (event.keyCode === 13) {
    window.location.href = `/search?q=${searchInput.value}`;
  }
});

function submit() {
  hasil = document.getElementById("hasil").innerHTML = "";
  var val = searchInput.value;
  var newElement = document.createElement('script');
  newElement.src = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDKPUq-VyTWsEA6PTozWnMEwNes3fu3CSY&cx=e5dbd697a8e464044&q=${val}&callback=hndlr`;
  newElement.id = "mainscript";
  document.head.appendChild(newElement);
}

function hndlr(res) {
  try {
    document.getElementById("hasil").innerHTML += `<div class="result-stats">Approximately ${res.searchInformation.formattedTotalResults} result (${res.searchInformation.formattedSearchTime} seconds)</div>`;
    if (res.spelling) {
      document.getElementById("hasil").innerHTML += `<div class="tab-result"><div class="snippet">Did you mean: <a class="spelling" href="/search?q=${res.spelling.correctedQuery}">${res.spelling.correctedQuery}</a></div></div>`;
    }
    for (var i = 0; i < res.items.length; i++) {
      document.getElementById("hasil").innerHTML += `<div class="tab-result"><div class="tab-link"><a href="${res.items[i].link}"><div class="top"><img src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${res.items[i].link}&size=64" class="favicon"><div class="link">${res.items[i].displayLink}</div></div><div class="title">${res.items[i].title}</div></a></div><div class="snippet">${res.items[i].htmlSnippet}</div></div>`;
    }
    snippet = document.querySelectorAll(".snippet");
    snippet.forEach(description => {
      if (description.innerHTML === "undefined") {
        description.innerHTML = `There is no information on this page.`;
      }
    });
  } catch(error) {
      
  }
}
