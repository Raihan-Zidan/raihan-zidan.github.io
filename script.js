var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var url = new URL(window.location.href);
var q = url.searchParams.get("q");
document.title = `${q} - Search`;
var startIndex = 1;
document.body.innerHTML += `<div class="header"><div class="search-box"><div class="search-field"><input class="search-input" value="${q}" autocorrect="off" autocomplete="off" autocapitalize="off" placeholder="Type to search..."><div role="button" class="cleartext"></div></div></div><div class="search-menu"><div class="search-item selected"><div class="tab-wrapper" id="all"><img src="images/search.svg"><span>All</span></div></div><div class="search-item"><a href="" class="tab-wrapper" id="images"><img src="images/image.svg"><span>Images</span></a></div><div class="search-item"><a href="" class="tab-wrapper" id="videos"><img src="images/video.svg"><span>Videos</span></a></div><div class="search-item"><a href="" class="tab-wrapper" id="maps"><img src="images/maps.svg"><span>Maps</span></a></div></div></div><div id="hasil"></div>`;
