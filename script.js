/**
 * AGRINHO 2026 — script.js
 * Gustavo Mendes | JavaScript Vanilla (puro)
 *
 * Funções:
 * 1.  initNavbar        — Scroll + menu mobile
 * 2.  initSoilCanvas    — Solo Digital interativo
 * 3.  createPlantSVG    — SVG de planta animada
 * 4.  initCounters      — Anima contadores de estatísticas
 * 5.  initDonutCharts   — Anima gráficos circulares
 * 6.  initPioneerCards  — Modal dos pioneiros
 * 7.  initSimulator     — Painel de sliders
 * 8.  calcSimulator     — Cálculo e feedback do simulador
 * 9.  initQuiz          — Sistema de Quiz
 * 10. renderQuestion    — Renderiza pergunta no DOM
 * 11. handleAnswer      — Processa resposta do usuário
 * 12. showQuizResult    — Tela de resultado final
 * 13. initRevealOnScroll— Animações de entrada por scroll
 * 14. showToast         — Notificação temporária
 * 15. initParticles     — Partículas flutuantes no Hero
 * 16. init              — Inicializa tudo
 */

'use strict';

/* ── DADOS: Pioneiros ── */
const PIONEERS_DATA = {
  paolinelli: {
    name: 'Alysson Paolinelli',
    role: 'Ministro da Agricultura · Agronomista · World Food Prize',
    initials: 'AP', badge: '🏆', color: '#00ff88',
    body: `<p>Alysson Paolinelli é considerado o pai da agricultura tropical brasileira. Como Ministro da Agricultura nos anos 1970, liderou uma revolução que transformou o Cerrado — antes visto como terra estéril — na maior fronteira agrícola tropical do planeta.</p><br/><p>Em parceria com a Embrapa, desenvolveu técnicas de correção do solo ácido do Cerrado e um modelo agropecuário que alia alta produtividade com respeito ao meio ambiente.</p>`,
    achievements: [
      { icon: '🏆', text: 'World Food Prize 2006 — o "Nobel da Alimentação"' },
      { icon: '🌾', text: 'Transformou o Cerrado em potência produtora de soja e grãos' },
      { icon: '📜', text: 'Criou a política de crédito rural que viabilizou a expansão agrícola sustentável' },
      { icon: '🌍', text: 'O Brasil produzia 18 mi ton de grãos em 1970 — hoje ultrapassa 300 mi ton' },
    ]
  },
  doebereiner: {
    name: 'Johanna Döbereiner',
    role: 'Microbiologista · Pesquisadora da Embrapa · Pioneira da FBN',
    initials: 'JD', badge: '🔬', color: '#00cfff',
    body: `<p>Johanna Döbereiner dedicou sua vida a pesquisar os microrganismos do solo. Sua maior descoberta foi a <strong>Fixação Biológica de Nitrogênio (FBN)</strong>: demonstrou que bactérias podem fixar nitrogênio do ar e fornecê-lo diretamente às plantas, tornando possível cultivar soja sem fertilizantes sintéticos.</p>`,
    achievements: [
      { icon: '🔬', text: 'Descobriu a FBN, economizando US$ 10 bilhões/ano em fertilizantes' },
      { icon: '🌿', text: 'Pesquisadora da Embrapa por mais de 40 anos' },
      { icon: '🏅', text: 'Condecorada com a Ordem Nacional do Mérito Científico' },
      { icon: '♻️', text: 'Reduziu em até 70% o uso de nitrogênio industrial na lavoura de soja' },
    ]
  },
  embrapa: {
    name: 'Embrapa',
    role: 'Empresa Brasileira de Pesquisa Agropecuária — Fundada em 1973',
    initials: 'EM', badge: '🌾', color: '#bcff00',
    body: `<p>A Embrapa é uma das maiores instituições de pesquisa agropecuária tropical do mundo. Com mais de 9.000 empregados e 43 unidades de pesquisa, desenvolve tecnologias que vão do melhoramento genético à agricultura digital com monitoramento por satélite.</p>`,
    achievements: [
      { icon: '🌾', text: 'Desenvolveu mais de 1.000 cultivares adaptadas ao clima tropical' },
      { icon: '🚁', text: 'Pioneira em uso de drones e IA na agricultura de precisão' },
      { icon: '🌡️', text: 'Lidera pesquisas em adaptação às mudanças climáticas' },
      { icon: '🌍', text: 'Transfere tecnologia para mais de 60 países em desenvolvimento' },
    ]
  },
  wangari: {
    name: 'Wangari Maathai',
    role: 'Nobel da Paz 2004 · Ativista Ambiental · Fundadora do GBM',
    initials: 'WM', badge: '☮️', color: '#ff6b35',
    body: `<p>Primeira mulher africana a ganhar o Nobel da Paz, Wangari fundou em 1977 o <strong>Movimento Cinturão Verde</strong>, mobilizando mulheres rurais a replantarem florestas degradadas. Ela enxergou a ligação direta entre degradação ambiental e pobreza, transformando o ato de plantar árvores em um ato político.</p>`,
    achievements: [
      { icon: '🌳', text: 'Plantou mais de 51 milhões de árvores no continente africano' },
      { icon: '☮️', text: 'Nobel da Paz 2004 — primeira africana e ambientalista premiada' },
      { icon: '👩', text: 'Mobilizou dezenas de milhares de mulheres rurais como agentes ambientais' },
      { icon: '📚', text: 'Autora de "Desatar o Cinturão" — memórias de vida e ativismo' },
    ]
  },
  borlaug: {
    name: 'Norman Borlaug',
    role: 'Nobel da Paz 1970 · Agrônomo · Pai da Revolução Verde',
    initials: 'NB', badge: '🌿', color: '#9b59b6',
    body: `<p>Norman Borlaug desenvolveu variedades de trigo de alto rendimento que resistiam a doenças e produziam muito mais grãos. Seu trabalho no México, Índia e Paquistão deu início à <strong>Revolução Verde</strong>, evitando fomes em massa em países em desenvolvimento.</p>`,
    achievements: [
      { icon: '🏆', text: 'Nobel da Paz 1970 por salvar mais de 1 bilhão de pessoas da fome' },
      { icon: '🌾', text: 'Variedades de trigo com produtividade 6x maior que as convencionais' },
      { icon: '🌍', text: 'Tornou Índia e Paquistão autossuficientes em trigo' },
      { icon: '🔬', text: 'Fundador do Centro Internacional de Melhoramento de Milho e Trigo (CIMMYT)' },
    ]
  },
  marina: {
    name: 'Marina Silva',
    role: 'Ministra do Meio Ambiente · Senadora · Ativista da Amazônia',
    initials: 'MS', badge: '🌳', color: '#e74c3c',
    body: `<p>Nascida no Acre em família seringueira e discípula de Chico Mendes, Marina Silva liderou como Ministra o <strong>PPCDAm</strong>, que reduziu o desmatamento da Amazônia em 83% entre 2004 e 2012 — uma das maiores ações ambientais da história.</p>`,
    achievements: [
      { icon: '🌿', text: 'Reduziu o desmatamento da Amazônia em 83% (2004–2012)' },
      { icon: '🏅', text: 'Prêmio Goldman Environmental Prize — o "Nobel Verde" (1996)' },
      { icon: '📜', text: 'Criou dezenas de reservas extrativistas e terras indígenas' },
      { icon: '🌍', text: 'Referência global em políticas de clima e desenvolvimento sustentável' },
    ]
  }
};

