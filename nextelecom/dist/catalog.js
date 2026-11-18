/* Valores em centavos. Origem e pendências descritas no relatório de revisão. */
const CATALOG={
 internet:[{id:'fibra300',name:'Start',speed:300,price:8990,included:['TV Plus','Ubook','Kindle Pass']},{id:'fibra500',name:'Standard',speed:500,price:9990,included:['TV Plus','Ubook','Kindle Pass']},{id:'fibra700',name:'Plus',speed:700,price:12990,included:['TV Plus','Ubook','Kindle Pass']},{id:'fibra1000',name:'Premium',speed:1000,price:14990,included:['TV Plus','Ubook','Kindle Pass']}],
 mobile:[{id:'movel200',name:'Conexão que acompanha',speed:200,data:'7 GB',lines:1,price:9890,benefits:'WhatsApp • ligações ilimitadas • 100 SMS'},{id:'movel500',name:'Mais possibilidades',speed:500,data:'7 GB',lines:1,price:11890,benefits:'WhatsApp, Waze e Maps • ligações ilimitadas • 100 SMS'},{id:'movelduo',name:'Conexão em dupla',speed:200,data:'7 GB por linha',lines:2,price:13690,benefits:'WhatsApp • ligações ilimitadas • 200 SMS'},{id:'movel700',name:'Seu mundo em movimento',speed:700,data:'12 GB / 23 GB',lines:1,price:16890,benefits:'WhatsApp, Waze e Maps • ligações ilimitadas • 100 SMS'}],
 cameras:[{id:'camclassic',name:'NEX CAM Classic',count:1,days:3,price:3490,setup:11990,profile:'Residencial'},{id:'camessencial',name:'NEX CAM Essencial',count:2,days:5,price:7990,setup:21990,profile:'Residencial / comércio'},{id:'campro',name:'NEX CAM Pro',count:4,days:7,price:18990,setup:39990,profile:'Comércio'},{id:'camempresa',name:'NEX CAM Empresa',count:6,days:15,price:43990,setup:59990,profile:'Empresarial'},{id:'campersonalizada',name:'NEX CAM Personalizada',price:null,setup:null,profile:'Projeto sob medida'}],
 svas:[{id:'sva1490',name:'Apps • faixa R$ 14,90',price:1490,pending:true},{id:'sva2490',name:'Apps • faixa R$ 24,90',price:2490,pending:true},{id:'sva2990',name:'Apps • faixa R$ 29,90',price:2990,pending:true}]
};
// Preços por serviço conforme o banner Benefícios Nex fornecido em 17/11/2026.
const SVA_SERVICES = [
  {
    "id": "sky",
    "name": "SKY+",
    "category": "tv",
    "included": true,
    "logo": "/assets/sva-sky.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      },
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": "Com canal Globo"
      }
    ]
  },
  {
    "id": "looke",
    "name": "Looke",
    "category": "tv",
    "included": true,
    "logo": "/assets/sva-looke.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "kindle",
    "name": "Kiddle Pass",
    "category": "reading",
    "included": true,
    "logo": "/assets/sva-kindle.png",
    "description": "Histórias, livros e informação para descobrir.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      },
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": ""
      }
    ]
  },
  {
    "id": "playkids",
    "name": "PlayKids+",
    "category": "kids",
    "included": true,
    "logo": "/assets/sva-playkids.png",
    "description": "Conteúdo para os pequenos e para a família.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "exitlag",
    "name": "ExitLag",
    "category": "games",
    "included": true,
    "logo": "/assets/sva-exitlag.png",
    "description": "Mais possibilidades para quem gosta de jogar.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "kaspersky",
    "name": "Kaspersky",
    "category": "security",
    "included": true,
    "logo": "/assets/sva-kaspersky.png",
    "description": "Proteção digital para seus dispositivos.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": "1 licença"
      },
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": "3 licenças"
      },
      {
        "id": "premium",
        "label": "Premium",
        "price": 2990,
        "tier": "premium",
        "detail": "5 licenças"
      }
    ]
  },
  {
    "id": "hube",
    "name": "Hube",
    "category": "reading",
    "included": true,
    "logo": "/assets/sva-hube.png",
    "description": "Histórias, livros e informação para descobrir.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "ubook",
    "name": "Ubook Plus",
    "category": "reading",
    "included": true,
    "logo": "/assets/sva-ubook.png",
    "description": "Histórias, livros e informação para descobrir.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "socialcomics",
    "name": "Social Comics",
    "category": "reading",
    "included": true,
    "logo": "/assets/sva-socialcomics.png",
    "description": "Histórias, livros e informação para descobrir.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "estuda",
    "name": "Estuda+",
    "category": "education",
    "included": true,
    "logo": "/assets/sva-estuda.png",
    "description": "Conteúdo para aprender e se desenvolver.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "pequenos",
    "name": "Pequenos Leitores",
    "category": "kids",
    "included": true,
    "logo": "/assets/sva-pequenos.png",
    "description": "Conteúdo para os pequenos e para a família.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "playlist",
    "name": "Playlist",
    "category": "music",
    "included": true,
    "logo": "/assets/sva-playlist.png",
    "description": "Música para acompanhar seus momentos.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "qnutri",
    "name": "Qnutri",
    "category": "health",
    "included": true,
    "logo": "/assets/sva-qnutri.png",
    "description": "Bem-estar e cuidado para a sua rotina.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "revistaria",
    "name": "Revistaria",
    "category": "reading",
    "included": true,
    "logo": "/assets/sva-revistaria.png",
    "description": "Histórias, livros e informação para descobrir.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "fluid",
    "name": "Fluid",
    "category": "health",
    "included": true,
    "logo": "/assets/sva-fluid.png",
    "description": "Bem-estar e cuidado para a sua rotina.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "deezer",
    "name": "Deezer",
    "category": "music",
    "included": true,
    "logo": "/assets/sva-deezer.png",
    "description": "Música para acompanhar seus momentos.",
    "options": [
      {
        "id": "included",
        "label": "Incluído a partir de 500 Mega",
        "price": 0,
        "minSpeed": 500,
        "tier": "included",
        "detail": ""
      }
    ]
  },
  {
    "id": "globoplay",
    "name": "Globoplay",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-globoplay.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": "Com anúncios"
      }
    ]
  },
  {
    "id": "appletv",
    "name": "Apple TV",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-appletv.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": ""
      }
    ]
  },
  {
    "id": "hotgo",
    "name": "HotGo",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-hotgo.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": ""
      }
    ]
  },
  {
    "id": "curtaon",
    "name": "Curta!On",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-curtaon.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": ""
      }
    ]
  },
  {
    "id": "jornalista",
    "name": "O Jornalista",
    "category": "reading",
    "included": false,
    "logo": "/assets/sva-jornalista.png",
    "description": "Histórias, livros e informação para descobrir.",
    "options": [
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": ""
      }
    ]
  },
  {
    "id": "docway",
    "name": "Docway",
    "category": "health",
    "included": false,
    "logo": "/assets/sva-docway.png",
    "description": "Bem-estar e cuidado para a sua rotina.",
    "options": [
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": ""
      }
    ]
  },
  {
    "id": "prime",
    "name": "Amazon Prime",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-prime.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "advanced",
        "label": "Advanced",
        "price": 1490,
        "tier": "advanced",
        "detail": ""
      }
    ]
  },
  {
    "id": "disney",
    "name": "Disney+",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-disney.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "top",
        "label": "Top",
        "price": 2490,
        "tier": "top",
        "detail": "Com anúncios"
      },
      {
        "id": "premium",
        "label": "Premium",
        "price": 2990,
        "tier": "premium",
        "detail": "Sem anúncios"
      }
    ]
  },
  {
    "id": "hbo",
    "name": "HBO Max",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-hbo.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "top",
        "label": "Top",
        "price": 2490,
        "tier": "top",
        "detail": "Com anúncios"
      },
      {
        "id": "premium",
        "label": "Premium",
        "price": 2990,
        "tier": "premium",
        "detail": "Sem anúncios"
      }
    ]
  },
  {
    "id": "cindie",
    "name": "Cindie",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-cindie.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "top",
        "label": "Top",
        "price": 2490,
        "tier": "top",
        "detail": ""
      }
    ]
  },
  {
    "id": "leitura360",
    "name": "Leitura 360",
    "category": "reading",
    "included": false,
    "logo": "/assets/sva-leitura360.png",
    "description": "Histórias, livros e informação para descobrir.",
    "options": [
      {
        "id": "top",
        "label": "Top",
        "price": 2490,
        "tier": "top",
        "detail": ""
      }
    ]
  },
  {
    "id": "queima",
    "name": "Queima Diária",
    "category": "health",
    "included": false,
    "logo": "/assets/sva-queima.png",
    "description": "Bem-estar e cuidado para a sua rotina.",
    "options": [
      {
        "id": "premium",
        "label": "Premium",
        "price": 2990,
        "tier": "premium",
        "detail": ""
      }
    ]
  },
  {
    "id": "smart",
    "name": "SmartContent",
    "category": "education",
    "included": false,
    "logo": "/assets/sva-smart.png",
    "description": "Conteúdo para aprender e se desenvolver.",
    "options": [
      {
        "id": "premium",
        "label": "Premium",
        "price": 2990,
        "tier": "premium",
        "detail": ""
      }
    ]
  },
  {
    "id": "zen",
    "name": "Zen",
    "category": "health",
    "included": false,
    "logo": "/assets/sva-zen.png",
    "description": "Bem-estar e cuidado para a sua rotina.",
    "options": [
      {
        "id": "premium",
        "label": "Premium",
        "price": 2990,
        "tier": "premium",
        "detail": ""
      }
    ]
  },
  {
    "id": "tvplus",
    "name": "TV Plus",
    "category": "tv",
    "included": false,
    "logo": "/assets/sva-tvplus.png",
    "description": "Filmes, séries e entretenimento para sua rotina.",
    "options": [
      {
        "id": "consult",
        "label": "Sob consulta",
        "price": null,
        "tier": "consult",
        "detail": "Consulte disponibilidade e valor"
      }
    ]
  },
  {
    "id": "nba",
    "name": "NBA League Pass",
    "category": "sports",
    "included": false,
    "logo": "/assets/sva-nba.png",
    "description": "Esporte para acompanhar de perto.",
    "options": [
      {
        "id": "consult",
        "label": "Sob consulta",
        "price": null,
        "tier": "consult",
        "detail": "Consulte disponibilidade e valor"
      }
    ]
  }
];

