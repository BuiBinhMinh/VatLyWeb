// Loading Screen
setTimeout(() => {
  const loading = document.getElementById('loading');
  loading.classList.add('opacity-0');
  setTimeout(() => loading.style.display = 'none', 700);
}, 2000);

// Hamburger Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
});

// Particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = window.innerWidth < 640 ? 20 : window.innerWidth < 1024 ? 30 : 50;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute w-1 xs:w-2 h-1 xs:h-2 bg-white rounded-full shadow-md';
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 100 - 50;
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --x: ${x}px;
      --y: ${y}px;
      animation: particleMove ${8 + Math.random() * 5}s infinite ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
}
createParticles();

// 3D Atom Animation with Three.js
const atomScene = new THREE.Scene();
const atomCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const atomRenderer = new THREE.WebGLRenderer({ alpha: true });
const updateAtomRendererSize = () => {
  const size = window.innerWidth < 640 ? 250 : window.innerWidth < 768 ? 300 : 400;
  atomRenderer.setSize(size, size);
  atomCamera.aspect = size / size;
  atomCamera.updateProjectionMatrix();
};
updateAtomRendererSize();
window.addEventListener('resize', updateAtomRendererSize);
document.getElementById('atom-3d').appendChild(atomRenderer.domElement);

const atomNucleusGeometry = new THREE.SphereGeometry(5, 32, 32);
const atomNucleusMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const atomNucleus = new THREE.Mesh(atomNucleusGeometry, atomNucleusMaterial);
atomScene.add(atomNucleus);

const atomOrbits = [];
const atomElectrons = [];
const orbitCount = 3;
const orbitRadii = [50, 80, 110];
for (let i = 0; i < orbitCount; i++) {
  const orbitGeometry = new THREE.TorusGeometry(orbitRadii[i], 1, 16, 100);
  const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 3 + i * 0.2;
  atomScene.add(orbit);
  atomOrbits.push(orbit);

  const electronGeometry = new THREE.SphereGeometry(3, 16, 16);
  const electronMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff });
  const electron = new THREE.Mesh(electronGeometry, electronMaterial);
  electron.position.set(orbitRadii[i], 0, 0);
  atomScene.add(electron);
  atomElectrons.push(electron);
}

atomCamera.position.z = 200;

function animateAtom() {
  requestAnimationFrame(animateAtom);
  atomNucleus.scale.set(1 + Math.sin(Date.now() * 0.002) * 0.2, 1 + Math.sin(Date.now() * 0.002) * 0.2, 1 + Math.sin(Date.now() * 0.002) * 0.2);
  atomOrbits.forEach((orbit, i) => {
    orbit.rotation.y += 0.01 + i * 0.005;
  });
  atomElectrons.forEach((electron, i) => {
    electron.position.x = orbitRadii[i] * Math.cos(Date.now() * 0.001 * (i + 1));
    electron.position.z = orbitRadii[i] * Math.sin(Date.now() * 0.001 * (i + 1));
  });
  atomRenderer.render(atomScene, atomCamera);
}
animateAtom();

// Pendulum
let pendulumRunning = {};
function togglePendulum(id) {
  const string = document.getElementById(`pendulumString${id}`);
  pendulumRunning[id] = pendulumRunning[id] !== undefined ? !pendulumRunning[id] : true;
  string.style.animationPlayState = pendulumRunning[id] ? 'running' : 'paused';
}
function resetPendulum(id) {
  const string = document.getElementById(`pendulumString${id}`);
  string.style.animation = 'none';
  string.offsetHeight;
  string.style.animation = 'pendulumSwing 2s ease-in-out infinite';
  pendulumRunning[id] = true;
}

// Wave Frequency
let waveSpeed = {};
function adjustFrequency(id, change) {
  if (!waveSpeed[id]) waveSpeed[id] = 2;
  waveSpeed[id] = Math.max(1, Math.min(4, waveSpeed[id] + change));
  const container = document.getElementById(`waveContainer${id}`);
  const waves = container.querySelectorAll('.animate-[waveMove_2s_infinite_linear]');
  waves.forEach(wave => {
    wave.style.animationDuration = `${waveSpeed[id]}s`;
  });
}

