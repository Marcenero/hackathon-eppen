# EPPEN Circular — demonstração de descarte inteligente

MVP demonstrativo em Next.js, TypeScript e Tailwind CSS. A pessoa seleciona material, quantidade e região, encontra coletores compatíveis, visualiza volumes sintéticos agrupados e confirma uma entrega simulada.

## Executar localmente

Requer Node.js 22 e npm.

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000/descarte?origem=folder` para reproduzir o acesso pelo QR Code.

## Verificações

```bash
npm run check
npm run build
npm run start
```

Os resultados e o roteiro manual estão em [`docs/DEPLOY_E_TESTES.md`](docs/DEPLOY_E_TESTES.md).

## Deploy

O projeto inclui `nixpacks.toml` e `.node-version` para build e start via Nixpacks. No Coolify, configure a raiz do repositório como diretório base, escolha **Nixpacks** e defina a porta interna exposta como **3000**. Veja [`docs/DEPLOY_E_TESTES.md`](docs/DEPLOY_E_TESTES.md) para o passo a passo.

## Limites da demonstração

Cobertura de coletores, mínimos e volumes são fixtures sintéticas; não há nomes de parceiros ou distâncias inventadas. O matching usa compatibilidade e região em regras locais; não há geolocalização, persistência, autenticação, serviços externos nem coleta real. O volume potencial agrupado é apenas um indicador operacional de demonstração, não uma métrica de impacto ambiental validada.
