// const SCRIPT_URL =
//   'https://script.google.com/macros/s/AKfycbwKnmlLCaQVpwWif0MtDkFdaV0_JU5iSaJEAFOur0WmPJGpUbqlh2KpuW_vojZDzl1bRw/exec';

// const $   = sel => document.querySelector(sel);
// const $$  = sel => document.querySelectorAll(sel);
// const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
// const toggleClasses = (el, add = [], remove = []) => {
//   add.forEach(c => el.classList.add(c));
//   remove.forEach(c => el.classList.remove(c));
// };
// const shuffleArray = arr => {
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
// };

// setInterval(() => {
//   const el = $('#study-timer');
//   if (!el) return;
//   const m = String(Math.floor(studyTime / 60)).padStart(2, '0');
//   const s = String(studyTime % 60).padStart(2, '0');
//   el.textContent = `${m}:${s}`;
//   studyTime++;
// }, 1000);

// const mobileMenuBtn = $('#mobile-menu-btn');
// const sidebar        = $('#sidebar');
// const sidebarOverlay = $('#sidebar-overlay');

// mobileMenuBtn?.addEventListener('click', () => {
//   sidebar.classList.toggle('-translate-x-full');
//   sidebarOverlay.classList.toggle('hidden');
// });
// sidebarOverlay?.addEventListener('click', () => {
//   sidebar.classList.add('-translate-x-full');
//   sidebarOverlay.classList.add('hidden');
// });

// const userMenuBtn  = $('#user-menu-btn');
// const userDropdown = $('#user-dropdown');
// if (userMenuBtn && userDropdown) {
//   userMenuBtn.type = 'button';
//   const fullname  = localStorage.getItem('userFullname') || 'Guest';
//   const userClass = localStorage.getItem('userClass') || '';
//   const parts     = fullname.split(' ').filter(Boolean);
//   const initials  = (parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : fullname.slice(0, 2)).toUpperCase();

//   setTxt('user-avatar', initials);
//   setTxt('user-name',   fullname);
//   setTxt('user-class',  userClass);

//   userMenuBtn.addEventListener('click', e => {
//     e.stopPropagation();
//     userDropdown.classList.toggle('hidden');
//     userDropdown.classList.toggle('block');
//   });

//   document.addEventListener('click', e => {
//     if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
//       userDropdown.classList.add('hidden');
//       userDropdown.classList.remove('block');
//     }
//   });
// }

// function showSection(id) {
//   $$('.content-section').forEach(sec => sec.classList.add('hidden'));
//   document.getElementById(id)?.classList.remove('hidden');

//   $$('.nav-link').forEach(l => {
//     toggleClasses(l,
//       ['text-gray-600','hover:bg-gray-100','hover:text-gray-800'],
//       ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white','shadow-lg']
//     );
//   });
//   const activeLink = document.querySelector(`[href="#${id}"]`);
//   if (activeLink) {
//     toggleClasses(activeLink,
//       ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white','shadow-lg'],
//       ['text-gray-600','hover:bg-gray-100','hover:text-gray-800']
//     );
//   }

//   $$('.nav-mobile').forEach(b => {
//     toggleClasses(b, ['text-gray-500'], ['text-violet-600']);
//   });
//   const actMobile = document.querySelector(`[data-target="${id}"]`);
//   actMobile && toggleClasses(actMobile, ['text-violet-600'], ['text-gray-500']);

//   if (id === 'experiment-detail' && typeof initThreeJS === 'function') initThreeJS();
// }

// $$('.nav-link').forEach(link => {
//   link.addEventListener('click', e => {
//     e.preventDefault();
//     showSection(link.getAttribute('href').substring(1));
//   });
// });
// $$('.nav-mobile').forEach(btn => {
//   btn.addEventListener('click', () => showSection(btn.dataset.target));
// });

// $$('.chapter-tab').forEach(tab => {
//   tab.addEventListener('click', () => {
//     $$('.chapter-tab').forEach(t => {
//       toggleClasses(t,
//         ['bg-gray-100','text-gray-600'],
//         ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white']
//       );
//     });
//     toggleClasses(tab,
//       ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white'],
//       ['bg-gray-100','text-gray-600']
//     );
//   });
// });

