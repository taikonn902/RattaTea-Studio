document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const sidebarLogo = document.getElementById('sidebarLogo');
  const sidebarClose = document.getElementById('sidebarClose');
  const logoText = document.querySelector('.logo-text');
  const navLinks = document.querySelectorAll('.nav-link');
  const navTexts = document.querySelectorAll('.nav-text');
  const contentWrapper = document.getElementById('contentWrapper');

  const SIDEBAR_CLOSE_WIDTH = 80;   // w-20
  const SIDEBAR_OPEN_WIDTH = 256;  // w-64
  const DESKTOP_BREAKPOINT = 768;  // md

  let isOpen = false;

  // ====== CHECK DESKTOP ======
  function isDesktop() {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }

  // ====== UPDATE CONTENT POSITION ======
  function updateContentPosition(width) {
    if (isDesktop()) {
      contentWrapper.style.marginLeft = width + 'px';
    } else {
      contentWrapper.style.marginLeft = '0px'; // 🔥 MOBILE FIX
    }
  }

  // ====== OPEN SIDEBAR ======
  function openSidebar() {
    sidebar.style.width = SIDEBAR_OPEN_WIDTH + 'px';

    if (!isDesktop()) {
      sidebar.classList.add('z-50');
      sidebar.classList.remove('-translate-x-full');
    }

    updateContentPosition(SIDEBAR_OPEN_WIDTH);

    logoText.classList.remove('hidden');
    navTexts.forEach(t => t.classList.remove('hidden'));
    sidebarClose.classList.remove('hidden');

    navLinks.forEach(link => link.classList.remove('justify-center'));
    isOpen = true;
  }

  // ====== CLOSE SIDEBAR ======
  function closeSidebar() {
    sidebar.style.width = SIDEBAR_CLOSE_WIDTH + 'px';

    if (!isDesktop()) {
      sidebar.classList.add('-translate-x-full');
    }

    updateContentPosition(SIDEBAR_CLOSE_WIDTH);

    logoText.classList.add('hidden');
    navTexts.forEach(t => t.classList.add('hidden'));
    sidebarClose.classList.add('hidden');

    navLinks.forEach(link => link.classList.add('justify-center'));
    isOpen = false;
  }

  // ====== EVENTS ======
  sidebarLogo.addEventListener('click', () => {
    isOpen ? closeSidebar() : openSidebar();
  });

  sidebarClose.addEventListener('click', closeSidebar);

  // ====== RESIZE FIX ======
  window.addEventListener('resize', () => {
    updateContentPosition(isOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSE_WIDTH);
  });

  // ====== INIT ======
  if (isDesktop()) {
    closeSidebar();
  } else {
    sidebar.classList.add('-translate-x-full');
    contentWrapper.style.marginLeft = '0px';
  }
});