for (const service of SVA_SERVICES) {
 if (['disney','hbo','deezer','tvplus','ubook','kindle'].includes(service.id)) service.art='/assets/service-'+service.id+'.webp';
}
function serviceVariant(service, variantId, base) {
  if (base?.included?.includes(service.name) && (!variantId || variantId==='included' || service.id==='kindle')) return {...service.options.find(option=>option.id==='included'),id:'included',label:'Incluído no plano',price:0,tier:'included'};
  const included = service.options.find(option => option.minSpeed && base && base.speed >= option.minSpeed);
  if (included && (!variantId || variantId === 'included')) return included;
  const chosen = service.options.find(option => option.id === variantId && !option.minSpeed);
  if (chosen) return chosen;
  return included || service.options.find(option => !option.minSpeed) || null;
}
function calculate(state) {
  const base = [...CATALOG.internet,...CATALOG.mobile].find(plan => plan.id === state.base);
  const camera = CATALOG.cameras.find(plan => plan.id === state.camera);
  const svas = CATALOG.svas.filter(plan => (state.svas || []).includes(plan.id));
  const apps = SVA_SERVICES.filter(service => (state.apps || []).includes(service.id)).map(service => ({
    ...service, variant:serviceVariant(service,(state.appVariants || {})[service.id],base)
  }));
  const paidApps = apps.filter(service => service.variant && service.variant.price !== null);
  const unknownApps = apps.filter(service => !service.variant || service.variant.price === null);
  return {base,camera,svas,apps,unknownApps,monthly:(base?.price||0)+(camera?.price||0)+svas.reduce((sum,plan)=>sum+plan.price,0)+paidApps.reduce((sum,service)=>sum+service.variant.price,0),setup:camera?.setup||0,partial:camera?.price===null||svas.length>0||unknownApps.length>0,unknownFees:!!base};
}
for (const plan of CATALOG.internet) {
  if (plan.speed >= 500) plan.included = ['TV Plus',...SVA_SERVICES.filter(service => service.included).map(service => service.name)];
  else plan.included = ['TV Plus','Ubook Plus','Kiddle Pass'];
}
if (typeof module !== 'undefined') module.exports={CATALOG,calculate,SVA_SERVICES,serviceVariant};
