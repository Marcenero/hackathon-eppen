# BRIEF_MVP.md — Descarte inteligente e oportunidades de coleta

**Projeto:** Hackathon EPPEN — Transformação Digital e Sustentabilidade  
**Região de referência:** Osasco, Carapicuíba e Barueri  
**Data:** 31/10/2026  
**Status:** **escopo proposto com base nas discussões e no Lean Canvas; confirmar com a equipe antes da implementação.**  
**Responsável pela aprovação:** equipe do hackathon (a definir)

> **Integridade da apresentação:** a infraestrutura genérica pode ser preexistente, mas a lógica específica e o protótipo devem ser concebidos/desenvolvidos durante o evento. Diferenciar código implementado, dados sintéticos, simulações e funcionalidades futuras. Não apresentar recompensa financeira, coleta ou classificação por IA como reais se não estiverem efetivamente integradas e validadas.

## 1. Problema e contexto

Pequenos geradores de recicláveis — inicialmente **condomínios e pequenos comércios** — podem ter dificuldades para identificar operadores compatíveis com seus resíduos, conhecer as condições de recebimento e atingir quantidades mínimas que tornem a retirada interessante. Do outro lado, cooperativas e coletores podem gastar tempo prospectando materiais cujo volume, localização ou tipo não atende às suas condições operacionais.

**Hipóteses a validar (não são fatos comprovados):**
- Pequenos volumes individuais dificultam a viabilidade econômica de algumas retiradas.
- A reunião de volumes próximos, do mesmo material, pode gerar novas oportunidades de coleta.
- Transparência de condições e eventual valor negociado aumenta o interesse em destinar corretamente.
- QR Codes em materiais físicos podem reduzir a barreira de acesso para alguns usuários.

**Alternativas existentes:** coleta seletiva municipal, ecopontos, cooperativas, contatos diretos e aplicativos de intermediação. Comparar o diferencial do projeto com alternativas como o Cataki sem afirmar exclusividade não demonstrada.

## 2. Público-alvo e proposta de valor

- **Usuário prioritário no piloto:** representante de condomínio ou pequeno comércio com recicláveis secos acumulados.
- **Outro lado da plataforma:** cooperativas, catadores organizados e empresas coletoras interessadas em materiais e volumes compatíveis.
- **Atores futuros:** moradores individuais, associações, outras instituições e operadores de resíduos com exigências específicas.

**Proposta de valor a testar:** *facilitar a destinação de recicláveis secos, conectando geradores a coletores compatíveis e identificando oportunidades de coleta agrupada, com critérios e eventuais condições econômicas transparentes.*

**Diferencial demonstrável no MVP:** não apenas listar coletores: **verificar requisitos de coleta e agregar volumes da mesma região/material para identificar quando uma operação passa a atender ao mínimo declarado por um operador.** A viabilidade econômica final depende também de rota, custos e negociação real.

## 3. Funcionalidade central e jornada do usuário

**Jornada demonstrativa em até três etapas/telas:**

1. **Entrada e cadastro:** a pessoa escaneia um QR Code de cartaz/folder e abre `https://DOMINIO_REAL/descarte?origem=folder`. Seleciona **material**, **quantidade (kg)** e **região/bairro**. Seleção manual obrigatória; foto/IA não são requisito da primeira versão.
2. **Matching e agrupamento:** o sistema confere aceitação do material, região atendida e volume mínimo dos coletores sintéticos. Se o volume individual for insuficiente, reúne **registros sintéticos compatíveis** da mesma região e material. Exibe total agrupado e motivo da elegibilidade ou inelegibilidade.
3. **Resultado:** apresenta uma **oportunidade simulada de coleta**, com operador fictício, condições de recebimento e explicação da recomendação. Pode exibir uma **confirmação demonstrativa** de entrega, se houver tempo; não há coleta nem pagamento reais.

**Regra de experiência:** sempre mostrar uma resposta compreensível, inclusive quando **não houver** coletor compatível ou volume suficiente; não prometer ganhos garantidos.

## 4. Escopo mínimo obrigatório (MVP)

