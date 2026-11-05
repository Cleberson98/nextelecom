/* Direção editorial compartilhada. As fotos são ilustrativas; textos e ações permanecem HTML. */
const PAGE_ART={
 '/internet':{theme:'fiber',image:'campaign-hero.jpg',alt:'Cena ilustrativa de uso da internet em casa',label:'Internet fibra',icon:'wifi',caption:'Uma conexão para cada momento.'},
 '/movel':{theme:'mobile',image:'campaign-mobile.jpg',alt:'Celular e chip ilustrativos, sem indicação de modelo comercial',label:'Minha NEX Móvel',icon:'phone',caption:'Internet em casa + chip. Tudo no mesmo combo.'},
 '/cam':{theme:'camera',image:'campaign-camera.jpg',alt:'Câmera de segurança ilustrativa em um ambiente residencial',label:'NEX CAM',icon:'camera',caption:'Soluções para sua casa e seu negócio.'},
 '/empresarial':{theme:'business',image:'campaign-business.jpg',alt:'Cena ilustrativa de profissionais trabalhando em um escritório',label:'Empresarial',icon:'business',caption:'Conexões para o próximo passo do seu negócio.'},
 '/quem-somos':{theme:'about',image:'campaign-family.jpg',alt:'Família em uma cena ilustrativa de conexão e convivência',label:'Quem somos',icon:'wifi',caption:'Conexões que aproximam histórias.'},
 '/indique':{theme:'referral',image:'campaign-hero.jpg',alt:'Cena ilustrativa de uma pessoa usando o celular',label:'Indique e Ganhe',icon:'phone',caption:'Conheça as regras da campanha com a Nex.'},
 '/contato':{theme:'contact',image:'campaign-business.jpg',alt:'Cena ilustrativa de pessoas conversando em um escritório',label:'Fale conosco',icon:'business',caption:'Escolha seu atendimento. Conte com a Nex.'},
 '/svas':{theme:'services',image:'campaign-family.jpg',alt:'Cena ilustrativa de uma família usando um notebook',label:'Apps e serviços',icon:'wifi',caption:'Novas possibilidades para a sua rotina.'}
};
function hero({eyebrow,title,copy,cta='Encontre seu plano',url='#planos'}){
 const art=PAGE_ART[location.pathname.replace(/\/$/,'')]||PAGE_ART['/internet'];
 return `<section class="page-masthead masthead-${art.theme}"><div class="masthead-photo"><img src="/assets/${art.image}" alt="${art.alt}" fetchpriority="high" width="1536" height="1024"></div><div class="masthead-shade" aria-hidden="true"></div>${brandRibbon('masthead-ribbon')}<div class="wrap masthead-content"><a class="breadcrumb" href="/">Início <span>/</span> ${art.label}</a><div class="masthead-copy"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${copy}</p><div class="hero-actions">${link(url,cta,'button '+(art.theme==='camera'?'blue':'light'))}<button class="text-link" data-combo>Monte seu combo ↗</button></div></div></div><div class="masthead-caption"><div class="wrap">${nexIcon(art.icon)}<span>${art.caption}</span><a href="#${url.split('#')[1]||'main'}">Explore <b>↓</b></a></div></div><button class="motion-pause" aria-label="Pausar animações" aria-pressed="false">Ⅱ</button></section>`;
}
function band(){return `<section class="internal-combo-band"><div class="wrap"><div class="combo-band-title"><span class="eyebrow">NEX. DO SEU JEITO.</span><h2>Seu mundo tem<br>mais de uma conexão.</h2></div><div class="combo-band-action"><p>Escolha seus serviços, confira os valores<br>e converse com a gente para começar.</p><button class="button light" data-combo>Monte seu combo <span>↗</span></button></div></div>${brandRibbon('combo-band-ribbon')}</section>`}
function promos(){return campaignPromos()}
function configureInternalPage(){
 const path=location.pathname.replace(/\/$/,'')||'/';
 document.body.classList.toggle('internal-page',path!=='/');
 document.body.dataset.section=path.slice(1)||'home';
 document.querySelectorAll('.internal-page .cards-three article').forEach((el,i)=>{
  el.classList.add('reveal');
  if(!el.querySelector('.section-symbol')){
   const symbol=document.createElement('div');symbol.className='section-symbol';symbol.setAttribute('aria-hidden','true');
   symbol.innerHTML=nexIcon((path==='/empresarial'?['wifi','business','camera']:path==='/contato'?['phone','wifi','business']:['wifi','phone','camera'])[i%3]);
   el.prepend(symbol);
  }
 });
 if(path==='/movel')document.querySelectorAll('.plan-grid .plan-card').forEach(el=>{
  if(!el.querySelector('.mobile-plan-symbol'))el.insertAdjacentHTML('afterbegin',`<div class="mobile-plan-symbol" aria-hidden="true">${nexIcon('phone')}</div>`);
 });
 if(path==='/cam'){
  const grid=document.querySelector('.cam-grid');
  if(grid&&!document.querySelector('.camera-filters')){
   const filters=document.createElement('div');filters.className='camera-filters';filters.setAttribute('role','group');filters.setAttribute('aria-label','Filtrar soluções de câmeras');
   filters.innerHTML='<button type="button" data-camera-filter="all" aria-pressed="true">Todas as soluções</button><button type="button" data-camera-filter="home" aria-pressed="false">Para sua casa</button><button type="button" data-camera-filter="business" aria-pressed="false">Para seu negócio</button><span class="filter-result" role="status" aria-live="polite">5 soluções</span>';
   grid.before(filters);
  }
 }
 // O observer compartilhado também cuida dos elementos acrescentados acima.
 document.querySelectorAll('.internal-page .cards-three article').forEach(el=>{el.style.animationPlayState='paused';observer.observe(el)});
}
document.addEventListener('nex:render',configureInternalPage);
document.addEventListener('click',e=>{
 const button=e.target.closest('[data-camera-filter]');if(!button)return;
 const filter=button.dataset.cameraFilter;
 document.querySelectorAll('[data-camera-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 let count=0;
 document.querySelectorAll('.cam-grid>.plan-card').forEach((el,i)=>{
  const visible=filter==='all'||(filter==='home'&&[0,1,4].includes(i))||(filter==='business'&&[1,2,3,4].includes(i));
  el.hidden=!visible;if(visible){count++;el.style.animationPlayState='running'}
 });
 const result=document.querySelector('.filter-result');if(result)result.textContent=`${count} soluções`;
});
