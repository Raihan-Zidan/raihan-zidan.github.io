searchInput = document.querySelector(".search-input");
searchItem = document.querySelectorAll(".tab-wrapper");
cleartext = document.querySelector(".cleartext");
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
  if (event.keyCode === 13 && searchInput.value != '' && searchInput.value.trim()) {
    window.location.href = `/videos?q=${encodeURIComponent(searchInput.value).replace(/\%20/g,'+')}`;
  }
});

function submit() {
  hasil = document.getElementById("hasil").innerHTML = "";
  var val = searchInput.value;
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${val}&type=video&key=AIzaSyAqc7T67GDJ208Y8CvR8YaPrNZlzKa2XbE`)
    .then(response => response.json()).then(response => {
      hndlr(response);
  })
}

function convertImage(imageUrl, imageFile) {
  alert(imageUrl);
}

function hndlr(res) {
  try {
    for (var i = 0; i < res.items.length; i++) {
      document.getElementById("hasil").innerHTML += `<div class="video-result"><a href="https://youtube.com/watch?v=${res.items[i].id.videoId}"><img src="${res.items[i].snippet.thumbnails.medium.url}" class="thumbnail"><div class="title">${res.items[i].snippet.title}</div><div class="source"><div class="info"><img src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.youtube.com&size=64" class="favicon"><div>www.youtube.com</div></div></div></a></div>`;
    }
    setTimeout(()=> {
      var iconImage = document.querySelectorAll(".thumbnail");
      iconImage.forEach(icon => {
        convertImage(icon.src, icon);
      });
    },2000);
  } catch(error) {
    document.getElementById("hasil").innerHTML += `<div class="tab-result"><div class="title black">No matching results</div><div class="snippet suggestion">Search suggestions:</div><div class="snippet"><li>Try different keywords.</li><li>Try more general keywords.</li><li>Try fewer keywords.</li></div></div>`;
  }
}
