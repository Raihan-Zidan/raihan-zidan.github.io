var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var url = new URL(window.location.href);
var q = url.searchParams.get("q");
var p = url.searchParams.get("p");
var hl = url.searchParams.get("hl");
var uf = url.searchParams.get("uf");
var fv = url.searchParams.get("fv");
var sf = url.searchParams.get("sf");
var th = url.searchParams.get("th");
var tbm = url.searchParams.get("tbm");
var idlang = (hl == "id") ? true : false;
var searchlang = (idlang) ? `&hl=${hl}` : "";
var rested = false;
var searchParam = ``;

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
}

if (uf == 1) {
  searchParam += "&uf=1";
}
if (fv == 0) {
  searchParam += "&fv=0";
}
if (sf == 1) {
  searchParam += "&sf=1";
}
if (th == 1) {
  searchParam += "&th=1";
}

document.title = (idlang) ? `${q} - Penelusuran` : `${q} - Search`;
var startIndex = (p > 1) ? p : 1;

String.prototype.ltrim = function() {
  if (!this) return this;
  return this.replace(/^\s+/g, '');
}

if (!q) {
  window.location.href = "/";
} else if (q.trim() && !url.pathname.match(".html") && !rested && navigator.onLine) {
  document.body.innerHTML = `<div class="root"><div class="cki-sv"><div class="mxUs8m"></div></div><div class="js-content"></div><div class="wbcnt-wrp"><div class="hdrwrp"><div class="header"><div class="search-box"><div class="search-field"><input type="search" class="search-input" autocorrect="off" autocomplete="off" autocapitalize="off" placeholder="Type to search..."><div role="button" class="search-toggle"></div><div role="button" class="cleartext"></div></div></div><div class="search-menu"><div class="search-item"><a href="/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}${searchlang}${searchParam}" class="tab-wrapper" tab-id="all"><div class="label"><svg width="16" height="16" viewBox="0 0 16 16" fill="#6e7780" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C2.68629 1 0 3.68629 0 7C0 10.3137 2.68629 13 6 13C7.64669 13 9.13845 12.3366 10.2226 11.2626L14.7873 14.8403C15.1133 15.0959 15.5848 15.0387 15.8403 14.7127C16.0958 14.3867 16.0387 13.9153 15.7126 13.6597L11.1487 10.0826C11.6892 9.18164 12 8.12711 12 7C12 3.68629 9.31371 1 6 1ZM1.5 7C1.5 4.51472 3.51472 2.5 6 2.5C8.48528 2.5 10.5 4.51472 10.5 7C10.5 9.48528 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48528 1.5 7Z"></path></svg><span>All</span></div></a></div><div class="search-item"><a href="/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}&tbm=isch${searchlang}${searchParam}" class="tab-wrapper" tab-id="images"><div class="label"><svg width="16" height="16" viewBox="0 0 16 16" fill="#6e7780" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 1C1.45507 1 0 2.45507 0 4.25V11.75C0 13.5449 1.45507 15 3.25 15H12.75C14.5449 15 16 13.5449 16 11.75V10.2593C16.0001 10.2531 16.0001 10.2469 16 10.2407V4.25C16 2.45507 14.5449 1 12.75 1H3.25ZM14.5 8.43928V4.25C14.5 3.2835 13.7165 2.5 12.75 2.5H3.25C2.2835 2.5 1.5 3.2835 1.5 4.25V11.75C1.5 11.9563 1.5357 12.1543 1.60126 12.3381L5.96967 7.96967C6.26256 7.67678 6.73744 7.67678 7.03033 7.96967L8.00003 8.93937L10.9697 5.96967C11.2626 5.67678 11.7375 5.67678 12.0304 5.96967L14.5 8.43928ZM9.06069 10L10.0303 10.9697C10.3232 11.2626 10.3232 11.7374 10.0303 12.0303C9.73744 12.3232 9.26256 12.3232 8.96967 12.0303L6.5 9.56066L2.66192 13.3987C2.84572 13.4643 3.04369 13.5 3.25 13.5H12.75C13.7165 13.5 14.5 12.7165 14.5 11.75V10.5606L11.5001 7.56066L9.06069 10Z"></path></svg><span>Images</span></div></a></div><div class="search-item"><a href="/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}&tbm=vid${searchlang}${searchParam}" class="tab-wrapper" tab-id="videos"><div class="label"><svg width="16" height="16" viewBox="0 0 16 16" fill="#6e7780" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4887 5.55027C15.3801 6.63605 15.3801 9.36446 13.4887 10.4502L6.23148 14.6164C4.34816 15.6976 2 14.338 2 12.1664L2 3.83407C2 1.66248 4.34816 0.302917 6.23148 1.38408L13.4887 5.55027ZM12.7419 9.14937C13.629 8.64011 13.629 7.36041 12.7419 6.85115L5.48468 2.68496C4.60135 2.17787 3.5 2.81554 3.5 3.83407L3.5 12.1664C3.5 13.185 4.60135 13.8226 5.48468 13.3156L12.7419 9.14937Z"></path></svg><span>Videos</span></div></a></div><div class="search-item"><a href="/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}&tbm=nws${searchlang}${searchParam}" class="tab-wrapper" tab-id="news"><div class="label"><svg width="16" height="16" viewBox="0 0 22 22" fill="#6e7780"><path d="M12 11h6v2h-6v-2zm-6 6h12v-2H6v2zm0-4h4V7H6v6zm16-7.22v12.44c0 1.54-1.34 2.78-3 2.78H5c-1.64 0-3-1.25-3-2.78V5.78C2 4.26 3.36 3 5 3h14c1.64 0 3 1.25 3 2.78zM19.99 12V5.78c0-.42-.46-.78-1-.78H5c-.54 0-1 .36-1 .78v12.44c0 .42.46.78 1 .78h14c.54 0 1-.36 1-.78V12zM12 9h6V7h-6v2"></path></svg><span>News</span></div></a></div><div class="search-item"><a href="/maps" class="tab-wrapper" tab-id="maps"><div class="label"><svg width="16" height="16" viewBox="0 0 16 16" fill="#6e7780" xmlns="http://www.w3.org/2000/svg"><path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C6.81332 0 5.65328 0.351894 4.66658 1.01118C3.67989 1.67047 2.91085 2.60754 2.45673 3.7039C2.0026 4.80026 1.88378 6.00666 2.11529 7.17054C2.35179 8.35952 2.99591 9.39906 3.73051 10.2144C5.0603 11.6902 5.95884 13.0319 6.52237 13.9981C6.80408 14.4812 7.00183 14.87 7.1277 15.1343C7.19062 15.2665 7.23554 15.3675 7.26398 15.4334C7.27819 15.4664 7.28829 15.4907 7.29444 15.5057L7.30075 15.5212L7.30129 15.5226L7.30168 15.5236C7.41829 15.8212 7.71074 16.0123 8.03018 15.9994C8.34937 15.9865 8.62531 15.7729 8.71783 15.4673L8.71818 15.4662L8.72264 15.4522C8.72711 15.4384 8.73473 15.4154 8.74578 15.3837C8.76791 15.3202 8.80379 15.2219 8.85585 15.0927C8.95997 14.8342 9.12867 14.452 9.38109 13.9769C9.88586 13.0267 10.7253 11.7051 12.0529 10.2568C12.7338 9.51391 13.6375 8.41354 13.8847 7.17054C14.1162 6.00666 13.9974 4.80026 13.5433 3.7039C13.0892 2.60754 12.3201 1.67047 11.3334 1.01118C10.3467 0.351894 9.18669 0 8 0ZM8.05642 13.2731C8.01989 13.3419 7.98488 13.409 7.95134 13.4745C7.90893 13.3994 7.86453 13.322 7.81811 13.2425C7.20975 12.1993 6.25213 10.7721 4.84488 9.21027C4.23085 8.5288 3.75511 7.72573 3.58647 6.87791C3.41284 6.00499 3.50195 5.10019 3.84254 4.27792C4.18314 3.45566 4.75992 2.75285 5.49994 2.25839C6.23996 1.76392 7.10999 1.5 8 1.5C8.89002 1.5 9.76005 1.76392 10.5001 2.25839C11.2401 2.75285 11.8169 3.45566 12.1575 4.27793C12.4981 5.10019 12.5872 6.00499 12.4135 6.87791C12.2556 7.67171 11.6276 8.50093 10.9471 9.24321C9.52471 10.7949 8.61414 12.2233 8.05642 13.2731Z"></path></svg><span>Maps</span></div></a></div></div></div></div><div class="rcthl-wrp"><div class="result-wrapper"><div class="main-result"></div></div></div></div></div><script type="text/javascript" src="/lib/lcl_lang.js"></script><script type="text/javascript" src="/lib/search.js"></script>`;
  document.querySelector(".search-input").setAttribute("value", q.ltrim());
} else if (rested) {
  document.querySelectorAll("link").forEach(elm => { elm.remove() });
  document.querySelectorAll("meta")[1].remove();
  document.querySelector("meta[name='description']").remove();
  document.querySelector("meta[name='referrer']").remove();
  document.querySelectorAll("script")[0].remove();
  document.title = "Error 503";
  document.head.innerHTML += `<style>*{margin:0;padding:0}html{font:15px/22px arial,sans-serif}html{background:#fff;color:#222;padding:15px}body{margin:7% auto 0;max-width:390px;min-height:180px;padding:30px 0 15px}* > body{padding-right:205px}p{margin:11px 0 22px;overflow:hidden}ins{color:#777;text-decoration:none}a img{border:0}@media screen and (max-width:772px){body{background:none;margin-top:0;max-width:none;padding-right:0}}#error{display:inline-block;color:black;user-select:none;font-size:40px;font-weight:bold;text-decoration:none;}</style>`;
  document.body.innerHTML += `<span id="error" aria-label="error" class="notranslate">ERROR</span><p><b>503.</b> <ins>That’s an error.</ins><p>This site is currently under maintenance, please visit later.  <ins>Sorry about that.</ins></p>`
}

