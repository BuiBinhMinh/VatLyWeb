(() => {
  const form     = document.getElementById('registerForm');
  const fullname = document.getElementById('fullname');
  const email    = document.getElementById('email');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const confirm  = document.getElementById('confirmPassword');
  const togglePw = document.getElementById('togglePassword');
  const toggleCf = document.getElementById('toggleConfirm');
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  // Toggle visibility for password fields
  togglePw.addEventListener('click', () => {
    password.type = password.type === 'password' ? 'text' : 'password';
  });
  toggleCf.addEventListener('click', () => {
    confirm.type = confirm.type === 'password' ? 'text' : 'password';
  });

  // Show tooltip error
  function showError(id) {
    const tip = document.getElementById(id);
    tip.classList.add('show');
    setTimeout(() => tip.classList.remove('show'), 2000);
  }

  // Email validation
  function validEmail(mail) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail);
  }

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!fullname.value.trim())          return showError('err-fullname');
    if (!validEmail(email.value))        return showError('err-email');
    if (!username.value.trim())          return showError('err-user');
    if (password.value.length < 6)       return showError('err-pass');
    if (password.value !== confirm.value) return showError('err-confirm');

    const payload = {
      fullname: fullname.value.trim(),
      email:    email.value.trim(),
      username: username.value.trim(),
      password: password.value
    };

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let errorMsg = 'Đăng ký thất bại';
      if (!res.ok) {
        // Try parse JSON error message safely
        try {
          const data = await res.json();
          if (data.message) errorMsg = data.message;
        } catch {
          // Ignore JSON parse errors
        }
        throw new Error(errorMsg);
      }

      // Success notification
      toastMsg.textContent = 'Đăng ký thành công!';
      toast.classList.add('show');
      localStorage.setItem('userFullname', fullname.value.trim());
      setTimeout(() => window.location.href = 'login.html', 1500);

    } catch (error) {
      toastMsg.textContent = error.message;
      toast.classList.add('show');
    }
  });
})();
