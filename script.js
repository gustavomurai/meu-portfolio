// ===============================
// FORÇAR TOPO AO RECARREGAR
// ===============================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);


// ===============================
// MENU MOBILE (NOVO)
// ===============================
const mobileMenu = document.querySelector('.mobile-menu');
const navList = document.querySelector('.nav-list');
const navLinksAll = document.querySelectorAll('.nav-list a');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinksAll.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}


// ===============================
// SCROLL SUAVE
// ===============================
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function smoothScroll(target, duration = 800) {
    const start = window.pageYOffset;
    const navHeight = document.querySelector('nav').offsetHeight;

    const end =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight;

    const distance = end - start;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease =
            progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, start + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) return;

        smoothScroll(target, 900);
    });
});


// ===============================
// CARDS DE PROJETOS CLICÁVEIS
// ===============================
const cards = document.querySelectorAll('.card[data-link]');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank', 'noopener');
        }
    });

    card.style.cursor = 'pointer';
});

// ===============================
// LÓGICA DE FILTRO
// ===============================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card[data-category]');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');

        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            showProjects('all');
        } else {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showProjects(filterValue);
        }
    });
});

function showProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = ''; 
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===============================
// ANIMAÇÃO DE SCROLL
// ===============================
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('js-scroll-visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
    '.hero-content, .section-title, .sobre-container, .card, .skill-category, .curriculo-container, #contato > *'
);

elementsToAnimate.forEach(el => {
    el.classList.add('js-scroll');
    observer.observe(el);
});