- Interface mobile-first, em português, funcional por navegador sem instalar aplicativo e sem login.
- Rota pública `/descarte` com parâmetro opcional `origem=folder` para o QR Code.
- Formulário com categoria de reciclável seco (por exemplo: papelão, PET, alumínio), quantidade positiva em kg e região selecionada.
- Dados sintéticos locais de geradores e coletores, claramente rotulados como **fictícios**.
- Regras determinísticas para: compatibilidade de material, região/área atendida, limite mínimo por operador e agrupamento de volumes do mesmo material na mesma região.
- Resultado explicado: volume individual, volume agrupado, limite exigido, coletor elegível ou motivo para não haver correspondência.
- Demonstração reproduzível e responsiva, capaz de funcionar em um celular pelo domínio HTTPS quando o deploy estiver disponível.

### Prioridades opcionais, apenas após o fluxo central funcionar

- Comparação de **ofertas demonstrativas** dos coletores e simulação de valor potencial, com premissas explícitas.
- Tela/estado de confirmação **simulada** da entrega; impedir confirmação duplicada na mesma sessão.
- Geração do QR Code definitivo e telemetria simples **sem dados pessoais**, se aprovada e implementada.
- **Reconhecimento do material por imagem com IA:** apenas se houver tempo, serviço apropriado, custo/conectividade aceitáveis e verificação humana. Se não existir implementação real, apresentar como **próximo passo**, não como funcionalidade do MVP.

### Fora do MVP

- Pagamento Pix, cashback, saldo sacável, vouchers de valor real ou repasses financeiros.
- Cadastro/login de usuários e operadores, banco de dados remoto, operação simultânea persistente entre celulares.
- Agendamento e execução reais de retirada; otimização real de rotas ou rastreabilidade certificada.
- Uso obrigatório de câmera, IA generativa, geolocalização precisa, serviços pagos e integração com ecopontos/cooperativas reais.
- Resíduos perigosos, de saúde ou orgânicos que exijam tratamento/infraestrutura específicos.

## 5. Dados para demonstração — TODOS SINTÉTICOS

Usar valores de exemplo e identificar sua origem fictícia na interface.

| Registro | Material | Volume | Região | Finalidade |
|---|---|---:|---|---|
| Gerador A (usuário da demonstração) | Papelão | 8 kg | Osasco · Centro | Volume individual |
| Gerador B (fictício) | Papelão | 12 kg | Osasco · Centro | Agrupamento |
| Gerador C (fictício) | Papelão | 10 kg | Osasco · Centro | Agrupamento |
| Coletor demonstrativo A (fictício) | Aceita papelão | Mínimo 25 kg | Atende Osasco · Centro | Verificação de elegibilidade |

**Resultado esperado:** 8 + 12 + 10 = **30 kg**, acima do mínimo **hipotético** de 25 kg. O resultado é **"oportunidade de coleta identificada"**, NÃO "coleta agendada" ou "rentabilidade comprovada".

Criar também um cenário negativo: material não aceito, região não atendida **ou** volume agrupado abaixo do limite. Não usar nomes ou endereços reais sem motivo e autorização adequada.

## 6. Regras de negócio e algoritmo (versão 1)

1. Validar entrada: material selecionado; quantidade maior que zero; região informada.
2. Selecionar registros cuja **categoria e região** sejam iguais às do cadastro. A compatibilidade geográfica é simplificada por região declarada, não por cálculo de trajetos.
3. Somar quantidades elegíveis, sem duplicar o registro atual ou outros IDs.
4. Para cada coletor fictício: exigir aceitação do material, atendimento à região e `volume_agrupado >= volume_minimo`.
5. Exibir todas as alternativas elegíveis ou escolher uma e justificar o critério escolhido. Se existir **preço sintético**, tratá-lo como *condição ilustrativa*, nunca garantia de ganho.
6. Caso nenhum coletor atenda aos critérios, explicar qual condição falhou e sugerir que o registro aguarde novos volumes **apenas como hipótese de operação futura**; não prometer monitoramento real sem persistência.

**Nota técnica:** um algoritmo com regras determinísticas pode ser chamado de *matching automatizado*, mas **não é classificação por IA**. Se a equipe optar por inserir IA para classificação por foto, manter a confirmação manual do resultado.

## 7. Arquitetura e infraestrutura

- **Frontend:** Next.js (App Router), React, TypeScript e Tailwind CSS, aproveitando o starter genérico existente.
- **Lógica:** funções TypeScript locais e puras para filtros, somas, critérios de elegibilidade e explicação do matching.
- **Dados:** fixtures JSON/TS locais, sem persistência real no primeiro MVP.
- **Acesso:** QR Code gerado **somente após** definir/testar a URL pública; parâmetro `origem=folder` identifica a entrada pelo folder, sem alegar rastreamento real.
- **Hospedagem:** Coolify autogerenciado como opção de deploy, com aplicação exposta via domínio **HTTPS público**. Utilizar build/configuração compatíveis com o projeto existente; testar acesso pelo celular fora da rede Wi-Fi do servidor.
- **Plano de contingência:** `npm run dev` local e breve captura/gravação da demonstração caso a hospedagem ou a internet falhe.

