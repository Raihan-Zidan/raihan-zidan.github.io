    const container = document.querySelector(".main-result");
    const shwrapper = document.querySelector(".show-wrapper");
    const minWidth = 150;
    const maxColumns = 6;
    const gap = 1;
    let start = 0;
    const maxStart = 30;
    let isLoading = false;
    let lastFetchHeight = 0;

    function positionItems() {
        const items = Array.from(container.querySelectorAll(".img-tb"));
        if (items.length === 0) return;

        const containerWidth = container.clientWidth;
        let cols = Math.floor(containerWidth / (minWidth + gap));
        cols = Math.max(1, Math.min(maxColumns, cols));

        let itemWidth = Math.floor((containerWidth - (cols - 1) * gap) / cols);
        let columnHeights = new Array(cols).fill(0);

        items.forEach((item) => {
            let imgThumb = item.querySelector(".img-thumb");

            item.style.width = `${itemWidth}px`;
            imgThumb.style.width = `${itemWidth - 8}px`;

            let colIndex = columnHeights.indexOf(Math.min(...columnHeights));
            let topPos = columnHeights[colIndex];
            let leftPos = colIndex * (itemWidth + gap);

            item.style.position = "absolute";
            item.style.left = `${leftPos}px`;
            item.style.top = `${topPos}px`;

            let itemHeight = item.getBoundingClientRect().height + gap;
            columnHeights[colIndex] += itemHeight;
        });

        container.style.height = `${Math.max(...columnHeights)}px`;
    }

    window.addEventListener("resize", positionItems);

    function fetchData() {
        if (isLoading || start > maxStart) return;
        isLoading = true;

        fetch(`https://imagesearch.raihan-zidan2709.workers.dev/?q=${q}&start=${start}`)
            .then(response => response.json())
            .then(response => {
                renderResults(response);
                start += 10;
                lastFetchHeight = document.body.scrollHeight;
                shwrapper.innerHTML = '';
            })
            .catch(error => {
                isLoading = false;
                shwrapper.innerHTML = '';
            });
    }

    function renderResults(res) {
        let fragment = document.createDocumentFragment();

        for (let i = 1; i < res.images.length; i++) {
            let imgElement = document.createElement("img");
            imgElement.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            loadImage(imgElement, res.images[i].thumbnail, res.images[i].image);
            positionItems();
            imgElement.loading = "lazy";

            imgElement.onload = function () {
              if (imgElement.parentElement) {
                imgElement.parentElement.style.height = `${imgElement.height}px`;
                positionItems();
              }
            }
            imgElement.onerror = function () {
                let parent = imgElement.closest(".img-tb");
                if (parent) parent.remove();
                positionItems();
            };

            let imgContainer = document.createElement("div");
            imgContainer.classList.add("img-tb");
            imgContainer.innerHTML = `
                <div class="img-th">
                    <div class="img-dt">
                        <div class="img-thumb" height="250px"></div>
                        <a class="info" href="${res.images[i].pageUrl}">
                            <p class="title">${res.images[i].title}</p>
                            <p class="i-desc">
                              <img data-src="" src="https://datasearch.raihan-zidan2709.workers.dev/favicon?url=${res.images[i].pageUrl}">
                              <span>${res.images[i].siteName}</span>
                            </p>
                        </a>
                    </div>
                </div>`;
            
            imgContainer.querySelector(".img-thumb").appendChild(imgElement);
            container.insertBefore(imgContainer, shwrapper);
        }

        container.appendChild(fragment);
        isLoading = false;
        positionItems();
    }


function loadImage(imgElement, thumbnailSrc, fullSrc) {
    imgElement.src = thumbnailSrc;
    imgElement.style.filter = "blur(2px)";
    imgElement.style.transition = "filter .8s ease-in-out";
    
    const fullImage = new Image();
    fullImage.src = fullSrc;
    fullImage.onload = function () {
      imgElement.src = fullSrc;
      imgElement.style.filter = "blur(0)";
    };
    setTimeout(() => {
      imgElement.src = fullSrc;
    }, 2000);
    setTimeout(() => {
      imgElement.style.filter = "blur(0)";
    }, 5000);

}

    window.addEventListener("scroll", function () {
        if (isLoading) return;

        const scrollThreshold = 200; // Batas minimal scroll sebelum fetch baru
        const hasScrolledPastLastFetch = window.scrollY > lastFetchHeight - scrollThreshold;

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasScrolledPastLastFetch) {
            shwrapper.innerHTML += `<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div>`;
            setTimeout(fetchData, 1000);
        }
    });

    fetchData();


function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (isMobile()) {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="preview">
      <div class="p-header">
        <div class="left">
          <div class="p-fav">
            <img src="">
          </div>
          <div class="title"></div>
        </div>
        <div class="right">
          <div class="p-fav close-preview">
            <svg viewBox="0 0 24 24" focusable="false" height="24" width="24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="thumbnail">
        <img src="" alt="Preview">
      </div>
      <div class="jtext-p">
        <div class="left">
          <div class="title"></div>
          <div class="d"></div>
        </div>
        <div class="right">
          <button><a href="">Kunjungi</a></button>
        </div>
      </div>
    </div>
  `);

  const preview = document.querySelector(".preview");
  preview.style.display = "none";

  function showPreview() {
    preview.style.display = "block";
    document.documentElement.style.overflow = "hidden";
  }

  // Fungsi untuk menyembunyikan preview
  function hidePreview() {
    preview.style.display = "none";
    document.documentElement.style.overflow = "auto";
  }

  // Event listener untuk tombol close (X)
  document.querySelector(".close-preview").addEventListener("click", hidePreview);

  // Event delegation untuk menangani klik gambar
  document.body.addEventListener("click", (event) => {
    const img = event.target.closest(".img-tb img");
    if (!img) return;

    const parent = img.closest(".img-tb");
    showPreview();

    if (parent) {
      const titleElement = parent.querySelector(".info .title");
      const descElement = parent.querySelector(".i-desc span");
      const infoLinkElement = parent.querySelector(".info");
      const descImgElement = parent.querySelector(".i-desc img");

      if (titleElement) {
        preview.querySelector(".jtext-p .left .title").innerText = titleElement.innerText;
      }
      if (descElement) {
        preview.querySelector(".jtext-p .left .d").innerText = "Gambar mungkin saja memiliki hak cipta.";
        preview.querySelector(".p-header .title").innerText = descElement.innerText;
      }
      if (infoLinkElement) {
        preview.querySelector(".jtext-p .right a").href = infoLinkElement.href;
      }
      if (descImgElement) {
        preview.querySelector(".p-fav img").src = descImgElement.src;
      }
      preview.querySelector(".thumbnail img").src = img.src;
    }
  });
}


