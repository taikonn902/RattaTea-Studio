// toast.js
const showToast = (message, type = 'success') => {
    const isMobile = window.innerWidth <= 768;

    if (typeof Swal !== 'undefined') {
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
    } else {
        alert(message);
    }
};