/* ── DADOS: Quiz ── */
const QUIZ_QUESTIONS = [
  {
    question: 'Qual prática agrícola consiste em manter os restos de colheita no solo e plantar sem revolvê-lo, preservando a biota e reduzindo a erosão?',
    options: ['Plantio direto', 'Aração convencional', 'Monocultura contínua', 'Queimada controlada'],
    correct: 0,
    feedback: '✅ Plantio direto! Essa técnica brasileira é adotada em mais de 68% das lavouras e é referência mundial em conservação do solo.'
  },
  {
    question: 'Johanna Döbereiner ficou famosa por descobrir um processo natural que substituiu fertilizantes sintéticos. Qual é esse processo?',
    options: ['Fotossíntese artificial', 'Fixação Biológica de Nitrogênio', 'Irrigação por gotejamento', 'Compostagem aeróbica'],
    correct: 1,
    feedback: '✅ A Fixação Biológica de Nitrogênio (FBN) permite que bactérias forneçam nitrogênio às plantas, economizando bilhões em fertilizantes.'
  },
  {
    question: 'O que é "agricultura de precisão"?',
    options: ['Plantar em linhas perfeitamente retas', 'Uso de GPS, drones e sensores para otimizar insumos e colheitas', 'Escolher apenas sementes perfeitas visualmente', 'Irrigar todos os dias no mesmo horário'],
    correct: 1,
    feedback: '✅ Agricultura de precisão usa tecnologia (IoT, IA, drones, satélites) para aplicar insumos apenas onde e quando necessário.'
  },
  {
    question: 'Qual bioma brasileiro foi transformado pela pesquisa agropecuária em uma das maiores fronteiras agrícolas do planeta?',
    options: ['Pantanal', 'Amazônia', 'Cerrado', 'Caatinga'],
    correct: 2,
    feedback: '✅ O Cerrado! Graças a Paolinelli e à Embrapa, o Cerrado produz hoje mais de 50% dos grãos brasileiros com técnicas sustentáveis.'
  },
  {
    question: 'O que é a "pegada de carbono" de uma fazenda e por que reduzir esse indicador é importante?',
    options: ['Quantidade de solo pisoteado pelo gado', 'Total de emissões de CO₂ e gases de efeito estufa — reduzir combate o aquecimento global', 'Área de sombra das árvores — reduzir aumenta produtividade', 'Número de máquinas agrícolas — reduzir economiza combustível'],
    correct: 1,
    feedback: '✅ Reduzir a pegada de carbono significa emitir menos gases de efeito estufa, combatendo o aquecimento global e abrindo mercados verdes.'
  },
  {
    question: 'Qual o principal objetivo do Código Florestal Brasileiro (Lei 12.651/2012)?',
    options: ['Proibir toda atividade agrícola em áreas de mata', 'Obrigar fazendas a preservar áreas de vegetação nativa (Reserva Legal e APPs) enquanto produzem', 'Permitir o desmatamento total para maximizar a produção', 'Regular exclusivamente a pesca em rios e lagos'],
    correct: 1,
    feedback: '✅ O Código Florestal equilibra produção e conservação ao exigir Reserva Legal e proteção de Áreas de Preservação Permanente (APPs).'
  }
];

