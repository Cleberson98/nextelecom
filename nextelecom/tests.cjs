const {test}=require('node:test'),assert=require('node:assert/strict');const {CATALOG,calculate}=require('./dist/catalog.js');

test('Standard começa sem apps e concede somente duas escolhas elegíveis gratuitas',()=>{
 assert.equal(calculate({base:'fibra500'}).apps.length,0);
 const c=calculate({base:'fibra500',apps:['deezer','looke','sky']});
 assert.equal(c.apps.find(app=>app.id==='deezer').variant.price,0);
 assert.equal(c.apps.find(app=>app.id==='looke').variant.price,0);
 assert.equal(c.apps.find(app=>app.id==='sky').variant.price,1490);
 assert.equal(c.monthly,11480);
});

test('cota do Standard respeita ordem de escolha, duplicados e upgrades',()=>{
 const c=calculate({base:'fibra500',apps:['sky','sky','deezer','kindle','kaspersky'],appVariants:{sky:'advanced'}});
 assert.equal(c.apps.find(app=>app.id==='sky').variant.price,1490);
 assert.equal(c.apps.find(app=>app.id==='deezer').variant.price,0);
 assert.equal(c.apps.find(app=>app.id==='kindle').variant.price,0);
 assert.equal(c.apps.find(app=>app.id==='kaspersky').variant.price,1490);
 assert.equal(c.monthly,12970);
});

test('terceiro app sem preço cadastrado fica sob consulta e libera cota ao remover outro',()=>{
 const selected={base:'fibra500',apps:['sky','kindle','deezer'],appVariants:{deezer:'included'}};
 const c=calculate(selected);
 assert.equal(c.apps.find(app=>app.id==='deezer').variant.price,null);
 assert.equal(c.partial,true);
 const removed=calculate({...selected,apps:['kindle','deezer']});
 assert.equal(removed.apps.find(app=>app.id==='deezer').variant.price,0);
 assert.equal(removed.partial,false);
});

test('Plus e Premium incluem apenas Globoplay e cobram os adicionais selecionados',()=>{
 for(const id of ['fibra700','fibra1000']) {
  const c=calculate({base:id});
  assert.deepEqual(c.apps.map(app=>app.id),['globoplay']);
  assert.equal(c.apps[0].variant.price,0);
  const extra=calculate({base:id,apps:['globoplay','sky'],appVariants:{globoplay:'advanced',sky:'included'}});
  assert.equal(extra.monthly,c.monthly+1490);
  assert.equal(extra.apps.filter(app=>app.id==='globoplay').length,1);
 }
});
test('combo usa centavos e separa instalação de mensalidade',()=>{const c=calculate({base:'fibra500',camera:'camessencial',svas:[]});assert.equal(c.monthly,17980);assert.equal(c.setup,21990)});
test('oferta móvel inclui fibra sem cobrança de segundo plano',()=>{const c=calculate({base:'movel500',svas:[]});assert.equal(c.monthly,11890);assert.equal(c.base.lines,1)});
test('combo de duas linhas tem preço fechado e 7 GB por linha',()=>{const c=calculate({base:'movelduo',svas:[]});assert.equal(c.monthly,13690);assert.equal(c.base.lines,2);assert.equal(c.base.data,'7 GB por linha')});
test('projeto personalizado é sob consulta e torna total parcial',()=>{const c=calculate({base:'fibra500',camera:'campersonalizada',svas:[]});assert.equal(c.monthly,9990);assert.equal(c.partial,true);assert.equal(c.camera.price,null)});
test('apps não duplicam cobrança quando o id se repete',()=>{const c=calculate({svas:['sva1490','sva1490']});assert.equal(c.monthly,1490);assert.equal(c.svas.length,1);assert.equal(c.partial,true)});
test('benefícios incluídos não acrescentam custo',()=>{assert.equal(calculate({base:'fibra300',svas:[]}).monthly,8990)});
test('preços NEX CAM correspondem à tabela',()=>{assert.deepEqual(CATALOG.cameras.map(x=>x.price),[3490,7990,18990,43990,null]);assert.deepEqual(CATALOG.cameras.map(x=>x.setup),[11990,21990,39990,59990,null])});

test('Disney Top e Premium substituem a opção e recalculam em centavos',()=>{
 assert.equal(calculate({base:'fibra500',apps:['disney'],appVariants:{disney:'top'}}).monthly,12480);
 assert.equal(calculate({base:'fibra500',apps:['disney'],appVariants:{disney:'premium'}}).monthly,12980);
});
test('serviços distintos são cobrados individualmente sem duplicação',()=>{
 assert.equal(calculate({base:'fibra500',apps:['disney','disney','hbo'],appVariants:{disney:'premium',hbo:'top'}}).monthly,15470);
});
test('benefício de 500 Mega custa zero e perde elegibilidade ao trocar para 300',()=>{
 assert.equal(calculate({base:'fibra500',apps:['deezer']}).monthly,9990);
 const lower=calculate({base:'fibra300',apps:['deezer']});
 assert.equal(lower.monthly,8990);
 assert.equal(lower.partial,true);
});
test('Kaspersky permite upgrade de licenças sem cobrar a inclusão',()=>{
 assert.equal(calculate({base:'fibra500',apps:['kaspersky']}).monthly,9990);
 assert.equal(calculate({base:'fibra500',apps:['kaspersky'],appVariants:{kaspersky:'premium'}}).monthly,12980);
});