if (getData().theme == "dark" || th == 1) {
  document.body.classList.add("dark");
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

searchInput = document.querySelector(".search-input");
searchItem = document.querySelectorAll(".tab-wrapper");
cleartext = document.querySelector(".cleartext");
searchToggle = document.querySelector(".search-toggle");

if (tbm === "vid") {
  defstyle = document.querySelectorAll("link[rel='stylesheet']")[0];
  vidstyle = document.createElement("link");
  vidstyle.rel = "stylesheet";
  vidstyle.href = "/m2095.css";
  insertAfter(defstyle, vidstyle);
  document.querySelectorAll(".search-item")[2].classList.add("selected");
} else if (tbm === "isch") {
  document.querySelectorAll(".search-item")[1].classList.add("selected");
  window.location.href = `https://google.com/search?q=${q}&tbm=isch`;
} else if (tbm === "nws") {
  document.querySelectorAll(".search-item")[3].classList.add("selected");
} else {
  document.querySelectorAll(".search-item")[0].classList.add("selected");
  document.querySelector(".main-result").innerHTML += `<div class="result"></div>`;
}

var language = {
  en: {
    news: "News result",
    more: "Show more",
    placeholder: "Type to search...",
    correct: "Did you mean:",
    noresult: "No matching results",
    suggtext: "Search suggestion:",
    noresultsug: "<li>Try different keywords.</li><li>Try more general keywords.</li><li>Try fewer keywords.</li>",
    tab: ["All","Images","Videos","News","Maps"],
  },
  id: {
    news: "Hasil berita",
    more: "Lihat lainnya",
    placeholder: "Ketik untuk  mencari...",
    correct: "Apakah yang kamu maksud:",
    noresult: "Tidak ditemukan hasil",
    suggtext: "Saran pencarian:",
    noresultsug: "<li>Coba kata kunci yang berbeda.</li><li>Coba kata kunci yang lebih umum.</li><li>Coba lebih sedikit kata kunci.</li>",
    tab: ["Semua","Gambar","Video","Berita","Peta"],
  },
};

function langtext(string) {
  if (idlang) {
    return language["id"][`${string}`];
  } else {
    return language["en"][`${string}`];
  }
}

if (idlang) {
  searchInput.placeholder = langtext("placeholder");
  searchItem = document.querySelectorAll(".search-item");
  searchItem[0].querySelector(".label span").innerHTML = language["id"]["tab"][0];
  searchItem[1].querySelector(".label span").innerHTML = language["id"]["tab"][1];
  searchItem[2].querySelector(".label span").innerHTML = language["id"]["tab"][2];
  searchItem[3].querySelector(".label span").innerHTML = language["id"]["tab"][3];
  searchItem[4].querySelector(".label span").innerHTML = language["id"]["tab"][4];
}

HTMLInputElement.prototype.reset = function() {
  this.value = "";
}

HTMLElement.prototype.hide = function() {
  this.style.display = "none";
}

HTMLElement.prototype.show = function() {
  this.style.display = "block";
}

searchInput.addEventListener('input', ()=> {
  if (searchInput.value != '') {
    cleartext.show();
  } else {
    cleartext.hide();
  }
});

if (windowWidth < 780) {
  document.querySelectorAll(".label svg").forEach(elm => {
    elm.remove();
  });
}

window.addEventListener('load', ()=> {
  if (searchInput.value != '' && !rested) submit();
});

cleartext.addEventListener('click', ()=> {
  searchInput.reset();
  searchInput.focus();
  cleartext.hide();
});

searchInput.addEventListener('keyup', ()=> {
  if (event.keyCode === 13) {
    searchToggle.click();
  }
});

searchToggle.addEventListener('click', ()=> {
  var searchdata = (tbm) ? `&tbm=${tbm}` : "";
  if (searchInput.value.trim()) {
    post_data(`/search?q=${encodeURIComponent(searchInput.value).replace(/\%20/g,'+')}${searchdata}${searchlang}${searchParam}`);
  }
});

function post_data(url) {
  var a = document.createElement("a");
  a.href = url;
  a.click();
}

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
  "AIzaSyBni04n3gqNYKqAvtzNSWhau9LOoNzRFj4",
  "AIzaSyAB3o1QppoePI655jiTC3ArSBfQs_SuGyw",
  "AIzaSyAIyON_dQEybmn0HVilGHnPG2Hz0kheatk",
  "AIzaSyBIWWb7muhPm7yo4QPq1vcqi4XWaNtIJOY",
  "AIzaSyBm9AN4slsELMKW8fL401ZNC6ahIzWHjuc",
  "AIzaSyA8uJOYnA1ohf_7qIKJ15Evpyldq3CVl9M",
  "AIzaSyDgDhEyznphPnYHWQzIqiVJfkgwrxo2-2A"
];

