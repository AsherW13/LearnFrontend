document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/launches")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("launch-list");
      const select = document.getElementById("launchSelect");

      data.slice(0, 20).forEach((launch) => {
        const option = document.createElement("option");
        option.value = launch.name;

        option.textContent = launch.name;
        select.appendChild(option);
      });

      renderLaunches(data.slice(0, 20));

      select.addEventListener("change", () => {
        const selected = select.value;
        const filtered = selected
          ? data.filter((l) => l.name === selected)
          : data.slice(0, 20);
        renderLaunches(filtered);
      });

      const carouselInner = document.getElementById("carousel-inner");
      let first = true;

      data.forEach((launch) => {
        if (launch.links?.youtube_id) {
          const item = document.createElement("div");
          item.className = `carousel-item ${first ? "active" : ""}`;
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

      function renderLaunches(launches) {
        list.innerHTML = "";
        launches.forEach((launch) => {
          const li = document.createElement("li");
          li.className = "list-group-item bg-secondary text-white mb-2 rounded";
          li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
              <span><strong>${launch.name}</strong></span>
              <span>${new Date(launch.date_utc).toLocaleDateString()}</span>
            </div>
          `;
        list.appendChild(li);
      });
    }
    })
    .catch((err) => {
      console.error("Failed to load launches:", err);
      const error = document.createElement("div");
      error.className = "alert alert-danger";
      error.textContent = "Failed to fetch SpaceX launch data.";
      document.body.appendChild(error);
    });
});