/* ================================================================
   1. NAVBAR
   ================================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) currentId = sec.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${currentId}`));
  }

  function toggleMenu() {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  }

  function closeMobileMenu() {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
    toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  toggle.addEventListener('click', toggleMenu);
  navLinks.forEach(l => l.addEventListener('click', closeMobileMenu));
  handleScroll();
}

/* ================================================================
   2. SOLO DIGITAL
   ================================================================ */
let plantCount = 0;

function initSoilCanvas() {
  const ground  = document.getElementById('soilGround');
  const layer   = document.getElementById('plantsLayer');
  const countEl = document.getElementById('plantCount');
  const MAX     = 30;

  function plantSeed(e) {
    if (plantCount >= MAX) {
      const oldest = layer.querySelector('.plant-wrapper');
      if (oldest) { oldest.remove(); plantCount--; }
    }
    const rect = ground.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const yBottom = Math.random() * 30 + 20;

    const wrapper = document.createElement('div');
    wrapper.className = 'plant-wrapper';
    wrapper.style.left = `${(x / rect.width) * 100}%`;
    wrapper.style.bottom = `${yBottom}px`;

    const scale  = 0.6 + Math.random() * 0.8;
    const colors = ['#00ff88', '#bcff00', '#00cfff', '#7fff7f', '#aaff44'];
    const color  = colors[Math.floor(Math.random() * colors.length)];
    const type   = Math.floor(Math.random() * 4);

    wrapper.appendChild(createPlantSVG(type, color, scale));
    layer.appendChild(wrapper);

    plantCount++;
    countEl.textContent = plantCount;
    if (plantCount % 5 === 0) showToast(`🌿 Incrível! Você plantou ${plantCount} plantas!`);
  }

  ground.addEventListener('click', plantSeed);
  ground.addEventListener('touchstart', plantSeed, { passive: true });
  ground.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const rect = ground.getBoundingClientRect();
      plantSeed({ clientX: rect.left + rect.width / 2, clientY: rect.top + 80 });
    }
  });
}

/* ================================================================
   3. SVG DE PLANTA
   ================================================================ */
