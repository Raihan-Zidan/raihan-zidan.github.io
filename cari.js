var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var url = new URL(window.location.href);
var q = url.searchParams.get("q");
document.title = `${q} - Search`;
var startIndex = 1;
document.body.innerHTML += `<div class="header"><div class="search-box"><div class="search-field"><input class="search-input" value="${q}" autocorrect="off" autocomplete="off" autocapitalize="off" placeholder="Type to search..."><div role="button" class="cleartext"></div></div></div><div class="search-menu"><div class="search-item"><a href="" class="tab-wrapper" id="all"><img src="images/search.svg"><span>All</span></a></div><div class="search-item"><a href="" class="tab-wrapper" id="images"><img src="images/image.svg"><span>Images</span></a></div><div class="search-item"><a href="" class="tab-wrapper" id="videos"><img src="images/video.svg"><span>Videos</span></a></div><div class="search-item"><a href="" class="tab-wrapper" id="maps"><img src="images/maps.svg"><span>Maps</span></a></div></div></div><div id="hasil"></div>`;
searchInput = document.querySelector(".search-input");
searchItem = document.querySelectorAll(".tab-wrapper");
cleartext = document.querySelector(".cleartext");
var tbm = url.searchParams.get("tbm");
if (tbm === "vid") {
  document.querySelectorAll(".search-item")[2].classList.add("selected");
} else {
  document.querySelectorAll(".search-item")[0].classList.add("selected");
}
if (!q) {
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
    hasil = document.getElementById("hasil").innerHTML = "";
  } else {
    cleartext.style.display = "none";
  }
  searchItem.forEach(tab => {
    if (tab.id === "all") {
      tab.href = `/cari?q=${encodeURIComponent(q).replace(/\%20/g,'+')}`;
    } else if (tab.id === "images") {
      tab.href = `/images?q=${encodeURIComponent(q).replace(/\%20/g,'+')}`;
    } else if (tab.id === "videos") {
      tab.href = `/cari?q=${encodeURIComponent(q).replace(/\%20/g,'+')}&tbm=vid`;
    } else if (tab.id === "maps") {
      tab.href = `/maps`;
    }
  });
  document.querySelector(".selected").style.pointerEvents = "none";
});

cleartext.addEventListener('click', ()=> {
  searchInput.value = '';
  cleartext.style.display = "none";
  searchInput.focus();
});

searchInput.addEventListener('keyup', ()=> {
  var searchdata = "";
  if (tbm === "vid") {
    searchdata = "&tbm=vid";
  } else {
    searchdata = "";
  }
  if (event.keyCode === 13 && searchInput.value != '' && searchInput.value.trim()) {
    window.location.href = `/cari?q=${encodeURIComponent(searchInput.value).replace(/\%20/g,'+')}${searchdata}`;
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
  var val = searchInput.value;
  if (tbm === "vid") {
  vidstyle = document.createElement("link");
  vidstyle.rel = "stylesheet";
  vidstyle.href = "m2095.css";
  document.head.appendChild(vidstyle);
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${val}&type=video&key=AIzaSyAqc7T67GDJ208Y8CvR8YaPrNZlzKa2XbE`)
    .then(response => response.json()).then(response => {
      videoresult(response);
  })
  } else {
  fetch(`https://www.googleapis.com/customsearch/v1?key=${searchApi}&start=${startIndex}&cx=e5dbd697a8e464044&q=${val}`)
    .then(response => response.json()).then(response => {
      webresult(response);
  })
  }
}

function videoresult(res) {
  try {
    for (var i = 0; i < res.items.length; i++) {
      document.getElementById("hasil").innerHTML += `<div class="video-result"><a href="https://youtube.com/watch?v=${res.items[i].id.videoId}"><img src="${res.items[i].snippet.thumbnails.medium.url}" class="thumbnail"><div class="title">${res.items[i].snippet.title}</div><div class="source"><div class="info"><img src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.youtube.com&size=64" class="favicon"><div>www.youtube.com</div></div></div></a></div>`;
    }
  } catch(error) {
    document.getElementById("hasil").innerHTML += `<div class="tab-result"><div class="title black">No matching results</div><div class="snippet suggestion">Search suggestions:</div><div class="snippet"><li>Try different keywords.</li><li>Try more general keywords.</li><li>Try fewer keywords.</li></div></div>`;
  }
}

function webresult(res) {
  try {
    if (res.items && windowWidth > 700 && startIndex === 1) {
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
    if (res.items.length > 9) {
      moreresult()
    }
  } catch(error) {
    document.getElementById("hasil").innerHTML += `<div class="tab-result"><div class="title black">No matching results</div><div class="snippet suggestion">Search suggestions:</div><div class="snippet"><li>Try different keywords.</li><li>Try more general keywords.</li><li>Try fewer keywords.</li></div></div>`;
  }
}

function moreresult() {
  if (startIndex < 20) {
    startIndex += 10;
    submit();
  }
}
