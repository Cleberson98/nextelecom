/* Navegação de campanhas e animações nativas, com redução de movimento. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let disposeCampaign = () => {};
  let revealObserver;
  let movingArt = [];
  let scrollFrame = 0;

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  function updateScroll() {
    scrollFrame = 0;
    const scroll = window.scrollY;
    const available = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = 'scaleX(' + Math.min(1, scroll / available) + ')';
    document.querySelector('header')?.classList.toggle('is-scrolled', scroll > 12);
    if (reducedMotion.matches || document.body.classList.contains('motion-off')) return;
    const positions = movingArt.map(element => ({element, top:element.getBoundingClientRect().top}));
    positions.forEach(({element, top}) => {
      const offset = Math.max(-12, Math.min(12, (window.innerHeight * .35 - top) * .025));
      element.style.setProperty('--mascot-shift', offset.toFixed(1) + 'px');
    });
  }

  function requestScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }

  function setupReveal() {
    revealObserver?.disconnect();
    const elements = document.querySelectorAll('#main .reveal, #main .sva-service, #main .store-section');
    if (reducedMotion.matches) {
      elements.forEach(element => element.classList.add('is-revealed'));
      return;
    }
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    }, {threshold:.07});
    elements.forEach((element, index) => {
      element.classList.add('will-reveal');
      element.style.setProperty('--reveal-delay', (index % 4) * (element.matches('.plan-card') ? 90 : 45) + 'ms');
      if (element.getBoundingClientRect().top < window.innerHeight - 30) {
        element.classList.add('is-revealed');
      } else {
        revealObserver.observe(element);
      }
    });
  }

  function setupCampaign() {
    disposeCampaign();
    const region = document.querySelector('.nex-campaign');
    if (!region) return;
    const panels = Array.from(region.querySelectorAll('.campaign-slide'));
    const pause = region.querySelector('[data-campaign-pause]');
    let current = 0;
    let timer;
    let manualPause = reducedMotion.matches;
    let visible = true;

    function stopTimer() {
      clearTimeout(timer);
    }

    function schedule() {
      stopTimer();
      const stopped = manualPause || !visible || document.hidden ||
        document.body.classList.contains('motion-off') || panels[current].contains(document.activeElement);
      if (!stopped) timer = setTimeout(() => select((current + 1) % panels.length), 8500);
    }

    function select(index) {
      current = (index + panels.length) % panels.length;
      panels.forEach((panel, i) => {
        panel.hidden = i !== current;
        panel.classList.toggle('is-entering', i === current);
      });
      schedule();
    }

    function setConsistentHeight() {
      region.style.setProperty('--campaign-panel-height', '0px');
      let height = 0;
      panels.forEach(panel => {
        const hidden = panel.hidden;
        panel.style.visibility = 'hidden';
        panel.hidden = false;
        height = Math.max(height, panel.getBoundingClientRect().height);
        panel.hidden = hidden;
        panel.style.visibility = '';
      });
      region.style.setProperty('--campaign-panel-height', Math.ceil(height) + 'px');
    }

    const click = event => {
      const arrow = event.target.closest('[data-campaign-step]');
      if (arrow) {
        select(current + Number(arrow.dataset.campaignStep));
        return;
      }

      if (event.target.closest('[data-campaign-pause]')) {
        manualPause = !manualPause;
        pause.setAttribute('aria-pressed', String(manualPause));
        pause.setAttribute('aria-label', manualPause ? 'Retomar a troca automática das campanhas' : 'Pausar troca automática das campanhas');
        pause.textContent = manualPause ? '▶' : 'Ⅱ';
        schedule();
      }
    };
    const focusOut = () => setTimeout(schedule, 0);
    const visibility = () => schedule();
    const resizing = () => requestAnimationFrame(setConsistentHeight);
    region.addEventListener('click', click);
    region.addEventListener('focusin', schedule);
    region.addEventListener('focusout', focusOut);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('resize', resizing);
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      region.classList.toggle('campaign-in-view', visible);
      schedule();
    }, {threshold:.08});
    observer.observe(region);
    setConsistentHeight();
    document.fonts.ready.then(() => { if (region.isConnected) setConsistentHeight(); });
    pause.setAttribute('aria-pressed', String(manualPause));
    pause.setAttribute('aria-label', manualPause ? 'Retomar a troca automática das campanhas' : 'Pausar troca automática das campanhas');
    pause.textContent = manualPause ? '▶' : 'Ⅱ';
    schedule();
    disposeCampaign = () => {
      stopTimer();
      observer.disconnect();
      region.removeEventListener('click', click);
      region.removeEventListener('focusin', schedule);
      region.removeEventListener('focusout', focusOut);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('resize', resizing);
    };
  }

  function setup() {
    setupReveal();
    setupCampaign();
    movingArt = Array.from(document.querySelectorAll('.home-combo-art'));
    requestScroll();
  }

  window.addEventListener('scroll', requestScroll, {passive:true});
  reducedMotion.addEventListener('change', setup);
  document.addEventListener('nex:render', setup);
  document.addEventListener('click', event => {
    if (event.target.closest('.motion-pause')) setTimeout(setup, 0);
  });
  setup();
})();