function createPlantSVG(type, color, scale) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const h = Math.round(40 * scale), w = Math.round(30 * scale);
  svg.setAttribute('viewBox', '0 0 30 50');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('class', 'plant-svg');
  const sc = color + 'bb';

  if (type === 0) {
    svg.innerHTML = `<line x1="15" y1="50" x2="15" y2="20" stroke="${sc}" stroke-width="2.5" stroke-linecap="round"/><circle cx="15" cy="15" r="10" fill="${color}" opacity="0.9"/><circle cx="15" cy="15" r="4" fill="rgba(255,255,200,0.9)"/>`;
  } else if (type === 1) {
    svg.innerHTML = `<line x1="15" y1="50" x2="15" y2="30" stroke="${sc}" stroke-width="3" stroke-linecap="round"/><polygon points="15,5 5,30 25,30" fill="${color}" opacity="0.85"/><polygon points="15,14 7,32 23,32" fill="${color}" opacity="0.5"/>`;
  } else if (type === 2) {
    svg.innerHTML = `<path d="M15,48 Q13,35 10,28 Q15,22 15,16 Q15,22 20,28 Q17,35 15,48Z" fill="${color}" opacity="0.85"/><line x1="15" y1="48" x2="15" y2="16" stroke="${sc}" stroke-width="1.5"/>`;
  } else {
    svg.innerHTML = `<line x1="15" y1="50" x2="15" y2="20" stroke="${sc}" stroke-width="2.5" stroke-linecap="round"/><circle cx="15" cy="13" r="8" fill="${color}" opacity="0.9"/><circle cx="15" cy="5" r="3" fill="${color}" opacity="0.5"/><circle cx="23" cy="13" r="3" fill="${color}" opacity="0.5"/><circle cx="7" cy="13" r="3" fill="${color}" opacity="0.5"/><circle cx="15" cy="13" r="4" fill="rgba(255,220,100,0.9)"/>`;
  }
  return svg;
}

/* ================================================================
   4. CONTADORES
   ================================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur = 2000, start = performance.now();
      const easeOut = t => 1 - Math.pow(1 - t, 3);
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(easeOut(p) * target);
        if (p < 1) requestAnimationFrame(step); else el.textContent = target;
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* ================================================================
   5. GRÁFICOS DONUT
   ================================================================ */
function initDonutCharts() {
  const charts = [
    { donutId: 'donutEnergy', valId: 'valEnergy' },
    { donutId: 'donutWater',  valId: 'valWater'  },
    { donutId: 'donutSoil',   valId: 'valSoil'   },
  ];
  charts.forEach(({ donutId, valId }) => {
    const donut = document.getElementById(donutId);
    const valEl = document.getElementById(valId);
    if (!donut || !valEl) return;
    const target = parseInt(donut.dataset.percent, 10);
    const color  = donut.dataset.color;
    let current  = 0;
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      const interval = setInterval(() => {
        current++;
        valEl.textContent = current;
        donut.style.background = `conic-gradient(${color} 0% ${current}%, rgba(255,255,255,0.06) ${current}% 100%)`;
        if (current >= target) clearInterval(interval);
      }, 20);
      obs.unobserve(donut);
    }, { threshold: 0.4 });
    obs.observe(donut);
  });
}

/* ================================================================
   6. MODAL DOS PIONEIROS
   ================================================================ */
function initPioneerCards() {
  const cards    = document.querySelectorAll('.pioneer-card');
  const modal    = document.getElementById('pioneerModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');

  function openModal(id) {
    const data = PIONEERS_DATA[id];
    if (!data) return;
    document.getElementById('modalTitle').textContent    = data.name;
    document.getElementById('modalRole').textContent     = data.role;
    document.getElementById('modalInitials').textContent = data.initials;
    document.getElementById('modalBadge').textContent    = data.badge;
    document.getElementById('modalBody').innerHTML       = data.body;
    const avatar = document.getElementById('modalAvatar');
    avatar.style.borderColor = data.color;
    avatar.style.color       = data.color;
    avatar.style.background  = `radial-gradient(circle, ${data.color}22 0%, transparent 70%)`;
    document.getElementById('modalAchievements').innerHTML = data.achievements.map(a =>
      `<div class="achievement-item"><span class="achievement-icon" aria-hidden="true">${a.icon}</span><span>${a.text}</span></div>`
    ).join('');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.id); }
    });
  });
  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
}

/* ================================================================
   7. SIMULADOR
   ================================================================ */
function initSimulator() {
  const sliderTech  = document.getElementById('sliderTech');
  const sliderPres  = document.getElementById('sliderPres');
  const sliderArea  = document.getElementById('sliderArea');
  const sliderWater = document.getElementById('sliderWater');
  const resetBtn    = document.getElementById('simReset');
  const techVal     = document.getElementById('techVal');
  const presVal     = document.getElementById('presVal');
  const areaVal     = document.getElementById('areaVal');
  const waterVal    = document.getElementById('waterVal');

  function syncSlider(slider, label) { label.textContent = slider.value; calcSimulator(); }

  sliderTech.addEventListener('input',  () => syncSlider(sliderTech,  techVal));
  sliderPres.addEventListener('input',  () => syncSlider(sliderPres,  presVal));
  sliderArea.addEventListener('input',  () => syncSlider(sliderArea,  areaVal));
  sliderWater.addEventListener('input', () => syncSlider(sliderWater, waterVal));

  resetBtn.addEventListener('click', () => {
    [sliderTech, sliderPres, sliderArea, sliderWater].forEach(s => s.value = 50);
    techVal.textContent = presVal.textContent = areaVal.textContent = waterVal.textContent = 50;
    calcSimulator();
    showToast('↺ Simulação resetada para valores padrão.');
  });

  calcSimulator();
}

