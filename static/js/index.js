let index = 0;

function showSlide(i) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach((slide, idx) => {
        slide.style.opacity = idx === i ? '1' : '0';
    });

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === i);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');

    const slides = document.querySelectorAll('.slide');
    const total = slides.length;

    slides.forEach((slide, idx) => {
        slide.style.opacity = idx === 0 ? '1' : '0';
    });

    next.addEventListener('click', () => {
        index = (index + 1) % total;
        showSlide(index);
    });

    prev.addEventListener('click', () => {
        index = (index - 1 + total) % total;
        showSlide(index);
    });

    setInterval(() => {
        index = (index + 1) % total;
        showSlide(index);
    }, 4000);
});

(function () {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main-content');

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const opened = sidebar.classList.toggle('open');
        sidebar.setAttribute('aria-hidden', String(!opened));
        menuBtn.setAttribute('aria-expanded', String(opened));
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.classList.contains('open')) return;
        const target = e.target;
        if (!sidebar.contains(target) && !menuBtn.contains(target)) {
            sidebar.classList.remove('open');
            sidebar.setAttribute('aria-hidden', 'true');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === "#oferta") {
        const seccion = document.getElementById("oferta");
        if (seccion) {
            const header = document.querySelector(".menu");
            const headerH = header ? header.offsetHeight : 0;

            const top = seccion.getBoundingClientRect().top + window.scrollY - headerH - 10;

            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
    }
});

const hoy = new Date().toISOString().split("T")[0];
document.getElementById("fechaCita").min = hoy;

document.getElementById("formCita").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const datos = new FormData(form);

    const respuesta = await fetch("/guardar_cita", {
        method: "POST",
        body: datos
    });

    alert("La cita ha sido registrada");

    form.reset();
});