// const observer = new IntersectionObserver(entries => {
//   entries.forEach(en => en.isIntersecting && en.target.classList.add('active'));
// }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
// $$('.reveal').forEach(el => observer.observe(el));

// document.addEventListener('keydown', e => {
//   if (e.key === 'Escape') {
//     sidebar?.classList.add('-translate-x-full');
//     sidebarOverlay?.classList.add('hidden');
//     userDropdown?.classList.add('hidden');
//   }
//   if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
//     e.preventDefault();
//     $('input[placeholder*="Tìm kiếm"]')?.focus();
//   }
//   if (e.altKey) {
//     const map = { '1':'dashboard','2':'lessons','3':'experiments','4':'quiz' };
//     if (map[e.key]) { e.preventDefault(); showSection(map[e.key]); }
//   }
// });

// document.addEventListener('DOMContentLoaded', () => {
//   showSection('dashboard');
//   setTimeout(() => document.body.classList.add('loaded'), 100);
//   setTimeout(() => $$('.progress-bar').forEach(bar => bar.style.animation = 'progressFill 2s ease-out forwards'), 500);
// });

// setInterval(() => console.log('Auto-saving study progress...'), 30000);

// let isPlaying = false, animationId, startTime = Date.now();
// let length  = 1.0, angle = 15, mass = 1.0, gravity = 9.8, damping = 0.0;

// document.addEventListener('DOMContentLoaded', () => {
//   const tabBtns     = $$('.tab-btn');
//   const tabContents = $$('.tab-content');

//   tabBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       tabBtns.forEach(b => {
//         toggleClasses(b,
//           ['text-gray-600','hover:text-gray-800','hover:bg-gray-100'],
//           ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white','shadow-lg']
//         );
//       });
//       toggleClasses(btn,
//         ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white','shadow-lg'],
//         ['text-gray-600','hover:text-gray-800','hover:bg-gray-100']
//       );

//       tabContents.forEach(c => c.classList.remove('active'));
//       document.getElementById(`${btn.dataset.tab}-tab`)?.classList.add('active');
//     });
//   });

//   updatePendulumDisplay();
//   setupSliders();
//   $('#play-btn')?.addEventListener('click', toggleAnimation);
// });

// function animatePendulum() {
//   if (!isPlaying) return;
//   const t = (Date.now() - startTime) * 0.001;
//   const T = 2 * Math.PI * Math.sqrt(length / gravity);
//   const A = angle * Math.exp(-damping * t);
//   const theta = A * Math.cos(2 * Math.PI * t / T);

//   const s = $('#pendulum-string');
//   s && (s.style.transform = `rotate(${theta}deg)`);

//   updatePhysicsDisplay(theta, t);
//   updateDataTable(t, theta);
//   animationId = requestAnimationFrame(animatePendulum);
// }

// function toggleAnimation() {
//   isPlaying = !isPlaying;
//   const btn = $('#play-btn');
//   btn && (btn.textContent = isPlaying ? 'Pause' : 'Play');
//   if (isPlaying) { startTime = Date.now(); animatePendulum(); }
//   else cancelAnimationFrame(animationId);
// }

// function updatePhysicsDisplay(theta, t) {
//   const T = 2 * Math.PI * Math.sqrt(length / gravity);
//   const f = 1 / T;
//   const v = angle * Math.sqrt(gravity / length) *
//             Math.cos(2 * Math.PI * t / T) * Math.exp(-damping * t);

//   setTxt('period-display',   `${T.toFixed(2)}s`);
//   setTxt('frequency-display',`${f.toFixed(2)}Hz`);
//   setTxt('angle-display',    `${Math.abs(theta).toFixed(1)}°`);
//   setTxt('velocity-display', `${Math.abs(v).toFixed(1)}m/s`);

//   const pot = Math.pow(Math.sin(theta * Math.PI / 180), 2) * 100;
//   const kin = 100 - pot;
//   $('#potential-energy') && ($('#potential-energy').style.width = pot + '%');
//   $('#kinetic-energy')   && ($('#kinetic-energy').style.width   = kin + '%');
// }

