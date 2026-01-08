// ===============================
// FORÇAR TOPO AO RECARREGAR
// ===============================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ===============================
// MENU MOBILE
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
// SMART HEADER (LÓGICA CORRIGIDA)
// ===============================
let lastScrollY = window.pageYOffset;
const nav = document.querySelector('nav');
const heroSection = document.querySelector('#hero');
let isProgrammaticScroll = false; // "Trava" para saber se foi clique ou scroll manual

window.addEventListener('scroll', () => {
    // Se for rolagem causada pelo clique no botão, não faça nada
    if (isProgrammaticScroll) return;

    const currentScrollY = window.pageYOffset;
    const triggerPoint = heroSection.offsetHeight - 100; // Ponto onde começa a esconder (fim do Hero)

    // Lógica:
    // 1. Só esconde se já passou do Hero (triggerPoint)
    // 2. Só esconde se estiver descendo
    if (currentScrollY > lastScrollY && currentScrollY > triggerPoint) {
        nav.classList.add('nav-hidden');
    } else {
        // Mostra se estiver subindo OU se estiver no topo (Hero)
        nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
});


// ===============================
// SCROLL SUAVE (COM TRAVA DE HEADER)
// ===============================
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function smoothScroll(target, duration = 800) {
    const start = window.pageYOffset;
    const navHeight = document.querySelector('nav').offsetHeight;
    const end = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    const distance = end - start;
    let startTime = null;

    // ATIVA A TRAVA: Avisa que estamos rolando via código
    isProgrammaticScroll = true;
    // Garante que a barra apareça ao clicar
    nav.classList.remove('nav-hidden');

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, start + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            // DESATIVA A TRAVA: Acabou a animação, volta ao normal
            // Pequeno delay para evitar conflito com o último evento de scroll
            setTimeout(() => {
                isProgrammaticScroll = false;
                lastScrollY = window.pageYOffset; // Atualiza a posição para não pular
            }, 100);
        }
    }
    requestAnimationFrame(animation);
}

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) smoothScroll(target, 900);
    });
});

// ===============================
// CARDS CLICÁVEIS & FILTRO
// ===============================
const cards = document.querySelectorAll('.card[data-link]');
cards.forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) window.open(link, '_blank', 'noopener');
    });
    card.style.cursor = 'pointer';
});

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
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
        }
    });
}

// ===============================
// ANIMAÇÃO DE SCROLL (OBSERVER)
// ===============================
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('js-scroll-visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.hero-content, .section-title, .sobre-container, .card, .skill-category, .curriculo-container, #contato > *');
elementsToAnimate.forEach(el => {
    el.classList.add('js-scroll');
    observer.observe(el);
});