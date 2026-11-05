# Nex Telecom — versão de revisão

02/11/2026. Construção local, sem alteração no site atual e sem publicação comercial.

## Fontes

- Briefing_Renovacao_Site_Nex_Telecom_v2.docx, fornecido pelo usuário, extraído e lido.
- Duas tabelas de Minha NEX Móvel e NEX CAM, fornecidas pelo usuário.
- Confirmação do usuário: não haverá chip avulso; a franquia das ofertas indicadas como 3/7 GB é de 7 GB para utilização.
- https://nextelecom.com.br/ e /quemsomos/: leitura do conteúdo, consulta ao código público e inspeção da home no navegador.
- https://vivo.com.br/para-voce e https://internet.tim.com.br/fluxo: referências de organização de ofertas, benefícios e caminhos de contratação. Não foram reproduzidos preços, marcas ou promessas dessas empresas.

## Revisão do site atual

O site atual utiliza WordPress, Elementor e componentes personalizados. A home possui banners, menu de atalhos, planos, atendimento, área do assinante, seção gamer, serviços de entretenimento, Wi-Fi, formulário de cobertura, depoimentos e perguntas frequentes. A inspeção identificou dois fluxos de contratação/contato pelo WhatsApp, área de faturas externa, aplicativo e teste de velocidade.

Há excesso de caminhos repetidos de atendimento, popup promocional sobre o conteúdo e navegação móvel com vários atalhos simultâneos. Trechos extraídos incluem rótulos técnicos como “Carrossel Responsivo Múltiplo” e “Popup Nex”, além de redação inconsistente. O FAQ mistura conceitos de Wi-Fi 6 e frequência de 6 GHz; a nova versão evita repetir essa afirmação. Há imagens de SVAs hospedadas em outro domínio. A lista institucional atual de valores difere daquela solicitada no briefing.

O código público apresenta internet Start 300 Mega por R$ 89,90, Standard 500 Mega por R$ 99,90, Plus 700 Mega por R$ 129,90 e Premium 1 Giga por R$ 149,90. Esses valores foram reaproveitados como referência em revisão. Não foram adotados preços riscados nem descontos presumidos.

Limites: páginas Fale Conosco e Trabalhe Conosco tiveram timeout na consulta web; seus destinos foram preservados onde pertinentes. Não houve login no portal do assinante, envio de formulário, teste de uma contratação real, envio de WhatsApp ou validação do backend de cobertura. A pasta de vídeos do Google Drive referenciada no briefing não pôde ser lida pela ferramenta disponível. Portanto esta revisão não comprova funcionamento de todos os sistemas externos.

## Direção visual implementada

Identidade com logo recuperado do site oficial; paleta numerada do briefing em variáveis --c1 a --c6. Predomínio de azul #233971, laranja #f54f29, branco e superfícies claras. Tipografia Manrope e DM Sans com fallback local. Letras, símbolos e formas em CSS são elementos gráficos de apresentação, não fotografias de equipamentos reais.

Movimento de entrada, respostas de hover/pressionamento, abertura de diálogos e elemento gráfico animado no hero. O efeito do hero tem duração limitada e controle de pausa. Preferência de movimento reduzido desativa animações. Usabilidade por teclado, foco visível e controles nativos de diálogo e FAQ. Sem biblioteca adicional instalada.

## Páginas

Home `/`; Internet `/internet`; Minha NEX Móvel `/movel`; NEX CAM `/cam`; Apps e serviços `/svas`; Empresarial `/empresarial`; Quem Somos `/quem-somos`; Indique e Ganhe `/indique`; Contato `/contato`.

O servidor local permite acesso direto e recarga das rotas. Navegação interna preserva o combo e o armazenamento local conserva a seleção ao recarregar.

## Configurador

