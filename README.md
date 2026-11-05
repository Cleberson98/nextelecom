# Nex Telecom

Projeto de renovação do site da Nex Telecom, com páginas de internet, Minha NEX Móvel, NEX CAM, serviços digitais e área empresarial. Inclui configurador de combos, resumo de valores e preparação de mensagem para atendimento pelo WhatsApp.

## Executar localmente

Requer Node.js com suporte a `node --test`. Não há dependências externas de aplicação para instalar.

```sh
cd nextelecom
npm start
```

Abra http://127.0.0.1:4173 no navegador.

## Testes

```sh
cd nextelecom
npm test
```

Os testes verificam os cálculos em centavos, custos únicos separados da mensalidade, combos de internet com chip, duplicidade de serviços e soluções de câmeras sob consulta.

## Estrutura

- `nextelecom/dist/`: HTML, CSS, JavaScript e imagens utilizados pelo site. Essa pasta contém o código estático e é versionada.
- `nextelecom/server.cjs`: servidor de prévia local com suporte às rotas.
- `nextelecom/tests.cjs`: testes do configurador.
- `nextelecom/design/`: proposta visual, registros de implementação e capturas de revisão.
- `nextelecom/REVISAO.md`: análise, fontes e pendências comerciais.

## Páginas

`/`, `/internet`, `/movel`, `/cam`, `/svas`, `/empresarial`, `/quem-somos`, `/indique` e `/contato`.

## Estado do projeto

Versão para revisão. O combo permanece salvo no navegador; a mensagem de contratação é revisada pelo visitante antes da abertura do WhatsApp. O projeto não conclui vendas automaticamente e não inclui uma base de clientes ou integração com o backend da operadora.

O catálogo detalhado de SVAs, vídeos oficiais, fotografias institucionais e algumas condições comerciais aguardam fornecimento ou validação. Fotografias geradas para as campanhas são ilustrativas. Consulte `nextelecom/REVISAO.md` antes de publicar comercialmente.

As imagens originais e suas versões otimizadas estão em `nextelecom/dist/assets/`. Textos, preços, navegação e controles são elementos editáveis em HTML/CSS/JavaScript, separados das imagens.
