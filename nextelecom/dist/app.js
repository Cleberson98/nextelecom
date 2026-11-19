const $=s=>document.querySelector(s),money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n/100),escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY = 'nex-combo-v1';
let state = { base: null, camera: null, svas: [], apps: [], appVariants: {} };
try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (saved && typeof saved === 'object') {
    state.base = saved.base;
    state.svas = Array.isArray(saved.svas) ? saved.svas : [];
    state.apps = Array.isArray(saved.apps) ? saved.apps : [];
    state.appVariants = saved.appVariants && typeof saved.appVariants === 'object' && !Array.isArray(saved.appVariants) ? saved.appVariants : {};
  }
} catch {}
const allBase = [...CATALOG.internet, ...CATALOG.mobile];
const availableAppIds = SVA_SERVICES.map(service => service.id);
if (!allBase.some(plan => plan.id === state.base)) state.base = null;
// As antigas faixas sem serviço identificado não viram cobranças no novo catálogo.
state.svas = [];
state.apps = [...new Set(state.apps)].filter(id => availableAppIds.includes(id));
for (const service of SVA_SERVICES) {
 if (!service.options.some(option => option.id === state.appVariants[service.id])) delete state.appVariants[service.id];
}

function services() {
  return window.NEX_SVAS || [];
}
function displayServices() {
 const featured=['disney','hbo','globoplay','appletv','prime','deezer','sky','exitlag','docway'];
 return [...featured.map(id=>services().find(service=>service.id===id)).filter(Boolean),...services().filter(service=>!featured.includes(service.id))];
}
function includedService(service, combo = calculate(state)) {
 return Boolean(combo.base?.included?.includes(service.name));
}
function requestedServices(combo = calculate(state)) {
 return (combo.apps || []).filter(service => !includedService(service, combo));
}
function servicePrice(service) {
 if (service.id==='tvplus') return 'Incluído nos planos de fibra';
 const prices = service.options.filter(option => option.price > 0).map(option => option.price);
 if (service.included) return 'Elegível às 2 escolhas sem custo do Standard'+(prices.length?' · Opções de upgrade':'');
 return prices.length ? 'A partir de ' + money(Math.min(...prices)) + '/mês' : service.included ? 'Incluído a partir de 500 Mega' : 'Valor sob consulta';
}
function variantPicker(service, combo) {
 const chosen = serviceVariant(service, state.appVariants[service.id], combo.base, state);
 const free = serviceVariant(service, 'included', combo.base, {...state, appVariants:{...state.appVariants,[service.id]:'included'}});
 const options = service.options.filter(option => !option.minSpeed);
 if (free?.price===0) options.unshift(free);
 if (includedService(service,combo)) return '<small>Incluído sem custo no seu plano.</small>';
 if (chosen?.id==='included' && !options.some(option=>option.id==='included')) options.unshift(chosen);
 if (!options.length) return '<small>Valor adicional sob consulta.</small>';
 return '<label class="service-variant-label">Opção do serviço<select data-service-variant="'+service.id+'" aria-label="Plano de '+service.name+'">'+options.map(option=>'<option value="'+option.id+'" '+(option.id===chosen?.id?'selected':'')+'>'+option.label+(option.detail?' · '+option.detail:'')+' · '+(option.price===null?'Sob consulta':option.price===0?'Incluído':money(option.price)+'/mês')+'</option>').join('')+'</select></label>';
}
function svaLogos(names, className = '') {
  return window.nexSvaLogos ? nexSvaLogos(names, { className }) : '';
}
const tutorialGuides = {
 'Disney+':'/assets/tutoriais/disney/index.html',
 'HBO Max':'/assets/tutoriais/hbo-max/index.html',
 'Deezer':'/assets/tutoriais/deezer/index.html',
 'Globoplay':'/assets/tutoriais/globoplay/index.html',
 'Apple TV':'/assets/tutoriais/apple-tv/index.html',
 'ExitLag':'/assets/tutoriais/exitlag/index.html',
 'Qnutri':'/assets/tutoriais/qnutri/index.html',
 'SKY+':'/assets/tutoriais/sky-light/index.html',
 'Docway':'/assets/tutoriais/docway/index.html'
};
function tutorialAction(name) {
  const guide = tutorialGuides[name];
  return guide
    ? `<a class="text-link" href="${guide}" target="_blank" rel="noopener">Guia de acesso ↗︎</a>`
    : `<button class="text-link" data-tutorial="${escapeHtml(name)}">Ajuda para acessar ↗︎</button>`;
}