/* ── Cálculo do Simulador ── */
function calcSimulator() {
  const tech  = parseInt(document.getElementById('sliderTech').value);
  const pres  = parseInt(document.getElementById('sliderPres').value);
  const area  = parseInt(document.getElementById('sliderArea').value);
  const water = parseInt(document.getElementById('sliderWater').value);

  const prod   = Math.round(0.4 * tech + 0.3 * area + 0.15 * water - 0.1 * Math.max(0, 30 - pres));
  const sust   = Math.round(0.5 * pres + 0.3 * water - 0.1 * Math.max(0, area - 70) + 0.1 * tech);
  const rent   = Math.round(0.35 * tech + 0.25 * area + 0.2 * water + 0.1 * pres);
  const carbon = Math.round(0.5 * pres + 0.3 * tech + 0.2 * water);
  const score  = Math.min(100, Math.max(0, Math.round((prod + sust + rent + carbon) / 4)));

  document.getElementById('simScoreNum').textContent = score;

  const arc    = document.getElementById('scoreArc');
  arc.style.strokeDashoffset = 314 - (314 * score / 100);
  arc.style.stroke = score >= 75 ? '#00ff88' : score >= 50 ? '#bcff00' : score >= 30 ? '#ff9500' : '#e74c3c';

  updateMetric('mProd',   'mProdVal',   prod);
  updateMetric('mSust',   'mSustVal',   sust);
  updateMetric('mRent',   'mRentVal',   rent);
  updateMetric('mCarbon', 'mCarbonVal', carbon);

  const feedbacks = [
    { min: 85, badge: '🌟 Fazenda Modelo!',    color: '#00ff88', msg: 'Perfeito equilíbrio! Sua propriedade é exemplo de agro sustentável, com alta produção e natureza preservada.' },
    { min: 70, badge: '✅ Sustentável',         color: '#00ff88', msg: 'Ótimo trabalho! Sua fazenda equilibra bem produção e preservação. Pequenos ajustes podem levá-la ao nível modelo.' },
    { min: 55, badge: '⚖️ Equilibrado',        color: '#bcff00', msg: 'Bom equilíbrio, mas há espaço para melhorar. Tente aumentar a preservação e a gestão hídrica.' },
    { min: 40, badge: '⚠️ Atenção Necessária', color: '#ff9500', msg: 'Sua fazenda precisa de ajustes. Aumente a preservação e use mais tecnologia para evitar degradação.' },
    { min:  0, badge: '❌ Insustentável',       color: '#e74c3c', msg: 'Configuração crítica! Alta exploração e baixa preservação resultam em degradação do solo a longo prazo.' },
  ];

  const fb = feedbacks.find(f => score >= f.min);
  const badge = document.getElementById('statusBadge');
  badge.textContent = fb.badge;
  badge.style.color = fb.color;
  badge.style.borderColor = fb.color + '55';
  badge.style.background  = fb.color + '18';
  document.getElementById('statusMsg').textContent = fb.msg;
}

function updateMetric(barId, valId, value) {
  const safe = Math.min(100, Math.max(0, value));
  document.getElementById(barId).style.width = `${safe}%`;
  document.getElementById(valId).textContent = `${safe}%`;
}

/* ================================================================
   9. QUIZ
   ================================================================ */
let quizState = { currentQ: 0, score: 0, answered: false };

function initQuiz() {
  quizState = { currentQ: 0, score: 0, answered: false };
  renderQuestion();
  document.getElementById('quizRestart').addEventListener('click', () => {
    quizState = { currentQ: 0, score: 0, answered: false };
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('quizArea').classList.remove('hidden');
    document.querySelector('.quiz-header').style.display = '';
    renderQuestion();
  });
}

