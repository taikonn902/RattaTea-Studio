document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('mobileNavClose');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileNavOverlay');

  function openNav() {
    mobileNav.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  function closeNav() {
    mobileNav.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  toggleBtn.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);
});