// function updatePendulumDisplay() {
//   const s = $('#pendulum-string');
//   s && (s.style.height = (length * 100) + 'px');
// }

// function updateDataTable(t, theta) {
//   const tbody = $('#data-table');
//   if (!tbody) return;
//   const row = document.createElement('tr');
//   row.innerHTML = `
//     <td class="p-2">${t.toFixed(2)}</td>
//     <td class="p-2">${theta.toFixed(1)}</td>
//     <td class="p-2">${(theta * Math.sqrt(gravity / length) * Math.cos(t)).toFixed(1)}</td>`;
//   tbody.prepend(row);
//   if (tbody.children.length > 10) tbody.removeChild(tbody.lastChild);
// }

// function setupSliders() {
//   const bind = (id, fn) => { const el = document.getElementById(id); el && (el.oninput = fn); };
//   bind('length-slider',  function(){ length  = parseFloat(this.value); setTxt('length-value',  `${length.toFixed(1)}m`); updatePendulumDisplay(); });
//   bind('angle-slider',   function(){ angle   = parseInt(this.value);   setTxt('angle-value',   `${angle}°`); });
//   bind('mass-slider',    function(){ mass    = parseFloat(this.value); setTxt('mass-value',    `${mass.toFixed(1)}kg`); });
//   bind('gravity-slider', function(){ gravity = parseFloat(this.value); setTxt('gravity-value', `${gravity.toFixed(1)}m/s²`); });
//   bind('damping-slider', function(){ damping = parseFloat(this.value); setTxt('damping-value', `${damping.toFixed(2)}`); });
// }

// let QUIZ_SETS  = [];
// let playingSet = null;
// let qIndex = 0, qScore = 0, chosen = null;

// const quizCardWrap   = $('#quiz-card-wrap');
// const quizPlayerElm  = $('#quiz-player');
// const closePlayerBtn = $('#close-quiz-player');
// const progressRing   = $('#progress-ring');
// const scoreDisplay   = $('#score-display');
// const totalDisplay   = $('#total-display');
// let   questionText   = $('#question-text');
// let   optionsWrap    = $('#options-wrap');
// let   submitBtn      = $('#submit-btn');
// const quizTitleElm   = $('#quiz-title');
// const quizContentElm = $('#quiz-content');
// const quizLoadingElm = $('#quiz-loading');
// const quizErrorElm   = $('#quiz-error');
// const quizNav = document.querySelector('a[href="#quiz"]');
// quizNav?.addEventListener('click', async () => {
//   if (!QUIZ_SETS.length) {
//     await loadQuizzes();
//     buildQuizCards(QUIZ_SETS);
//   }
// });

// closePlayerBtn?.addEventListener('click', () => quizPlayerElm.classList.add('hidden'));
// submitBtn?.addEventListener('click', submitAnswer);

// async function loadQuizzes() {
//   quizLoadingElm?.classList.remove('hidden');
//   quizErrorElm?.classList.add('hidden');
//   try {
//     const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`);
//     if (!res.ok) throw new Error(res.statusText);
//     QUIZ_SETS = await res.json();
//   } catch (e) {
//     console.error(e);
//     QUIZ_SETS = [];
//     quizErrorElm?.classList.remove('hidden');
//   } finally {
//     quizLoadingElm?.classList.add('hidden');
//   }
// }

// function buildQuizCards(list) {
//   if (!quizCardWrap) return;
//   quizCardWrap.innerHTML = '';
//   list.forEach((set, i) => {
//     const card = document.createElement('div');
//     card.className = 'card-3d bg-white rounded-3xl overflow-hidden hover-lift border border-gray-200 shadow-lg';
//     card.innerHTML = `
//       <div class="relative h-40 bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center">
//         <i class="fas fa-question-circle text-5xl text-violet-500"></i>
//         <div class="absolute top-4 left-4">
//           <span class="px-3 py-1 bg-violet-500 text-white rounded-full text-xs font-medium">${set.items.length} câu</span>
//         </div>
//       </div>
//       <div class="p-6">
//         <h3 class="text-xl font-bold text-gray-800 mb-2">${set.title}</h3>
//         <p class="text-gray-600 text-sm mb-4">Kiểm tra kiến thức nhanh</p>
//         <button data-quiz="${i}" class="start-quiz w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300">Bắt đầu</button>
//       </div>`;
//     quizCardWrap.appendChild(card);
//   });