/* ── Renderiza a pergunta atual ── */
function renderQuestion() {
  const q = QUIZ_QUESTIONS[quizState.currentQ];
  document.getElementById('quizNum').textContent = `Pergunta ${quizState.currentQ + 1} de ${QUIZ_QUESTIONS.length}`;
  document.getElementById('liveScore').textContent = quizState.score;
  document.getElementById('quizProgressFill').style.width = `${(quizState.currentQ / QUIZ_QUESTIONS.length) * 100}%`;
  document.getElementById('questionText').textContent = q.question;

  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.setAttribute('role', 'listitem');
    btn.addEventListener('click', () => handleAnswer(idx));
    grid.appendChild(btn);
  });

  const fb = document.getElementById('quizFeedback');
  fb.textContent = ''; fb.className = 'quiz-feedback';
  quizState.answered = false;
}

/* ── Processa a resposta ── */
function handleAnswer(selectedIdx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q       = QUIZ_QUESTIONS[quizState.currentQ];
  const options = document.querySelectorAll('.quiz-option');
  const fb      = document.getElementById('quizFeedback');
  const isRight = selectedIdx === q.correct;

  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) btn.classList.add('correct');
    if (idx === selectedIdx && !isRight) btn.classList.add('wrong');
  });

  if (isRight) {
    quizState.score++;
    document.getElementById('liveScore').textContent = quizState.score;
    fb.textContent = q.feedback;
    fb.className   = 'quiz-feedback correct-fb';
  } else {
    fb.textContent = `❌ Quase! A resposta correta é: "${q.options[q.correct]}". ${q.feedback.replace('✅', 'Saiba que')}`;
    fb.className   = 'quiz-feedback wrong-fb';
  }

  setTimeout(() => {
    quizState.currentQ++;
    if (quizState.currentQ < QUIZ_QUESTIONS.length) renderQuestion();
    else showQuizResult();
  }, 2500);
}

/* ── Tela de resultado do quiz ── */
function showQuizResult() {
  const score = quizState.score, total = QUIZ_QUESTIONS.length;
  const pct   = Math.round((score / total) * 100);

  document.getElementById('quizArea').classList.add('hidden');
  document.querySelector('.quiz-header').style.display = 'none';
  document.getElementById('quizProgressFill').style.width = '100%';

  let icon, title, desc;
  if (pct >= 83) {
    icon = '🏆'; title = 'Expert em Agro Sustentável!';
    desc = `Você acertou ${score} de ${total} (${pct}%). Excelente! Você domina os conceitos e está pronto para ajudar a construir o futuro do campo.`;
  } else if (pct >= 50) {
    icon = '🌱'; title = 'Bom progresso, agricultor(a)!';
    desc = `Você acertou ${score} de ${total} (${pct}%). Continue aprendendo — cada conhecimento faz diferença para o futuro do planeta.`;
  } else {
    icon = '📚'; title = 'Continue estudando!';
    desc = `Você acertou ${score} de ${total} (${pct}%). Explore o site e descubra mais sobre agronegócio sustentável. O conhecimento é a semente do futuro.`;
  }

  document.getElementById('resultIcon').textContent  = icon;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultDesc').textContent  = desc;
  document.getElementById('finalScore').textContent  = score;
  document.getElementById('quizResult').classList.remove('hidden');
}

/* ================================================================
   13. REVEAL NO SCROLL
   ================================================================ */
function initRevealOnScroll() {
  const targets = document.querySelectorAll('.chart-card, .pioneer-card, .stat-item, .sim-layout, .quiz-container, .cta-inner');
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => obs.observe(el));
}

/* ================================================================
   14. TOAST
   ================================================================ */
let toastTimer = null;
function showToast(msg, duration = 3500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, duration);
}

/* ================================================================
   15. PARTÍCULAS
   ================================================================ */
function initParticles() {
  const container = document.getElementById('heroParticles');
  const count  = window.innerWidth < 768 ? 15 : 30;
  const colors = ['#00ff88', '#bcff00', '#00cfff', '#ffffff'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size  = 2 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:${-10 + Math.random() * 20}%;
      background:${color}; opacity:0;
      animation-duration:${8 + Math.random() * 15}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

/* ================================================================
   16. INIT
   ================================================================ */
function init() {
  initNavbar();
  initSoilCanvas();
  initCounters();
  initDonutCharts();
  initPioneerCards();
  initSimulator();
  initQuiz();
  initRevealOnScroll();
  initParticles();
  console.log('%c🌿 Agrinho 2026 — Gustavo Mendes', 'color:#00ff88;font-size:16px;font-weight:bold');
  console.log('%cTodos os módulos JS inicializados!', 'color:#bcff00');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}