# Páginas internas da Nex

Etapa de continuação após aprovação da direção visual da home. Foram renovadas Internet, Minha NEX Móvel, NEX CAM, Empresarial, Apps e serviços, Quem Somos, Indique e Ganhe e Contato.

Fotografias, grafismo vetorial, texto e controles são camadas independentes no HTML/CSS. Não foi feita conversão da página em imagem única. Cada abertura recebe uma composição própria, com tema azul escuro ou claro conforme o assunto; o grafismo fica junto à borda para preservar os rostos e os equipamentos. Cards, etapas, perguntas frequentes e chamadas para o combo compartilham tipografia, espaçamento e estados de interação.

Arquivos principais: dist/internal-pages.js e dist/internal-pages.css. A aplicação em dist/app.js aciona o ajuste visual após cada navegação e limpa o observer da página anterior. A nova imagem empresarial foi criada pela ferramenta integrada de geração de imagens; original preservado em dist/assets/campaign-business.png e versão JPEG de entrega em dist/assets/campaign-business.jpg.

## Prompt da imagem empresarial

Premium editorial brand photograph for a Brazilian telecom B2B website. Wide landscape 3:2. Authentic Brazilian woman entrepreneur around 35 with curly dark hair in a sophisticated navy blazer and natural beige blouse, in a contemporary small architecture or design studio, consulting a laptop while speaking naturally with a Brazilian male colleague in background, warm daylight, wood and clean navy architectural details, a tiny warm orange accent. Subjects on RIGHT HALF, left half dark navy and softly blurred contemporary office with ample negative space. Warm human professionalism, elegant cinematic commercial photography, realistic skin and hands, no stock-photo posed handshake, no server racks, no neon, no text, no logo, no graphs, no screens with readable information, no watermark. Suitable to crop into the right portion of a full-width website hero. Visually coherent with an orange and navy telecom lifestyle campaign. The image is illustrative, not real Nex staff.

## Funcionalidade

O configurador continua compartilhado e mantém a seleção entre páginas. Os filtros da NEX CAM permitem ver todas as soluções, as residenciais ou as voltadas a negócios, sem mudar o combo. O filtro residencial apresenta Classic, Essencial e Personalizada; o de negócios apresenta Essencial, Pro, Empresa e Personalizada. Há indicação acessível do filtro selecionado e da quantidade de soluções visíveis.

## Verificação

- Sete testes de cálculo passaram após a integração.
- As oito rotas internas foram verificadas em 390, 768 e 1440 pixels, sem rolagem horizontal nos 24 casos.
- Em desktop, todas apresentaram um h1, nenhum CTA principal com âncora ausente e nenhuma imagem carregada com erro.
- Filtro residencial conferido no navegador: três soluções corretas.
- Abertura móvel inspecionada visualmente e geometria dos controles conferida antes da faixa inferior.
- Contraste, tempo de resposta, FPS e compatibilidade entre todos os navegadores não foram certificados por esta verificação.

As pendências comerciais, vídeos de SVAs, fotos oficiais da equipe e regras não fornecidas continuam em REVISAO.md. Fotografias de pessoas e equipamentos são ilustrativas e não comprovam produtos, colaboradores ou instalações reais. Não houve publicação no domínio comercial nem envio de mensagem ao WhatsApp.
