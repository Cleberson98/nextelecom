window.NEX_SVAS = SVA_SERVICES;
window.nexSvaLogos = function(names, options={}) {
 const size=Number(options.size)||40;
 const aliases={'Ubook':'Ubook Plus','Kindle Pass':'Kiddle Pass'};
 const items=names.map(name=>NEX_SVAS.find(service=>service.id===name||service.name===(aliases[name]||name))).filter(Boolean);
 return '<span class="sva-logo-list '+String(options.className||'').replace(/[^a-zA-Z0-9_ -]/g,'')+'" style="--sva-logo-size:'+size+'px">'+items.map(service=>'<span class="sva-logo" title="'+service.name+'"><img src="'+service.logo+'" alt="'+service.name+'" width="'+size+'" height="'+size+'" loading="lazy"></span>').join('')+'</span>';
};
