# DECLARACAO_DE_RECURSOS.md — Recursos preexistentes e recursos do MVP

**Projeto:** Hackathon EPPEN — Descarte inteligente e oportunidades de coleta  
**Data:** 31/10/2026  
**Status:** registro para revisão pela equipe antes da entrega.

> **Importante:** este documento diferencia **infraestrutura já disponível**, **recursos previstos mas ainda não confirmados** e **trabalho específico desenvolvido durante o hackathon**. Na apresentação final, declarar apenas os recursos realmente utilizados. O uso de IA como **ferramenta de programação (Codex)** não deve ser confundido com **IA dentro do produto**.

## 1. Recursos de infraestrutura preexistentes

| Recurso preexistente | Finalidade | Origem / licença (verificar versão instalada) | Situação e observações |
|---|---|---|---|
| Starter genérico `hackathon-eppen-starter` | Base de projeto, configuração e componentes de UI genéricos | Estrutura preexistente preparada como suporte; verificar autoria/licenças dos componentes | **Disponível antes do MVP.** Não representa a solução inovadora nem a lógica de negócio |
| Next.js (App Router) | Framework web, rotas e renderização | Vercel / licença MIT (confirmar pacote instalado) | Presente no starter |
| React / React DOM | Biblioteca de interface | Meta e colaboradores / MIT (confirmar pacotes) | Presentes no starter |
| TypeScript | Tipagem estática do projeto | Microsoft / Apache-2.0 (confirmar pacote) | Presente no starter |
| Tailwind CSS e `@tailwindcss/postcss` | Estilos e processamento CSS | Tailwind Labs / MIT (confirmar pacotes) | Presentes no starter |
| Node.js e npm | Ambiente de execução/build e gerenciador de pacotes | Projetos oficiais / verificar licenças e versões instaladas | Ferramentas locais de desenvolvimento; não são funcionalidade do MVP |
| ESLint, `eslint-config-next`, PostCSS e tipos `@types/*` | Verificação, build e suporte de desenvolvimento | Licenças dos respectivos pacotes instalados | Dependências do starter; não são funcionalidades criadas pela equipe |
| Git e VS Code (se utilizados) | Versionamento e edição de código | Distribuições e licenças correspondentes | Ferramentas de desenvolvimento preexistentes, confirmar utilização |
| OpenAI Codex (CLI/extensão, se utilizado) | Assistência para escrita, revisão e testes de código | Ferramenta de IA da OpenAI; termos e condições de uso aplicáveis | **IA de desenvolvimento**, não comprova IA implementada no aplicativo |
| `AGENTS.md` genérico | Orientações reutilizáveis para o Codex | Documento preparado antes do desenvolvimento específico | Instruções de infraestrutura; não contém o núcleo inovador do MVP |

## 2. Recursos previstos para a demonstração e deploy — registrar somente se utilizados

| Recurso previsto | Finalidade | Origem / licença | Como registrar o uso efetivo |
|---|---|---|---|
| Coolify autogerenciado | Hospedagem e implantação do Next.js | Coolify; confirmar versão e licença da instância usada | Anotar se a aplicação foi realmente publicada no servidor |
| Servidor/VPS + proxy HTTPS | Tornar a aplicação acessível em domínio público | Infraestrutura própria ou contratada; verificar serviços | Informar domínio e data de testes, sem expor segredos ou IP privado |
| Nixpacks ou Docker (somente se utilizados) | Build e execução no Coolify | Ferramentas oficiais; verificar licenças | Declarar o método efetivamente escolhido no deploy |
| Gerador de QR Code (Canva, pacote npm ou outro) | Criar o QR Code que aponta à aplicação | Ferramenta escolhida; registrar nome e licença/termos | Informar a ferramenta de geração, sem afirmar integração de QR ao backend |
| Canva (se utilizado) | Cartaz/folder e material visual do pitch | Canva; termos de uso e licenças de elementos empregados | Informar se templates/elementos preexistentes foram utilizados |
| Dados públicos (se incorporados) | Apoio ao contexto e às regras reais de destinação | Identificar **fonte, URL, data da consulta e condição de uso** | Não confundir dados públicos citados no pitch com dados usados no algoritmo |
| Bibliotecas adicionais (se instaladas) | Ex.: ícones, formulários, gráficos ou QR Code | Registrar pacote, versão e licença | Adicionar somente após instalação e uso efetivo |

