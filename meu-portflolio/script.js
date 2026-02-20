'use strict';

const DOM = {
  nav: document.querySelector('nav'),
  navList: document.querySelector('.nav-list'),
  mobileMenu: document.querySelector('.mobile-menu'),
  hero: document.querySelector('#hero'),
  langBtn: document.getElementById('language-toggle'),
  links: document.querySelectorAll('a[href^="#"]'),
  cards: document.querySelectorAll('.card[data-link]'),
  filterBtns: document.querySelectorAll('.filter-btn'),
  projectCards: document.querySelectorAll('.card[data-category]'),
  elementsToAnimate: document.querySelectorAll('.hero-content, .section-title, .sobre-container, .card, .skill-category, .curriculo-container, #contato > *')
};

const state = {
  lang: 'pt',
  lastScrollY: window.pageYOffset,
  isProgrammaticScroll: false
};

const i18n = {
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
    project_colorfruit: "App mobile com interface lúdica e gamificada, focado na experiência do usuário infantil.",
    project_weather: "Interface responsiva com integração de APIs e dados em tempo real.",
    project_tasks: "CRUD para gestão de tarefas, desenvolvido com Angular no front-end e Node.js no back-end.",
    project_fylo: "Aplicativo desktop de conversão universal.",
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
    project_colorfruit: "Mobile app with a playful and gamified interface, focused on the child user experience.",
    project_weather: "Responsive interface with API integration and real-time data.",
    project_tasks: "Task management CRUD, developed with Angular on the front-end and Node.js on the back-end.",
    project_fylo: "Universal desktop conversion application.",
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

function updateLanguage() {
  DOM.langBtn.textContent = state.lang === 'pt' ? 'PT-BR' : 'EN-US';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[state.lang][key]) {
      el.innerHTML = i18n[state.lang][key];
    }
  });
}

if (DOM.langBtn) {
  DOM.langBtn.addEventListener('click', () => {
    state.lang = state.lang === 'pt' ? 'en' : 'pt';
    updateLanguage();
  });
}

if (DOM.mobileMenu) {
  const toggleMenu = () => {
    DOM.navList.classList.toggle('active');
    DOM.mobileMenu.classList.toggle('active');
  };

  DOM.mobileMenu.addEventListener('click', toggleMenu);

  DOM.navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      DOM.navList.classList.remove('active');
      DOM.mobileMenu.classList.remove('active');
    });
  });
}

window.addEventListener('scroll', () => {
  if (state.isProgrammaticScroll) return;

  const currentScrollY = window.pageYOffset;
  const triggerPoint = DOM.hero ? DOM.hero.offsetHeight - 100 : 100;

  if (currentScrollY > state.lastScrollY && currentScrollY > triggerPoint) {
    DOM.nav.classList.add('nav-hidden');
  } else {
    DOM.nav.classList.remove('nav-hidden');
  }

  state.lastScrollY = currentScrollY;
});

function smoothScroll(target, duration = 800) {
  const start = window.pageYOffset;
  const navHeight = DOM.nav ? DOM.nav.offsetHeight : 0;
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
  const distance = targetPosition - start;
  let startTime = null;

  state.isProgrammaticScroll = true;
  DOM.nav.classList.remove('nav-hidden');

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const ease = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + (distance * ease));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      setTimeout(() => {
        state.isProgrammaticScroll = false;
        state.lastScrollY = window.pageYOffset;
      }, 100);
    }
  }
  
  requestAnimationFrame(animation);
}

DOM.links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) smoothScroll(target, 900);
  });
});

DOM.cards.forEach(card => {
  card.addEventListener('click', () => {
    const link = card.getAttribute('data-link');
    if (link) window.open(link, '_blank', 'noopener');
  });
  card.style.cursor = 'pointer';
});

DOM.filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterValue = btn.getAttribute('data-filter');
    const isActive = btn.classList.contains('active');

    if (isActive) {
      btn.classList.remove('active');
      filterProjects('all');
    } else {
      DOM.filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects(filterValue);
    }
  });
});

function filterProjects(category) {
  DOM.projectCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const shouldShow = category === 'all' || cardCategory === category;

    if (shouldShow) {
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('js-scroll-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

window.addEventListener('load', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  DOM.elementsToAnimate.forEach(el => {
    el.classList.add('js-scroll');
    observer.observe(el);
  });
});