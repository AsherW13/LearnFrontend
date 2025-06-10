document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/launches")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("launch-list");

      data.slice(0, 20).forEach((launch) => {
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
    })
    .catch((err) => {
      console.error("Failed to load launches:", err);
      const error = document.createElement("div");
      error.className = "alert alert-danger";
      error.textContent = "Failed to fetch SpaceX launch data.";
      document.body.appendChild(error);
    });
});