//   quizCardWrap.querySelectorAll('.start-quiz').forEach(btn => {
//     btn.addEventListener('click', () => startQuiz(+btn.dataset.quiz));
//   });
// }

// function startQuiz(idx) {
//   playingSet = JSON.parse(JSON.stringify(QUIZ_SETS[idx]));
//   shuffleArray(playingSet.items);

//   qIndex = 0; qScore = 0; chosen = null;

//   quizTitleElm.textContent = playingSet.title;
//   scoreDisplay.textContent = '0';
//   totalDisplay.textContent = playingSet.items.length;

//   quizPlayerElm.classList.remove('hidden');
//   renderQuestion();
// }

// function renderQuestion() {
//   const item = playingSet.items[qIndex];
//   questionText.textContent = item.question;
//   optionsWrap.innerHTML = '';
//   chosen = null;

//   item.options.forEach((opt, i) => {
//     const btn = document.createElement('button');
//     btn.className = 'option w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-100';
//     btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
//     btn.addEventListener('click', () => {
//       chosen = i;
//       optionsWrap.querySelectorAll('.option').forEach(o => o.classList.remove('selected','bg-violet-50','border-violet-400'));
//       btn.classList.add('selected','bg-violet-50','border-violet-400');
//     });
//     optionsWrap.appendChild(btn);
//   });

//   const dash = (qIndex / playingSet.items.length) * 283;
//   progressRing.setAttribute('stroke-dasharray', `${dash} 283`);

//   submitBtn.disabled = false;
//   toggleClasses(submitBtn, [], ['opacity-50','cursor-not-allowed']);
// }

// function submitAnswer() {
//   if (chosen === null) return;
//   submitBtn.disabled = true;
//   toggleClasses(submitBtn, ['opacity-50','cursor-not-allowed']);

//   const item = playingSet.items[qIndex];
//   const btns = optionsWrap.querySelectorAll('.option');

//   btns.forEach((b, i) => {
//     if (i === item.correct) {
//       toggleClasses(b, ['correct','border-emerald-500','bg-emerald-50']);
//     } else if (i === chosen) {
//       toggleClasses(b, ['incorrect','border-red-500','bg-red-50']);
//     }
//   });
//   if (chosen === item.correct) {
//     qScore++;
//     scoreDisplay.textContent = qScore;
//   }

//   setTimeout(() => {
//     qIndex++;
//     if (qIndex < playingSet.items.length) {
//       renderQuestion();
//     } else {
//       finishQuiz();
//     }
//   }, 900);
// }

// function finishQuiz() {
//   progressRing.setAttribute('stroke-dasharray', '283 283');
//   const percent = Math.round((qScore / playingSet.items.length) * 100);

//   quizContentElm.innerHTML = `
//     <p class="text-2xl font-bold mb-4">Hoàn thành! 🌟</p>
//     <p class="text-lg mb-6">Điểm: <span class="font-semibold">${qScore}/${playingSet.items.length}</span> (${percent}%)</p>
//     <div class="flex gap-3">
//       <button id="again" class="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">Làm lại</button>
//       <button id="close-finish" class="px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600">Đóng</button>
//     </div>
//   `;

//   $('#close-finish').addEventListener('click', () => {
//     quizPlayerElm.classList.add('hidden');
//     rebuildPlayerUI(); 
//   });
//   $('#again').addEventListener('click', () => {
//     restartQuiz();
//   });
// }

// function rebuildPlayerUI() {
//   quizContentElm.innerHTML = `
//     <p class="text-xl font-bold mb-4" id="question-text"></p>
//     <div id="options-wrap" class="space-y-2"></div>
//     <button class="mt-6 px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600" id="submit-btn">Submit</button>
//   `;
//   questionText = $('#question-text');
//   optionsWrap  = $('#options-wrap');
//   submitBtn    = $('#submit-btn');
//   submitBtn.addEventListener('click', submitAnswer);
// }

