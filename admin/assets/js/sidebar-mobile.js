
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