quotes = [
  "Genius is one percent inspiration and ninety-nine percent perspiration. <em>-Thomas Edison</em>",
  "You can observe a lot just by watching. <em>-Yogi Berra</em>",
  "A house divided against itself cannot stand. <em>-Abraham Lincoln</em>",
  "Difficulties increase the nearer we get to the goal. <em>-Johann Wolfgang von Goethe</em>",
  "Be the chief but never the lord. <em>-Lao Tzu</em>",
  "Nothing happens unless first we dream. <em>-Carl Sandburg</em>",
  "Well begun is half done. <em>-Aristotle</em>",
  "Life is a learning experience, only if you learn. <em>-Yogi Berra</em>",
  "Self-complacency is fatal to progress. <em>-Margaret Sangster</em>",
  "Peace comes from within. Do not seek it without. <em>-Buddha</em>",
  "What you give is what you get. <em>-Byron Pulsifer</em>",
  "We can only learn to love by loving. <em>-Iris Murdoch</em>",
  "Life is change. Growth is optional. Choose wisely. <em>-Karen Clark</em>",
  "You'll see it when you believe it. <em>-Wayne Dyer</em>",
  "To lead people walk behind them. <em>-Lao Tzu</em>",
  "Having nothing, nothing can he lose. <em>-William Shakespeare</em>",
  "Trouble is only opportunity in work clothes. <em>-Henry J. Kaiser</em>",
  "A rolling stone gathers no moss. <em>-Publilius Syrus</em>",
  "Ideas are the beginning points of all fortunes. <em>-Napoleon Hill</em>",
  "Everything in life is luck. <em>-Donald Trump</em>",
  "Doing nothing is better than being busy doing nothing. <em>-Lao Tzu</em>",
  "Trust yourself. You know more than you think you do. <em>-Benjamin Spock</em>",
  "Study the past, if you would divine the future. <em>-Confucius</em>",
  "From error to error one discovers the entire truth. <em>-Sigmund Freud</em>",
  "Well done is better than well said. <em>-Benjamin Franklin</em>",
];