// function restartQuiz() {
//   rebuildPlayerUI();
//   qIndex = 0; qScore = 0; chosen = null;
//   shuffleArray(playingSet.items);
//   scoreDisplay.textContent = '0';
//   totalDisplay.textContent = playingSet.items.length;
//   progressRing.setAttribute('stroke-dasharray', '0 283');
//   renderQuestion();
// }

/* ===================== 0. CONFIG ===================== */
const API_BASE = window.location.hostname.includes('github.io')
  ? 'https://my-quiz-api.example.com/api'   // <— production URL của bạn
  : 'http://localhost:4000/api';  

/* ===================== 1. HELPERS ===================== */
const $  = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
const toggleClasses = (el, add = [], remove = []) => { add.forEach(c => el.classList.add(c)); remove.forEach(c => el.classList.remove(c)); };
const shuffleArray = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } };

/* ===================== 2. COMMON UI ===================== */
let studyTime = 0;
setInterval(() => {
  const el = $('#study-timer'); if (!el) return;
  const m = String(Math.floor(studyTime / 60)).padStart(2, '0');
  const s = String(studyTime % 60).padStart(2, '0');
  el.textContent = `${m}:${s}`; studyTime++;
}, 1000);

// Sidebar mobile
const mobileMenuBtn = $('#mobile-menu-btn');
const sidebar        = $('#sidebar');
const sidebarOverlay = $('#sidebar-overlay');
mobileMenuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('-translate-x-full');
  sidebarOverlay.classList.toggle('hidden');
});
sidebarOverlay?.addEventListener('click', () => {
  sidebar.classList.add('-translate-x-full');
  sidebarOverlay.classList.add('hidden');
});

// User dropdown
const userMenuBtn  = $('#user-menu-btn');
const userDropdown = $('#user-dropdown');
if (userMenuBtn && userDropdown) {
  userMenuBtn.type = 'button';
  const fullname  = localStorage.getItem('userFullname') || 'Guest';
  const userClass = localStorage.getItem('userClass')    || '';
  const parts     = fullname.split(' ').filter(Boolean);
  const initials  = (parts.length >= 2 ? parts[0][0] + parts.at(-1)[0] : fullname.slice(0,2)).toUpperCase();
  setTxt('user-avatar', initials); setTxt('user-name', fullname); setTxt('user-class', userClass);

  userMenuBtn.addEventListener('click', e => {
    e.stopPropagation();
    userDropdown.classList.toggle('hidden');
    userDropdown.classList.toggle('block');
  });
  document.addEventListener('click', e => {
    if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.add('hidden'); userDropdown.classList.remove('block');
    }
  });
}

// Section switcher
function showSection(id) {
  $$('.content-section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id)?.classList.remove('hidden');

  // sidebar highlight
  $$('.nav-link').forEach(l => toggleClasses(l,
    ['text-gray-600','hover:bg-gray-100','hover:text-gray-800'],
    ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white','shadow-lg']
  ));
  const activeLink = document.querySelector(`[href="#${id}"]`);
  activeLink && toggleClasses(activeLink,
    ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white','shadow-lg'],
    ['text-gray-600','hover:bg-gray-100','hover:text-gray-800']
  );

  // bottom nav
  $$('.nav-mobile').forEach(b => toggleClasses(b, ['text-gray-500'], ['text-violet-600']));
  const actMobile = document.querySelector(`[data-target="${id}"]`);
  actMobile && toggleClasses(actMobile, ['text-violet-600'], ['text-gray-500']);

  if (id === 'experiment-detail' && typeof initThreeJS === 'function') initThreeJS();
}

// Bind menu clicks
$$('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.getAttribute('href').substring(1));
  });
});
$$('.nav-mobile').forEach(btn => btn.addEventListener('click', () => showSection(btn.dataset.target)));

// Chapter tabs
$$('.chapter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.chapter-tab').forEach(t => toggleClasses(t,
      ['bg-gray-100','text-gray-600'],
      ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white']
    ));
    toggleClasses(tab,
      ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white'],
      ['bg-gray-100','text-gray-600']
    );
  });
});

// Reveal anim
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => en.isIntersecting && en.target.classList.add('active'));
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
$$('.reveal').forEach(el => observer.observe(el));

// Shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    sidebar?.classList.add('-translate-x-full');
    sidebarOverlay?.classList.add('hidden');
    userDropdown?.classList.add('hidden');
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault(); $('input[placeholder*="Tìm kiếm"]')?.focus();
  }
  if (e.altKey) {
    const map = { '1':'dashboard','2':'lessons','3':'experiments','4':'quiz' };
    if (map[e.key]) { e.preventDefault(); showSection(map[e.key]); }
  }
});

// Fake autosave
setInterval(() => console.log('Auto-saving study progress...'), 30000);

/* ===================== 3. PENDULUM ===================== */
let isPlaying = false, animationId, startTime = Date.now();
let length  = 1.0, angle = 15, mass = 1.0, gravity = 9.8, damping = 0.0;

function initPendulumUI() {
  const tabBtns     = $$('.tab-btn');
  const tabContents = $$('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => toggleClasses(b,
        ['text-gray-600','hover:text-gray-800','hover:bg-gray-100'],
        ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white','shadow-lg']
      ));
      toggleClasses(btn,
        ['bg-gradient-to-r','from-violet-500','to-pink-500','text-white','shadow-lg'],
        ['text-gray-600','hover:text-gray-800','hover:bg-gray-100']
      );

      tabContents.forEach(c => c.classList.remove('active'));
      document.getElementById(`${btn.dataset.tab}-tab`)?.classList.add('active');
    });
  });

  updatePendulumDisplay();
  setupSliders();
  $('#play-btn')?.addEventListener('click', toggleAnimation);
}

function animatePendulum() {
  if (!isPlaying) return;
  const t = (Date.now() - startTime) * 0.001;
  const T = 2 * Math.PI * Math.sqrt(length / gravity);
  const A = angle * Math.exp(-damping * t);
  const theta = A * Math.cos(2 * Math.PI * t / T);

  $('#pendulum-string')?.style.setProperty('transform', `rotate(${theta}deg)`);

  updatePhysicsDisplay(theta, t, T);
  updateDataTable(t, theta);
  animationId = requestAnimationFrame(animatePendulum);
}

function toggleAnimation() {
  isPlaying = !isPlaying;
  const btn = $('#play-btn');
  btn && (btn.textContent = isPlaying ? 'Pause' : 'Play');
  if (isPlaying) { startTime = Date.now(); animatePendulum(); }
  else cancelAnimationFrame(animationId);
}

function updatePhysicsDisplay(theta, t, T) {
  const f = 1 / T;
  const v = angle * Math.sqrt(gravity / length) *
            Math.cos(2 * Math.PI * t / T) * Math.exp(-damping * t);

  setTxt('period-display',   `${T.toFixed(2)}s`);
  setTxt('frequency-display',`${f.toFixed(2)}Hz`);
  setTxt('angle-display',    `${Math.abs(theta).toFixed(1)}°`);
  setTxt('velocity-display', `${Math.abs(v).toFixed(1)}m/s`);

  const pot = Math.pow(Math.sin(theta * Math.PI / 180), 2) * 100;
  const kin = 100 - pot;
  $('#potential-energy') && ($('#potential-energy').style.width = pot + '%');
  $('#kinetic-energy')   && ($('#kinetic-energy').style.width   = kin + '%');
}

function updatePendulumDisplay() {
  $('#pendulum-string') && ($('#pendulum-string').style.height = (length * 100) + 'px');
}

