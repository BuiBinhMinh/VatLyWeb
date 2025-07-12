document.getElementById('togglePassword').addEventListener('click', function(){
  const pw = document.getElementById('password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
  this.textContent = pw.type === 'password' ? '👁️' : '🙈';
});

const DEMO_USER = 'demo@physicslab.test';
const DEMO_PASS = 'Demo1234';

// === Toast helper ===
/**
 * Hiện toast notification
 @param {string} message Nội dung
 @param {'success'|'error'} type Loại toast
 @param {number} duration Thời gian (ms) trước khi ẩn
 @param {Function} callback Hàm gọi sau khi toast ẩn xong
 */
function showToast(message, type = 'success', duration = 2000, callback = null) {
  let toast = document.getElementById('toast');
  let icon = toast.querySelector('i');
  let text = toast.querySelector('#toast-msg');

  toast.className = 'toast';
  toast.classList.add(type);
  icon.className = type === 'success'
    ? 'bx bx-check-circle text-2xl'
    : 'bx bx-error-circle text-2xl';
  text.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    if (callback) callback();
  }, duration);
}

function showError(id) {
  const tip = document.getElementById(id);
  tip.classList.add('show');
  setTimeout(() => tip.classList.remove('show'), 2000);
}

document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;

  if (!u) {
    showError('err-user');
    return;
  }
  if (!p) {
    showError('err-pass');
    return;
  }

  // demo-login check
  if (u === DEMO_USER && p === DEMO_PASS) {
    showToast('Đăng nhập thành công!', 'success', 1500, () => {
      window.location.href = 'homecourse.html';
    });
  } else {
    showToast('Sai email hoặc mật khẩu.', 'error');
  }
});

setInterval(() => {
  const p = document.createElement('div');
  p.className = 'gravity-particle';
  p.style.left = Math.random() * 100 + '%';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 3000);
}, 1500);

setInterval(() => {
  const p = document.createElement('div');
  p.style.cssText =
    'position:absolute;width:4px;height:4px;background:rgba(255,255,255,0.6);' +
    'border-radius:50%;left:' + (Math.random() * 100) + '%;top:100%;' +
    'animation:floatUp 4s linear forwards;';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 4000);
}, 2000);

document.querySelector('.login-card').addEventListener('mouseenter', function(){
  for (let i = 0; i < 5; i++){
    setTimeout(() => {
      const b = document.createElement('div');
      const dx = (Math.random() * 2 - 1) * 100;
      const dy = (Math.random() * 2 - 1) * 100;
      b.style.cssText =
        `position:absolute;width:8px;height:8px;
         background:radial-gradient(circle,#fff,#ff6b6b);
         border-radius:50%;top:50%;left:50%;
         transform:translate(-50%,-50%);
         animation: energyBurst 1s ease-out forwards;
         --dx:${dx}px; --dy:${dy}px; z-index:1000;`;
      this.appendChild(b);
      setTimeout(() => b.remove(), 1000);
    }, i * 100);
  }
});

const st = document.createElement('style');
st.textContent = `
  @keyframes energyBurst {
    0% { transform:translate(-50%,-50%) scale(0); opacity:1; }
    100% {
      transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(3);
      opacity:0;
    }
  }
  @keyframes floatUp {
    to { transform:translateY(-100vh) rotate(360deg); opacity:0; }
  }
`;
document.head.appendChild(st);