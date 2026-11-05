# Reconstrução da home aprovada

A home foi reconstruída a partir da direção visual aprovada pelo usuário, com quatro imagens geradas separadamente pela ferramenta integrada de imagem. Os originais PNG permanecem em dist/assets/campaign-{hero,mobile,camera,family}.png e as versões de entrega JPEG em dist/assets/campaign-{hero,mobile,camera,family}.jpg. A conversão JPEG mantém a composição e reduz o total dessas quatro imagens de aproximadamente 8,1 MB para 0,77 MB.

Os arquivos dist/art-direction.js e dist/art-direction.css implementam a nova home. Fotografias, faixa vetorial, textos, controles e preços são elementos independentes. Não foi usado um screenshot como página. Não há PSD em camadas.

Prompts utilizados na ferramenta integrada:
- hero: fotografia editorial premium de mulher brasileira de cabelos cacheados, blusa ferrugem e calça clara, usando celular no sofá, sala contemporânea acolhedora, enquadramento à direita, luz natural cinematográfica, sem textos, logotipos ou grafismos.
- mobile: fotografia publicitária de mão segurando smartphone azul e chip físico genérico com contato dourado, composição à direita, espaço negativo azul escuro à esquerda, luz de recorte laranja, sem textos, logotipos ou interface.
- camera: fotografia publicitária de câmera interna branca genérica sobre console de madeira, aparelho à direita, sala contemporânea desfocada e área clara à esquerda, sem marca, textos ou interface.
- family: fotografia editorial de família brasileira usando notebook no sofá, personagens à direita, área azul escura à esquerda, roupa em azul e ferrugem, luz acolhedora, sem marca ou texto.

As imagens ilustram a comunicação e não especificam equipamentos, clientes reais ou depoimentos. O selo não aprovado “Mais escolhido” não foi implementado. Preservados o catálogo, o cálculo em centavos, a seleção salva e os diálogos de combo. A instalação por pacote de R$ 219,90 para NEX CAM Essencial aparece corretamente no resumo.

Validação: sete testes de cálculo passaram. Verificações visuais de desktop e celular e navegação pelo botão de planos; o resumo abre pelo novo card. Limitações comerciais e materiais pendentes continuam documentados em REVISAO.md. A reconstrução visual desta etapa se concentra na home; as páginas internas mantêm o conteúdo anterior e recebem o cabeçalho compartilhado.
