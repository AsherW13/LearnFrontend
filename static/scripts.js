document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/launches")
    .then((res) => res.json())
    .then((data) => {

      document.addEventListener("scroll", () => {
        const element = document.querySelector(".navbar-shadow");

        if(window.scrollY > 10)
        {
          element.classList.add("scrolled");
        }
        else
        {
          element.classList.remove("scrolled");
        }
      });
      const list = document.getElementById("launch-list");
      const yearSelect = document.getElementById("yearSelect");
      const carouselInner = document.getElementById("carousel-inner");
      const carousel = document.getElementById("videoCarousel");

      const years = [...new Set(data.map(launch => new Date(launch.date_utc).getFullYear()))].sort((a,b) => b - a);
      years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      });

      let filteredLaunches = data.slice(0, 20);

      renderLaunches(filteredLaunches);
      renderCarousel(filteredLaunches);

      yearSelect.addEventListener("change", () => {
        const selectedYear = yearSelect.value;
        if (selectedYear) {
          filteredLaunches = data.filter(launch => new Date(launch.date_utc).getFullYear().toString() === selectedYear);
        } else {
          filteredLaunches = data.slice(0, 20);
        }
        renderLaunches(filteredLaunches);
        renderCarousel(filteredLaunches);
      });

      function renderLaunches(launches) {
        list.innerHTML = "";
        launches.forEach((launch) => {
          const li = document.createElement("li");
          li.className = "list-group-item bg-secondary text-white mb-2 rounded";
          li.dataset.youtubeId = launch.links?.youtube_id || "";
          li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
              <span><strong>${launch.name}</strong></span>
              <span>${new Date(launch.date_utc).toLocaleDateString()}</span>
            </div>
          `;
          list.appendChild(li);
        });
        highlightActiveLaunch();
      }

      function renderCarousel(launches) {
        carouselInner.innerHTML = "";
        let first = true;
        launches.forEach((launch) => {
          if (launch.links?.youtube_id) {
            const item = document.createElement("div");
            item.className = `carousel-item ${first ? "active" : ""}`;
            item.dataset.youtubeId = launch.links.youtube_id;
            item.innerHTML = `
              <div class="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/${launch.links.youtube_id}" 
                        title="${launch.name}" 
                        allowfullscreen></iframe>
              </div>
            `;
            carouselInner.appendChild(item);
            first = false;
          }
        });
      }

      function highlightActiveLaunch() {
        const activeItem = carousel.querySelector(".carousel-item.active");
        const activeId = activeItem?.dataset.youtubeId || "";
        const listItems = document.querySelectorAll("#launch-list li");
        listItems.forEach(li => {
          if (li.dataset.youtubeId === activeId && activeId !== "") {
            li.classList.remove('bg-secondary');
            li.classList.add('bg-highlight'); 
          } else {
            li.classList.remove('bg-highlight');
            li.classList.add('bg-secondary');
          }
        });
      }

      carousel.addEventListener("slid.bs.carousel", () => {
        highlightActiveLaunch();
      });

    })
    .catch((err) => {
      console.error("Failed to load launches:", err);
      const error = document.createElement("div");
      error.className = "alert alert-danger";
      error.textContent = "Failed to fetch SpaceX launch data.";
      document.body.appendChild(error);
    });
});