// Scatter
let scatterRunning = {};
function toggleScatter(id) {
  const container = document.getElementById(`scatterContainer${id}`);
  const rays = container.querySelectorAll('.animate-[lightRay_2s_ease-in-out_infinite], .animate-[lightRay_2.2s_ease-in-out_infinite], .animate-[lightRay_2.4s_ease-in-out_infinite]');
  const dust = container.querySelectorAll('.animate-[dustParticle_2.5s_ease-in-out_infinite], .animate-[dustParticle_3s_ease-in-out_infinite], .animate-[dustParticle_3.5s_ease-in-out_infinite]');
  scatterRunning[id] = scatterRunning[id] !== undefined ? !scatterRunning[id] : true;
  rays.forEach(ray => ray.style.animationPlayState = scatterRunning[id] ? 'running' : 'paused');
  dust.forEach(d => d.style.animationPlayState = scatterRunning[id] ? 'running' : 'paused');
}

let intensityScale = {};
function adjustIntensity(id) {
  if (!intensityScale[id]) intensityScale[id] = 1;
  intensityScale[id] = intensityScale[id] === 1 ? 1.5 : 1;
  const container = document.getElementById(`scatterContainer${id}`);
  const rays = container.querySelectorAll('path');
  const dust = container.querySelectorAll('circle');
  rays.forEach(ray => {
    ray.style.strokeWidth = `${intensityScale[id] * 3}px`;
    ray.style.opacity = intensityScale[id] === 1.5 ? 0.8 : 0.5;
  });
  dust.forEach(d => {
    d.style.r = `${intensityScale[id] * 5}px`;
    d.style.opacity = intensityScale[id] === 1.5 ? 0.7 : 0.4;
  });
}

// Magnet
let magnetOn = {};
function toggleMagnet(id) {
  const container = document.getElementById(`magnetContainer${id}`);
  const paths = container.querySelectorAll('.animate-[magneticField_3s_infinite_ease-in-out]');
  magnetOn[id] = magnetOn[id] !== undefined ? !magnetOn[id] : true;
  paths.forEach(path => {
    path.style.animationPlayState = magnetOn[id] ? 'running' : 'paused';
  });
}
function flipMagnet(id) {
  const container = document.getElementById(`magnetContainer${id}`);
  const north = container.querySelector('#north' + id);
  const south = container.querySelector('#south' + id);
  const isNorth = north.textContent === 'N';
  north.textContent = isNorth ? 'S' : 'N';
  south.textContent = isNorth ? 'N' : 'S';
  north.style.fill = isNorth ? 'red' : 'blue';
  south.style.fill = isNorth ? 'blue' : 'red';
}

// Wave Amplitude
let amplitudeScale = {};
function increaseAmplitude(id) {
  if (!amplitudeScale[id]) amplitudeScale[id] = 1;
  amplitudeScale[id] = Math.min(1.5, amplitudeScale[id] + 0.2);
  const container = document.getElementById(`waveContainer${id}`);
  const waves = container.querySelectorAll('.animate-[waterWave_2.5s_infinite_ease-in-out]');
  waves.forEach(wave => {
    wave.style.transform = `scaleY(${amplitudeScale[id]}) translateZ(${amplitudeScale[id] * 20}px)`;
    wave.style.animationDuration = `${2500 / amplitudeScale[id]}ms`;
  });
}
function decreaseAmplitude(id) {
  if (!amplitudeScale[id]) amplitudeScale[id] = 1;
  amplitudeScale[id] = Math.max(0.5, amplitudeScale[id] - 0.2);
  const container = document.getElementById(`waveContainer${id}`);
  const waves = container.querySelectorAll('.animate-[waterWave_2.5s_infinite_ease-in-out]');
  waves.forEach(wave => {
    wave.style.transform = `scaleY(${amplitudeScale[id]}) translateZ(${amplitudeScale[id] * 20}px)`;
    wave.style.animationDuration = `${2500 / amplitudeScale[id]}ms`;
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Intersection Observer for Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-10');
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('section > div').forEach(el => {
  el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
  observer.observe(el);
});

// Swiper for Courses
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 15 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  },
});

// Stats Counter
const statsSection = document.getElementById('stats');
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;
    let current = 0;
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statsObserver.observe(statsSection);

document.querySelector('.logo-container').addEventListener('click', () => {
    const atom = document.querySelector('.logo-container .relative');
    atom.style.transform = 'rotateY(360deg)';
    atom.style.transition = 'transform 0.8s ease-in-out';
    setTimeout(() => {
      atom.style.transform = '';
      atom.style.transition = '';
    }, 800);
  });

  // toggle menu on mobile
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('hidden');
  });

// Khởi động ban đầu
window.onload = function() {
  resetPendulum(1);
};