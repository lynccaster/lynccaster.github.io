// Main JS for navigation, Swiper, and ScrollReveal

document.addEventListener('DOMContentLoaded', function () {
    // ========== NAV MENU SHOW/HIDE ==========
    const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close');

    // Show menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
    // Hide menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
    // Remove menu on nav link click (mobile UX)
    document.querySelectorAll('.nav__link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    }));

    // ========== SWIPER FOR WORK & TESTIMONIALS ==========
    if (typeof Swiper !== 'undefined') {
        new Swiper('.work__container', {
            loop: true,
            grabCursor: true,
            spaceBetween: 24,
            pagination: {
                el: '.work__container .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                568: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
        new Swiper('.testimonial__container', {
            loop: true,
            grabCursor: true,
            spaceBetween: 24,
            pagination: {
                el: '.testimonial__container .swiper-pagination',
                clickable: true,
            },
        });
    }

    // ========== SCROLLREVEAL ANIMATION ==========
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '40px',
            duration: 1200,
            delay: 200,
            reset: false
        });
        sr.reveal('.home__content, .home__img, .about__container, .skills__container, .services__container, .work__container, .testimonial__container, .contact__container, .footer__container', {
            interval: 100
        });
    }

    // ========== ACTIVE LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            let sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);
});