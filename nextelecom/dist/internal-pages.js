/* Aberturas e seções internas da Nex. Textos e ações permanecem elementos HTML. */
const PAGE_ART = {
  '/internet': {
    theme: 'fiber', banner: 'gamer', alt: 'Mascote da Nex jogando em uma arena gamer iluminada por neon.',
    label: 'Internet fibra', icon: 'wifi', caption: 'Fibra, apps e possibilidades para sua casa.'
  },
  '/movel': {
    theme: 'mobile', banner: 'chip', alt: 'Mascote da Nex mostrando um chip e um celular.',
    label: 'Minha NEX Móvel', icon: 'phone', caption: 'Fibra em casa. Sua Nex também no celular.'
  },
  '/empresarial': {
    theme: 'business', banner: 'business', alt: 'Dois profissionais conversando em um escritório.',
    label: 'Empresarial', icon: 'business', caption: 'Conectividade para acompanhar a sua operação.'
  },
  '/quem-somos': {
    theme: 'about', image: 'mascot-official.webp', alt: 'Mascote da Nex recebendo você',
    label: 'Quem somos', icon: 'wifi', caption: 'Pessoas próximas. Novas conexões.'
  },
  '/indique': {
    theme: 'referral', image: 'mascot-official.webp', alt: 'Mascote da Nex convidando para uma nova conexão',
    label: 'Indique e ganhe', icon: 'phone', caption: 'Uma conexão boa merece ser compartilhada.'
  },
  '/contato': {
    theme: 'contact', image: 'mascot-official.webp', alt: 'Mascote da Nex pronto para ajudar',
    label: 'Fale conosco', icon: 'phone', caption: 'Escolha seu atendimento. Conte com a Nex.'
  },
  '/svas': {
    theme: 'services', banner: 'cinema-orange', alt: 'Mascote da Nex assistindo à TV na sala.',
    label: 'Apps e serviços', icon: 'wifi', caption: 'Seus apps favoritos, mais perto de você.'
  }
};

function hero({ eyebrow, title, copy, cta = 'Encontre seu plano', url = '#planos' }) {
  const route = location.pathname.replace(/\/$/, '') || '/';
  const art = PAGE_ART[route] || PAGE_ART['/internet'];
  const isBusiness = art.theme === 'business';
  const services = ['fiber', 'services'].includes(art.theme);
  const logos = services && typeof nexSvaLogos === 'function'
    ? `<div class="masthead-service-logos" aria-label="Conheça os apps disponíveis">${nexSvaLogos(['Disney+', 'HBO Max', 'Deezer', 'TV Plus', 'Ubook'])}</div>`
    : '';
  const anchor = url.startsWith('#') ? url : '#main';

  return `<section class="page-masthead masthead-${art.theme}${isBusiness ? ' masthead-photo-layout' : ''}">
    ${art.banner ? '<div class="masthead-banner">' : ''}
    <div class="wrap masthead-content">
      <a class="breadcrumb" href="/">Início <span aria-hidden="true">/</span> ${art.label}</a>
      <div class="masthead-layout">
        <div class="masthead-copy">
          <span class="eyebrow">${eyebrow}</span>
          <h1>${title}</h1>
          <p>${copy}</p>
          <div class="hero-actions">
            ${link(url, cta, 'button' + (isBusiness ? ' light' : ''))}
            <button class="text-link" data-combo>Monte seu combo <span aria-hidden="true">↗</span></button>
          </div>
          ${logos}
        </div>
        ${art.banner ? '' : `<div class="masthead-visual">
          <div class="masthead-art-panel" aria-hidden="true"></div>
          <img class="masthead-art" src="/assets/${art.image}" alt="${art.alt}" fetchpriority="high" width="${isBusiness ? '1536' : '1024'}" height="1024">
        </div>`}
      </div>
    </div>
    ${art.banner ? nexBannerImage(art.banner, art.alt, 'masthead-banner-image', 'fetchpriority="high"') + '</div>' : ''}
    <div class="masthead-caption">
      <div class="wrap">${nexIcon(art.icon)}<span>${art.caption}</span><a href="${anchor}">Explore <span aria-hidden="true">↓</span></a></div>
    </div>
    <button class="motion-pause" aria-label="Pausar animações" aria-pressed="false">Ⅱ</button>
  </section>`;
}

function band() {
  return `<section class="internal-combo-band">
    <div class="wrap internal-combo-layout">
      <div class="combo-band-title">
        <span class="eyebrow">SEU COMBO, DO SEU JEITO</span>
        <h2>A conexão é sua.<br>As escolhas também.</h2>
        <p>Combine internet, celular e os apps que fazem parte da sua rotina.</p>
        <button class="button" data-combo>Montar meu combo <span aria-hidden="true">↗</span></button>
      </div>
      <div class="combo-band-art">
        <img src="/assets/mascot-official.webp" loading="lazy" alt="Mascote da Nex convidando você a montar seu combo" width="1024" height="1024">
      </div>
    </div>
  </section>`;
}

function promos() {
  return campaignPromos();
}

function nexStoreSection(isContact) {
  return `<section class="section nex-store-section reveal">
    <div class="wrap nex-store-layout">
      <figure class="nex-store-photo">
        <img src="/assets/nex-store-saocristovao.webp" loading="lazy" alt="Fachada da loja Nex Telecom em São Cristóvão" width="1440" height="1080">
        <figcaption>Loja Nex Telecom · São Cristóvão</figcaption>
      </figure>
      <div class="nex-store-copy">
        <span class="eyebrow">NEX, PERTO DE VOCÊ</span>
        <h2>${isContact ? 'Atendimento de perto. Conexão de verdade.' : 'Uma conexão também se faz de pessoas.'}</h2>
        <p>Nossa equipe recebe você e ajuda a encontrar a conexão que combina com a sua casa ou empresa.</p>
        <button class="button outline" data-business="Atendimento na loja São Cristóvão">Falar com a equipe <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  </section>`;
}

function configureInternalPage() {
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.body.classList.toggle('internal-page', path !== '/');
  document.body.dataset.section = path.slice(1) || 'home';

  if (['/quem-somos', '/contato'].includes(path) && !document.querySelector('.nex-store-section')) {
    document.querySelector('.page-masthead')?.insertAdjacentHTML('afterend', nexStoreSection(path === '/contato'));
  }


  const icons = path === '/empresarial' ? ['wifi', 'business', 'wifi']
    : path === '/contato' ? ['phone', 'wifi', 'business'] : ['wifi', 'phone', 'business'];
  document.querySelectorAll('.internal-page .cards-three article').forEach((element, index) => {
    element.classList.add('reveal');
    if (!element.querySelector('.section-symbol')) {
      const symbol = document.createElement('div');
      symbol.className = 'section-symbol';
      symbol.setAttribute('aria-hidden', 'true');
      symbol.innerHTML = nexIcon(icons[index % icons.length]);
      element.prepend(symbol);
    }
    element.style.animationPlayState = 'paused';
    observer.observe(element);
  });

  if (path === '/movel') {
    document.querySelectorAll('.plan-grid .plan-card').forEach(element => {
      if (!element.querySelector('.mobile-plan-symbol')) {
        element.insertAdjacentHTML('afterbegin', `<div class="mobile-plan-symbol" aria-hidden="true">${nexIcon('phone')}</div>`);
      }
    });
  }
}

document.addEventListener('nex:render', configureInternalPage);
