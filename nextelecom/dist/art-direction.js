/* Home reconstruída com camadas independentes: fotografias, faixas, textos e controles. */
const nexIcon=(name)=>{const paths={wifi:'M3 9a15 15 0 0 1 18 0M6 13a10 10 0 0 1 12 0M9 17a5 5 0 0 1 6 0M12 21h.01',phone:'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM10 18h4',camera:'m3 4 16 4-3 9-15-5L3 4Zm4 10-2 6h8m6-10 3 1-2 5-3-1',business:'M4 7h16a2 2 0 0 1 2 2v11H2V9a2 2 0 0 1 2-2Zm4 0V3h8v4M2 12h20M10 12v3h4v-3'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`};
function brandRibbon(cls=''){return `<svg class="brand-ribbon ${cls}" viewBox="0 0 700 650" fill="none" aria-hidden="true"><path d="M-60 465 115 465 260 170 520 170 690 340 560 555 300 555" stroke="currentColor" stroke-width="62" stroke-linejoin="bevel"/></svg>`}
function campaignPromos(){return `<section class="campaigns" aria-label="Conheça outras soluções Nex"><article class="campaign campaign-mobile reveal"><img src="/assets/campaign-mobile.jpg" loading="lazy" alt="Celular e chip ilustrativos em uma composição de campanha"><div class="campaign-copy"><span class="eyebrow">MINHA NEX MÓVEL</span><h2>Sua Nex<br>também vai<br>com você.</h2><p>Internet em casa + chip com 7 GB.<br>Uma conexão para acompanhar você.</p>${link('/movel','Conheça a NEX Móvel','button')}</div><span class="campaign-corner" aria-hidden="true"></span></article><article class="campaign campaign-camera reveal"><img src="/assets/campaign-camera.jpg" loading="lazy" alt="Câmera de segurança ilustrativa em ambiente residencial"><div class="campaign-copy"><span class="eyebrow">NEX CAM</span><h2>De olho<br>no que<br>importa.</h2><p>Conheça as soluções de câmeras<br>para sua casa ou empresa.</p>${link('/cam','Conheça as soluções','button outline')}</div></article></section>`}
function campaignBand(){return `<section class="world-band"><img src="/assets/campaign-family.jpg" alt="Família em uma cena ilustrativa de uso da internet" loading="lazy">${brandRibbon('family-ribbon')}<div class="wrap"><div class="world-copy reveal"><span class="eyebrow">TUDO SE CONECTA COM A NEX</span><h2>Um combo<br><em>para o seu mundo.</em></h2><p>Internet, NEX Móvel e NEX CAM.<br>Juntos, do jeito que você precisa.</p><button class="button light" data-combo>Monte seu combo <span>↗</span></button></div></div></section>`}
function home(){return `<section class="editorial-hero"><div class="hero-photo"><img src="/assets/campaign-hero.jpg" alt="Mulher usando o celular no conforto de casa" fetchpriority="high" width="1536" height="1024"></div>${brandRibbon('hero-ribbon')}<div class="hero-orange-panel" aria-hidden="true"></div><div class="wrap"><div class="editorial-copy"><h1><span>A vida</span><span>acontece.</span><span>A Nex</span><span>conecta.</span></h1><p>Internet, mobilidade e segurança<br>para acompanhar você.</p><div class="hero-actions"><button class="button light" data-combo>Monte seu combo <span>↗</span></button>${link('#planos','Conheça os planos','text-link')}</div></div></div><button class="motion-pause" aria-label="Pausar animações" aria-pressed="false">Ⅱ</button></section><section class="product-nav" aria-label="Soluções Nex"><div class="wrap">${[['/internet','wifi','Internet fibra'],['/movel','phone','Minha NEX Móvel'],['/cam','camera','NEX CAM'],['/empresarial','business','Empresarial']].map(x=>`<a href="${x[0]}">${nexIcon(x[1])}<strong>${x[2]}</strong><span>↗</span></a>`).join('')}</div></section><section class="section home-plans" id="planos"><div class="wrap">${sectionHead('PLANOS DE INTERNET','Sua conexão. Do seu jeito.','Escolha a velocidade que acompanha sua rotina. Depois, personalize seu plano com a Nex.')}${internetCards()}</div></section>`+campaignPromos()+campaignBand()+serviceCarousel()+customerReviews()+faq(commonFaq)}
const tutorialServices = [
  ['disney', 'Disney+'],
  ['hbo-max', 'HBO Max'],
  ['globoplay', 'Globoplay'],
  ['apple-tv', 'Apple TV'],
  ['deezer', 'Deezer'],
  ['sky-light', 'SKY+ Light'],
  ['exitlag', 'ExitLag'],
  ['qnutri', '+Qnutri']
];

function serviceCarousel() {
  return `
    <section class="section home-services" aria-label="Tutoriais de apps e serviços">
      <div class="wrap">
        ${sectionHead('APPS E SERVIÇOS', 'Mais do que estar online.', 'Encontre o tutorial para acessar seu app ou serviço.')}
        <div class="sva-carousel-controls" aria-label="Navegação do carrossel" role="group">
          <button type="button" data-sva-direction="-1" aria-controls="sva-carousel" aria-label="Ver serviço anterior">←</button>
          <button type="button" data-sva-direction="1" aria-controls="sva-carousel" aria-label="Ver próximo serviço">→</button>
        </div>
        <ul class="sva-carousel" id="sva-carousel" tabindex="0" aria-label="Apps e serviços">
          ${tutorialServices.map(([slug, name]) => {
            const guide = `/assets/tutoriais/${slug}`;
            return `<li class="sva-slide">
              <img src="${guide}/assets/logo-sva.png" alt="" width="48" height="48" loading="lazy">
              <h3>${name}</h3>
              <a class="button outline" href="${guide}/index.html" aria-label="Ver tutorial de ${name}">Ver tutorial <span aria-hidden="true">↗</span></a>
            </li>`;
          }).join('')}
        </ul>
        <p class="disclaimer">Disponibilidade e inclusão conforme o plano contratado.</p>
      </div>
    </section>`;
}

document.addEventListener('click', event => {
  const control = event.target.closest('[data-sva-direction]');
  if (!control) return;

  const carousel = document.getElementById(control.getAttribute('aria-controls'));
  const cardWidth = carousel.firstElementChild.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(carousel).columnGap);
  const direction = Number(control.dataset.svaDirection);
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  const atEnd = carousel.scrollLeft >= maxScroll - 1;
  const atStart = carousel.scrollLeft <= 1;
  const next = direction > 0 && atEnd ? 0
    : direction < 0 && atStart ? maxScroll
    : carousel.scrollLeft + direction * (cardWidth + gap);
  carousel.scrollTo({left: next});
});
function customerReviews() {
  const reviews = [
    ['Camila A., dona de casa', 'CA', 'Aqui em casa todo mundo usa a internet ao mesmo tempo e nunca trava! A <strong>Nex Telecom</strong> foi a melhor escolha que fizemos. Rápida, estável e com atendimento top!'],
    ['Lucas M., estudante', 'LM', 'Sou gamer e não posso ter delay. Depois que mudei pra <strong>Nex Telecom</strong>, a diferença foi absurda. Ping baixo, conexão firme. Recomendo demais pra quem joga online.'],
    ['João C., designer gráfico', 'JC', 'Trabalho de casa com reuniões online e envio de arquivos pesados. A internet da <strong>Nex Telecom</strong> me surpreendeu pela velocidade e estabilidade.'],
    ['Dona Nilde, comerciante', 'DN', 'Tenho um pequeno mercado e uso Wi-Fi pro caixa e pra clientes. A <strong>Nex Telecom</strong> instalou rápido, deu suporte e o preço foi justo. Tô muito satisfeita!']
  ];

  return `
    <section class="section home-reviews" aria-labelledby="home-reviews-title">
      <div class="wrap">
        <div class="home-review-heading">
          <span class="home-review-stars" aria-hidden="true">★ ★ ★ ★ ★</span>
          <h2 id="home-reviews-title">A Voz de Quem Já Está Conectado</h2>
          <p>Confira o que nossos clientes têm a dizer sobre a experiência de navegar com qualidade.</p>
        </div>
        <ul class="home-review-grid">
          ${reviews.map(([name, initials, comment]) => `
            <li class="reveal">
              <p>${comment}</p>
              <div class="home-review-author">
                <span aria-hidden="true">${initials}</span>
                <strong>${name}</strong>
              </div>
            </li>`).join('')}
        </ul>
      </div>
    </section>`;
}
