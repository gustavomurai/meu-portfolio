// ===============================
// SISTEMA DE TRADUÇÃO (PT <-> EN)
// ===============================
const translations = {
    pt: {
        nav_home: "Home",
        nav_about: "Sobre",
        nav_projects: "Projetos",
        nav_skills: "Habilidades",
        nav_resume: "Currículo",
        nav_contact: "Contato",
        hero_subtitle: "UX/UI Designer & Front-End Developer",
        about_title: "Sobre Mim",
        about_text_1: "Sou um <strong>Desenvolvedor Front-End e UX/UI Designer</strong> que atua na ponte entre a criatividade e a engenharia. Não apenas desenho interfaces no Figma, mas as transformo em código funcional, performático e acessível.",
        about_text_2: "Graduando em Análise e Desenvolvimento de Sistemas pelo <strong>IFSP</strong> e com formação em UX Design pela <strong>Alura</strong>, possuo sólida base técnica em <strong>HTML, CSS, JavaScript, Angular e Node.js</strong>, aliada a metodologias ágeis como Scrum e Kanban.",
        about_text_3: "Meu foco é transformar problemas complexos em soluções digitais intuitivas, aplicando Design Thinking e UCD (Design Centrado no Usuário) para entregar produtos que geram impacto real.",
        projects_title: "Projetos",
        project_gusto: "Design System completo com componentes reutilizáveis e foco em usabilidade.",
        project_doativa: "Projeto de UX/UI voltado à inclusão social e arquitetura da informação.",
        // CHAVE RENOMEADA AQUI
        project_colorfruit: "App mobile com interface lúdica e gamificada, focado na experiência do usuário infantil.",
        project_weather: "Interface responsiva com integração de APIs e dados em tempo real.",
        project_tasks: "CRUD para gestão de tarefas, desenvolvido com Angular no front-end e Node.js no back-end.",
        skills_title: "Habilidades Técnicas",
        skill_usability: "Usabilidade",
        skill_accessibility: "Acessibilidade (WCAG)",
        skill_responsive: "Responsividade",
        skill_animations: "Animações CSS",
        tools_title: "Ferramentas & Dados",
        soft_agile: "Metodologias Ágeis (Scrum)",
        soft_teamwork: "Trabalho em Equipe",
        soft_communication: "Comunicação",
        soft_problem: "Resolução de Problemas",
        soft_english: "Inglês Avançado",
        resume_title: "Currículo",
        resume_text: "Baixe meu currículo em PDF focado na área de seu interesse:",
        btn_download: "Baixar PDF",
        contact_title: "Contato",
        contact_text: "Estou disponível para novos projetos e oportunidades. <br> Sinta-se à vontade para me mandar um 'oi' ou discutir uma ideia."
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_projects: "Projects",
        nav_skills: "Skills",
        nav_resume: "Resume",
        nav_contact: "Contact",
        hero_subtitle: "UX/UI Designer & Front-End Developer",
        about_title: "About Me",
        about_text_1: "I am a <strong>Front-End Developer and UX/UI Designer</strong> bridging the gap between creativity and engineering. I don't just design interfaces in Figma; I transform them into functional, performant, and accessible code.",
        about_text_2: "Majoring in Systems Analysis and Development at <strong>IFSP</strong> with a UX Design background from <strong>Alura</strong>, I have a solid technical foundation in <strong>HTML, CSS, JavaScript, Angular, and Node.js</strong>, combined with agile methodologies like Scrum and Kanban.",
        about_text_3: "My focus is transforming complex problems into intuitive digital solutions, applying Design Thinking and UCD (User-Centered Design) to deliver products that create real impact.",
        projects_title: "Projects",
        project_gusto: "Complete Design System with reusable components and focus on usability.",
        project_doativa: "UX/UI project focused on social inclusion and information architecture.",
        // CHAVE RENOMEADA AQUI
        project_colorfruit: "Mobile app with a playful and gamified interface, focused on the child user experience.",
        project_weather: "Responsive interface with API integration and real-time data.",
        project_tasks: "Task management CRUD, developed with Angular on the front-end and Node.js on the back-end.",
        skills_title: "Technical Skills",
        skill_usability: "Usability",
        skill_accessibility: "Accessibility (WCAG)",
        skill_responsive: "Responsiveness",
        skill_animations: "CSS Animations",
        tools_title: "Tools & Data",
        soft_agile: "Agile Methodologies (Scrum)",
        soft_teamwork: "Teamwork",
        soft_communication: "Communication",
        soft_problem: "Problem Solving",
        soft_english: "Advanced English",
        resume_title: "Resume",
        resume_text: "Download my PDF resume focused on your area of interest:",
        btn_download: "Download PDF",
        contact_title: "Contact",
        contact_text: "I am available for new projects and opportunities. <br> Feel free to say 'hi' or discuss an idea."
    }
};

let currentLang = 'pt';
const langToggleBtn = document.getElementById('language-toggle');

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage();
});

function updateLanguage() {
    // Muda o texto do botão com base no idioma ATUAL da página
    langToggleBtn.textContent = currentLang === 'pt' ? 'PT-BR' : 'EN-US';

    // Troca todos os textos da página
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key]; 
        }
    });
}

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