- Um único plano-base: internet OU internet + chip. Trocar a oferta substitui a anterior.
- Uma solução de câmeras; é possível contratar somente câmeras.
- Valores em centavos, mensalidade separada da instalação.
- Remoção e edição por troca da oferta; nenhuma seleção automática de extras.
- Nenhum desconto comercial inventado.
- Solução personalizada tem preço nulo e indicação sob consulta, tornando o total parcial.
- Faixas de SVAs permitem registrar interesse, ainda sem atribuir serviços específicos. São estimativas e deixam o total parcial.
- Resumo por categoria, benefícios incluídos sem acréscimo, custos desconhecidos explicitados e mensagem revisável antes de abrir WhatsApp.
- Cidade/bairro e preferência de contato opcionais, sem solicitação de CPF.

As faixas de SVA são provisórias: não substituem um catálogo comercial aprovado por serviço. A versão final deve associar cada app à faixa correta, validar a compatibilidade e permitir escolher as opções gratuitas de cada plano. A atual versão impede IDs repetidos, mas ainda não implementa todas as regras de incompatibilidade ou a seleção de apps gratuitos prevista no site atual.

## Pendências para versão comercial

1. Confirmar franquia da oferta móvel de 700 Mega (tabela informa 12 GB / 23 GB), regras dos aplicativos, SMS, fidelidade, cobertura, ativação, entrega e custos únicos. A confirmação de 7 GB foi aplicada às ofertas que indicavam 3/7 GB.
2. Confirmado pelo usuário em 02/11/2026: a instalação é por pacote, sem multiplicação pela quantidade de câmeras. O Essencial com duas câmeras custa R$ 219,90 de instalação no total. Cards, FAQ, resumo e mensagem para atendimento foram atualizados.
3. Confirmar equipamentos, recursos das câmeras, armazenamento, manutenção e área atendida. Não foram anunciados nuvem, monitoramento humano ou suporte contínuo.
4. Fornecer catálogo completo de SVAs, serviços incluídos, escolhas gratuitas, incompatibilidades, preços por serviço e regras de desconto. Integrar os vídeos e os passos escritos oficiais individualmente; hoje os botões Como acessar informam a pendência sem simular reprodução.
5. Fornecer fotos originais da fachada e equipe, artes de campanhas, regras de indicação e especificações empresariais. Não foram inventados bônus, SLA ou condições de link dedicado.
6. Validar missão/visão, contatos, horários, endereços e destinos comerciais. O número divulgado no site atual é (71) 3252-6676.
7. Definir política de privacidade e tratamento dos dados de contato para publicação comercial. Nenhum formulário foi conectado a uma base externa nesta revisão.
8. Validar textos, preços, artes, links, vídeos e o configurador com a Nex antes da publicação. Os campos de prazo do briefing não foram preenchidos: dependem de cronograma combinado, e não de uma data inventada.

## Executar

Na pasta nextelecom, executar `npm start` e abrir http://127.0.0.1:4173. Testes de cálculo: `npm test`. Não há instalação de dependências de aplicação. As fontes são carregadas do Google Fonts quando houver conexão.

## Limites de validação

Testes de cálculo cobrem mensalidade, custos únicos, substituição de base, duas linhas, projetos sob consulta, duplicidade de IDs e preços de câmeras. Verificações no navegador são complementares; nenhuma meta de FPS, Core Web Vitals ou compatibilidade completa é considerada garantida sem medição específica. O fluxo WhatsApp só prepara o texto, sem realizar envio automático.

## Atualização visual das páginas internas

A direção aprovada foi aplicada às oito páginas internas. Detalhes, prompt da nova imagem empresarial e verificações constam em design/IMPLEMENTACAO-INTERNAS.md. Essa etapa substitui as descrições visuais da primeira versão deste relatório. A NEX CAM recebeu filtros residencial e empresarial; os preços e o cálculo do combo continuam no catálogo compartilhado. A composição comercial, vídeos de SVAs e demais materiais pendentes listados neste documento continuam aguardando validação.
