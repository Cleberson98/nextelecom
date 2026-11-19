/* Campanhas Nex. Conteúdo, valores e ações permanecem elementos do site. */
const nexIcon = name => {
  const paths = {
    wifi: 'M3 9a15 15 0 0 1 18 0M6 13a10 10 0 0 1 12 0M9 17a5 5 0 0 1 6 0M12 21h.01',
    phone: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM10 18h4',
    camera: 'm3 4 16 4-3 9-15-5L3 4Zm4 10-2 6h8m6-10 3 1-2 5-3-1',
    business: 'M4 7h16a2 2 0 0 1 2 2v11H2V9a2 2 0 0 1 2-2Zm4 0V3h8v4M2 12h20M10 12v3h4v-3',
    play: 'm9 5 11 7-11 7V5Z',
    check: 'm5 12 4 4L20 5'
  };
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (paths[name] || paths.wifi) + '"/></svg>';
};

function brandRibbon(cls = '') {
  return '<span class="brand-ribbon ' + cls + '" aria-hidden="true"></span>';
}

function nexBannerImage(name, alt, className, loading) {
  if (name === 'gamer') {
    return `<img class="${className}" src="/assets/campaign-fiber-arena.webp" width="1832" height="858" alt="${alt}" ${loading}>`;
  }
  if (name === 'business') {
    return `<img class="${className}" src="/assets/nex-banner-business.webp" width="1831" height="859" alt="${alt}" ${loading}>`;
  }
  const base = '/assets/nex-banner-' + name;
  return `<img class="${className}" src="${base}-1920.webp" srcset="${base}-960.webp 960w, ${base}-1920.webp 1920w, ${base}-3840.webp 3840w" sizes="100vw" width="3840" height="1800" alt="${alt}" ${loading}>`;
}

function homeCampaigns() {
  const slides = [
    {
      id: 'fiber', eyebrow: 'FIBRA + APPS PARA SUA ROTINA',
      title: 'Sua internet.<br><em>Seu próximo play.</em>',
      copy: 'Fibra para fazer acontecer. Seus apps favoritos para aproveitar cada momento.',
      services: ['SKY+', 'Ubook Plus', 'Kiddle Pass'], speed: '500', unit: 'MEGA', value: '99,90',
      action: '<button class="button blue" data-add="fibra500">Montar meu plano <span>↗︎</span></button>',
      extra: '<a class="text-link" href="#planos">Comparar os planos ↓︎</a>',
      banner: 'gamer', alt: 'Mascote da Nex jogando em uma arena gamer iluminada por neon.',
      note: 'Escolha 2 apps elegíveis sem custo no NEX Standard. Consulte condições.'
    },
    {
      id: 'mobile', eyebrow: 'INTERNET EM CASA + CHIP',
      title: 'Em casa.<br>Na rua.<br><em>Na sua vida.</em>',
      copy: 'A fibra que você já conhece. Mais 7 GB no celular para continuar conectado.',
      services: [], speed: '500', unit: 'MEGA + 7 GB', value: '118,90',
      action: '<button class="button blue" data-add="movel500">Quero fibra + chip <span>↗︎</span></button>',
      extra: '<a class="text-link" href="/movel">Ver todas as opções ↗︎</a>',
      banner: 'chip', alt: 'Mascote da Nex mostrando um chip e um celular.',
      note: 'Preço do combo de fibra + uma linha móvel. Consulte cobertura e condições.'
    },
    {
      id: 'cinema', eyebrow: 'APPS E SERVIÇOS NEX',
      title: 'Dê o play<br><em>do seu jeito.</em>',
      copy: 'Filmes, séries, música e muito mais para aproveitar com a sua conexão Nex.',
      services: ['Disney+', 'HBO Max', 'Deezer'],
      action: '<a class="button blue" href="/svas">Explorar os apps <span>↗︎</span></a>',
      extra: '<button class="text-link" data-combo>Montar meu combo ↗︎</button>',
      banner: 'cinema-orange', alt: 'Mascote da Nex assistindo à TV na sala.',
      note: 'Consulte os apps disponíveis e as condições de cada plano.'
    }
  ];
  return '<section class="nex-campaign" aria-label="Campanhas e ofertas Nex"><div class="campaign-panels">' + slides.map((slide, index) =>
    '<article class="campaign-slide theme-' + slide.id + ' campaign-with-background' + '" id="campaign-' + slide.id + '" role="tabpanel" aria-labelledby="campaign-tab-' + index + '"' + (index ? ' hidden' : '') + '>' +
      nexBannerImage(slide.banner, slide.alt, 'campaign-background', index ? 'loading="lazy"' : 'fetchpriority="high"') +
      '<div class="wrap campaign-layout"><div class="campaign-message"><span class="eyebrow">' + slide.eyebrow + '</span>' +
      '<' + (index ? 'h2' : 'h1') + ' class="campaign-title">' + slide.title + '</' + (index ? 'h2' : 'h1') + '>' +
      '<p class="campaign-description">' + slide.copy + '</p>' +
      (slide.services.length ? '<div class="campaign-apps">' + nexSvaLogos(slide.services, {size: 42}) + '<span>' + (index === 0 ? 'Escolha para o seu plano' : 'Escolha para o seu combo') + '</span></div>' : '') +
      (slide.speed ? '<div class="campaign-offer"><div class="offer-speed">' + slide.speed + '<span>' + slide.unit + '</span></div><div class="offer-price"><span>por mês</span><strong><small>R$</small> ' + slide.value + '</strong></div></div>' : '') +
      '<div class="hero-actions">' + slide.action + slide.extra + '</div><p class="campaign-condition">' + slide.note + '</p></div>' +
      '</div></article>'
  ).join('') + '</div>' +
    '<button class="campaign-arrow campaign-prev" type="button" data-campaign-step="-1" aria-label="Banner anterior"><span aria-hidden="true">‹</span></button>' +
    '<button class="campaign-arrow campaign-next" type="button" data-campaign-step="1" aria-label="Próximo banner"><span aria-hidden="true">›</span></button>' +
    '<button class="campaign-pause" type="button" data-campaign-pause aria-label="Pausar troca automática das campanhas" aria-pressed="false">Ⅱ</button></section>';
}

