# Build, testes e deploy no Coolify

## Escopo demonstrativo

O fluxo principal é uma experiência em três etapas na rota `/descarte`: escolher material, quantidade e região; ver coletores compatíveis e volumes agrupados na mesma região; confirmar uma entrega simulada.

Materiais, cobertura de coletores, mínimos e volumes são dados sintéticos. A interface não inventa parceiros, distâncias ou horários reais. O matching é local: filtra coletores pela região e pelo material aceito. O volume total mostrado soma a quantidade digitada aos registros fictícios da combinação selecionada. Nenhum agendamento ou coleta é criado. O indicador exibido é apenas volume operacional potencialmente agrupado; o impacto socioambiental não foi validado pela equipe e não é calculado.

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

1. Abra `/` e confirme o hero, a explicação do problema, as etapas **informar / agrupar / conectar**, o diferencial regional, o aviso de simulação e o CTA `Simular descarte`.
2. Use `/descarte?origem=landing` pelo CTA e `/descarte?origem=folder` pelo QR. Confirme que a origem muda e que o fluxo em três etapas funciona em um celular/viewport estreito, sem rolagem horizontal.
3. Escolha Papelão, `8 kg`, `Osasco · Centro`. O cenário sintético deve somar `8 + 12 + 10 = 30 kg`, mostrar mínimo fictício de `25 kg` e oferecer confirmação simulada.
4. No mesmo cenário, altere a quantidade para `1 kg`. O total deve ser `23 kg`, informar insuficiência e ocultar a confirmação.
5. Selecione Alumínio e `Barueri · Centro`. Deve informar que não há coletor compatível; não deve buscar coletor em outro município.
6. Confirme também que Osasco · Centro, Carapicuíba · Centro e Barueri · Centro são três opções distintas, sem mistura automática de volumes.
7. Informe zero e envie o formulário. Confirme a mensagem de validação e que a etapa não avança.
8. Conclua o cenário elegível e confira o protocolo `REC-0428`, o resumo e o aviso de que não há coleta ou pagamento real.

## Resultados das verificações executadas

Verificações executadas neste ambiente:

- `npm run check` — aprovado (ESLint e TypeScript).
- `npm run build` — aprovado com Next.js 16.4.3 e Webpack; a saída inclui `/descarte` renderizada no servidor.
- Navegador a 375 px CSS — landing e fluxo sem overflow horizontal; CTA levou a `/descarte?origem=landing` e o QR foi conferido em `/descarte?origem=folder`.
- Fluxo móvel — aprovados os resultados de 30 kg (8 + 12 + 10, mínimo 25), insuficiente (1 + 12 + 10 = 23), ausência de coletor (Alumínio em Barueri · Centro) e confirmação simulada `REC-0428`.
- Deploy em Coolify e acesso por aparelho físico/4G — pendentes; não há instância/domínio de deploy configurados nesta execução.

O build padrão do Next.js 16 tentou usar Turbopack, mas o processo auxiliar do PostCSS encerrou antes da conexão neste ambiente Windows. `next build --webpack` compilou, passou o TypeScript e gerou as rotas; por isso o script `build` usa Webpack explicitamente. O deploy ainda precisa ser validado no servidor Coolify de destino.

## Matching e fixtures

As regiões configuradas são Osasco · Centro, Presidente Altino, Quitaúna, Vila Yara, Rochdale e Jardim D'Abril; Carapicuíba · Centro; e Barueri · Centro. Cada opção tem um ID distinto. Os fixtures são indexados por material e ID exato da região. O exemplo positivo usa Papelão em Osasco · Centro (8 kg informados + 12 kg + 10 kg sintéticos) e um mínimo demonstrativo de 25 kg. Os cenários negativos reproduzíveis são 1 kg de Papelão em Osasco · Centro (23 kg totais) e Alumínio em Barueri · Centro (sem coletor fixture).

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
