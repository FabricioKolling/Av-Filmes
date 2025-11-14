const carousel = document.getElementById('carousel');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

if (carousel && btnLeft && btnRight) {

    const getScrollAmount = () => {
        const firstCard = carousel.querySelector('.box-cartaz');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const cardGap = parseInt(window.getComputedStyle(carousel).gap, 10) || 18;

            return (cardWidth + cardGap) * 5;
        }
        // Fallback caso não ache o card
        return Math.round(carousel.clientWidth * 0.7);
    };

    const updateArrowState = () => {
        if (!carousel) return;

        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const buffer = 1;

        if (scrollLeft <= buffer) {
            btnLeft.classList.add('hidden');
        } else {
            btnLeft.classList.remove('hidden');
        }

        if (scrollLeft >= maxScroll - buffer) {
            btnRight.classList.add('hidden');
        } else {
            btnRight.classList.remove('hidden');
        }
    };

    btnLeft.addEventListener('click', () => {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateArrowState);

    window.addEventListener('resize', updateArrowState);

    setTimeout(updateArrowState, 100);

} 

(function() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar || !toggle) return;

    toggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('open')) {
                navbar.classList.remove('open');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!navbar.classList.contains('open')) return;

        if (!navbar.contains(e.target) && window.innerWidth <= 880) {
            navbar.classList.remove('open');
        }
    });
})();