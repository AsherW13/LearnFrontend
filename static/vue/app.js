const { createApp } = Vue;

const NavbarComponent = {
  template: `
    <nav class="navbar navbar-dark bg-dark justify-content-between sticky-top navbar-shadow">
      <a class="navbar-brand">Made by <strong>Asher Weitz</strong></a>
      <div>
        <a href="https://github.com/AsherW13" target="_blank" class="text-light mx-2 text-decoration-none" aria-label="GitHub">
          <i class="bi bi-github" style="font-size: 2rem;"></i>
        </a>
        <a href="https://www.linkedin.com/in/asher-weitz/" target="_blank" class="text-light mx-2 text-decoration-none" aria-label="LinkedIn">
          <i class="bi bi-linkedin" style="font-size: 2rem;"></i>
        </a>
      </div>
    </nav>
  `
};

createApp({
  components: {
    'navbar-component': NavbarComponent
  },
  data() {
    return {
      launches: [],
      selectedYear: '',
    };
  },
  computed: {
    years() {
      const uniqueYears = new Set(
        this.launches.map(launch => new Date(launch.date_utc).getFullYear())
      );
      return Array.from(uniqueYears).sort((a, b) => b - a);
    },
    filteredLaunches() {
      if (!this.selectedYear) return this.launches.slice(0, 20);
      return this.launches.filter(
        l => new Date(l.date_utc).getFullYear().toString() === this.selectedYear
      );
    }
  },
  mounted() {
    fetch("/api/launches")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched launches:", data);
        this.launches = data;
        this.$nextTick(() => {
          this.initCarouselHighlighting();
        });
      })
      .catch(e => console.error("Failed to fetch launches", e));
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    initCarouselHighlighting() {
      const carousel = document.getElementById("videoCarousel");
      if (!carousel) return;
      carousel.addEventListener("slid.bs.carousel", this.highlightActiveLaunch);
      this.highlightActiveLaunch();
    },
    highlightActiveLaunch() {
      const carousel = document.getElementById("videoCarousel");
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
  }
}).mount('#app');
