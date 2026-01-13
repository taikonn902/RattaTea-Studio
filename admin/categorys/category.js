// Mobile Nav active link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.dataset.page;

    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('nav-active');

        if (link.dataset.nav === currentPage) {
            link.classList.add('nav-active');
        }
    });
});

// open & close mobile nav
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const closeBtn = document.getElementById('mobileNavClose');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('mobileNavOverlay');

    function openMenu() {
        mobileNav.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileNav.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
});

// 
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('categoryModal');
    const modalBox = modal.querySelector('.relative');

    const openBtn = document.getElementById('openCategoryModal');
    const closeBtn = document.getElementById('closeCategoryModal');
    const cancelBtn = document.getElementById('cancelCategory');
    const overlay = document.getElementById('categoryOverlay');

    /* ================= OPEN MODAL ================= */
    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // reset trạng thái
        modalBox.classList.remove('translate-y-0', 'opacity-100');
        modalBox.classList.add('translate-y-full', 'opacity-0');

        // trigger animation
        requestAnimationFrame(() => {
            modalBox.classList.remove('translate-y-full', 'opacity-0');
            modalBox.classList.add('translate-y-0', 'opacity-100');
        });

        document.body.style.overflow = 'hidden';

        const firstInput = modal.querySelector('input, textarea');
        if (firstInput) firstInput.focus();
    }

    /* ================= CLOSE MODAL ================= */
    function closeModal() {
        modalBox.classList.remove('translate-y-0', 'opacity-100');
        modalBox.classList.add('translate-y-full', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }, 300);
    }

    /* ================= EVENTS ================= */
    openBtn?.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    /* ================= FORM SUBMIT ================= */
    const form = document.getElementById('categoryForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('input').value.trim();
        if (!name) return alert('Vui lòng nhập tên loại sản phẩm');

        console.log('Thêm danh mục:', name);

        closeModal();
        form.reset();
    });
});