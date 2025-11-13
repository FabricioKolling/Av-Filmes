const carousel = document.getElementById('carousel');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

if (carousel && btnLeft && btnRight) {
    const scrollAmount = () => Math.round(carousel.clientWidth * 0.7); // distancia do scroll a cada clique

    btnLeft.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
}

(function() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar || !toggle) return;

    toggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });

    // fechar ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('open')) navbar.classList.remove('open');
        });
    });

    // fechar ao clicar fora do menu (mobile)
    document.addEventListener('click', (e) => {
        if (!navbar.classList.contains('open')) return;
        if (!navbar.contains(e.target) && window.innerWidth <= 880) {
            navbar.classList.remove('open');
        }
    });
})();