**Atenção:** sem banco de dados, cada visitante vê o **mesmo cenário de teste**; não existe sincronização real de cadastros entre celulares. Não apresentar o agrupamento como dados gerados em tempo real por outros usuários.

## 8. Critérios de aceite / testes

- [ ] `npm run check` e `npm run build` executados sem erros impeditivos (registrar se não puderem ser executados).
- [ ] QR Code aponta para a **URL pública real** e abre o fluxo em um celular no 4G/5G.
- [ ] Usuário consegue registrar material, volume e região sem login.
- [ ] Cenário positivo mostra **8 kg + 12 kg + 10 kg = 30 kg** e elegibilidade perante limite fictício de **25 kg**.
- [ ] Cenário negativo não inventa coletor compatível ou recompensa.
- [ ] Interface exibe **"Demonstração com dados fictícios"** em local visível.
- [ ] O sistema mostra as razões do matching e do agrupamento.
- [ ] Não há dependência obrigatória de IA, pagamentos, câmera ou API externa.
- [ ] A demonstração cabe em aproximadamente **30–45 segundos** e há plano B em caso de falha de rede.

## 9. Indicadores para o Lean Canvas e piloto futuro

**No protótipo (somente testes):** casos de matching elegíveis/inelegíveis; tempo para completar o fluxo; compreensão da recomendação; volume **potencial** agrupado em dados sintéticos.

**Em piloto real futuro (a validar):** kg **efetivamente** coletados; taxa de coletas concluídas; tempo até confirmação; custo logístico por coleta; valor líquido por transação; satisfação de descartadores e coletores; adesão e retenção de parceiros.

Não chamar volume potencial de material efetivamente recuperado, nem estimar redução de emissões sem método e dados adequados.

## 10. Sustentação e riscos de negócio

**Hipótese atual no Lean Canvas:** assinatura anual dos coletores. **Ainda não validada.** Comparar também com acesso gratuito no piloto e serviços B2B pagos posteriormente. Evitar pressupor cobrança de cooperativas ou retirada de sua remuneração.

**Riscos principais:** volume insuficiente; custos logísticos superiores ao valor do material; baixa adesão de coletores; dados desatualizados; ofertas não confirmadas; dificuldade de validar material; necessidade de parcerias reais; promessas indevidas de recompensa.

**Mitigações no piloto:** escolher poucos materiais secos, um território delimitado, operadores convidados e regras explícitas de condições mínimas; validar coleta e financiamento antes de prometer retorno financeiro.

## 11. Roteiro da demonstração para o pitch

> “O morador encontra nosso QR Code, abre o aplicativo e informa 8 kg de papelão. Sozinho, esse volume não atende ao mínimo de um coletor do nosso cenário demonstrativo. A plataforma identifica outros 22 kg de papelão da mesma região, totalizando 30 kg, e mostra uma oportunidade de coleta que atende ao limite fictício de 25 kg. Nosso diferencial não é apenas localizar um coletor, mas identificar quando volumes separados podem formar uma operação mais viável. Os dados são simulados; a validação com cooperativas é nosso próximo passo.”

## 12. Decisões pendentes para a equipe confirmar

- [ ] Materiais e região efetivamente escolhidos para a demonstração.
- [ ] Público prioritário: condomínios, comércios ou ambos.
- [ ] Se o MVP mostra apenas **matching/agrupamento**, ou também **oferta ilustrativa** e **confirmação simulada**.
- [ ] Quem definiria preços, quantidades mínimas e a validação da entrega num piloto real.
- [ ] Se a classificação por IA será realmente implementada ou apresentada como evolução futura.
- [ ] URL definitiva do Coolify, disponibilidade pública e QR Code funcional.
- [ ] Aprovação final da equipe sobre o escopo e autoria do código desenvolvido no evento.

---

**Registro de originalidade:** listar em `docs/DECLARACAO_DE_RECURSOS.md` os recursos preexistentes *efetivamente usados*, com origem/licença; registrar separadamente o código e o conteúdo específico criados durante o evento.