searchApi = apikey[Math.floor(Math.random() * apikey.length)];

function submit() {
  var val = searchInput.value;
  var geo = (idlang) ? `&gl=${hl}` : "";
  var spr = (sf == 1) ? "&safe=active" : "";
  if (tbm === "vid") {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${val}&type=video&key=AIzaSyAqc7T67GDJ208Y8CvR8YaPrNZlzKa2XbE`)
      .then(response => response.json()).then(response => {
        videoresult(response);
    })
  } else if (tbm == "nws") {
    fetch(`https://www.googleapis.com/customsearch/v1?key=${searchApi}&cx=1428d6f56512346f2&sort=date&sort=date&q=${val}`)
      .then(response => response.json()).then(response => {
        nwsr(response);
    })
  } else if (tbm != "vid" && tbm != "isch" && tbm != "nws") {
    fetch(`https://www.googleapis.com/customsearch/v1?key=${searchApi}${geo}${spr}&start=${startIndex}&cx=435bdb05f0b5e47bb&q=${val}`)
      .then(response => response.json()).then(response => {
        webresult(response);
    })
    if (Math.floor(Math.random() * 3) == 1 && startIndex == 1) {
      fetch(`https://www.googleapis.com/customsearch/v1?key=${searchApi}&sort=date&cx=1428d6f56512346f2&q=${val}`)
        .then(response => response.json()).then(response => {
          nwsresult(response);
      })
    }
    if (startIndex == 1) {
      var qval = val;
      if (val.toLowerCase() == "yahoo") {
        qval = "yahoo!";
      } else if (val.toLowerCase() ==  "notch") {
        qval = "markus persson";
      } else if (val.toLowerCase() == "microsoft team") {
        qval = "microsoft teams";
      } else if (val.toLowerCase() == "bing") {
        qval = "microsoft bing";
      } else if (val.toLowerCase() == "bard") {
        qval = "google bard";
      } else if (val.toLowerCase().match(/apple|appl/)) {
        qval = "apple inc";
      } else if (val.toLowerCase().match(/ronaldo/)) {
        qval = "cristiano ronaldo";
      } else if (val.toLowerCase().match(/messi/)) {
        qval = "lionel messi";
      }
      var xhr = new XMLHttpRequest();
      xhr.open("GET", `https://duckduckgo.com/?q=${qval}&format=json&pretty=1&no_redirect=1&no_html=1&skip_disambig=1`);
      xhr.responseType = "json";
      xhr.onload = instant;
      xhr.send();
    }
  }
}

var d = new Date();
var locallang = (idlang) ? "id-ID" : "en-US";

var clock = function() {
  var h = d.getHours();
  var m = d.getMinutes();
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  return h + "." + m;
}