## 3. Recursos planejados, mas NÃO implementados por padrão

| Possível recurso | Finalidade pretendida | Situação / cuidado na apresentação |
|---|---|---|
| Modelo de visão computacional / IA multimodal | Identificação do tipo de resíduo por fotografia | **Opcional e NÃO presumido como implementado.** Se integrado, registrar fornecedor, modelo, versão, termos, custos e limite de uso; mostrar confirmação manual |
| Banco de dados compartilhado | Persistência de registros entre dispositivos | **Fora do escopo inicial**; fixtures locais não são registros em tempo real |
| Integração de pagamentos ou Pix | Recompensa financeira real após entrega | **Fora do escopo inicial**; nenhuma transferência financeira acontece no MVP |
| APIs de mapas/rotas | Distâncias e logística geográfica reais | **Fora do escopo inicial**; região simplificada não representa roteirização |
| Parcerias com cooperativas, coletores ou comércios | Coletas, ofertas e benefícios reais | **Não presumir parcerias existentes** sem confirmação explícita |

## 4. Dados utilizados no protótipo

| Dado | Origem | Situação |
|---|---|---|
| Materiais (papelão, plástico PET, vidro e alumínio) | Categorias de exemplo do protótipo | Ilustrativos até eventual validação com operadores |
| Gerador da demonstração: 8 kg; dois volumes fictícios: 12 kg e 10 kg de papelão | **Dados sintéticos** | Soma 30 kg apenas no cenário demonstrativo de Osasco · Centro; não reflete pesagens reais |
| Coletores demonstrativos por região e mínimos por material | **Dados sintéticos** | Não representam parceiros ou políticas de operadores reais; exemplo de papelão usa mínimo hipotético de 25 kg |
| Regiões: Osasco · Centro, Presidente Altino, Quitaúna, Vila Yara, Rochdale e Jardim D'Abril; Carapicuíba · Centro; Barueri · Centro | Rótulos de seleção; volumes e cobertura de coletores são fixtures | Sem endereço pessoal, distâncias reais, geolocalização ou agrupamento entre regiões diferentes |
| Valores financeiros, se exibidos | Premissas simuladas explicitamente rotuladas | Não equivalem a cotações reais, pagamento prometido ou ganho comprovado |

**Regra de privacidade:** utilizar apenas dados públicos, sintéticos ou anonimizados. Não coletar/expor dados pessoais ou sigilosos de terceiros na demonstração.

## 5. O que será criação específica da equipe DURANTE o hackathon

Registrar após a implementação (não marcar como concluído antes de verificar):

- [ ] Definição final do problema, público, proposta de valor e diferencial.
- [ ] Fluxo específico `QR Code → cadastro de material → matching → resultado`.
- [ ] Lógica específica de filtragem por material e região.
- [ ] Algoritmo de agrupamento de volumes e elegibilidade por quantidade mínima.
- [ ] Conteúdo, interface, mensagens de erro e justificativas de recomendação.
- [ ] Dados de teste e cenários positivos/negativos preparados pela equipe.
- [ ] Testes, correções e documentação do MVP criado durante o evento.
- [ ] Deploy, QR Code e demonstração pública efetivamente realizados (se concluídos).

**Registro de autoria:** a equipe deve informar os componentes produzidos por seus integrantes e a eventual assistência do Codex. O código gerado ou editado com IA precisa ser revisado e assumido pela equipe.

## 6. Declaração curta sugerida para o pitch

> “O protótipo foi desenvolvido pela equipe durante o hackathon, com infraestrutura genérica preexistente baseada em Next.js, React, TypeScript e Tailwind CSS. Utilizamos [ferramentas efetivamente utilizadas] como apoio ao desenvolvimento e [Coolify, se publicado] na hospedagem. Os geradores, coletores, volumes e eventuais ofertas da demonstração são fictícios. O matching demonstrado usa regras e agrupamento de volumes, não classificação automática por IA, salvo se esse recurso tiver sido realmente implementado e testado.”

**Antes da entrega:** substituir todos os itens condicionais por informações verificadas, conferir versões/licenças em `package.json` e `package-lock.json`, registrar bibliotecas adicionais, descrever o que foi criado durante o evento e remover ferramentas não usadas da declaração final.