function campaignPromos() {
  return '<section class="campaign-promotions"><div class="wrap promo-grid">' +
    '<article class="solution-promo promo-mobile reveal"><div><span class="eyebrow">MINHA NEX MÓVEL</span><h2>Sua conexão<br>também vai<br><em>com você.</em></h2><p>Fibra em casa. Mais 7 GB no celular.<br>Conheça os combos com chip da Nex.</p>' + link('/movel','Conhecer os combos','button') + '</div><img src="/assets/mascot-mobile.webp" loading="lazy" width="600" height="850" alt="Mascote Nex com um celular"></article>' +
    '<article class="solution-promo promo-business reveal"><div><span class="eyebrow">NEX EMPRESARIAL</span><h2>Seu negócio<br>merece uma<br><em>conexão à altura.</em></h2><p>Soluções para a sua operação,<br>com atendimento próximo.</p>' + link('/empresarial','Nex para sua empresa','button light') + '</div><img src="/assets/business-refresh.webp" loading="lazy" width="700" height="800" alt="Detalhe da marca Nex na fachada da loja"></article>' +
    '</div></section>';
}

function campaignBand() {
  return '<section class="home-combo-band"><div class="wrap home-combo-grid"><div class="home-combo-art reveal"><span class="combo-art-disc" aria-hidden="true"></span><img src="/assets/mascot-official.webp" alt="Mascote da Nex convidando você a escolher seu combo" loading="lazy" width="600" height="850"></div>' +
    '<div class="home-combo-copy reveal"><span class="eyebrow">ESPAÇO PARA O QUE VOCÊ GOSTA</span><h2>Seu mundo.<br><em>Seu combo.</em></h2><p>Escolha sua internet, combine seus serviços favoritos e deixe a conexão com a sua cara.</p>' +
    nexSvaLogos(['Disney+','HBO Max','Deezer','TV Plus','Ubook','Kindle Pass'],{size:46}) +
    '<button class="button blue" data-combo>Começar meu combo <span>↗︎</span></button><span class="helper">Você escolhe. A Nex confirma as condições.</span></div></div></section>';
}

function homeServices() {
  const services = NEX_SVAS.filter(service => ['disney','hbo','deezer'].includes(service.id));
  return '<section class="home-sva-discovery section" id="servicos"><div class="wrap">' +
    sectionHead('SEUS FAVORITOS, MAIS PERTO','Sua conexão também<br>é entretenimento.','Filmes, séries e música. Conheça os serviços e escolha o que faz parte do seu dia.') +
    '<div class="sva-feature-grid">' + services.map(service => '<a href="/svas" class="sva-feature sva-feature-' + service.id + ' reveal"><div class="sva-feature-image"><img src="' + service.art + '" alt="' + service.name + '" loading="lazy" width="900" height="580"></div><div class="sva-feature-copy"><img src="' + service.logo + '" alt="" width="48" height="48"><div><h3>' + service.name + '</h3><p>' + service.description + '</p></div><span aria-hidden="true">↗︎</span></div></a>').join('') +
    '</div><div class="sva-discovery-footer"><p>Serviços opcionais, conforme o plano e o catálogo disponível.</p>' + link('/svas','Conhecer todos os apps','text-link') + '</div></div></section>';
}

function home() {
  return homeCampaigns() +
    '<section class="product-nav" aria-label="Soluções Nex"><div class="wrap">' +
    [['/internet','wifi','Internet fibra','Até 1 Giga para sua casa'],['/movel','phone','Minha NEX Móvel','Sua fibra + um chip'],['/svas','play','Apps e serviços','Dê play nos seus favoritos'],['/empresarial','business','Para sua empresa','Conexões para ir além']].map(item => '<a href="' + item[0] + '">' + nexIcon(item[1]) + '<span><strong>' + item[2] + '</strong><small>' + item[3] + '</small></span><b>↗︎</b></a>').join('') +
    '</div></section><section class="section home-plans" id="planos"><div class="wrap">' +
    sectionHead('FIBRA QUE ACOMPANHA VOCÊ','Encontre seu próximo plano.','Internet em fibra e apps para aproveitar ainda mais. Compare, escolha e personalize.') +
    internetCards() + '</div></section>' +
    homeServices() + campaignPromos() + campaignBand() + faq(commonFaq);
}
