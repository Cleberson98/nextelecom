(() => {
  const nav = document.getElementById('nex-main-nav');
  const mobileToggle = document.querySelector('.menu-toggle');
  const toggles = [...nav.querySelectorAll('.submenu-toggle')];

  function setExpanded(toggle, expanded) {
    toggle.setAttribute('aria-expanded', String(expanded));
    document.getElementById(toggle.getAttribute('aria-controls')).hidden = !expanded;
  }

  function closeSubmenus() {
    toggles.forEach(toggle => setExpanded(toggle, false));
  }

  const desktopMenu = matchMedia('(min-width:1051px) and (any-hover:hover)');
  toggles.forEach(toggle => {
    const group = toggle.closest('.nav-group');
    group.addEventListener('pointerenter', event => {
      if (!desktopMenu.matches || event.pointerType !== 'mouse') return;
      closeSubmenus();
      setExpanded(toggle, true);
    });
    group.addEventListener('pointerleave', event => {
      if (desktopMenu.matches && event.pointerType === 'mouse' && !group.contains(document.activeElement)) {
        setExpanded(toggle, false);
      }
    });
  });

  nav.addEventListener('click', event => {
    const toggle = event.target.closest('.submenu-toggle');
    if (!toggle) return;
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    closeSubmenus();
    setExpanded(toggle, !expanded);
  });

  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) closeSubmenus();
  });

  nav.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const expanded = nav.querySelector('.submenu-toggle[aria-expanded="true"]');
    if (expanded) {
      closeSubmenus();
      expanded.focus();
    } else if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.focus();
    }
  });

  document.addEventListener('nex:render', closeSubmenus);
})();
