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

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem(`scrollPos:${location.href}`, window.scrollY);
});

function scrollRestore() {
  const scrollPos = sessionStorage.getItem(`scrollPos:${location.href}`);
  if (scrollPos !== null) {
    window.scrollTo(0, parseInt(scrollPos, 10));
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

if (getData().theme == "dark" || th == 1) {
  document.body.classList.add("dark");
}

idlang = getData().lang == "Indonesia" || hl == "id" ? true : false;

searchParam += uf == 1 ? "&uf=1" : "";
searchParam += fv == 0 ? "&fv=0" : "";
searchParam += sf == 1 ? "&sf=1" : "";
searchParam += th == 1 ? "&th=1" : "";
document.title = idlang ? `${q} - Penelusuran` : `${q} - Search`;
var startIndex = p > 1 ? p : 1;

String.prototype.ltrim = function() {
  if (!this) return this;
  return this.replace(/^\s+/g, '');
}

const logodev = `<div class="xnan"><div class="logo" id="main-lgx">
    <a title="Kembali ke halaman utama." href="/x?=srltpg">
    <img id="logimg_Ux92" alt="Logo" title="Logo" src="/images/logo.png">
    
    </a></div></div>`;

if (!q || url.pathname.match(".html")) {
  window.location.href = "/";
} else if (q.trim() && !url.pathname.match(".html") && !rested && navigator.onLine) {
    const css=`.logo#main-lgx img{width:100px;height:45px;}.logo#main-lgx{display:flex;justify-content:center;background:#fff;padding-top:8px}@media (min-width:780px){.logo#main-lgx{position:absolute;top:6px;left:0;padding:8px 12px}@media (max-width:940.9px){.logo#main-lgx{visibility:hidden}}}.logo#main-lgx .s{position:relative}`;
  document.body.innerHTML = `<div class="root" id="main-bx"><div class="kwuND KwbMG"><div class="cbKRN"></div></div><div class="xzBdP"></div><div class="hVhvp BbmqH"><div class="KArDf">${logodev}<div class="header"><div class="search-box"><div class="search-field"><input type="search" id="sear_21829_input" value="${q.ltrim()}" name="q" class="search-input" autocorrect="off" autocomplete="off" autocapitalize="off" placeholder="Type to search..."><div role="button" class="search-toggle inpbtun" id="xclarGh" title="Cari"></div><div role="button" class="cleartext inpbtun" id="Chasprn" title="Hapus"></div></div></div><div class="search-menu"><div class="search-item"><a href="/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}${searchlang}${searchParam}" class="tab-wrapper" tab-id="all"><div class="label"><svg width="16" height="16" viewBox="0 0 16 16" fill="#6e7780" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C2.68629 1 0 3.68629 0 7C0 10.3137 2.68629 13 6 13C7.64669 13 9.13845 12.3366 10.2226 11.2626L14.7873 14.8403C15.1133 15.0959 15.5848 15.0387 15.8403 14.7127C16.0958 14.3867 16.0387 13.9153 15.7126 13.6597L11.1487 10.0826C11.6892 9.18164 12 8.12711 12 7C12 3.68629 9.31371 1 6 1ZM1.5 7C1.5 4.51472 3.51472 2.5 6 2.5C8.48528 2.5 10.5 4.51472 10.5 7C10.5 9.48528 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48528 1.5 7Z"></path></svg><span>All</span></div></a></div><div class="search-item"><a href="/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}&tbm=isch${searchlang}${searchParam}" class="tab-wrapper" tab-id="images"><div class="label"><svg width="16" height="16" viewBox="0 0 16 16" fill="#6e7780" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 1C1.45507 1 0 2.45507 0 4.25V11.75C0 13.5449 1.45507 15 3.25 15H12.75C14.5449 15 16 13.5449 16 11.75V10.2593C16.0001 10.2531 16.0001 10.2469 16 10.2407V4.25C16 2.45507 14.5449 1 12.75 1H3.25ZM14.5 8.43928V4.25C14.5 3.2835 13.7165 2.5 12.75 2.5H3.25C2.2835 2.5 1.5 3.2835 1.5 4.25V11.75C1.5 11.9563 1.5357 12.1543 1.60126 12.3381L5.96967 7.96967C6.26256 7.67678 6.73744 7.67678 7.03033 7.96967L8.00003 8.93937L10.9697 5.96967C11.2626 5.67678 11.7375 5.67678 12.0304 5.96967L14.5 8.43928ZM9.06069 10L10.0303 10.9697C10.3232 11.2626 10.3232 11.7374 10.0303 12.0303C9.73744 12.3232 9.26256 12.3232 8.96967 12.0303L6.5 9.56066L2.66192 13.3987C2.84572 13.4643 3.04369 13.5 3.25 13.5H12.75C13.7165 13.5 14.5 12.7165 14.5 11.75V10.5606L11.5001 7.56066L9.06069 10Z"></path></svg><span>Images</span></div></a></div><div class="search-item"><a href="/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}&tbm=vid${searchlang}${searchParam}" class="tab-wrapper" tab-id="videos"><div class="label"><svg width="16" height="16" viewBox="0 0 16 16" fill="#6e7780" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4887 5.55027C15.3801 6.63605 15.3801 9.36446 13.4887 10.4502L6.23148 14.6164C4.34816 15.6976 2 14.338 2 12.1664L2 3.83407C2 1.66248 4.34816 0.302917 6.23148 1.38408L13.4887 5.55027ZM12.7419 9.14937C13.629 8.64011 13.629 7.36041 12.7419 6.85115L5.48468 2.68496C4.60135 2.17787 3.5 2.81554 3.5 3.83407L3.5 12.1664C3.5 13.185 4.60135 13.8226 5.48468 13.3156L12.7419 9.14937Z"></path></svg><span>Videos</span></div></a></div><div class="search-item"><a href="/search?q=${encodeURIComponent(q).replace(/\%20/g,'+')}&tbm=nws${searchlang}${searchParam}" class="tab-wrapper" tab-id="news"><div class="label"><svg width="16" height="16" viewBox="0 0 22 22" fill="#6e7780"><path d="M12 11h6v2h-6v-2zm-6 6h12v-2H6v2zm0-4h4V7H6v6zm16-7.22v12.44c0 1.54-1.34 2.78-3 2.78H5c-1.64 0-3-1.25-3-2.78V5.78C2 4.26 3.36 3 5 3h14c1.64 0 3 1.25 3 2.78zM19.99 12V5.78c0-.42-.46-.78-1-.78H5c-.54 0-1 .36-1 .78v12.44c0 .42.46.78 1 .78h14c.54 0 1-.36 1-.78V12zM12 9h6V7h-6v2"></path></svg><span>News</span></div></a></div><div class="search-item"><a href="/maps?q=${encodeURIComponent(q).replace(/\%20/g,'+')}" class="tab-wrapper" tab-id="maps"><div class="label"><svg width="16" height="16" viewBox="0 0 16 16" fill="#6e7780" xmlns="http://www.w3.org/2000/svg"><path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C6.81332 0 5.65328 0.351894 4.66658 1.01118C3.67989 1.67047 2.91085 2.60754 2.45673 3.7039C2.0026 4.80026 1.88378 6.00666 2.11529 7.17054C2.35179 8.35952 2.99591 9.39906 3.73051 10.2144C5.0603 11.6902 5.95884 13.0319 6.52237 13.9981C6.80408 14.4812 7.00183 14.87 7.1277 15.1343C7.19062 15.2665 7.23554 15.3675 7.26398 15.4334C7.27819 15.4664 7.28829 15.4907 7.29444 15.5057L7.30075 15.5212L7.30129 15.5226L7.30168 15.5236C7.41829 15.8212 7.71074 16.0123 8.03018 15.9994C8.34937 15.9865 8.62531 15.7729 8.71783 15.4673L8.71818 15.4662L8.72264 15.4522C8.72711 15.4384 8.73473 15.4154 8.74578 15.3837C8.76791 15.3202 8.80379 15.2219 8.85585 15.0927C8.95997 14.8342 9.12867 14.452 9.38109 13.9769C9.88586 13.0267 10.7253 11.7051 12.0529 10.2568C12.7338 9.51391 13.6375 8.41354 13.8847 7.17054C14.1162 6.00666 13.9974 4.80026 13.5433 3.7039C13.0892 2.60754 12.3201 1.67047 11.3334 1.01118C10.3467 0.351894 9.18669 0 8 0ZM8.05642 13.2731C8.01989 13.3419 7.98488 13.409 7.95134 13.4745C7.90893 13.3994 7.86453 13.322 7.81811 13.2425C7.20975 12.1993 6.25213 10.7721 4.84488 9.21027C4.23085 8.5288 3.75511 7.72573 3.58647 6.87791C3.41284 6.00499 3.50195 5.10019 3.84254 4.27792C4.18314 3.45566 4.75992 2.75285 5.49994 2.25839C6.23996 1.76392 7.10999 1.5 8 1.5C8.89002 1.5 9.76005 1.76392 10.5001 2.25839C11.2401 2.75285 11.8169 3.45566 12.1575 4.27793C12.4981 5.10019 12.5872 6.00499 12.4135 6.87791C12.2556 7.67171 11.6276 8.50093 10.9471 9.24321C9.52471 10.7949 8.61414 12.2233 8.05642 13.2731Z"></path></svg><span>Maps</span></div></a></div></div></div></div><div class="QZjVU hWOQY"><div class="result-wrapper"><div class="main-result"></div></div></div></div></div><div id="overlay_uX2"><input style="display:none" id="Dteck"><iframe style="display:none" src="/webchunk"></iframe></div><style>${css}</style>`;

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

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function hapusKata(teks) {
  var pattern = /what is/gi;
  return teks.replace(pattern, "").trim();
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
  var script = document.createElement("script");
  script.src = "/imgtest.js";
  document.querySelector(".main-result").innerHTML = `<div class="show-wrapper"><div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div></div>`;
  defstyle = document.querySelectorAll("link[rel='stylesheet']")[0];
  vidstyle = document.createElement("link");
  vidstyle.rel = "stylesheet";
  vidstyle.href = "/i2025.css";
  insertAfter(defstyle, vidstyle);
  
  document.body.appendChild(script);
} else if (tbm === "nws") {
  document.querySelectorAll(".search-item")[3].classList.add("selected");
} else {
  document.querySelectorAll(".search-item")[0].classList.add("selected");
  document.querySelector(".main-result").innerHTML += `<div class="UoZrQ result"></div>`;
  defstyle = document.querySelectorAll("link[rel='stylesheet']")[0];
  vidstyle = document.createElement("link");
  vidstyle.rel = "stylesheet";
  vidstyle.href = "/e8495.css";
  insertAfter(defstyle, vidstyle);
}

function addS(nyanya) {
  dstyle = document.querySelectorAll("link[rel='stylesheet']")[0];
  astyle = document.createElement("link");
  astyle.rel = "stylesheet";
  astyle.href = `/${nyanya}.css`;
  insertAfter(dstyle, astyle);
}

var language = {
  en: {
    news: "News result",
    more: "More search results",
    vidTitle: "Videos",
    related: "People also search for",
    placeholder: "Type to search...",
    correct: "Did you mean:",
    noresult: "No matching results",
    noSiteInfo: "There is no information on this page.",
    suggtext: "Search suggestion:",
    adlabel: "Ad",
    noresultsug: ["Try different keywords.", "Try more general keywords.", "Try fewer keywords."],
    tab: ["All","Images","Videos","News","Maps"],
  },
  id: {
    news: "Hasil berita <pre>Beta</pre>",
    more: "Hasil penelusuran lainnya",
    vidTitle: "Video",
    related: "Orang lain juga menelusuri",
    placeholder: "Ketik untuk  mencari...",
    correct: "Apakah maksudmu:",
    noresult: "Tidak ditemukan hasil",
    noSiteInfo: "Tidak ada informasi mengenai halaman ini.",
    suggtext: "Saran pencarian:",
    adlabel: "Iklan",
    noresultsug: ["Coba kata kunci yang berbeda.", "Coba kata kunci yang lebih umum.", "Coba lebih sedikit kata kunci."],
    tab: ["Semua","Gambar","Video","Berita","Peta"],
  },
};

var sitelinkss;

fetch('/sitelinks.js')
  .then(response => {
    return response.text();
  })
  .then(response => {
    const dataText = response;
    eval(dataText);
    var nilaiData = eval('sitelinks');
    if (nilaiData) {
      sitelinkss = nilaiData;
    }
})



function showLinks(url) {
  var foundSite = sitelinkss.find(s => s.site.replace(/^https?:\/\//, "") == url.replace(/^https?:\/\//, ""));
  if (foundSite) {
    var hcq = '';
    var msb = foundSite.links;
    for (var i = 0; i < msb.length; i++) {
      var bac = msb[i];
      if (bac[2] && windowWidth > 780) {
        hcq += `<div class="wrlink"><a href="${bac[1]}" class="link">${bac[0]}</a><div class="snippet">${bac[2]}</div></div>`;
      } else {
        hcq += `<div class="wrlink"><a href="${bac[1]}" class="link">${bac[0]}</a><span class="BxJx"><div class="Xcjwr"></div></span></div>`;
      }
    }
    var html = `<div class="sitelinks">${hcq}</div>`;
    return html;
  } else {
    return '';
  }
}

function langtext(string, index) {
  if (idlang && index !== undefined) {
    return language["id"][string][index];
  } else if (index !== undefined) {
    return language["en"][string][index];
  } if (idlang) {
    return language["id"][string];
  } else {
    return language["en"][string];
  }
}

if (idlang) {
  searchInput.placeholder = langtext("placeholder");
  searchItem = document.querySelectorAll(".search-item");
  searchItem[0].querySelector(".label span").innerHTML = langtext("tab", 0);
  searchItem[1].querySelector(".label span").innerHTML = langtext("tab", 1);
  searchItem[2].querySelector(".label span").innerHTML = langtext("tab", 2);
  searchItem[3].querySelector(".label span").innerHTML = langtext("tab", 3);
  searchItem[4].querySelector(".label span").innerHTML = langtext("tab", 4);
  document.documentElement.lang = "id";
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

// cek judul atau bukan //
function isLikelyTitle(str) {
  if (str.length > 18) {
    return false;
  }
  const words = str.split(' ');
  if (!words.length > 1) {
    return false;
  }
  let capitalizedCount = 0;
  for (const word of words) {
    if (word[0] === word[0].toUpperCase()) {
      capitalizedCount++;
    }
  }
  if (capitalizedCount / words.length < 0.5) {
    return false;
  }
  const punctuationCount = str.replace(/[^.,:;!?]/g, '').length;
  if (punctuationCount / str.length > 0.1) {
    return false;
  }
  return true;
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

function submit() {
  var val = q;
  var spr = (sf == 1) ? "&safe=active" : "";
  var basa = (idlang) ? `&gl=${hl}&lr=lang_id&hl=id` : "";
  if (tbm === "vid") {
    fetch(`https://datasearch.searchdata.workers.dev/api?q=${q}&tbm=vid&maxResults=100`)
      .then(response => response.json()).then(response => {
        videoresult(response);
    })
  } else if (tbm == "nws") {
    fetch(`https://datasearch.searchdata.workers.dev/api?q=${q}${basa}&tbm=nws`)
      .then(response => response.json()).then(response => {
        nwsr(response);
    })
  } else if (tbm != "vid" && tbm != "isch" && tbm != "nws") {
    fetch(`https://datasearch.searchdata.workers.dev/api?q=${q}${basa}&page=${startIndex}`)
      .then(response => response.json()).then(response => {
        webresult(response);
    })
    .catch(error => {
      
    });
    if (startIndex === 1) {}
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

function jwbn() {
    if (startIndex == 1) {
      var val = q;
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
      } else if (val.toLowerCase() == "apple") {
        qval = "apple inc";
      } else if (val.toLowerCase() == "ronaldo") {
        qval = "cristiano ronaldo";
      } else if (val.toLowerCase() == "messi") {
        qval = "lionel messi";
      }

      var xhr = new XMLHttpRequest();
      xhr.open("GET", `https://datasearch.searchdata.workers.dev/?q=${qval}`);
      xhr.responseType = "json";
      xhr.onload = instant;
      xhr.send();
    }
}

function instantanswer() {
  if (searchInput.value.toLowerCase().match(/jam|waktu|time|clock/) && searchInput.value.length < 15 && searchInput.value.split(" ").length - 4) {
    document.querySelector(".main-result .result").innerHTML += `<div class="tab-result pddf eb8xCva"><div class="big-title">${clock()}</div><div class="snippet-info">${d.toLocaleDateString(locallang, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}, ${d.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1]}</div></div>`;
  } else if (searchInput.value.toLowerCase().match(/tanggal|date/) && searchInput.value.length < 15 && searchInput.value.split(" ").length - 4) {
    document.querySelector(".main-result .result").innerHTML += `<div class="tab-result pddf eb8xCva"><div class="big-title">${d.toLocaleDateString(locallang, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}</div></div>`;
  } else if (searchInput.value.toLowerCase() == "quotes") {
    document.querySelector(".main-result .result").innerHTML += `<div class="tab-result quotes-tab pddf eb8xCva"><div class="top"><div class="big-title">Quotes</div>&nbsp;<small>Beta</small></div><div class="bodytext">${quotes[Math.floor(Math.random() * quotes.length)]}</div><div class="refresh" onclick="refreshQuotes()"></div></div>`;
  } else if (searchInput.value.toLowerCase().match(/kalkulator|calculator/) && searchInput.value.split(" ").length - 2 || searchInput.value.match(/calculator\s+online|kalkulator\s+online/) && searchInput.value.split(" ").length - 3) {
    document.querySelector(".main-result .result").innerHTML += `<div class="calculator"><input type="text" inputmode="none" class="display" /><div class="buttons"><button class="operator" data-value="AC">AC</button><button class="operator" data-value="DEL">DEL</button><button class="operator" data-value="%">%</button><button class="operator" data-value=" ÷ ">÷</button><button data-value="7">7</button><button data-value="8">8</button><button data-value="9">9</button><button class="operator" data-value=" × ">×</button><button data-value="4">4</button><button data-value="5">5</button><button data-value="6">6</button><button class="operator" data-value=" - ">-</button><button data-value="1">1</button><button data-value="2">2</button><button data-value="3">3</button><button class="operator" data-value=" + ">+</button><button data-value="0">0</button><button data-value="00">00</button><button data-value=".">.</button><button class="operator" data-value="=" th="true">=</button></div></div>`;
    setTimeout(()=>{let calculatorBox=document.querySelector(".calculator"),display=calculatorBox.querySelector(".display"),buttons=calculatorBox.querySelectorAll("button"),specialChars=["%","*","/","-","+","="],output="",calculate=btnValue=>{if(display.focus(),"="===btnValue&&""!==output)output=eval(output.replace("%","/100").replace(/×/g,"*").replace(/÷/g,"/"));else if("AC"===btnValue)output="";else if("DEL"===btnValue)output=output.toString().slice(0,-1);else{if(""===output&&specialChars.includes(btnValue))return;output+=btnValue}display.value=output,display.blur()};buttons.forEach(e=>{e.addEventListener("click",e=>calculate(e.target.dataset.value))})},500);
  } else if (searchInput.value.toLowerCase().match(/translate|terjemah|terjemahan/)) {
    document.querySelector(".main-result .result").innerHTML += `<div class="trnsl"><div class="wrpl"><ul class="controls"><li class="row from"><div class="icons"><i id="from" class="fas fa-volume-up"></i><i id="from" class="fas fa-copy"></i></div><select></select></li><li class="exchange"><i class="fas fa-exchange-alt"></i></li><li class="row to"><select></select><div class="icons"><i id="to" class="fas fa-volume-up"></i><i id="to" class="fas fa-copy"></i></div></li></ul><div class="text-input"><textarea spellcheck="false" class="from-text" placeholder="Enter text"></textarea><textarea spellcheck="false" readonly disabled class="to-text" placeholder="Translation"></textarea></div></div></div>`;
    const countries={af:"Afrikaans",sq:"Albanian",am:"Amharic",ar:"Arabic",hy:"Armenian",as:"Assamese",ay:"Aymara",az:"Azerbaijani",bm:"Bambara",eu:"Basque",be:"Belarusian",bn:"Bengali",bho:"Bhojpuri",bs:"Bosnian",bg:"Bulgarian",ca:"Catalan",ceb:"Cebuano",co:"Corsican",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch",en:"English",eo:"Esperanto",et:"Estonian",ee:"Ewe",fil:"Filipino",fi:"Finnish",fr:"French",fy:"Frisian",ga:"Irish",gl:"Galician",de:"German",el:"Greek",gu:"Gujarati",ha:"Hausa",he:"Hebrew",hi:"Hindi",hu:"Hungarian",is:"Icelandic",ig:"Igbo",id:"Indonesian",it:"Italian",ja:"Japanese",jw:"Javanese",kn:"Kannada",kk:"Kazakh",km:"Khmer",ko:"Korean",ky:"Kyrgyz",lo:"Lao",lv:"Latvian",lt:"Lithuanian",lu:"Lushootseed",mk:"Macedonian",mg:"Malagasy",ms:"Malay",ml:"Malayalam",mt:"Maltese",mr:"Marathi",mn:"Mongolian",my:"Burmese",ne:"Nepali",no:"Norwegian",pa:"Punjabi",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sa:"Sanskrit",si:"Sinhala",sk:"Slovak",sl:"Slovenian",so:"Somali",es:"Spanish",su:"Sundanese",sw:"Swahili",sv:"Swedish",ta:"Tamil",te:"Telugu",th:"Thai",tr:"Turkish",uk:"Ukrainian",ur:"Urdu",uz:"Uzbek",vi:"Vietnamese",xh:"Xhosa",yo:"Yoruba",zu:"Zulu"};setTimeout(()=>{let a=document.querySelector(".trnsl"),e=a.querySelector(".from-text"),l=a.querySelector(".to-text"),n=a.querySelector(".exchange"),i=a.querySelectorAll("select"),t=a.querySelectorAll(".row i");a.querySelector("button");let r=!1;function s(a){let t=e.value.trim(),s=i[0].value,u=i[1].value;if(t){l.setAttribute("placeholder","Translating..."),!l.value||a||l.value.match(e.value)?a&&(l.value="Translating...",r=!0,n.classList.add("off")):(l.value=`${l.value} ...`,n.classList.add("off"));var o="",c="https://translate.googleapis.com/translate_a/single?client=gtx&sl="+s+"&tl="+u+"&dt=t&q="+encodeURI(t);$.getJSON(c,function(a){for(var e=0;e<a[0].length;e++)o+=a[0][e][0],setTimeout(function(){l.value=o,n.classList.remove("off"),r=!1},120)})}}i.forEach((a,e)=>{for(let l in countries){let n=`<option ${0==e?"en"==l?"selected":"":"id"==l?"selected":""} value="${l}">${countries[l]}</option>`;a.insertAdjacentHTML("beforeend",n)}}),i.forEach(a=>{a.addEventListener("change",()=>{s()})}),"Indonesia"==getData().lang&&(i[0].value="id",i[1].value="en"),n.addEventListener("click",()=>{var a;if(e.value&&!l.value||r)return;e.value;let n=i[0].value;e.value=l.value,i[0].value=i[1].value,i[1].value=n,s(!0)}),e.addEventListener("keyup",()=>{e.value||(l.value="")});let u,o=500;e.addEventListener("input",()=>{clearTimeout(u),e.value?u=setTimeout(s,o):e.value||l.setAttribute("placeholder","Translation"),e.value&&!l.value&&n.classList.add("off")}),t.forEach(a=>{a.addEventListener("click",({target:a})=>{if(e.value&&l.value){if(a.classList.contains("fa-copy"))"from"==a.id?navigator.clipboard.writeText(e.value):navigator.clipboard.writeText(l.value);else{let n;"from"==a.id?(n=new SpeechSynthesisUtterance(e.value)).lang=i[0].value:(n=new SpeechSynthesisUtterance(l.value)).lang=i[1].value,speechSynthesis.speak(n)}}})})},50);
  }
}

function cekGambarAda(url, callback) {
  var img = new Image();
  img.onload = function() {
    callback(true);
  };
  img.onerror = function() {
    callback(false);
  };
  img.src = url;
}

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

function instant(e) {
  var res = this.response;
  
    if (res.snippet.length > 100) {
      var tabres = document.querySelectorAll(".tab-result");
      var instanswer = document.createElement("div");
      instanswer.classList.add("VtuHV");
      instanswer.classList.add("instant-answer");
      if (windowWidth > 780) {
        document.querySelector(".result-wrapper").innerHTML += `<div class="sidebar-panel"></div>`;
        document.querySelector(".sidebar-panel").appendChild(instanswer);
      } else {
        insertAfter(tabres[2], instanswer);
      }
      document.querySelector(".instant-answer").insertAdjacentHTML("beforeend", `<div class="title">${res.title}</div><div class="about"><span class="snippet">${res.snippet.replace(/\<\/?pre.*?\/?\>/g, "").replace(/\<\/?code.*?\/?\>/g, "").slice(0, 220)}... </span><a href="${res.sourceUrl}" class="wikipedia" title="Wikipedia">${res.source}</a></div><div class="infobox"></div>`);
      if (res.image) {
        cekGambarAda(res.image, function(ada) {
            if (ada) {
                var dt = (res.type) ? `style="border:1px solid #999999"` : "";
                document.querySelector(".instant-answer").insertAdjacentHTML("afterbegin", `<img src="${res.image}" ${dt} align="right" class="logo" alt="${res.Heading}">`);
              
            }
        });
    }
      if (res.infobox) {
      for (var i = 0; i < res.infobox.length && i < 3; i++) {
        if (res.infobox[i].value.trim()) {
          document.querySelector(".instant-answer .infobox").innerHTML += `<span id="text_info"><b>${res.infobox[i].label}:</b> ${res.infobox[i].value}</span>`;
        }
      }}
    }
  
}

function relatedsearch(res) {
  var rltn = "";
  var inputText = res.query.trim().toLowerCase(); // Hapus spasi sebelum dibandingkan
  var count = 0;

  for (var i = 0; i < res.suggestions.length && count < 6; i++) {
    var suggestion = res.suggestions[i].trim(); // Hapus spasi di suggestion juga
    if (suggestion.toLowerCase() !== inputText) { 
      rltn += `<a href="/search?q=${suggestion}" class="related">${capitalize(suggestion)}</a>`;
      count++;
    }
  }

  if (rltn === "") return;

  var rltb = document.createElement("div");
  rltb.classList.add("related-search", "VtuHV");
  rltb.innerHTML = `<div class="YjKdl"><div class="title">${langtext("related")}</div></div><div class="search-list">${rltn}</div>`;

  if (count > 4) {
    document.querySelector(".main-result .result").appendChild(rltb);
    scrollRestore();
  }
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

function dateconversion(val, shortMonth) {
  let currentYear = new Date().getFullYear();  
  let parsedDate = new Date(val);

  if (isNaN(parsedDate)) {
    let cleanedVal = val.replace(/(\d{2}:\d{2}.*)/, "").trim();
    parsedDate = new Date(cleanedVal);

    if (isNaN(parsedDate)) {
      return "Invalid Date";
    }
  }

  let year = parsedDate.getFullYear();
  let day = parsedDate.getDate();
  let month = parsedDate.toLocaleString(locallang, { month: shortMonth ? 'short' : 'long' });

  if (year === currentYear) {
    return timeAgo(parsedDate);
  } else {
    return `${day} ${month} ${year}`;
  }
}

function nwsr(res) {
  try {
    for (var i = 0; i < res.items.length; i++) {
      publisher = (res.items[i].pagemap.metatags[0]['og:site_name']) ? res.items[i].pagemap.metatags[0]['og:site_name'] : res.items[i].displayLink;
      var publishTimeSources = [
        res.items[i]?.pagemap?.metatags?.[0]?.['article:published_time'],
        res.items[i]?.pagemap?.newsarticle?.[0].datepublished,
        res.items[i]?.pagemap?.newsarticle?.[0].datemodified
      ];

      var publishtime = publishTimeSources.find(time => time) ? dateconversion(publishTimeSources.find(time => time)) : "Published";
      newssnippet = (windowWidth > 780) ? `<div class="snippet">${res.items[i].snippet}</div>` : "";
      thumbimg = (res.items[i].pagemap.cse_thumbnail) ? `<img class="thumb" src="${res.items[i].pagemap.cse_thumbnail[0].src}">` : "";
      document.querySelector(".main-result").innerHTML += `<div class="tab-result nwst"><div class="snwt"><a href="${res.items[i].link}">${thumbimg}<div class="top"><img src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${res.items[i].link}&size=64" class="favicon"><div class="link">${publisher}</div></div><div class="title">${res.items[i].title.slice(0, 70)}</div>${newssnippet}<div class="publishtime">${publishtime}</div></a></div></div>`;
    }
    if (startIndex == 1) { shwfter(); }
  } catch(error) {
    if (!res.items) document.querySelector(".main-result").innerHTML += `<div class="tab-result"><div class="title-black">${langtext("noresult")}</div><div class="suggestion">${langtext("suggtext")}</div><div>${langtext("noresultsug")}</div></div>`;
  }
}

function hnvd(res) {
  if (res.items.length > 4) {
  var videonya = "";
  var a = 0;
  var b = a + 4;
  for (var i = a; i < res.items.length && i < b; i++) {
    videonya += `<div class="vidbung">
      <div class="tab-tb"><a href="https://youtube.com/watch?v=${res.items[i].id.videoId}"><div class="viditem">
        <div class="thumbnail">
          <img src="${res.items[i].snippet.thumbnails.medium.url}">
          <div class="XTiWK"><span class="NwGDz">
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle fill="#fff" cx="12" cy="12" r="6.2"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5"></path>
            </svg></span>
          </div>
        </div>
        <div class="sampingnye">
          <div class="joedoel">${res.items[i].snippet.title}</div>
          <div class="soember">YouTube<span class="dot"></span><div class="chnama">${res.items[i].snippet.channelTitle}</div></div>
          <div class="tanggal">${dateconversion(res.items[i].snippet.publishTime)}</div>
        </div>
      </div></a></div>
      </div>`;
  }
  var tabres = document.querySelectorAll(".Kj7VF");
  var hnvde = document.createElement("div");
  hnvde.classList.add("VtuHV")
  hnvde.classList.add("tab-result");
  hnvde.classList.add("Dxcgd");
  hnvde.innerHTML = `<div class="title Jhtm">${langtext("vidTitle")}</div><div class="PbNgks">${videonya}</div></div>`;
  if (tabres[0] && q.split(" ").length < 3) {
    insertAfter(tabres[0], hnvde);
  } else {
    document.querySelector(".main-result .result").insertAdjacentHTML("afterbegin", `<div class="tab-result Dxcgd eb8xCva">${hnvde.innerHTML}</div>`);
  }
 }
}

function videoresult(res) {
  try {
    for (var i = 0; i < res.items.length; i++) {
      document.querySelector(".main-result").innerHTML += `<div class="video-result"><a href="https://youtube.com/watch?v=${res.items[i].id.videoId}"  data-number="1"><img src="${res.items[i].snippet.thumbnails.medium.url}" class="thumbnail"><div class="title">${res.items[i].snippet.title}</div><div class="source"><div class="info">${timeAgo(res.items[i].snippet.publishTime)}</div><div class="info"><img src="images/youtube.png" class="favicon"><div>${res.items[i].snippet.channelTitle}</div></div> </div></a></div>`;
    }
    if (startIndex == 1) { shwfter(); }
    if (!res.items.length > 0) throw "empty";
  } catch(error) {
    document.querySelector(".result-wrapper").classList.add("CBpUsa");
    noresult();
  }
}

function nwsresult(data) {
  if (data.items?.length > 3) { // Use optional chaining for data.items
    var tabres = document.querySelectorAll(".tab-result");
    var nwsres = document.createElement("div");
    nwsres.classList.add("m6gAk", "VtuHV", "news-result"); // Combined class adding
    nwsres.innerHTML = `<div class="title">${langtext("news")}</div><div class="news-list"></div>`;
    insertAfter(tabres[(windowWidth > 780) ? 2 : 3], nwsres);

    // More robust filtering and processing
    data.items.forEach(item => { // Use forEach for simpler iteration
      if (item.pagemap?.cse_thumbnail?.length > 0 && item.pagemap.cse_thumbnail[0]?.src) {
        const thumbnailimg = item.pagemap.cse_thumbnail[0].src;
        const publisher = item.pagemap.metatags?.[0]?.['og:site_name'] ? item.pagemap.metatags?.[0]?.['og:site_name'] : item.displayLink; // Nullish coalescing

        toDataURL(thumbnailimg, function(dataUrl) {
          const newsTab = document.createElement("div");
          newsTab.classList.add("news-tab");
          newsTab.innerHTML = `<a href="${item.link}"><img src='${dataUrl}' class='thumbnail'><div class="title">${item.title}</div><div class="flexwrap"><img class="favicon" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.link}&size=64"><div class="link">${publisher}</div></div></a>`;

          document.querySelector(".news-result .news-list").appendChild(newsTab);
        });
      }
    });
  }
}

function getTms(site) {
  // Buat ID unik untuk menggantikan placeholder nanti
  let tempId = `imgd-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

  // Mengembalikan placeholder sementara agar tidak error
  fetch(`https://cdn.searchdata.workers.dev/?url=${site}`)
    .then(response => response.json())
    .then(data => {
      if (!data.images || data.images.length < 3) {
        document.getElementById(tempId).innerHTML = "Gambar tidak ditemukan";
        return;
      }

      document.getElementById(tempId).innerHTML = `
        <div class="img-grid">
          <div class="imgr img-main"><img src="${data.images[0]}" alt="Main Image"></div>
          <div class="imgr img-side"><img src="${data.images[1]}" alt="Side Image 1"></div>
          <div class="imgr img-side"><img src="${data.images[2]}" alt="Side Image 2"></div>
        </div>`;
    })
    .catch(error => {
    });

  // Mengembalikan div kosong dengan ID sementara
  return `<div id="${tempId}" class="imgd"></div>`;
}

function escapeHTML(str) {
  return str
    ? str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    : "";
}

  const charMap = {
    'a': 'XyZ', 'b': 'LmN', 'c': 'PoQ', 'd': 'AbC', 'e': 'EfG', 'f': 'HiJ',
    'g': 'KlM', 'h': 'NoP', 'i': 'QrS', 'j': 'TuV', 'k': 'WxY', 'l': 'ZaB',
    'm': 'CdE', 'n': 'FgH', 'o': 'IjK', 'p': 'LmO', 'q': 'NpR', 'r': 'StU',
    's': 'VwX', 't': 'YzA', 'u': 'BcD', 'v': 'EfH', 'w': 'GhJ', 'x': 'KlO',
    'y': 'MnQ', 'z': 'PrT', '0': 'UoV', '1': 'WxZ', '2': 'AaB', '3': 'CcD',
    '4': 'EeF', '5': 'GgH', '6': 'IiJ', '7': 'KkL', '8': 'MmN', '9': 'OoP',
    ':': 'QqR', '/': 'SsT', '.': 'UuV', '-': 'WwX', '_': 'YyZ'
};

const reverseMap = Object.fromEntries(
    Object.entries(charMap).map(([k, v]) => [v, k])
);

function encodeURL(url) {
    return url.split('').map(char => charMap[char] || char).join('');
}

function webresult(res) {
  try {
    var rsltsta = (idlang) ? `Sekitar ${res.searchInformation.formattedTotalResults} hasil (${res.searchInformation.formattedSearchTime} detik)` : `Approximately ${res.searchInformation.formattedTotalResults} result (${res.searchInformation.formattedSearchTime} seconds)`;
    var pageone = (startIndex  == 1) ? true : false;
    if (res.items && windowWidth > 700 && pageone) {
      document.querySelector(".main-result").insertAdjacentHTML('afterbegin', `<div class="WsXZp"><div class="result-stats">${rsltsta}</div></div>`);
    }
    if (res.items && res.spelling && pageone) {
      document.querySelector(".main-result .result").innerHTML += `<div class="corrected-word tab-result eb8xCva"><div class="snippet">${langtext("correct")} <a class="spelling" href="/search?q=${encodeURIComponent(res.spelling.correctedQuery).replace(/\%20/g,'+')}${searchlang}">${res.spelling.correctedQuery}</a><span>?</span></div></div>`;
    }
    if (res.items.length > 9 && pageone) {
      instantanswer();
    }
    if (res.items.length < 10) {
      XuadHc("stop", res)
    }
    if (res.promotions && pageone) {
      for (var i = 0; i < res.promotions.length; i++) {
        document.querySelector(".main-result .result").innerHTML += `<div class="tab-result eb8xCva" sf-test"eb8xCva"><div class="tab-link"  data-number="${i}"><a href="${res.promotions[i].link}"><div class="top"><div class="link">${res.promotions[i].displayLink}</div><div class="ads">${langtext("adlabel")}</div></div><div class="title">${res.promotions[i].title}</div></a></div><div class="btm-snpt"><div class="snippet">${res.promotions[i].bodyLines[0].title}</div></div></div>`;
      }
    }
      res.items.forEach((item) => {
        if (item?.pagemap?.event?.[0]?.summary) {
          document.querySelector(".main-result .result").insertAdjacentHTML('afterbegin', `<div class="VtuHV Kj7VF tab-result eb8xCva"><div style="font-size:18px;color:black">${item?.pagemap?.event?.[0]?.summary}</div></div>`);
        }
      });
    for (var i = 0; i < res.items.length; i++) {
      var originurl = new URL(res.items[i].link);
      var urlparam = (originurl.pathname.length > 1) ? originurl.pathname.replaceAll("/", " › ") : "";

      
      urlparam = urlparam.endsWith(" › ") ? urlparam.slice(0, -3) : urlparam;
      urlparam = originurl.origin + urlparam;

      var hasPri = (res.items[i]?.pagemap?.offer?.[0]?.price && res.items[i].pagemap.offer[0].price !== "0") 
    ? `<div class="snippet"><span style="padding-top:2px">Price: ${res.items[i].pagemap.offer[0].price}</span></div>` 
    : '';

      var fdta = `tab-num="${i}" data-test="awokwok" data-ved="0" isMobile="${isMobile}" data-sx="maacaa-cihh"`;
      displayUrl = res.items[i].displayLink;
      var siteName = res.items[i]?.pagemap?.metatags?.[0]?.['og:site_name'] ?? displayUrl;
      var bigThumb = (isMobile && res.items[i]?.pagemap?.metatags?.[0]?.['og:type'] == "website") ? '' : '';
      var snippet = (res.items[i]?.pagemap?.question?.[0]?.text) ? `${dateconversion(res.items[i]?.pagemap?.question?.[0]?.datecreated, true)} - ${escapeHTML(res.items[i]?.pagemap?.question?.[0]?.text)})` : escapeHTML(res.items[i].snippet);
      var hasAns = "";
      if (res.items[i]?.pagemap?.answer) {
        var bth = "";
        var validQuest = res.items[i].pagemap.question.length > 1 && res.items[i].pagemap.question.length === res.items[i].pagemap.answer.length;
        var sc = (res.items[i].pagemap.answer.length > 1) ? `max-width:250px` : '';
        res.items[i].pagemap.answer.forEach((ans, index) => {
          bth += `<div class="snippet bgg" style="display:block;${sc}">${(validQuest) ? `<span style="font-weight:500;margin-bottom:6px;color:#292828;">${res.items[i].pagemap.question[index].name}</span>` : ''}<span style="-webkit-line-clamp:4;" class="rawr">${escapeHTML(ans.text)}</span>${(ans.upvotecount !== undefined) ? `<br><span style="font-size:12px;color:#474747;font-weight:500;">${ans.upvotecount} ${(idlang) ? "Suara" : "Votes"}</span>` : ''}</div>`;
        });
        if (bth) {
          hasAns = `<div class="btm-snpt scl">${bth}</div>`;
        }
      }
      
      var isThumb = (!bigThumb && res.items[i]?.snippet?.length > 150 && res.items[i]?.pagemap?.cse_thumbnail) ? `<div class="thumbnail"><img src="${res.items[i].pagemap.cse_thumbnail[0].src}"></div>` : "";
           document.querySelector(".main-result .result").insertAdjacentHTML('beforeend', `<div class="VtuHV Kj7VF tab-result eb8xCva" ${fdta}><div class="CeWka NbkAw"><div class="tab-link"  data-number="${i}"><a href="${res.items[i].link}"><div class="top"><div class="favicon"><img src="https://datasearch.searchdata.workers.dev/img/${encodeURL(originurl.hostname)}"></div><div class="link-rw"><div class="link">${siteName}</div><div class="link k">https://${res.items[i].displayLink}</div></div></div><div class="title">${escapeHTML(res.items[i].title)}</div></a></div>${bigThumb}<div class="btm-snpt"><div class="snippet rawr"><span>${snippet || langtext("noSiteInfo")}</span></div>${hasPri}${showLinks(res.items[i].link)}</div>${hasAns}</div></div>`);
    }
    if (getData().favicon == false || fv == 0) {
      document.querySelectorAll(".favicon").forEach(elm => {
        elm.remove();
      });
    }
    
    if (res.queries?.nextPage && pageone) {
      document.querySelector(".main-result").innerHTML += `<div class="show-wrapper"><div class="mXsk8"></div><button class="more">${langtext("more")}</button></div>`;
    } else if (!res.queries?.nextPage) {
      XuadHc("stop", res);
    }
    
    if (!res.spelling && pageone && /\b\w+\s+video(?:s)?\b/i.test(q)) {
      fetch(`https://datasearch.searchdata.workers.dev/api?q=${q}&tbm=vid&maxResults=6`)
        .then(response => response.json()).then(response => {
          hnvd(response);
      })
    }
    var newsKey = ['chrome', 'youtube', 'twitter', 'google', 'microsoft', 'duckduckgo', 'sepak bola'];
    if (newsKey.includes(q.trim().toLowerCase()) && pageone) {
      fetch(`https://datasearch.searchdata.workers.dev/api?q=${q}&hl=id&tbm=nws`)
        .then(response => response.json()).then(response => {
          nwsresult(response);
      })
    }
    XuadHc("stop", res);
    if (pageone) {
      shwfter();
      jwbn();
      fetch(`https://datasearch.searchdata.workers.dev/suggest?q=${q}`)
        .then(response => response.json()).then(response => {
          relatedsearch(response);
      })
    }
    scrollRestore();
    } catch(error) {
    alert(error.message);
    if (pageone && !res.items) noresult();
  }
}

function noresult() {
  nosugtext = "";
  for (var i = 0; i < 3; i++) {
    nosugtext += `<li>${langtext("noresultsug", i)}</li>`;
  }
  document.querySelector(".main-result").innerHTML += `<div class="tab-result Nrltf eb8xCva"><div class="title-black">${langtext("noresult")}</div><div class="suggestion">${langtext("suggtext")}</div><div>${nosugtext}</div></div>`;
}

function shwfter() {
  document.querySelector(".QZjVU").insertAdjacentHTML('beforeend', `<section class="footer"><ul class="list"><li><a href="/settings">Settings</a></li><li><a href="/">Privacy</a></li><li><a href="/search?q=translate">Translate</a></li></ul><div class="copyright">©Copyright 2023</div></section>`);
  
}

function share() {
  if (navigator.share) {
    navigator.share({
      title: "",
      url: window.location.href
    })
  }
}

function XuadHc(cmt, res) {
  var maxIndex = 30;
  if (cmt != "stop" && startIndex < maxIndex) {
  document.querySelector(".show-wrapper").innerHTML = `<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div>`;
    if (startIndex < maxIndex && navigator.onLine) {
      startIndex += 10;
      setTimeout(submit, 500);
    }
  } else if (startIndex > maxIndex || res.searchInformation.totalResults == 0 || !res.queries?.nextPage) {
      document.querySelector(".show-wrapper")?.remove();
      if (res.items.length > 9) document.querySelector(".main-result").innerHTML += `<div class="tab-result eb8xCva" style="padding-top: 16px;" data-text="wkwkwk" test-focus="affh-iyh"><div test-focus="macca-cih" class="btm-snpt"><div class="snippet" style="font-size:16px;">Maaf. Untuk sementara waktu, kami perlu membatasi hasil pencarian yang muncul :p</div></div></div>`;
  } else {
      document.querySelector(".show-wrapper").innerHTML = `<div class="mXsk8"></div><button class="more">${langtext("more")}</button>`;
  }
  
}

document.addEventListener('click', function(event) {
  var target = event.target;
  if (target.matches('.show-wrapper .more')) {
    XuadHc();
  }
});

window.addEventListener('load', ()=> {
  if (getData().newtab == true) {
    setTimeout(()=> {
      document.querySelectorAll(".main-result a").forEach(elm => {
        elm.target = "_blank";
      });
    },1000)
  }
});