function instantanswer() {
  if (searchInput.value.toLowerCase().match(/jam|waktu|time|clock/) && searchInput.value.length < 15 && searchInput.value.split(" ").length - 4) {
    document.querySelector(".main-result .result").innerHTML += `<div class="tab-result"><div class="big-title">${clock()}</div><div class="snippet-info">${d.toLocaleDateString(locallang, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}, ${d.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1]}</div></div>`;
  } else if (searchInput.value.toLowerCase().match(/tanggal|date/) && searchInput.value.length < 15 && searchInput.value.split(" ").length - 4) {
    document.querySelector(".main-result .result").innerHTML += `<div class="tab-result"><div class="big-title">${d.toLocaleDateString(locallang, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}</div></div>`;
  } else if (searchInput.value.toLowerCase() == "quotes") {
    document.querySelector(".main-result .result").innerHTML += `<div class="tab-result quotes-tab"><div class="top"><div class="big-title">Quotes</div>&nbsp;<small>Beta</small></div><div class="bodytext">${quotes[Math.floor(Math.random() * quotes.length)]}</div><div class="refresh" onclick="refreshQuotes()"></div></div>`;
  } else if (searchInput.value.toLowerCase().match(/kalkulator|calculator/) && searchInput.value.split(" ").length - 2 || searchInput.value.match(/calculator\s+online|kalkulator\s+online/) && searchInput.value.split(" ").length - 3) {
    document.querySelector(".main-result .result").innerHTML += `<div class="calculator"><input type="text" inputmode="none" class="display" /><div class="buttons"><button class="operator" data-value="AC">AC</button><button class="operator" data-value="DEL">DEL</button><button class="operator" data-value="%">%</button><button class="operator" data-value=" ÷ ">÷</button><button data-value="7">7</button><button data-value="8">8</button><button data-value="9">9</button><button class="operator" data-value=" × ">×</button><button data-value="4">4</button><button data-value="5">5</button><button data-value="6">6</button><button class="operator" data-value=" - ">-</button><button data-value="1">1</button><button data-value="2">2</button><button data-value="3">3</button><button class="operator" data-value=" + ">+</button><button data-value="0">0</button><button data-value="00">00</button><button data-value=".">.</button><button class="operator" data-value="=" th="true">=</button></div></div>`;
    setTimeout(()=>{let calculatorBox=document.querySelector(".calculator"),display=calculatorBox.querySelector(".display"),buttons=calculatorBox.querySelectorAll("button"),specialChars=["%","*","/","-","+","="],output="",calculate=btnValue=>{if(display.focus(),"="===btnValue&&""!==output)output=eval(output.replace("%","/100").replace(/×/g,"*").replace(/÷/g,"/"));else if("AC"===btnValue)output="";else if("DEL"===btnValue)output=output.toString().slice(0,-1);else{if(""===output&&specialChars.includes(btnValue))return;output+=btnValue}display.value=output,display.blur()};buttons.forEach(e=>{e.addEventListener("click",e=>calculate(e.target.dataset.value))})},500);
  } else if (searchInput.value.toLowerCase().match(/translate|penerjemah/) && searchInput.value.split(" ").length - 2) {
    document.querySelector(".main-result .result").innerHTML += `<div class="trnsl"><div class="wrpl"><ul class="controls"><li class="row from"><div class="icons"><i id="from" class="fas fa-volume-up"></i><i id="from" class="fas fa-copy"></i></div><select></select></li><li class="exchange"><i class="fas fa-exchange-alt"></i></li><li class="row to"><select></select><div class="icons"><i id="to" class="fas fa-volume-up"></i><i id="to" class="fas fa-copy"></i></div></li></ul><div class="text-input"><textarea spellcheck="false" class="from-text" placeholder="Enter text"></textarea><textarea spellcheck="false" readonly disabled class="to-text" placeholder="Translation"></textarea></div></div></div>`;
    const countries={af:"Afrikaans",sq:"Albanian",am:"Amharic",ar:"Arabic",hy:"Armenian",as:"Assamese",ay:"Aymara",az:"Azerbaijani",bm:"Bambara",eu:"Basque",be:"Belarusian",bn:"Bengali",bho:"Bhojpuri",bs:"Bosnian",bg:"Bulgarian",ca:"Catalan",ceb:"Cebuano",co:"Corsican",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch",en:"English",eo:"Esperanto",et:"Estonian",ee:"Ewe",fil:"Filipino",fi:"Finnish",fr:"French",fy:"Frisian",ga:"Irish",gl:"Galician",de:"German",el:"Greek",gu:"Gujarati",ha:"Hausa",he:"Hebrew",hi:"Hindi",hu:"Hungarian",is:"Icelandic",ig:"Igbo",id:"Indonesian",it:"Italian",ja:"Japanese",jw:"Javanese",kn:"Kannada",kk:"Kazakh",km:"Khmer",ko:"Korean",ky:"Kyrgyz",lo:"Lao",lv:"Latvian",lt:"Lithuanian",lu:"Lushootseed",mk:"Macedonian",mg:"Malagasy",ms:"Malay",ml:"Malayalam",mt:"Maltese",mr:"Marathi",mn:"Mongolian",my:"Burmese",ne:"Nepali",no:"Norwegian",pa:"Punjabi",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sa:"Sanskrit",si:"Sinhala",sk:"Slovak",sl:"Slovenian",so:"Somali",es:"Spanish",su:"Sundanese",sw:"Swahili",sv:"Swedish",ta:"Tamil",te:"Telugu",th:"Thai",tr:"Turkish",uk:"Ukrainian",ur:"Urdu",uz:"Uzbek",vi:"Vietnamese",xh:"Xhosa",yo:"Yoruba",zu:"Zulu"};setTimeout(()=>{let e=document.querySelector(".trnsl"),a=e.querySelector(".from-text"),n=e.querySelector(".to-text"),i=e.querySelector(".exchange"),l=e.querySelectorAll("select"),t=e.querySelectorAll(".row i");function r(){let e=a.value.trim(),i=l[0].value,t=l[1].value;if(e){n.setAttribute("placeholder","Translating...");var r="",s="https://translate.googleapis.com/translate_a/single?client=gtx&sl="+i+"&tl="+t+"&dt=t&q="+encodeURI(e);$.getJSON(s,function(e){for(var a=0;a<e[0].length;a++)r+=e[0][a][0],n.value=r})}}transButton=e.querySelector("button"),l.forEach((e,a)=>{for(let n in countries){let i=`<option ${0==a?"en"==n?"selected":"":"id"==n?"selected":""} value="${n}">${countries[n]}</option>`;e.insertAdjacentHTML("beforeend",i)}}),l.forEach(e=>{e.addEventListener("change",()=>{r()})}),i.addEventListener("click",()=>{let e=a.value,i=l[0].value;a.value=n.value,n.value=e,l[0].value=l[1].value,l[1].value=i,r()}),a.addEventListener("keyup",()=>{a.value||(n.value="")});let s,u=500;a.addEventListener("input",()=>{clearTimeout(s),a.value?s=setTimeout(r,u):a.value||n.setAttribute("placeholder","Translation")}),t.forEach(e=>{e.addEventListener("click",({target:e})=>{if(a.value&&n.value){if(e.classList.contains("fa-copy"))"from"==e.id?navigator.clipboard.writeText(a.value):navigator.clipboard.writeText(n.value);else{let i;"from"==e.id?(i=new SpeechSynthesisUtterance(a.value)).lang=l[0].value:(i=new SpeechSynthesisUtterance(n.value)).lang=l[1].value,speechSynthesis.speak(i)}}})})},500);
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var whflg = ["indonesia","japan","canada","poland","monaco","qatar","greenland","england","singapore"];

function instant(e) {
  setTimeout(()=> {
    var res = this.response;
    if (res.Abstract.length > 100) {
      var tabres = document.querySelectorAll(".tab-result");
      var instanswer = document.createElement("div");
      instanswer.classList.add("instant-answer");
      if (windowWidth > 780) {
        document.querySelector(".result-wrapper").innerHTML += `<div class="sidebar-panel"></div>`;
        document.querySelector(".sidebar-panel").appendChild(instanswer);
      } else {
        insertAfter(tabres[0], instanswer);
      }
      var thumbmg = (res.Image) ? `<img src="https://duckduckgo.com${res.Image}" align="right" class="logo">` : "";
      document.querySelector(".instant-answer").innerHTML = `${thumbmg}<div class="title">${res.Heading}</div><div class="about"><span class="snippet">${res.Abstract.replace(/\<\/?pre.*?\/?\>/g, "").replace(/\<\/?code.*?\/?\>/g, "").slice(0, 220)}... </span><a href="${res.AbstractURL}" class="wikipedia" title="Wikipedia">${res.AbstractSource}</a></div><div class="infobox"></div>`;
      for (var i = 0; i < whflg.length; i++) {
      if (document.querySelector(".instant-answer .logo") && res.Heading.toLowerCase() == whflg[i]) {
        document.querySelector(".instant-answer .logo").style.border = "0.5px solid #ccc";
      }}
      for (var i = 0; i < res.Infobox.content.length && i < 3; i++) {
        if (res.Infobox.content[i].value.trim()) {
          document.querySelector(".instant-answer .infobox").innerHTML += `<span>${res.Infobox.content[i].label}: ${res.Infobox.content[i].value}</span>`;
        }
      }
    }
  },800);
}

function relatedsearch() {
  if (q.split(" ").length - 4) {
  setTimeout(()=> {
  var rltb = document.createElement("div");
  rltb.classList.add("related-search");
  document.querySelector(".main-result .result").appendChild(rltb);
  rltb.innerHTML = `<div class="title">Related search</div><div class="search-list">`;
  fetch(`https://api.swisscows.com/suggest?query=${q}`)
  .then(response => response.json()).then(response => {
    for (var i = 1; i < res.length && i < 5; i++) {
      document.querySelector(".search-list").innerHTML += `<a href="/search?q=${res[i]}" class="related">${res[i]}</a>`;
    }
  })
  },800)}
}

function refreshQuotes() {
  quotesText = document.querySelector(".quotes-tab .bodytext");
  quotesBtn = document.querySelector(".quotes-tab .refresh");
  quotesText.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
  quotesBtn.style.animation = "rotate2 0.5s ease";
  setTimeout(()=> {
    quotesBtn.style.removeProperty("animation");
  },400);
}

function timeAgo(input) {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat(locallang);
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}

function dateconversion(val) {
  if (val.slice(0, 4).match(d.getFullYear())) {
    return timeAgo(val);
  } else {
    return new Date(val.slice(0, 10)).toLocaleString(locallang, {day: '2-digit', month: 'long', year: 'numeric'});
  }
}

function nwsr(res) {
  try {
    for (var i = 0; i < res.items.length; i++) {
      publisher = (res.items[i].pagemap.metatags[0]['og:site_name']) ? res.items[i].pagemap.metatags[0]['og:site_name'] : res.items[i].displayLink;
      publishtime = (res.items[i].pagemap.metatags[0]['article:published_time']) ? dateconversion(res.items[i].pagemap.metatags[0]['article:published_time']) : "Published";
      newssnippet = (windowWidth > 780) ? `<div class="snippet">${res.items[i].snippet}</div>` : "";
      thumbimg = (res.items[i].pagemap.cse_thumbnail) ? `<img class="thumb" src="${res.items[i].pagemap.cse_thumbnail[0].src}">` : "";
      document.querySelector(".main-result").innerHTML += `<div class="tab-result nwst"><div class="snwt"><a href="${res.items[i].link}">${thumbimg}<div class="top"><img src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${res.items[i].link}&size=64" class="favicon"><div class="link">${publisher}</div></div><div class="title">${res.items[i].title.slice(0, 70)}</div>${newssnippet}<div class="publishtime">${publishtime}</div></a></div></div>`;
    }
  } catch(error) {
    if (!res.items) document.querySelector(".main-result").innerHTML += `<div class="tab-result"><div class="title-black">${langtext("noresult")}</div><div class="suggestion">${langtext("suggtext")}</div><div>${langtext("noresultsug")}</div></div>`;
  }
}

function videoresult(res) {
  try {
    for (var i = 0; i < res.items.length; i++) {
      document.querySelector(".main-result").innerHTML += `<div class="video-result"><a href="https://youtube.com/watch?v=${res.items[i].id.videoId}"  data-number="1"><img src="${res.items[i].snippet.thumbnails.medium.url}" class="thumbnail"><div class="title">${res.items[i].snippet.title}</div><div class="source"><div class="info"><img src="images/youtube.png" class="favicon"><div>YouTube</div></div></div></a></div>`;
    }
    if (!res.items.length > 0) throw "empty";
  } catch(error) {
    document.querySelector(".result-wrapper").classList.add("CBpUsa");
    document.querySelector(".main-result").innerHTML += `<div class="tab-result"><div class="title-black">${langtext("noresult")}</div><div class="suggestion">${langtext("suggtext")}</div><div>${langtext("noresultsug")}</div></div>`;
  }
}

function nwsresult(res) {
  if (res.items.length > 3) {
    setTimeout(() => {
    var tabres = document.querySelectorAll(".tab-result");
    var nwsres = document.createElement("div");
    nwsres.classList.add("news-result");
    nwsres.innerHTML += `<div class="title">${langtext("news")}</div><div class="news-list"></div>`;
    insertAfter(tabres[Math.floor(Math.random() * (2 - 1 + 1) + 1)], nwsres);
    for (var i = 0; i < res.items.length && i < 5; i++) {
      var thumbnailimg = (res.items[i].pagemap.cse_thumbnail) ? res.items[i].pagemap.cse_thumbnail[0].src : "";
      publisher = (res.items[i].pagemap.metatags[0]['og:site_name']) ? res.items[i].pagemap.metatags[0]['og:site_name'] : res.items[i].displayLink;
      document.querySelector(".news-result .news-list").innerHTML += `<div class="news-tab"><a href="${res.items[i].link}"><img src='${thumbnailimg}' class='thumbnail'><div class="title">${res.items[i].title}</div><div class="flexwrap"><img class="favicon" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${res.items[i].link}&size=64"><div class="link">${publisher}</div></div></a></div>`;
    }
    },1000);
  }
}


function webresult(res) {
  try {
    var rsltsta = (idlang) ? `Sekitar ${res.searchInformation.formattedTotalResults} hasil (${res.searchInformation.formattedSearchTime} detik)` : `Approximately ${res.searchInformation.formattedTotalResults} result (${res.searchInformation.formattedSearchTime} seconds)`;
    var pageone = (startIndex  == 1) ? true : false;
    if (res.items && windowWidth > 700 && pageone) {
      document.querySelector(".main-result .result").innerHTML += `<div class="result-stats">${rsltsta}</div>`;
    }
    if (res.items && res.spelling && pageone) {
      document.querySelector(".main-result .result").innerHTML += `<div class="corrected-word tab-result"><div class="snippet">${langtext("correct")} <a class="spelling" href="/search?q=${encodeURIComponent(res.spelling.correctedQuery).replace(/\%20/g,'+')}${searchlang}">${res.spelling.correctedQuery}</a></div></div>`;
    }
    if (res.items.length > 9 && pageone) {
      instantanswer();
    }
    if (res.promotions){for (var i = 0; i < res.promotions.length; i++) {
      document.querySelector(".main-result .result").innerHTML += `<div class="tab-result"><div class="tab-link"  data-number="${i}"><a href="${res.promotions[i].link}"><div class="top"><div class="ads">Ads</div><div class="link">${res.promotions[i].displayLink}</div></div><div class="title">${res.promotions[i].title}</div></a></div><div class="snippet">${res.promotions[i].bodyLines[0].title}</div></div>`;
    }}
    for (var i = 0; i < res.items.length; i++) {
      var originurl = new URL(res.items[i].link);
      var urlparam = (originurl.pathname.length > 1) ? originurl.pathname.replaceAll("/", " › ") : "";
      urlparam = (urlparam.substr(-3).indexOf(" › ") > -1) ? urlparam.slice(0, -3) : urlparam;
      urlparam = originurl.origin + urlparam;
      displayUrl = (getData().newurl == true || url.searchParams.get("uf") == 1) ? urlparam : res.items[i].displayLink;
      document.querySelector(".main-result .result").insertAdjacentHTML('beforeend', `<div class="tab-result"><div class="tab-link"  data-number="${i}"><a href="${res.items[i].link}"><div class="top"><img src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${originurl.hostname}&size=32" class="favicon"><div class="link">${displayUrl}</div></div><div class="title">${res.items[i].htmlTitle?.replace(/<b(?!\/b)>|<\/b>/g, "")}</div></a></div><div class="snippet">${res.items[i].htmlSnippet?.replace(/<b(?!\/b)>|<\/b>/g, "")}</div></div>`);
    }
    snippet = document.querySelectorAll(".snippet");
    snippet.forEach(description => {
      if (description.innerHTML === "undefined") {
        description.innerHTML = `There is no information on this page.`;
      }
    });
    if (getData().favicon == false || fv == 0) {
      document.querySelectorAll(".favicon").forEach(elm => {
        elm.remove();
      });
    }
    
    if (res.queries.nextPage && pageone) {
      document.querySelector(".main-result").innerHTML += `<div class="show-wrapper"><button class="more" onclick="XuadHc();">${langtext("more")}</button></div>`;
    } else if (!res.queries.nextPage && document.querySelector(".show-wrapper")) {
      document.querySelector(".show-wrapper").remove();
    }
    if (pageone) {
      document.querySelector(".rcthl-wrp").insertAdjacentHTML('beforeend', `<section class="footer"><ul class="list"><li><a href="/settings">Settings</a></li><li><a href="/">Privacy</a></li><li><a href="/search?q=translate">Translate</a></li></ul><ul class="list"><li>
<a href="https://google.com/search?q=${q}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2 4.4C10.4 3.6 9.3 3.1 8.2 3.1C6.1 3.1 4.3 4.5 3.7 6.4C3.4 7.4 3.4 8.5 3.7 9.5H3.8C4.4 11.4 6.2 12.8 8.2 12.8C9.3 12.8 10.3 12.6 10.9 12.1V12.1C11.7 11.5 12.3 10.6 12.5 9.6H8.2V6.5H15.7C15.8 7.1 15.8 7.6 15.8 8.1C15.8 10.6 14.9 12.7 13.4 14.1L13.4 14.1C12.1 15.3 10.3 16 8.2 16C5.1 16 2.3 14.3 1 11.6C-0.1 9.3 -0.1 6.7 1 4.4C2.3 1.7 5.1 0 8.2 0C10.2 0 12.1 0.7 13.5 2.1L11.2 4.4Z" fill="gray"/></svg>Google</a></li><li>
<a href="https://bing.com/search?q=${q}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.56782 12.8826L6.50298 12.9213L6.50298 3.00097C6.50378 2.68819 6.42794 2.37997 6.28207 2.1032C6.1362 1.82643 5.92474 1.58951 5.66613 1.41313C5.65416 1.40613 5.64277 1.39819 5.63208 1.38937L3.66963 0.109031C3.57302 0.0440715 3.46055 0.00656669 3.34425 0.000529244C3.22795 -0.0055082 3.11219 0.0201488 3.00936 0.0747557C2.90654 0.129363 2.82051 0.210865 2.76048 0.310542C2.70045 0.410219 2.66869 0.524321 2.66858 0.640641V11.8226C2.66998 11.9004 2.67418 11.9773 2.68024 12.0556C2.68491 12.097 2.6905 12.1399 2.69797 12.1814C2.69982 12.1917 2.70175 12.2019 2.70376 12.2122C2.78097 12.8413 2.99757 13.4455 3.33796 13.9807C3.71346 14.574 4.22782 15.0671 4.83668 15.4175C5.44553 15.7679 6.13059 15.9651 6.83277 15.9921C6.88782 15.9954 6.94333 15.9954 6.9993 15.9954H7.12059C7.98776 15.9739 8.67721 15.6562 9.4063 15.2075L10.4013 14.6018C10.4908 14.5445 10.611 14.4705 10.7488 14.3856C11.3011 14.0454 12.1372 13.5304 12.4239 13.2138L12.4296 13.2075C13.1703 12.4089 13.5819 11.3604 13.582 10.2716C13.582 10.17 13.5778 10.0694 13.5722 9.96735C13.4967 8.86392 12.9991 7.83178 12.1826 7.08473C11.9635 6.8823 11.7236 6.70349 11.467 6.55126L10.9823 6.30386L8.5245 5.04589C8.43589 5.00844 8.33972 4.99227 8.24372 4.99867C8.14772 5.00508 8.05456 5.03388 7.97172 5.08277C7.88889 5.13166 7.81868 5.19927 7.76676 5.28018C7.71483 5.36108 7.68262 5.45302 7.67272 5.54861C7.67154 5.56956 7.67154 5.59056 7.67272 5.61151C7.67266 5.69269 7.6885 5.77309 7.71937 5.84819L7.74642 5.90317L7.85231 6.17433L8.40415 7.57953L8.88415 8.80862C9.02113 9.0579 9.24086 9.25166 9.50549 9.35654L9.58806 9.38682H9.60112L11.4204 10.0113L6.56782 12.8826ZM12.7892 12.6263C12.7811 12.648 12.7722 12.6694 12.7623 12.6904L12.8703 12.3694C12.8642 12.3973 12.8565 12.4256 12.8492 12.4521C12.8427 12.4753 12.8356 12.4986 12.8275 12.5212L12.8241 12.5317L12.8195 12.5449C12.8137 12.563 12.8072 12.5809 12.8001 12.5985L12.7938 12.6147C12.7923 12.6185 12.7907 12.6224 12.7892 12.6263ZM12.9249 11.9097C12.9255 11.8094 12.9182 11.7096 12.9034 11.6111C12.9188 11.7101 12.9264 11.8106 12.9261 11.9116C12.9262 11.9759 12.9229 12.0401 12.9163 12.104C12.914 12.132 12.9107 12.159 12.9065 12.186C12.9032 12.2072 12.8996 12.2286 12.8957 12.2496C12.9151 12.1374 12.9249 12.0237 12.9249 11.9097ZM12.8824 12.3163C12.8787 12.3335 12.8749 12.3505 12.8708 12.3671L12.8739 12.358C12.879 12.3362 12.8832 12.3145 12.8874 12.2926L12.8824 12.3163Z" fill="gray"/></svg>Bing</a></li></ul><div class="copyright">Improved search results.<br>Copyright 2023</div></section>`);
    }
    } catch(error) {
    if (pageone && !res.items) document.querySelector(".main-result").innerHTML += `<div class="tab-result"><div class="title-black">${langtext("noresult")}</div><div class="suggestion">${langtext("suggtext")}</div><div>${langtext("noresultsug")}</div></div>`;
  }
}

function share() {
  if (navigator.share) {
    navigator.share({
      title: "",
      url: window.location.href
    })
  }
}

function XuadHc() {
  document.querySelector(".show-wrapper").innerHTML = `<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div>`;
  if (startIndex < 20 && navigator.onLine) {
    startIndex += 10;
    setTimeout(submit, 500);
    setTimeout(()=> { document.querySelector(".show-wrapper").innerHTML = `<button class="more" onclick="XuadHc();">${langtext("more")}</button>`; },1800);
  }
  if (startIndex > 20) {
    setTimeout(()=> { document.querySelector(".show-wrapper").remove();}, 1800);
  }
}

window.addEventListener('load', ()=> {
  if (getData().newtab == true) {
    setTimeout(()=> {
      document.querySelectorAll(".main-result a").forEach(elm => {
        elm.target = "_blank";
      });
    },1000)
  }
});
