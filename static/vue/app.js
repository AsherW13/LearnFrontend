const { createApp} = Vue;

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
    }
}).mount('#app');