function updateDataTable(t, theta) {
  const tbody = $('#data-table');
  if (!tbody) return;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="p-2">${t.toFixed(2)}</td>
    <td class="p-2">${theta.toFixed(1)}</td>
    <td class="p-2">${(theta * Math.sqrt(gravity / length) * Math.cos(t)).toFixed(1)}</td>`;
  tbody.prepend(row);
  if (tbody.children.length > 10) tbody.removeChild(tbody.lastChild);
}

function setupSliders() {
  const bind = (id, fn) => { const el = document.getElementById(id); el && (el.oninput = fn); };
  bind('length-slider',  function(){ length  = parseFloat(this.value); setTxt('length-value',  `${length.toFixed(1)}m`); updatePendulumDisplay(); });
  bind('angle-slider',   function(){ angle   = parseInt(this.value);   setTxt('angle-value',   `${angle}°`); });
  bind('mass-slider',    function(){ mass    = parseFloat(this.value); setTxt('mass-value',    `${mass.toFixed(1)}kg`); });
  bind('gravity-slider', function(){ gravity = parseFloat(this.value); setTxt('gravity-value', `${gravity.toFixed(1)}m/s²`); });
  bind('damping-slider', function(){ damping = parseFloat(this.value); setTxt('damping-value', `${damping.toFixed(2)}`); });
}

/* ===================== 4. QUIZ MODULE (MongoDB ONLY) ===================== */
(function quizModule(){
  let QUIZ_SETS  = [];
  let playingSet = null;
  let qIndex = 0, qScore = 0, chosen = null;

  // Cache DOM
  const quizCardWrap   = $('#quiz-card-wrap');
  const quizPlayerElm  = $('#quiz-player');
  const closePlayerBtn = $('#close-quiz-player');
  const progressRing   = $('#quiz-player #progress-ring');
  const scoreDisplay   = $('#score-display');
  const totalDisplay   = $('#total-display');
  let   questionText   = $('#question-text');
  let   optionsWrap    = $('#options-wrap');
  let   submitBtn      = $('#submit-btn');
  const quizTitleElm   = $('#quiz-title');
  const quizContentElm = $('#quiz-content');
  const quizLoadingElm = $('#quiz-loading');
  const quizErrorElm   = $('#quiz-error');

  // Open tab Quiz
  document.querySelector('a[href="#quiz"]')?.addEventListener('click', async () => {
    if (!QUIZ_SETS.length) {
      await loadQuizzes();
      buildQuizCards(QUIZ_SETS);
    }
  });

  closePlayerBtn?.addEventListener('click', () => {
    quizPlayerElm.classList.add('hidden');
    rebuildPlayerUI();
  });
  submitBtn?.addEventListener('click', submitAnswer);

  async function loadQuizzes() {
    quizLoadingElm?.classList.remove('hidden');
    quizErrorElm?.classList.add('hidden');
    try {
      const res = await fetch(`${API_BASE}/quizzes?t=${Date.now()}`);
      if (!res.ok) throw new Error(await res.text());
      QUIZ_SETS = await res.json();
      if (!Array.isArray(QUIZ_SETS)) throw new Error('Invalid data');
    } catch {
      QUIZ_SETS = [];
      quizErrorElm?.classList.remove('hidden');
    } finally {
      quizLoadingElm?.classList.add('hidden');
    }
  }

  function buildQuizCards(list) {
    quizCardWrap.innerHTML = '';
    list.forEach((set, i) => {
      const card = document.createElement('div');
      card.className = 'card-3d bg-white rounded-3xl overflow-hidden hover-lift border border-gray-200 shadow-lg';
      card.innerHTML = `
        <div class="relative h-40 bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center">
          <i class="fas fa-question-circle text-5xl text-violet-500"></i>
          <div class="absolute top-4 left-4">
            <span class="px-3 py-1 bg-violet-500 text-white rounded-full text-xs font-medium">
              ${set.questions?.length ?? 0} câu
            </span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">${set.title}</h3>
          <p class="text-gray-600 text-sm mb-4">${set.subject || ''}</p>
          <button data-quiz="${i}" class="start-quiz w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white py-3 px-4 rounded-xl font-medium">
            Bắt đầu
          </button>
        </div>`;
      quizCardWrap.appendChild(card);
    });
    quizCardWrap.querySelectorAll('.start-quiz').forEach(btn =>
      btn.addEventListener('click', () => startQuiz(+btn.dataset.quiz))
    );
  }

  function startQuiz(idx) {
    playingSet = JSON.parse(JSON.stringify(QUIZ_SETS[idx]));
    shuffleArray(playingSet.questions);
    qIndex = 0; qScore = 0; chosen = null;
    quizTitleElm.textContent = playingSet.title;
    scoreDisplay.textContent = '0';
    totalDisplay.textContent = playingSet.questions.length;
    quizPlayerElm.classList.remove('hidden');
    renderQuestion();
  }

  function renderQuestion() {
    const item = playingSet.questions[qIndex];
    questionText.textContent = item.q;
    optionsWrap.innerHTML = '';
    chosen = null;
    item.options.forEach((opt,i)=>{
      const btn = document.createElement('button');
      btn.className = 'option w-full text-left p-4 rounded-lg border-2 border-gray-200';
      btn.textContent = `${String.fromCharCode(65+i)}. ${opt}`;
      btn.addEventListener('click',()=>{
        chosen=i;
        optionsWrap.querySelectorAll('.option').forEach(o=>o.classList.remove('selected','bg-violet-50','border-violet-400'));
        btn.classList.add('selected','bg-violet-50','border-violet-400');
      });
      optionsWrap.appendChild(btn);
    });
    const dash = (qIndex/playingSet.questions.length)*283;
    progressRing.setAttribute('stroke-dasharray',`${dash} 283`);
    submitBtn.disabled=false;
    submitBtn.classList.remove('opacity-50','cursor-not-allowed');
  }

  function submitAnswer(){
    if(chosen===null) return;
    submitBtn.disabled=true;
    submitBtn.classList.add('opacity-50','cursor-not-allowed');
    const item=playingSet.questions[qIndex];
    optionsWrap.querySelectorAll('.option').forEach((b,i)=>{
      if(i===item.correct) b.classList.add('border-emerald-500','bg-emerald-50');
      else if(i===chosen) b.classList.add('border-red-500','bg-red-50');
    });
    if(chosen===item.correct){ qScore++; scoreDisplay.textContent=qScore; }
    setTimeout(()=>{
      qIndex++;
      qIndex<playingSet.questions.length?renderQuestion():finishQuiz();
    },900);
  }

  function finishQuiz(){
    progressRing.setAttribute('stroke-dasharray','283 283');
    const pct=Math.round((qScore/playingSet.questions.length)*100);
    quizContentElm.innerHTML=`
      <p class="text-2xl font-bold mb-4">Hoàn thành! 🌟</p>
      <p class="text-lg mb-6">Điểm: <span class="font-semibold">${qScore}/${playingSet.questions.length}</span> (${pct}%)</p>
      <div class="flex gap-3">
        <button id="again" class="px-6 py-2 bg-pink-500 text-white rounded-lg">Làm lại</button>
        <button id="close-finish" class="px-6 py-2 bg-violet-500 text-white rounded-lg">Đóng</button>
      </div>`;
    $('#close-finish').addEventListener('click',()=>{
      quizPlayerElm.classList.add('hidden');
      rebuildPlayerUI();
    });
    $('#again').addEventListener('click',restartQuiz);
  }

  function rebuildPlayerUI(){
    quizContentElm.innerHTML=`
      <p id="question-text" class="text-xl font-bold mb-4"></p>
      <div id="options-wrap" class="space-y-2"></div>
      <button id="submit-btn" class="mt-6 px-6 py-2 bg-violet-500 text-white rounded-lg">Submit</button>`;
    questionText=$('#question-text');
    optionsWrap=$('#options-wrap');
    submitBtn=$('#submit-btn');
    submitBtn.addEventListener('click',submitAnswer);
  }

  function restartQuiz(){
    rebuildPlayerUI();
    qIndex=0; qScore=0; chosen=null;
    shuffleArray(playingSet.questions);
    scoreDisplay.textContent='0';
    totalDisplay.textContent=playingSet.questions.length;
    progressRing.setAttribute('stroke-dasharray','0 283');
    renderQuestion();
  }
})();

/* ===================== 5. LIVE SEARCH ===================== */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = $('#global-search');
  if (!searchInput) return;

  const filterCards = () => {
    const q = searchInput.value.trim().toLowerCase();
    // Lessons
    $$('#lessons .card-3d').forEach(card => {
      const txt = card.textContent.toLowerCase();
      card.style.display = txt.includes(q) ? '' : 'none';
    });
    // Experiments
    $$('#experiments .card-3d').forEach(card => {
      const txt = card.textContent.toLowerCase();
      card.style.display = txt.includes(q) ? '' : 'none';
    });
  };

  searchInput.addEventListener('input', filterCards);
});
