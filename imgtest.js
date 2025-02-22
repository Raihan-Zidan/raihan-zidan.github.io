
    const container = document.querySelector(".main-result");
    const shwrapper = document.querySelector(".show-wrapper");
    const minWidth = 150;
    const maxColumns = 6;
    const gap = 0;
    let start = 0;
    const maxStart = 30;
    let isLoading = false;
    let lastFetchHeight = 0; // Ketinggian terakhir saat fetch

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
                lastFetchHeight = document.body.scrollHeight; // Simpan posisi scroll terakhir
                isLoading = false;
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
            imgElement.src = res.images[i].url;
            imgElement.loading = "lazy";

            imgElement.onload = function () {
              imgElement.parentElement.style.height = `${imgElement.height}px`;
              positionItems;
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
                        <div class="img-thumb"></div>
                        <a class="info" href="${res.images[i].pageUrl}">
                            <p>${res.images[i].title}</p>
                            <p>${res.images[i].siteName}</p>
                        </a>
                    </div>
                </div>`;
            
            imgContainer.querySelector(".img-thumb").appendChild(imgElement);
            container.insertBefore(imgContainer, shwrapper);
        }

        container.appendChild(fragment);
        positionItems();
    }

    window.addEventListener("scroll", function () {
        if (isLoading) return;

        const scrollThreshold = 200; // Batas minimal scroll sebelum fetch baru
        const hasScrolledPastLastFetch = window.scrollY > lastFetchHeight - scrollThreshold;

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasScrolledPastLastFetch) {
            shwrapper.innerHTML = `<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div>`;
            setTimeout(fetchData, 3000);
        }
    });

    fetchData();
