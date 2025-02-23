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
  fetch(`https://imagesearch.raihan-zidan2709.workers.dev/?q=${q}&start=${start}`).then(response => response.json()).then(response => {
    renderResults(response);
    start += 10;
    lastFetchHeight = document.body.scrollHeight;
    shwrapper.innerHTML = '';
  }).catch(error => {
    isLoading = false;
    shwrapper.innerHTML = '';
  });
}

function renderResults(res) {
  let fragment = document.createDocumentFragment();
  for (let i = 1; i < res.images.length; i++) {
    let imgElement = document.createElement("img");
    imgElement.src = res.images[i].thumbnail;
    imgElement.loading = "lazy";
    // Buat container untuk gambar
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-tb");
    // Load gambar asli
    loadImage(imgElement, res.images[i].thumbnail, res.images[i].image);
    imgElement.onload = function() {
      if (imgElement.parentElement) {
        imgElement.parentElement.style.height = `${imgElement.height}px`;
        positionItems();
      }
    imgContainer.innerHTML = `
                <div class="img-th">
                    <div class="img-dt">
                        <div class="img-thumb" style="height:${imgElement.height}px">
                        </div>
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
    };
    imgElement.onerror = function() {
      let parent = imgElement.closest(".img-tb");
      if (parent) parent.remove();
      positionItems();
    };
   

        // Tambahkan elemen img ke dalam div thumbnail
    fragment.appendChild(imgContainer);

                                               }
  container.insertBefore(fragment, shwrapper);
  isLoading = false;
  positionItems();
}

function getRandomValue() {
  const values = [100, 160, 200, 260];
  return values[Math.floor(Math.random() * values.length)];
}

function loadImage(imgElement, thumbnailSrc, fullSrc) {
  imgElement.src = thumbnailSrc;
  imgElement.style.filter = "blur(2px)";
  imgElement.style.transition = "filter .5s ease-in-out";
  const fullImage = new Image();
  fullImage.src = fullSrc;
  fullImage.onload = function() {
    imgElement.src = fullSrc;
    imgElement.style.filter = "blur(0)";
  };
  setTimeout(() => {
    imgElement.style.filter = "blur(0)";
  }, 5000);
}

function getImageSize(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function() {
      resolve([this.width, this.height]); // Mengembalikan array [width, height]
    };
    img.onerror = function() {
      resolve([null, null]); // Jika gagal dimuat
    };
    img.src = imageUrl;
  });
}
window.addEventListener("scroll", function() {
  if (isLoading) return;
  const scrollThreshold = 200; // Batas minimal scroll sebelum fetch baru
  const hasScrolledPastLastFetch = window.scrollY > lastFetchHeight - scrollThreshold;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasScrolledPastLastFetch) {
    shwrapper.innerHTML = `<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div>`;
    setTimeout(fetchData, 1000);
  }
});
fetchData();

function isMobile() {
      return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    if (isMobile()) {
      document.querySelector(".cbKRN").insertAdjacentHTML("beforeend", `
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
      // Fungsi untuk menyembunyikan preview
      function hidePreview() {
        preview.style.display = "none";
        document.documentElement.style.overflow = "auto";
      }
      // Event listener untuk tombol close (X)
      document.querySelector(".close-preview").addEventListener("click", hidePreview);
      // Event delegation untuk menangani klik gambar
      document.body.addEventListener("click", (event) => {
        const img = event.target.closest(".img-thumb img");
        if (!img) {
          console.log("No matching image found");
          return;
        }
        event.preventDefault();
        const rect = img.getBoundingClientRect();
        const clone = img.cloneNode(true);
        document.body.appendChild(clone);
        // Set posisi awal clone (sesuai posisi asli gambar)
        clone.style.position = "fixed";
        clone.style.top = `${rect.top}px`;
        clone.style.left = `${rect.left}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.zIndex = "9999";
        clone.style.borderRadius = "10px";
        clone.style.transition = "all 0.3s ease-in-out";
        clone.style.objectFit = "cover";
        // Ambil elemen preview
        const preview = document.querySelector(".preview");
        const previewImg = preview ? preview.querySelector(".thumbnail img") : null;
        if (!preview || !previewImg) {
          return;
        }
        const previewRect = previewImg.getBoundingClientRect();
        // Menentukan ukuran dengan max-height 260px
        const aspectRatio = rect.width / rect.height;
        const newHeight = 260; // Max height tetap 260px
        const newWidth = newHeight * aspectRatio; // Width menyesuaikan aspect ratio
        // Hitung posisi tengah halaman untuk memastikan ke tengah atas
        const centerX = (window.innerWidth - newWidth) / 2;
        const centerY = previewRect.top + 55; // Posisi atas mengikuti preview
        // Efek zoom-in sebelum berpindah
        setTimeout(() => {
          clone.style.transform = "scale(1.05)";
        }, 50);
        // Geser ke tengah atas dengan ukuran yang benar
        setTimeout(() => {
          clone.style.top = `${centerY}px`;
          clone.style.left = `${centerX}px`;
          clone.style.width = `${newWidth}px`;
          clone.style.height = `${newHeight}px`;
          // Setelah animasi selesai, ganti dengan preview asli
          setTimeout(() => {
            document.body.removeChild(clone);
            showPreview(img);
          }, 150);
        }, 200);
      });
      // Fungsi menampilkan preview
      function showPreview(img) {
        const preview = document.querySelector(".preview");
        if (!preview) return;
        preview.style.display = "block";
        document.documentElement.style.overflow = "hidden";
        const parent = img.closest(".img-tb");
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
      }
    }
