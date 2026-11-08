# Publicação para homologação da Nex Telecom

O site é uma aplicação estática em HTML, CSS e JavaScript. O configurador roda no navegador. Para servir a versão de aprovação, use a raiz de um host de teste com HTTPS e suporte a `index.html` em diretórios. O servidor Node do repositório é usado para prévia local.

## Instalar o pacote

1. Baixe o ZIP da versão de homologação em [Releases do GitHub](https://github.com/Cleberson98/nextelecom/releases).
2. Extraia o pacote. Publique **o conteúdo de `site/`** na raiz do host de teste, de modo que `index.html`, `assets/`, `movel/` e os demais diretórios fiquem diretamente nessa raiz. Use um subdomínio de teste para o site, pois os links e os arquivos apontam para a raiz do host.
3. Configure `index.html` como índice dos diretórios. As páginas internas têm um `index.html` próprio, então podem ser abertas diretamente, inclusive após atualizar a página.
4. Compartilhe o endereço de teste com os aprovadores conforme o controle de acesso adotado pela Nex. O pacote inclui uma instrução para buscadores não indexarem a versão de revisão. A restrição de acesso, quando necessária, deve ser aplicada pela hospedagem.

## Conferir a instalação

- Abra a home e acesse diretamente `/movel/`, `/cam/`, `/empresarial/` e `/contato/`. Recarregue essas páginas e confira se os estilos e as imagens aparecem.
- Selecione um plano de internet, navegue até a NEX CAM e adicione um pacote. Confirme que a seleção permanece no combo e que a instalação aparece separada da mensalidade.
- Abra o resumo do pedido e confira a mensagem preparada para o WhatsApp. A abertura da conversa é opcional durante a revisão.
- Confira o menu e o configurador também em uma tela de celular.

## Atualizar pelo GitHub

As alterações são entregues no repositório privado [Cleberson98/nextelecom](https://github.com/Cleberson98/nextelecom). A equipe pode usar o ZIP da release indicada ou gerar o mesmo pacote a partir do commit correspondente. Para gerar o ZIP, execute na raiz do repositório com Python 3.8 ou posterior:

```sh
python nextelecom/prepare_staging.py
```

O ZIP fica em `release-output/nextelecom-homologacao.zip`. Ao atualizar o ambiente, publique os arquivos da mesma versão em conjunto e preserve o pacote anterior para retorno rápido.

Após a aprovação, a Nex define a publicação oficial e o apontamento do domínio na própria infraestrutura. O pacote desta etapa é de homologação. Os materiais e condições comerciais que ainda precisam de validação estão em [REVISAO.md](REVISAO.md).
