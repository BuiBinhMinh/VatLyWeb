(() => {
  const form       = document.getElementById('loginForm');
  const identifier = document.getElementById('username');
  const password   = document.getElementById('password');
  const togglePw   = document.getElementById('togglePassword');
  const toast      = document.getElementById('toast');
  const toastMsg   = document.getElementById('toast-msg');

  // Toggle password visibility
  togglePw.addEventListener('click', () => {
    password.type = password.type === 'password' ? 'text' : 'password';
  });

  // Show tooltip error for a given element ID
  function showError(id) {
    const tip = document.getElementById(id);
    tip.classList.add('show');
    setTimeout(() => tip.classList.remove('show'), 2000);
  }

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!identifier.value.trim())      return showError('err-user');
    if (!password.value)               return showError('err-pass');

    const payload = {
      identifier: identifier.value.trim(),
      password:   password.value
    };

    try {
      // Demo with JSONPlaceholder (luôn trả về 201)
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let errorMsg = 'Đăng nhập thất bại';
      if (!res.ok) {
        try {
          const data = await res.json();
          if (data.message) errorMsg = data.message;
        } catch {
          // Không phải JSON → giữ thông báo chung
        }
        throw new Error(errorMsg);
      }

      // Lấy response JSON (nếu cần)
      let data = {};
      try { data = await res.json(); } catch {}

      // Lưu tên người dùng để sử dụng cho dropdown
      // Demo: dùng chính identifier làm tên
      localStorage.setItem('userFullname', identifier.value.trim());

      // Thông báo thành công
      toastMsg.textContent = 'Đăng nhập thành công!';
      toast.classList.add('show');

      // Redirect đến dashboard sau 1s
      setTimeout(() => window.location.href = 'homecourse.html', 1000);
    } catch (error) {
      toastMsg.textContent = error.message;
      toast.classList.add('show');
    }
  });
})();
