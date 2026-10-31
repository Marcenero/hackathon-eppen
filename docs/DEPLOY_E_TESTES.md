# Build, testes e deploy no Coolify

## Escopo demonstrativo

O fluxo principal é uma experiência em três etapas na rota `/descarte`: escolher material, quantidade e região; ver coletores compatíveis e volumes agrupados na mesma região; confirmar uma entrega simulada.

Os materiais, coletores, regiões, horários, distâncias e volumes são dados sintéticos. O matching é local: filtra coletores pela região e pelo material aceito. O volume total mostrado soma a quantidade digitada a um volume fixture da combinação selecionada. Nenhum agendamento ou coleta é criado. O indicador exibido é apenas volume operacional potencialmente agrupado; o impacto socioambiental não foi validado pela equipe e não é calculado.

## Execução local

Requer Node.js 22 e npm.

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000/descarte?origem=folder` para testar a entrada pelo QR. A aplicação de produção escuta em `0.0.0.0:3000`:

```bash
npm run check
npm run build
npm run start
```

## Roteiro manual

1. Acesse `/descarte?origem=folder` em um celular ou viewport estreito. Confirme a identificação de acesso pelo QR e que não há rolagem horizontal.
2. Selecione cada material, altere quantidade e região. Envie uma quantidade válida e confirme que os coletores e o agrupamento exibidos correspondem ao material e região escolhidos.
3. Informe zero ou deixe a quantidade inválida e envie o formulário. Confirme a mensagem de validação e que a etapa não avança.
4. Selecione um coletor, avance por **Confirmar entrega simulada** e confira o resumo, o protocolo `REC-0428` e os avisos de simulação.
5. Use **Fazer outra simulação** para voltar ao estado inicial.

## Resultados das verificações executadas

Verificações executadas neste ambiente:

- `npm run check` — aprovado (ESLint e TypeScript).
- `npm run build` — aprovado com Next.js 16.4.3 e Webpack; a saída inclui `/descarte` renderizada no servidor.
- Smoke test HTTP em `localhost:3000` — não concluído: o sandbox recusou a conexão local e a nova tentativa não recebeu resposta.
- Roteiro manual em celular/navegador — pendente.

O build padrão do Next.js 16 tentou usar Turbopack, mas o processo auxiliar do PostCSS encerrou antes da conexão neste ambiente Windows. `next build --webpack` compilou, passou o TypeScript e gerou as rotas; por isso o script `build` usa Webpack explicitamente. O deploy ainda precisa ser validado no servidor Coolify de destino.

## Coolify com Nixpacks

1. Crie uma aplicação Git e aponte para a raiz deste repositório (`/`).
2. Selecione build strategy **Nixpacks** e tipo **Web Application** (aplicação dinâmica de servidor).
3. Deixe a instalação, build e start apontarem para as fases declaradas em `nixpacks.toml`: `npm ci`, `npm run build` e `npm run start`.
4. Configure a porta interna exposta como `3000`. O script de start inicia o Next.js em `0.0.0.0:3000`; não é necessário publicar essa porta diretamente no host quando o proxy do Coolify estiver configurado.
5. Associe o domínio no Coolify, faça o deploy e confira nos logs que o servidor iniciou na porta `3000`.
6. Aponte o QR Code para `https://SEU-DOMINIO/descarte?origem=folder` após validar o domínio. A URL é ilustrativa até a equipe definir o domínio real.

O runtime está limitado à linha Node.js 22 por `.node-version` e `engines` em `package.json`. O lockfile permite instalação reproduzível com `npm ci`.

Referências: [guia Coolify para Next.js](https://coolify.io/docs/applications/framework-examples/javascript/nextjs), [configuração Nixpacks](https://nixpacks.com/docs/configuration/file) e [deploy via Nixpacks no Coolify](https://coolify.io/docs/applications/builds/nixpacks/deploy).

O Coolify continua oferecendo Nixpacks, embora sua documentação atual o classifique em modo de manutenção e indique Railpack como sucessor em beta. Esta configuração permanece em Nixpacks conforme solicitado; valide a estratégia disponível na versão instalada do Coolify antes do deploy.
