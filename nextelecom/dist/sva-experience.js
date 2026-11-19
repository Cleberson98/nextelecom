/* Esteira de serviços e atalhos da Nex. */
(() => {
 let dispose = () => {};
 function setup() {
  dispose();
  const rail = document.querySelector('.sva-carousel');
  if (!rail) return;
  const section = rail.closest('.sva-section');
  const pause = section.querySelector('[data-sva-carousel-pause]');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let stopped = reduced.matches;
  let hovered = false;
  let visible = false;
  let direction = 1;
  const timer = setInterval(() => {
   if (stopped || hovered || !visible || document.hidden || rail.contains(document.activeElement) ||
       document.body.classList.contains('motion-off') || document.querySelector('dialog[open]')) return;
   const max = rail.scrollWidth - rail.clientWidth;
   if (max <= 5) return;
   if (rail.scrollLeft >= max - 5) direction = -1;
   if (rail.scrollLeft <= 5) direction = 1;
   advance(direction);
  },2800);
  function advance(step) {
   const cards = rail.querySelectorAll('.sva-service:not([hidden])');
   const distance = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : rail.clientWidth;
   rail.scrollBy({left:step * distance,behavior:reduced.matches ? 'instant' : 'smooth'});
  }
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; },{threshold:.1});
  observer.observe(rail);
  function click(event) {
   const arrow=event.target.closest('[data-sva-scroll]');
   if (arrow) advance(Number(arrow.dataset.svaScroll));
   if (event.target.closest('[data-sva-carousel-pause]')) {
    stopped=!stopped; update();
   }
  }
  function update() {
   pause.textContent=stopped?'▶':'Ⅱ';
   pause.setAttribute('aria-pressed',String(stopped));
   pause.setAttribute('aria-label',stopped?'Retomar carrossel':'Pausar carrossel');
  }
  const enter=event=>{hovered=event.pointerType==='mouse';};
  const leave=()=>{hovered=false;};
  section.addEventListener('click',click);
  rail.addEventListener('pointerenter',enter);
  rail.addEventListener('pointerleave',leave);
  update();
  dispose=()=>{
   clearInterval(timer);observer.disconnect();
   section.removeEventListener('click',click);
   rail.removeEventListener('pointerenter',enter);
   rail.removeEventListener('pointerleave',leave);
  };
 }
 const icon=(path)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+path+'"/></svg>';
 const widget=document.createElement('aside');
 widget.className='nex-quick-actions';
 widget.setAttribute('aria-label','Atalhos Nex Telecom');
 widget.innerHTML='<nav class="nex-quick-menu" id="nex-quick-menu" aria-label="Menu de atalhos" hidden><strong>Como podemos ajudar?</strong>'+
 [['/internet','Nossos planos'],['https://central.nextelecom.net.br/','Sua fatura'],['/quem-somos','Quem somos'],['/svas','Apps e entretenimento'],['/contato','Nossas lojas'],['https://wa.me/557132526676','Fale conosco'],['https://fast.com/pt/','Teste de velocidade']].map(([url,name])=>'<a href="'+url+'" '+(url.startsWith('http')?'target="_blank" rel="noopener"':'')+'>'+name+' <span>↗︎</span></a>').join('')+'</nav>'+
 '<button class="quick-menu-button" type="button" data-quick-menu aria-controls="nex-quick-menu" aria-expanded="false" aria-label="Abrir menu de atalhos">'+icon('M4 6h16M4 12h16M4 18h16')+'<span>Menu</span></button>'+
 '<a class="quick-phone" href="tel:+557132526676" aria-label="Ligar para Nex Telecom">'+icon('M7 3 3 6c0 8 7 15 15 15l3-4-5-4-3 2-4-4 2-3-4-5Z')+'<span>Ligar agora</span></a>'+
 '<a class="quick-whatsapp" href="https://wa.me/557132526676" target="_blank" rel="noopener" aria-label="Conversar com a Nex no WhatsApp">'+icon('M21 11a9 9 0 0 1-13 8l-5 2 1-5a9 9 0 1 1 17-5ZM8 7c0 4 2 6 6 7')+'<span>WhatsApp</span></a>'+
 '<a class="quick-instagram" href="https://www.instagram.com/nextelecomoficial/" target="_blank" rel="noopener" aria-label="Instagram da Nex">'+icon('M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17 7h.01')+'<span>Instagram</span></a>';
 document.body.append(widget);
 const menu=widget.querySelector('nav');
 const toggle=widget.querySelector('[data-quick-menu]');
 function close() {menu.hidden=true;toggle.setAttribute('aria-expanded','false');}
 document.addEventListener('click',event=>{
  if (event.target.closest('[data-quick-menu]')) {menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));}
  else if (!widget.contains(event.target) || event.target.closest('a')) close();
 });
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){close();toggle.focus();}});
 document.addEventListener('nex:render',()=>{close();setup();});
 setup();
})();