const link=(url,label,cls='button')=>`<a class="${cls}" href="${url}">${label} <span>↗︎</span></a>`;
const homeArt=`<div class="orb"></div><div class="orb two"></div><div class="orb three"></div><div class="nex-sculpture" aria-hidden="true">n</div><div class="float-tag tag-a"><i>⌁</i><div><strong>100% fibra</strong><span>Conexão para ir além.</span></div></div><div class="float-tag tag-b"><i>↗︎</i><div><strong>Até 1 Giga</strong><span>Mais espaço para sua vida.</span></div></div><div class="float-tag tag-c">● &nbsp; Seu mundo conectado</div><span class="visual-bottom">INTERNET · MÓVEL · SEGURANÇA</span>`;
function legacyHero({eyebrow,title,copy,cta='Encontre seu plano',url='#planos',art=homeArt,sub=false}){return `<section class="hero ${sub?'subhero':''}"><div class="wrap hero-grid"><div class="hero-copy reveal"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${copy}</p><div class="hero-actions">${link(url,cta)}<button class="text-link" data-combo>Monte seu combo ↗︎</button></div><div class="hero-proof"><span>Atendimento próximo</span><span>Do seu jeito</span><span>É Nex. É conexão.</span></div></div><div class="hero-visual reveal">${art}</div></div><span class="hero-index"><b>01</b> CONECTE NOVAS POSSIBILIDADES</span><button class="motion-pause" aria-label="Pausar animações" aria-pressed="false">Ⅱ</button></section>`}
function sectionHead(eyebrow,title,copy=''){return `<div class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div>${copy?`<p>${copy}</p>`:''}</div>`}
function price(n){return `<span class="currency">R$</span>${(n/100).toFixed(2).replace('.',',')} <small>/mês</small>`}
function internetCards() {
  return `<div class="plan-grid offer-grid">${CATALOG.internet.map((plan, index) => `
    <article class="plan-card offer-card ${index === 1 ? 'featured' : ''} reveal">
      <div class="offer-heading"><span class="plan-name">NEX ${plan.name}</span>${index === 1 ? '<span class="offer-tag">Mais possibilidades</span>' : ''}</div>
      <div class="speed">${plan.speed === 1000 ? '1' : plan.speed}<span>${plan.speed === 1000 ? 'GIGA' : 'MEGA'}</span></div>
      <p class="offer-fiber">Internet 100% fibra óptica</p>
      <div class="offer-included"><span class="offer-label">${plan.freeAppChoices ? 'Escolha 2 apps sem custo' : 'Seu plano já vem com'}</span>
        ${svaLogos(plan.included.slice(0,6), 'offer-included-logos')}
        <p>${plan.freeAppChoices ? 'Selecione seus favoritos ao montar o combo' : plan.included.length + ' benefícios incluídos'} · <button class="text-link" data-details="${plan.id}">Ver todos</button></p>
      </div>
      <div class="offer-extras"><span class="offer-label">Quer ainda mais? Personalize com</span>
        ${svaLogos(['Disney+', 'HBO Max', 'Globoplay'], 'offer-extra-logos')}
        <small>Apps opcionais. Consulte valores e condições.</small>
      </div>
      <div class="plan-price">${price(plan.price)}</div>
      <button class="button ${index === 1 ? '' : 'blue'}" data-add="${plan.id}">Montar meu combo <span>↗︎</span></button>
      <button class="text-link" data-details="${plan.id}">Detalhes do plano</button>
    </article>`).join('')}</div>
    <p class="disclaimer">Disponibilidade, fidelidade, instalação e catálogo de benefícios são confirmados pela Nex antes da contratação.</p>`;
}
function faq(items){return `<section class="section"><div class="wrap faq-grid"><div><span class="eyebrow">PODE PERGUNTAR</span><h2>Conexão boa<br>começa sem dúvidas.</h2><p>Precisa de uma mão? Nosso time te ajuda a escolher.</p><button class="text-link" data-contact>Falar com a Nex ↗︎</button></div><div class="faq-list">${items.map(x=>`<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join('')}</div></div></section>`}
const commonFaq=[['Como contratar um plano da Nex?','Escolha suas ofertas, revise o combo e abra a mensagem para o WhatsApp. O atendimento confirma disponibilidade, condições e os próximos passos.'],['Posso montar meu próprio combo?','Sim. Selecione uma oferta de internet ou internet + chip, personalize com seus apps favoritos. Você pode editar e remover itens antes de conversar com o atendimento.'],['Já sou cliente. Onde vejo minha fatura?','O acesso Minha Nex no cabeçalho leva à central oficial do assinante, onde você pode consultar seus serviços e faturas.'],['Como consultar a cobertura?','Informe sua cidade e bairro no resumo do combo. O time da Nex confirma a disponibilidade no endereço antes de concluir a contratação.']];
function legacyBand(){return `<section class="contact-band"><div class="wrap"><div><h2>Vamos conectar seu próximo capítulo?</h2><p>Escolha suas possibilidades. A Nex cuida da conexão.</p></div><button class="button light" data-combo>Monte seu combo <span>↗︎</span></button></div></section>`}
function legacyPromos(){return `<section class="section"><div class="wrap split-promo"><article class="promo reveal"><span class="eyebrow">MINHA NEX MÓVEL</span><h2>Sua conexão<br>vai com você.</h2><p>Internet em casa e dados no celular. Descubra os combos com chip da Nex.</p>${link('/movel','Conheça a NEX Móvel','button light')}<div class="promo-symbol symbol-chip" aria-hidden="true">▦</div></article><article class="promo orange reveal"><span class="eyebrow">NEX CAM</span><h2>Mais cuidado.<br>Mais tranquilidade.</h2><p>Soluções com câmeras para sua casa, seu comércio e sua empresa.</p>${link('/cam','Explore a NEX CAM','button light')}<div class="promo-symbol" aria-hidden="true">◉</div></article></div></section>`}
function appsSection() {
  return `<section class="section soft apps-explore"><div class="wrap">
    ${sectionHead('MUITO ALÉM DA INTERNET', 'Seu próximo favorito está aqui.', 'Filmes, séries, música e leitura para completar a sua conexão.')}
    <div class="app-strip logo-app-strip">${services().filter(service=>['disney','hbo','deezer','tvplus','ubook','kindle'].includes(service.id)).map(service => `<a href="/svas#catalogo" class="app-tile"><img src="${service.logo}" alt="" loading="lazy"><strong>${escapeHtml(service.name)}</strong><span>Conheça o app ↗︎</span></a>`).join('')}</div>
    ${link('/svas', 'Explore os apps e serviços', 'button outline')}
    <p class="disclaimer">Serviços disponíveis conforme plano e catálogo vigente. Consulte inclusão, valores e condições.</p>
  </div></section>`;
}
function legacyHome(){return hero({eyebrow:'NEX TELECOM · CONECTE SEU MUNDO',title:'Sua vida pede<br>mais <em>conexão.</em>',copy:'Para o trabalho render, a série continuar e a vida acontecer. Descubra uma Nex para cada momento.'})+`<div class="services-bar"><div class="wrap">${[['/internet','⌁','Internet fibra','Velocidade para sua casa'],['/movel','▯','Minha NEX Móvel','Sua conexão vai com você'],['/cam','◉','NEX CAM','Cuidado em cada detalhe'],['/empresarial','▤','Para sua empresa','Seu negócio vai mais longe']].map(x=>`<a class="service-short" href="${x[0]}"><i aria-hidden="true">${x[1]}</i><span><strong>${x[2]}</strong>${x[3]}</span><b>↗︎</b></a>`).join('')}</div></div><section class="section soft" id="planos"><div class="wrap">${sectionHead('SUA CASA, NO SEU RITMO','Uma conexão para<br>cada jeito de viver.','Escolha sua velocidade. Depois, deixe o plano com a sua cara no montador de combos.')}${internetCards()}</div></section>`+promos()+`<section class="section dark"><div class="wrap experience-grid"><div class="experience-art"><div class="wifi-ring"></div><div class="wifi-ring"></div><div class="wifi-ring"></div><div class="wifi-core" aria-hidden="true">⌁</div></div><div><span class="eyebrow">CADA CANTO. CADA MOMENTO.</span><h2>Sua casa inteira.<br>Na mesma conexão.</h2><p>Da reunião importante à próxima fase do jogo. Conheça as soluções de conexão da Nex para sua rotina.</p><div class="benefit-row"><span>Fibra óptica</span><span>Opções de Wi-Fi</span><span>Atendimento próximo</span></div>${link('/internet','Conheça sua próxima conexão','text-link')}</div></div></section>`+appsSection()+faq(commonFaq)+band()}
function mobile(){return hero({sub:true,eyebrow:'MINHA NEX MÓVEL',title:'Em casa. Na rua.<br><em>Na sua vida.</em>',copy:'Sua internet de casa e o chip no mesmo combo. Mais praticidade para continuar conectado.',cta:'Compare os combos',art:'<div class="orb two"></div><div class="mobiledisplay"><small>MINHA NEX</small><b>7 GB</b><span>Seu mundo em movimento.</span></div><div class="float-tag tag-a">⌁ &nbsp; Fibra + chip</div>'})+`<section class="section soft" id="planos"><div class="wrap">${sectionHead('DENTRO E FORA DE CASA','A conexão que acompanha você.','Internet de casa e dados no celular em uma única oferta. Escolha o combo que acompanha sua rotina.')}<div class="plan-grid">${CATALOG.mobile.map(p=>`<article class="plan-card reveal"><span class="plan-name">${p.lines===2?'Internet + 2 chips':'Internet + chip'}</span><div class="speed">${p.speed}<span>MEGA</span></div><p class="plan-caption">+ ${p.data} ${p.lines===2?'· 2 linhas':''}</p><ul>${p.benefits.split(' • ').map(x=>`<li>${x}</li>`).join('')}</ul><div class="plan-price">${price(p.price)}</div><button class="button" data-add="${p.id}">Escolher este combo ↗︎</button><button class="text-link" data-details="${p.id}">Ver condições</button></article>`).join('')}</div><p class="disclaimer">A franquia do combo de 700 Mega (12 GB / 23 GB) é confirmada pela Nex antes da contratação. Consulte cobertura, ativação, entrega do chip e condições de utilização dos apps.</p></div></section><section class="section"><div class="wrap">${sectionHead('É SIMPLES COMEÇAR','Um combo. Novas possibilidades.')}${steps([['Escolha seu combo','Compare a velocidade da fibra, os dados móveis e a quantidade de chips de cada oferta.'],['Combine com sua rotina','Escolha seus apps favoritos e continue de onde parou ao navegar.'],['Converse com a Nex','O time confirma cobertura, ativação, portabilidade e condições da contratação.']])}</div></section>`+faq([['Posso contratar apenas o chip?','As ofertas Minha NEX Móvel combinam internet fibra e chip em um único plano.'],['Qual a franquia dos combos com 7 GB?','Você terá 7 GB para utilizar. No combo com duas linhas, a indicação é de 7 GB por chip. As condições de uso e renovação devem ser confirmadas no atendimento.'],['Posso adicionar mais linhas?','Escolha entre os combos com uma ou duas linhas. Para outras quantidades, converse com a Nex e receba uma proposta.'],['Posso manter meu número?','Consulte o atendimento para verificar as condições de portabilidade e ativação aplicáveis.']])+band()}
function steps(items){return `<div class="steps">${items.map((x,i)=>`<article class="step reveal"><b>0${i+1}</b><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div>`}

function serviceCard(service) {
 return '<article class="sva-service" data-sva-category="'+service.category+'"><div class="sva-service-art"><img class="sva-service-logo" src="'+service.logo+'" alt="'+service.name+'" loading="lazy"></div><div class="sva-service-content"><span class="sva-condition">'+servicePrice(service)+'</span><h3>'+service.name+'</h3><p>'+service.description+'</p><div class="sva-service-actions"><button class="button blue" data-service-choice="'+service.id+'">Adicionar ao plano +</button>'+tutorialAction(service.name)+'</div></div></article>';
}
function svas() {
 return hero({eyebrow:'APPS E SERVIÇOS NEX',title:'Seus favoritos.<br><em>Todos em um só lugar.</em>',copy:'Explore os benefícios Nex, escolha o plano de cada app e veja o valor no seu combo.',cta:'Explorar serviços',url:'#catalogo'})+
 '<section class="section sva-section" id="catalogo"><div class="wrap">'+sectionHead('BENEFÍCIOS NEX','O próximo play é seu.','Advanced por R$ 14,90, Top por R$ 24,90 e Premium por R$ 29,90 por serviço/mês.')+
 '<div class="sva-carousel-head"><p>Descubra, adicione ou veja como acessar.</p><div><button type="button" data-sva-scroll="-1" aria-label="Serviços anteriores">←︎</button><button type="button" data-sva-scroll="1" aria-label="Próximos serviços">→︎</button><button type="button" data-sva-carousel-pause aria-label="Pausar carrossel" aria-pressed="false">Ⅱ</button></div></div>'+
 '<div class="sva-carousel" aria-label="Carrossel de serviços Nex">'+displayServices().map(serviceCard).join('')+'</div>'+
 '<div class="sva-filters" role="group" aria-label="Filtrar serviços">'+[['all','Todos'],['included','Elegíveis no Standard'],['advanced','Advanced'],['top','Top'],['premium','Premium'],['guides','9 guias de acesso']].map(([value,label])=>'<button type="button" data-sva-filter="'+value+'" aria-pressed="'+(value==='all')+'">'+label+'</button>').join('')+'</div>'+
 '<div class="sva-catalog">'+services().map((service,index)=>serviceCard(service).replace('<article ',index>=8?'<article hidden ':'<article ')).join('')+'</div><button class="button outline sva-load-more" data-show-more-svas>Mostrar mais serviços</button><p class="disclaimer">Os preços são por serviço. No Standard, escolha 2 apps elegíveis sem custo. Plus e Premium incluem Globoplay. Serviços fora do banner têm valor sob consulta.</p></div></section>'+faq([['Posso trocar Top por Premium?','Sim. Escolha a versão no carrinho. O novo valor substitui o anterior para o mesmo serviço. Disney+ e HBO Max oferecem Top com anúncios e Premium sem anúncios.'],['Quais serviços têm passo a passo?','Disney+, HBO Max, Deezer, Globoplay, Apple TV, ExitLag, Qnutri, SKY+ e Docway contam com guias de acesso.'],['Os preços são por app?','Cada serviço adicional tem sua própria mensalidade na faixa indicada. O carrinho soma os apps selecionados à sua oferta de internet.']])+band();
}

function business(){return hero({sub:true,eyebrow:'NEX EMPRESARIAL',title:'Seu negócio<br>merece ir <em>além.</em>',copy:'Conectividade e soluções para acompanhar a sua operação. Converse com a Nex sobre o que sua empresa precisa.',cta:'Conheça as soluções',art:'<div class="orb two"></div><div class="large-symbol" aria-hidden="true">↗︎</div><div class="float-tag tag-b">Conexão para novos negócios.</div>'})+`<section class="section soft" id="planos"><div class="wrap">${sectionHead('CONEXÕES QUE GERAM POSSIBILIDADES','Cada negócio tem seu próximo passo.')}<div class="cards-three">${[['Internet empresarial','Conheça as opções de conexão para a rotina da sua empresa.','Conectividade empresarial'],['Link dedicado','Solicite uma avaliação das necessidades de banda, disponibilidade e operação. Especificações e SLA sob consulta.','Link dedicado'],['Wi-Fi para sua empresa','Converse com a Nex sobre as necessidades de conexão e distribuição de Wi-Fi do seu espaço.','Wi-Fi empresarial']].map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p><button class="text-link" data-business="${x[2]}">Falar com um especialista ↗︎</button></article>`).join('')}</div></div></section>`+promos()+band()}
function about(){return hero({sub:true,eyebrow:'SOMOS A NEX TELECOM',title:'Conectamos pessoas.<br><em>Abrimos caminhos.</em>',copy:'Uma conexão aproxima histórias, oportunidades e novos futuros. Conheça o que orienta a Nex Telecom.',cta:'Conheça nossa essência',url:'#essencia',art:homeArt})+`<section class="section" id="essencia"><div class="wrap content-copy"><span class="eyebrow">NOSSA ESSÊNCIA</span><h2>Missão</h2><p>Prestar serviços de Telecomunicações destinados a atender às necessidades dos nossos clientes em toda região onde estamos localizados, com qualidade e confiabilidade.</p><h2>Visão</h2><p>Ser a empresa de telecom líder em tecnologia, reconhecida nacionalmente por inovação e solidez, destacando-se pela velocidade de nossos pacotes, tecnologia avançada e atendimento.</p><h2>Valores</h2><div class="values">${['Ambição','Dedicação','Ética','Humildade','Inovação','Respeito','Solidez'].map(x=>`<span>${x}</span>`).join('')}</div><p class="helper">Uma conexão próxima de você, com atendimento e soluções para cada momento.</p></div></section>`+band()}
function referral(){return hero({sub:true,eyebrow:'INDIQUE E GANHE',title:'Conexão boa<br>a gente <em>compartilha.</em>',copy:'Quer indicar a Nex para alguém? Consulte as regras e os benefícios vigentes com nosso atendimento.',cta:'Como participar',url:'#participar',art:'<div class="orb two"></div><div class="large-symbol" aria-hidden="true">+1</div>'})+`<section class="section" id="participar"><div class="wrap">${sectionHead('COMPARTILHE POSSIBILIDADES','Seu próximo convite começa aqui.')}${steps([['Conheça as regras','Converse com a Nex sobre elegibilidade e benefícios vigentes.'],['Saiba como indicar','O atendimento orienta a forma oficial de participação.'],['Acompanhe com a Nex','Acompanhe sua indicação e as condições do benefício com a Nex.']])}<p class="notice">Consulte os benefícios e as regras atuais da campanha com a Nex.</p><button class="button blue" data-business="Indique e Ganhe">Consultar campanha ↗︎</button></div></section>`+band()}
const pages={'/':home,'/internet':()=>hero({sub:true,eyebrow:'INTERNET FIBRA NEX',title:'Mais velocidade.<br>Mais <em>você.</em>',copy:'Encontre uma conexão para tudo o que faz parte da sua vida. Compare os planos e personalize seu combo.'})+`<section class="section soft" id="planos"><div class="wrap">${sectionHead('NEX FIBRA','Seu próximo plano está aqui.')}${internetCards()}</div></section>`+appsSection()+faq(commonFaq)+band(),'/movel':mobile,'/svas':svas,'/empresarial':business,'/quem-somos':about,'/indique':referral,'/contato':contact,'/faleconosco':contact,'/trabalheconosco':careers,'/app':myNexApp,'/formulario-de-vagas':careersForm};
const titles={'/':'Conecte seu mundo','/internet':'Internet fibra','/movel':'Minha NEX Móvel','/svas':'Apps e serviços','/empresarial':'Empresarial','/quem-somos':'Quem somos','/indique':'Indique e ganhe','/contato':'Fale conosco','/faleconosco':'Fale conosco','/trabalheconosco':'Trabalhe conosco','/app':'Aplicativo Minha Nex','/formulario-de-vagas':'Cadastre seu currículo'};
function render(){if(location.pathname.replace(/\/$/,'')==='/cam')history.replaceState({},'', '/internet');const path=location.pathname.replace(/\/$/,'')||'/';observer.disconnect();document.body.classList.toggle('home-page',path==='/');$('#main').innerHTML=pages[path]?pages[path]():`<section class="section"><div class="wrap"><h1>Página não encontrada.</h1><p>Vamos encontrar uma nova conexão?</p>${link('/','Voltar ao início')}</div></section>`;document.title=`${titles[path]||'Página não encontrada'} · Nex Telecom`;document.querySelectorAll('nav a').forEach(a=>{a.removeAttribute('aria-current');if(a.getAttribute('href')===path)a.setAttribute('aria-current','page')});$('nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');document.querySelectorAll('.reveal').forEach(el=>{el.style.animationPlayState='paused';observer.observe(el)});document.dispatchEvent(new Event('nex:render'));}
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.animationPlayState='running';observer.unobserve(e.target)}})},{threshold:.08});
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{toast('Não foi possível salvar neste navegador. Mantenha esta aba aberta.')}updateCart()}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),3000)}
function updateCart() {
 const combo=calculate(state);
 $('#cart-count').textContent=(combo.base?1:0)+requestedServices(combo).length;
 $('#cart-total').textContent=(combo.partial?'Parcial ':'')+money(combo.monthly);
}

function add(id) {
  if (allBase.some(plan => plan.id === id)) {
    const replaced = Boolean(state.base && state.base !== id);
    state.base = id;
    toast(replaced ? 'Plano principal atualizado.' : 'Plano adicionado ao seu combo.');
  } else if (CATALOG.svas.some(plan => plan.id === id)) {
    if (!state.svas.includes(id)) state.svas.push(id);
    toast('Faixa adicionada. A Nex confirma os apps e as condições.');
  } else {
    return;
  }
  persist();
  openCombo();
}
function comboLines(combo) {
  return [
    combo.base && {
      id: combo.base.id,
      name: combo.base.data ? 'Fibra + chip' : 'NEX ' + combo.base.name,
      description: `${combo.base.speed === 1000 ? '1 Giga' : combo.base.speed + ' Mega'}${combo.base.data ? ' + ' + combo.base.data + ' · ' + combo.base.lines + ' linha(s)' : ' · Fibra óptica'}`,
      price: combo.base.price
    },
    ...requestedServices(combo).map(service => ({id:service.id,name:service.name,description:service.variant ? service.variant.label+(service.variant.detail?' · '+service.variant.detail:'') : 'Benefício disponível a partir de 500 Mega',price:service.variant?.price ?? null}))
  ].filter(Boolean);
}
const comboCategories = [
  { key: 'internet', label: 'Internet', title: 'Escolha sua velocidade' },
  { key: 'mobile', label: 'Fibra + chip', title: 'Conectado em casa e na rua' },
  { key: 'svas', label: 'Apps e serviços', title: 'Agora, os seus favoritos' }
];
let comboCategory = 'internet';
let comboFormValues = { region: '', contact: '' };

function comboOptionDetails(category, plan) {
  const speed = plan.speed === 1000 ? '1 Giga' : `${plan.speed} Mega`;
  if (category === 'internet') return `${speed} · ${plan.freeAppChoices ? 'Escolha 2 apps sem custo' : plan.included.length + ' benefícios incluídos'}`;
  const lines = plan.lines === 1 ? '1 linha' : `${plan.lines} linhas`;
  return `${speed} · ${plan.data}${plan.id === 'movel700' ? ' a confirmar' : ''} · ${lines}`;
}
function renderComboOptions(combo = calculate(state)) {
  const options = $('#combo-options');
  if (!options) return;
  const category = comboCategories.find(item => item.key === comboCategory) || comboCategories[0];
  document.querySelectorAll('[data-combo-category]').forEach(button => {
    const selected = button.dataset.comboCategory === category.key;
    button.setAttribute('aria-selected', String(selected));
    button.setAttribute('aria-expanded', String(selected));
  });
  options.hidden = false;
  if (category.key === 'svas') {
    options.innerHTML='<div class="combo-category-heading"><span>BENEFÍCIOS NEX</span><h3 id="combo-options-title">Escolha seus serviços</h3><p>'+(combo.base?.freeAppChoices?'Escolha 2 apps elegíveis sem custo. Os demais são adicionais.':combo.base?.included?.includes('Globoplay')?'Globoplay incluído sem custo. Escolha outros apps para adicionar ao plano.':'Valores por app. Escolha a opção e confira o total do combo.')+'</p></div><div class="combo-app-grid">'+displayServices().map(service=>{
      const included=includedService(service,combo);
      const selected=state.apps.includes(service.id);
      const option=serviceVariant(service,state.appVariants[service.id],combo.base,state);
      const priceLabel=option?.price===0 ? (included?'Incluído no plano':'Escolha sem custo') : option?.price===null ? 'Valor adicional sob consulta' : money(option.price)+'/mês';
      return '<div class="combo-app-card '+(selected||included?'is-selected':'')+'"><button type="button" class="combo-app-option" data-app-interest="'+service.id+'" aria-pressed="'+(included||selected)+'" '+(included?'disabled':'')+'><span class="combo-app-check">'+(included||selected?'✓':'+')+'</span><img src="'+service.logo+'" alt=""><strong>'+service.name+'</strong><small>'+priceLabel+'</small></button>'+((selected||included)?variantPicker(service,combo):'')+'</div>';
    }).join('')+'</div>';
    return;
  }
  options.innerHTML = `<div class="combo-category-heading"><span>${category.key === 'internet' ? 'NEX FIBRA' : 'MINHA NEX MÓVEL'}</span><h3 id="combo-options-title">${category.title}</h3><p>${category.key === 'internet' ? 'Internet com apps para completar a sua rotina.' : 'Uma oferta completa de internet + chip.'}</p></div>
    <ul class="combo-options-list">${CATALOG[category.key].map(plan => {
      const selected = combo.base?.id === plan.id;
      return `<li class="combo-option ${selected ? 'is-selected' : ''}">
        <div class="combo-option-copy"><strong>${category.key === 'internet' ? 'NEX ' : ''}${escapeHtml(plan.name)}</strong><small>${escapeHtml(comboOptionDetails(category.key, plan))}</small>${plan.included ? svaLogos(plan.included, 'combo-included-logos') : ''}</div>
        <div class="combo-option-action"><b>${money(plan.price)}<small>/mês</small></b><button type="button" class="button ${selected ? 'combo-selected-button' : 'blue'}" id="combo-option-${plan.id}" data-add="${plan.id}" aria-label="${selected ? 'Selecionado' : 'Selecionar'} ${escapeHtml(plan.name)}" ${selected ? 'aria-disabled="true"' : ''}>${selected ? '✓ Selecionado' : 'Escolher'}</button></div>
      </li>`;
    }).join('')}</ul>
    <p class="combo-choice-hint">Você pode trocar de plano a qualquer momento. O combo utiliza uma oferta principal.</p>`;
}
function openCombo() {
  const dialog = $('#combo-dialog');
  const isOpening = !dialog.open;
  const form = $('#combo-form');
  if (form) {
    comboFormValues.region = form.elements.region.value;
    comboFormValues.contact = form.elements.contact.value;
  }
  const focusedOption = document.activeElement?.closest('#combo-options [data-add]');
  const focusedApp = document.activeElement?.closest('[data-app-interest]');
  if (isOpening) {
    comboCategory = state.base ? 'svas' : 'internet';
    $('#combo-content').innerHTML = `<div class="combo-builder">
      <div class="combo-selection">
        <div class="combo-links" role="tablist" aria-label="Monte seu combo">
          ${comboCategories.map((category, index) => `<button type="button" role="tab" data-combo-category="${category.key}" aria-controls="combo-options" aria-selected="false" aria-expanded="false"><span class="combo-tab-icon" aria-hidden="true">${['⌁','▯','＋'][index]}</span>${category.label}</button>`).join('')}
        </div>
        <section id="combo-options" class="combo-options" aria-labelledby="combo-options-title" role="tabpanel"></section>
      </div>
      <aside class="combo-summary" aria-label="Resumo do seu combo">
        <div class="combo-summary-heading"><span>DO SEU JEITO</span><h3>Seu combo</h3><p>Suas escolhas, em um só lugar.</p></div>
        <div id="combo-items"></div><div id="combo-totals"></div>
        <form id="combo-form">
          <div class="form-grid"><label>Cidade ou bairro <span>opcional</span><input name="region" maxlength="120" autocomplete="address-level2" placeholder="Onde você quer se conectar?" value="${escapeHtml(comboFormValues.region)}"></label>
          <label>Como prefere conversar?<select name="contact"><option value="">Sem preferência</option><option>WhatsApp</option><option>Ligação</option></select></label></div>
          <button class="button wide" type="submit">Revisar meu combo <span>↗︎</span></button>
          <p class="combo-checkout-note">A Nex confirma cobertura, disponibilidade e condições antes da contratação.</p>
        </form>
      </aside>
    </div>`;
    $('#combo-form').elements.contact.value = comboFormValues.contact;
  }
  const combo = calculate(state);
  const items = comboLines(combo);
  const apps = requestedServices(combo);

  $('#combo-items').innerHTML=items.map(item=>'<div class="combo-line"><div><strong>'+escapeHtml(item.name)+'</strong><small>'+escapeHtml(item.description)+'</small><button type="button" class="remove" '+(availableAppIds.includes(item.id)?'data-remove-app':'data-remove')+'="'+item.id+'">Remover</button></div><b>'+(item.price===null?'Sob consulta':money(item.price))+'</b></div>').join('') || '<div class="combo-empty"><strong>Vamos montar o seu?</strong><p>Escolha sua internet e os serviços favoritos.</p></div>';
  $('#combo-totals').innerHTML='<div class="combo-total-label"><span>'+(combo.partial?'Subtotal mensal':'Total mensal')+'</span><strong>'+money(combo.monthly)+'</strong><small>/mês</small></div>'+
    (combo.base?.included?.length?'<div class="combo-summary-included"><span>Benefícios incluídos</span>'+svaLogos(combo.base.included,'summary-included-logos')+'</div>':'')+
    (combo.partial?'<p class="combo-total-note">Há serviços com valor sob consulta. O atendimento confirma esses itens.</p>':'')+
    (combo.base?'<p class="combo-total-note">Consulte cobertura, fidelidade e custos de instalação ou ativação.</p>':'');

  $('#combo-form button[type="submit"]').disabled = !items.length && !apps.length;
  renderComboOptions(combo);
  if (isOpening) dialog.showModal();
  else if (focusedOption) document.getElementById(`combo-option-${focusedOption.dataset.add}`)?.focus({ preventScroll: true });
  else if (focusedApp) dialog.querySelector(`[data-app-interest="${focusedApp.dataset.appInterest}"]`)?.focus({ preventScroll: true });
}
function message(combo,region,contact) {
 return ['Olá, Nex! Quero consultar este combo:',...comboLines(combo).map(item=>item.name+': '+item.description+' — '+(item.price===null?'Sob consulta':money(item.price)+'/mês')),combo.base?.included?.length?'Benefícios incluídos: '+combo.base.included.join(', '):'',(combo.partial?'Subtotal mensal':'Total mensal')+': '+money(combo.monthly),combo.partial?'Confirmar os itens sob consulta.':'',region?'Cidade/bairro: '+region:'',contact?'Contato: '+contact:'','Confirmar disponibilidade, condições e custos únicos.'].filter(Boolean).join('\n');
}

function showInfo(title,html){$('#info-content').innerHTML=`<span class="eyebrow">NEX TELECOM</span><h2 id="info-title" style="font-size:30px;margin:20px 0">${title}</h2>${html}`;$('#info-dialog').showModal()}
document.addEventListener('submit',e=>{if(e.target.id!=='combo-form')return;e.preventDefault();const data=new FormData(e.target),text=message(calculate(state),String(data.get('region')||'').trim(),String(data.get('contact')||''));$('#combo-dialog').close();showInfo('Seu combo, pronto para conversar.',`<p class="helper">Confira a mensagem. O próximo botão abre o WhatsApp; você decide quando enviar.</p><pre style="white-space:pre-wrap;font:12px/1.8 'DM Sans';background:var(--paper);padding:20px;border-radius:8px;margin:20px 0">${escapeHtml(text)}</pre><a class="button wide" href="https://wa.me/557132526676?text=${encodeURIComponent(text)}" target="_blank" rel="noopener">Abrir no WhatsApp ↗︎</a>`)});
document.addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;if(t.matches('[data-close]')){t.closest('dialog').close();return}if(t.matches('[data-combo]')){openCombo();return}if(t.matches('[data-combo-category]')){
  comboCategory = t.dataset.comboCategory;
  renderComboOptions();
  return;
}
if (t.matches('[data-sva-filter]')) {
  const filter = t.dataset.svaFilter;
  document.querySelectorAll('[data-sva-filter]').forEach(button => button.setAttribute('aria-pressed', String(button === t)));
  document.querySelectorAll('.sva-service').forEach(card => {
    const service=services().find(item=>item.id===card.querySelector('[data-service-choice]')?.dataset.serviceChoice);
    const matches=filter==='all'||(filter==='guides'?Boolean(tutorialGuides[service?.name]):service?.options.some(option=>option.tier===filter));
    const grid=card.parentElement.classList.contains('sva-catalog');
    card.hidden=!matches||(filter==='all'&&grid&&Array.from(card.parentElement.children).indexOf(card)>=8);
  });
  document.querySelector('[data-show-more-svas]').hidden=filter!=='all';

  return;
}
if (t.matches('[data-show-more-svas]')) {
 const hidden=Array.from(document.querySelectorAll('.sva-catalog .sva-service[hidden]'));
 hidden.slice(0,8).forEach(card=>card.hidden=false);
 t.hidden=hidden.length<=8;
 return;
}
if (t.matches('[data-service-choice]')) {
  const service = services().find(item => item.id === t.dataset.serviceChoice);
  if (!service) return;
  if (!includedService(service) && !state.apps.includes(service.id)) state.apps.push(service.id);
  persist(); openCombo(); comboCategory = 'svas'; renderComboOptions(); return;
}
if (t.matches('[data-app-interest]')) {
  const id = t.dataset.appInterest;
  const service = services().find(item => item.id === id);
  if (!service || includedService(service)) return;
  state.apps = state.apps.includes(id) ? state.apps.filter(item => item !== id) : [...state.apps, id];
  if (!state.apps.includes(id)) delete state.appVariants[id];
  persist(); openCombo(); return;
}
if (t.matches('[data-remove-app]')) {
  state.apps = state.apps.filter(id => id !== t.dataset.removeApp);
  delete state.appVariants[t.dataset.removeApp];
  persist(); openCombo(); return;
}
if (t.matches('[data-toggle-tier]')) {
  const id = t.dataset.toggleTier;
  if (!CATALOG.svas.some(plan => plan.id === id)) return;
  state.svas = state.svas.includes(id) ? state.svas.filter(item => item !== id) : [...state.svas, id];
  persist(); openCombo();
  const details = $('.combo-estimate'); if (details) details.open = true;
  return;
}
if(t.matches('[data-add]')){
  if(t.getAttribute('aria-disabled')!=='true')add(t.dataset.add);
  return;
}if(t.matches('[data-remove]')){const id=t.dataset.remove;if(state.base===id)state.base=null;if(state.camera===id)state.camera=null;state.svas=state.svas.filter(x=>x!==id);persist();openCombo();return}if(t.matches('[data-contact],[data-business]')){const topic=t.dataset.business||'Atendimento';showInfo(topic,`<p style="margin:20px 0">Converse com nossa equipe para encontrar a solução que combina com você.</p><a class="button" target="_blank" rel="noopener" href="https://wa.me/557132526676?text=${encodeURIComponent('Olá, Nex! Gostaria de informações sobre '+topic+'.')}">Abrir conversa no WhatsApp ↗︎</a>`);return}if(t.matches('[data-tutorial]')&&tutorialGuides[t.dataset.tutorial]){showInfo('Guia de acesso',`<p>Veja o passo a passo para acessar ${escapeHtml(t.dataset.tutorial)}.</p><a class="button" href="${tutorialGuides[t.dataset.tutorial]}" target="_blank" rel="noopener">Abrir guia de acesso ↗︎</a>`);return}if(t.matches('[data-tutorial]')){showInfo(`Como acessar ${escapeHtml(t.dataset.tutorial)}`,`<p>Fale com a equipe Nex para receber as orientações de ativação e acesso ao seu serviço.</p><p class="notice">A equipe da Nex ajuda você a encontrar os dados de acesso e ativar o seu serviço.</p><button class="button blue" data-contact>Receber orientação ↗︎</button>`);return}if(t.matches('[data-details]')){const p=allBase.find(x=>x.id===t.dataset.details);showInfo(p.name,`<p>${p.speed} Mega${p.data?' + '+p.data+' · '+p.lines+' linha(s)':''} por ${money(p.price)}/mês.</p><p class="notice">${p.included?(p.freeAppChoices?'Escolha 2 apps elegíveis sem custo.': 'Incluídos neste plano: '+p.included.join(', ')+'.'):'Oferta de fibra + chip. '+p.benefits+'.'} Consulte disponibilidade e condições no atendimento. A Nex confirma cobertura, fidelidade e eventuais custos únicos antes da contratação.</p><button class="button" data-select="${p.id}">Escolher oferta ↗︎</button>`);return}if(t.matches('[data-select]')){$('#info-dialog').close();add(t.dataset.select);return}if(t.matches('.menu-toggle')){const expanded=t.getAttribute('aria-expanded')==='true';t.setAttribute('aria-expanded',!expanded);$('nav').classList.toggle('open',!expanded);return}if(t.matches('.motion-pause')){const off=document.body.classList.toggle('motion-off');t.setAttribute('aria-pressed',off);t.setAttribute('aria-label',off?'Retomar animações':'Pausar animações');t.textContent=off?'▶':'Ⅱ';return}if(t.tagName==='A'){const href=t.getAttribute('href');if(href?.startsWith('/')&&(!t.target||t.target==='_self')&&!t.hasAttribute('download')&&!href.startsWith('/assets/')&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey){e.preventDefault();document.querySelectorAll('dialog[open]').forEach(d=>d.close());history.pushState({},'',href);render();if(location.hash)document.querySelector(location.hash)?.scrollIntoView();else window.scrollTo(0,0)}}});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
window.addEventListener('popstate',()=>{render();window.scrollTo(0,0)});window.addEventListener('storage',e=>{if(e.key===KEY)toast('Seu combo foi alterado em outra aba. Recarregue para atualizar.')});render();updateCart();

document.addEventListener('change', event => {
 const select=event.target.closest('[data-service-variant]');
 if (!select) return;
 const service=services().find(item=>item.id===select.dataset.serviceVariant);
 if (!service?.options.some(option=>option.id===select.value)) return;
 state.appVariants[service.id]=select.value;
 if (!state.apps.includes(service.id)) state.apps.push(service.id);
 persist();openCombo();
 document.querySelector('[data-service-variant="'+service.id+'"]')?.focus({preventScroll:true});
});
