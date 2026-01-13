document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginBtn = document.getElementById("loginBtn");
    const rememberMe = document.getElementById("rememberMe")?.checked ? 1 : 0;

    // ===== Helper toast =====
    const showToast = (message, type = 'success') => {
        const isMobile = window.innerWidth <= 768;

        Swal.fire({
            toast: true,
            icon: type,
            title: message,
            position: isMobile ? 'top' : 'top-end',
            showConfirmButton: false,
            timer: 1800,
            timerProgressBar: true,
            customClass: {
                popup: isMobile ? 'swal-mobile-top-center' : ''
            }
        });
    };

    // ===== Validate =====
    if (!email && !password) {
        showToast('Vui lòng nhập email và mật khẩu', 'error');
        return;
    }

    if (!email) {
        showToast('Vui lòng nhập email', 'error');
        return;
    }

    if (!password) {
        showToast('Vui lòng nhập mật khẩu', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Email không hợp lệ', 'error');
        return;
    }
    
    // ===== Loading =====
    loginBtn.disabled = true;
    loginBtn.textContent = 'Đang đăng nhập...';

    // ===== API =====
    fetch('api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            email: email,
            password: password,
            remember: rememberMe
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showToast(data.message, 'success');

                // lưu localStorage (phục vụ UI)
                localStorage.setItem('user', JSON.stringify({
                    email: data.user.email,
                    role: data.user.role,
                    loginAt: Date.now()
                }));

                setTimeout(() => {
                    if (data.user.role === 0) {
                        window.location.href = '/rattatea-studio/admin/index.php';
                    } else {
                        window.location.href = '/rattatea-studio/index.html';
                    }
                }, 1200);

            } else {
                showToast(data.message || 'Sai email hoặc mật khẩu', 'error');
            }
        })
        .catch(() => {
            showToast('Không thể kết nối server', 'error');
        })
        .finally(() => {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Đăng nhập';
        });
});
