/* Aberturas e seções internas da Nex. Textos e ações permanecem elementos HTML. */
function myNexApp() {
  return `
    <section class="section my-nex-app" aria-labelledby="my-nex-title">
      <div class="wrap">
        <a class="breadcrumb" href="/">Início <span>/</span> Aplicativo Minha Nex</a>
        <div class="my-nex-app-content">
          <span class="eyebrow">MINHA NEX</span>
          <h1 id="my-nex-title">Sua Nex, na palma da mão.</h1>
          <p>Acesse suas faturas, acompanhe seus serviços e fale com a Nex pelo aplicativo Minha Nex.</p>
          <h2>Baixe no seu celular</h2>
          <div class="my-nex-store-links">
            <a class="button blue" href="https://play.google.com/store/apps/details?id=com.hubsoft_client_app.nextelecom&hl=pt_BR" target="_blank" rel="noopener" aria-label="Baixar Minha Nex no Google Play">
              <span><small>Para Android</small>Google Play</span><span aria-hidden="true">↗</span>
            </a>
            <a class="button blue" href="https://apps.apple.com/br/app/minha-nex/id6670446541" target="_blank" rel="noopener" aria-label="Baixar Minha Nex na App Store">
              <span><small>Para iPhone</small>App Store</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>`;
}

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
  const art = PAGE_ART[route === '/faleconosco' ? '/contato' : route] || PAGE_ART['/internet'];
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

function nexStoreSection() {
  return `<section class="section nex-store-section reveal">
    <div class="wrap nex-store-layout">
      <figure class="nex-store-photo">
        <img src="/assets/nex-store-saocristovao.webp" loading="lazy" alt="Fachada da loja Nex Telecom em São Cristóvão" width="1440" height="1080">
        <figcaption>Loja Nex Telecom · São Cristóvão</figcaption>
      </figure>
      <div class="nex-store-copy">
        <span class="eyebrow">NEX, PERTO DE VOCÊ</span>
        <h2>Uma conexão também se faz de pessoas.</h2>
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

  if (path === '/quem-somos' && !document.querySelector('.nex-store-section')) {
    document.querySelector('.page-masthead')?.insertAdjacentHTML('afterend', nexStoreSection());
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

const NEX_STORES = [
  ['Rua Professor Plínio Garcez de Sena, nº 51', 'https://www.google.com/maps/search/?api=1&query=-12.917472,-38.365028'],
  ['Rua Doutor Maurício, nº 131–173, Lauro de Freitas', 'https://www.google.com/maps/search/?api=1&query=-12.879306,-38.353722'],
  ['Quadra 1, Lote 19, Avenida Fortaleza, Lauro de Freitas', 'https://www.google.com/maps/search/?api=1&query=-12.893944,-38.342028'],
  ['Rua Manoel Silvestre Leite, 228, Lauro de Freitas, BA', 'https://maps.app.goo.gl/WwXYG7Q3NKgwxz65A'],
  ['Largo do Soledade, 18, Lapinha, Salvador, BA, 40325-090', 'https://www.google.com/maps/search/?api=1&query=-12.957167,-38.498611'],
  ['Avenida Aliomar Baleeiro, 14703, São Cristóvão, Salvador, BA', 'https://www.google.com/maps/search/?api=1&query=Avenida+Aliomar+Baleeiro%2C+14703+-+S%C3%A3o+Crist%C3%B3v%C3%A3o%2C+Salvador+-+BA']
];

function contact() {
  const whatsapp = 'https://wa.me/557132526676';
  const external = (url, label, cls = 'text-link') =>
    `<a class="${cls}" href="${url}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a>`;

  const stores = NEX_STORES.map(([address, map], index) => {
    const number = String(index + 1).padStart(2, '0');
    const image = index === 5 ? 'nex-store-saocristovao.webp' : `loja-nex-${number}.webp`;
    const message = encodeURIComponent(`Olá! Gostaria de informações sobre a loja ${number} da Nex Telecom.`);
    return `<article class="contact-store">
      <img src="/assets/${image}" loading="lazy" width="900" height="600" alt="Fachada da loja ${number} da Nex Telecom">
      <div class="contact-store-copy">
        <h3>Loja ${number}</h3>
        <p>${address}</p>
        <div class="contact-actions">
          ${external(map, 'Como chegar', 'button blue')}
          ${external(`${whatsapp}?text=${message}`, 'WhatsApp')}
        </div>
      </div>
    </article>`;
  }).join('');

  return hero({
    eyebrow: 'FALE COM A NEX',
    title: 'Fale <em>conosco.</em>',
    copy: 'Fale com nossa equipe, acesse a área do cliente ou encontre uma loja Nex.',
    cta: 'Ver nossas lojas',
    url: '#lojas'
  }) + `
    <section class="section" id="canais">
      <div class="wrap">
        ${sectionHead('ATENDIMENTO NEX', 'Como podemos ajudar?')}
        <div class="cards-three">
          <article><h3>Contratação e suporte</h3><p>Converse com a nossa equipe para contratar um plano ou pedir ajuda.</p>${external(whatsapp, 'Abrir WhatsApp', 'button')}</article>
          <article><h3>Atendimento por telefone</h3><p>Ligue para a Nex pelo número <strong>(71) 3252-6676</strong>.</p><a class="button blue" href="tel:+557132526676">Ligar agora</a></article>
          <article><h3>Minha Nex</h3><p>Acesse a Central do Assinante e consulte a segunda via da fatura.</p>${external('https://central.nextelecom.net.br/', 'Acessar Minha Nex', 'button blue')}</article>
        </div>
      </div>
    </section>
    <section class="section soft" id="lojas">
      <div class="wrap">
        ${sectionHead('ATENDIMENTO PRESENCIAL', 'Encontre uma loja Nex.', 'Escolha uma unidade para ver a rota ou confirmar o horário pelo WhatsApp.')}
        <div class="contact-stores">${stores}</div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        ${sectionHead('LINKS RÁPIDOS', 'Nex ao seu alcance.')}
        <div class="cards-three">
          <article><h3>Baixe o app Minha Nex</h3><div class="contact-actions">${external('https://play.google.com/store/apps/details?id=com.hubsoft_client_app.nextelecom&hl=pt_BR', 'Google Play')}${external('https://apps.apple.com/br/app/minha-nex/id6670446541', 'App Store')}</div></article>
          <article><h3>Teste a conexão</h3>${external('https://test.nextelecom.com.br/', 'Teste de velocidade')}</article>
          <article><h3>Acompanhe a Nex</h3><div class="contact-actions"><a class="text-link" href="/trabalheconosco">Trabalhe conosco ↗</a>${external('https://www.instagram.com/nextelecomoficial/', 'Instagram')}</div></article>
        </div>
      </div>
    </section>` + faq(commonFaq);
}
