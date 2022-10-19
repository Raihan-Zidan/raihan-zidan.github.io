searchInput = document.querySelector(".search-input");
searchItem = document.querySelectorAll(".tab-wrapper");
cleartext = document.querySelector(".cleartext");
var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var url = new URL(window.location.href);
var q = url.searchParams.get("q");
searchInput.value = q;
document.title = `${q} - Search`;

if (!q || q === null) {
  window.location.href = "/";
}

searchInput.addEventListener('keyup', ()=> {
  if (searchInput.value != '') {
    cleartext.style.display = "block";
  } else {
    cleartext.style.display = "none";
  }
});

window.addEventListener('load', ()=> {
  if (searchInput.value != '') {
    cleartext.style.display = "block";
    submit();
  } else {
    cleartext.style.display = "none";
  }
  searchItem.forEach(tab => {
    if (tab.id === "all") {
      tab.href = `/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}`;
    } else if (tab.id === "images") {
      tab.href = `/images?q=${encodeURIComponent(q).replace(/\%20/g,'+')}`;
    } else if (tab.id === "videos") {
      tab.href = `/videos?q=${encodeURIComponent(q).replace(/\%20/g,'+')}`;
    } else if (tab.id === "maps") {
      tab.href = `/maps`;
    }
  });
});

cleartext.addEventListener('click', ()=> {
  searchInput.value = '';
  cleartext.style.display = "none";
  searchInput.focus();
});

searchInput.addEventListener('keyup', ()=> {
  if (event.keyCode === 13 && searchInput.value != '' && searchInput.trim()) {
    window.location.href = `/search?q=${encodeURIComponent(searchInput.value).replace(/\%20/g,'+')}`;
  }
});

apikey = [
  "AIzaSyCJ3RgcZOxOm_V1hq-UXCJwPsWquHggQrg",
  "AIzaSyDuBTV5q0NAgfSY-2X9h5-ggbrX-a3EJBU",
  "AIzaSyB7eZUGjFCrSPEEI9OlDmtRW5fRTQIKIus",
  "AIzaSyC1etlk90G0YK1pNmblThRrIpYXWVCe8no",
  "AIzaSyAeibL6090vetveJ2IxkZ0h8JpmCUAEFAU",
  "AIzaSyBOETA8ym9-I5zMAq7IoEhQ1p4PajPvzHk",
  "AIzaSyBeCeoUn9efByemCErnTfNOW85H6WhUU8Q",
  "AIzaSyDJAlDofWRoODKtvr4gtDkHYNAHPZzSVX0",
  "AIzaSyDYZQDK3--oAlN9P80kFbr5Ae81Xv4r4Ew",
  "AIzaSyDBficXMaK97bS7ys4mAGvz5tLwwBSKbbg",
  "AIzaSyBK7tP0QHWR0x4YUd71sN298A4raMfLqKY",
  "AIzaSyD4KHQg1v9wFVlaKEVVVlZpiq8Y8L4UouI",
  "AIzaSyBj7aEZNIwRQG2cjuHZyPfW1UNywqsMcNo",
  "AIzaSyCmS3naxRClDgCH_ugTbn6dSqtArX0xj2o",
  "AIzaSyBtnDuoWCx30xG2gmUgRdB_pqGUzdr7s-A",
  "AIzaSyD69KZdQRASdg0QxpOA74adD4HeFRgHwx8",
  "AIzaSyDKPUq-VyTWsEA6PTozWnMEwNes3fu3CSY",
  "AIzaSyA-ZFRhlpU4PBS10Kp5Ipp6UD4xK--M-j8",
  "AIzaSyAB3o1QppoePI655jiTC3ArSBfQs_SuGyw",
  "AIzaSyAIyON_dQEybmn0HVilGHnPG2Hz0kheatk",
  "AIzaSyBIWWb7muhPm7yo4QPq1vcqi4XWaNtIJOY",
  "AIzaSyBm9AN4slsELMKW8fL401ZNC6ahIzWHjuc",
  "AIzaSyA8uJOYnA1ohf_7qIKJ15Evpyldq3CVl9M",
  "AIzaSyDgDhEyznphPnYHWQzIqiVJfkgwrxo2-2A"
];

searchApi = apikey[Math.floor(Math.random() * apikey.length)];

function submit() {
  hasil = document.getElementById("hasil").innerHTML = "";
  var val = searchInput.value;
  var newElement = document.createElement('script');
  newElement.src = `https://www.googleapis.com/customsearch/v1?key=${searchApi}&cx=e5dbd697a8e464044&q=${val}&callback=hndlr`;
  newElement.id = "mainscript";
  var relatedscript = document.createElement('script');
  relatedscript.src = `https://google.com/complete/search?output=json&client=chrome&q=${val}&callback=relatedsearch`;
  relatedscript.id = "relatedscript";
  document.head.appendChild(newElement);
  document.head.appendChild(relatedscript);
  document.getElementById("mainscript").remove();
  document.getElementById("relatedscript").remove();
}

function hndlr(res) {
  try {
    if (res.items && windowWidth > 700) {
      document.getElementById("hasil").innerHTML += `<div class="result-stats">Approximately ${res.searchInformation.formattedTotalResults} result (${res.searchInformation.formattedSearchTime} seconds)</div>`;
    }
    if (res.items && res.spelling) {
      document.getElementById("hasil").innerHTML += `<div class="tab-result"><div class="snippet">Did you mean: <a class="spelling" href="/search?q=${res.spelling.correctedQuery}">${res.spelling.correctedQuery}</a></div></div>`;
    }
    for (var i = 0; i < res.items.length; i++) {
      document.getElementById("hasil").innerHTML += `<div class="tab-result"><div class="tab-link"><a href="${res.items[i].link}"><div class="top"><img src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${res.items[i].link}&size=64" class="favicon"><div class="link">${res.items[i].displayLink}</div></div><div class="title">${res.items[i].htmlTitle.replace(/\u003ctextarea\u003e/gi, "")}</div></a></div><div class="snippet">${res.items[i].htmlSnippet}</div></div>`;
    }
    snippet = document.querySelectorAll(".snippet");
    snippet.forEach(description => {
      if (description.innerHTML === "undefined") {
        description.innerHTML = `There is no information on this page.`;
      }
    });
    document.getElementById("hasil").innerHTML = document.getElementById("hasil").innerHTML.replace(/\<\/?b.*?\/?\>/g, "");
  } catch(error) {
    document.getElementById("hasil").innerHTML += `<div class="tab-result"><div class="title black">No matching results</div><div class="snippet suggestion">Search suggestions:</div><div class="snippet"><li>Try different keywords.</li><li>Try more general keywords.</li><li>Try fewer keywords.</li></div></div>`;
  }
}


function relatedsearch(res) {
  if (res[1] && res[1].length > 4) {
    setTimeout(()=> {
    document.getElementById("hasil").innerHTML += `<div class="related-search"><div class="title">Related searches</div><div class="search-list"></div></div>`;
    for (var i = 0; i < res[1].length; i++) {
      document.querySelector(".search-list").innerHTML += `<a class="related" href="/search?q=${encodeURIComponent(res[1][i]).replace(/\%20/g,'+')}">${res[1][i]}</a>`;
      related = document.querySelectorAll(".related");
      related.forEach(option => {
        if (option.innerHTML.length > 40) {
          option.remove();
        }
      });
    }
    },1000);
  }
}
