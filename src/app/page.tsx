import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EPPEN Circular | Transformando resíduos em oportunidades",
  description: "Demonstração de matching entre descartadores de recicláveis e coletores compatíveis, com agrupamento por região.",
};

const steps = [
  { number: "01", title: "Informar", description: "Escolha o material, indique a quantidade e selecione o bairro ou centro." },
  { number: "02", title: "Agrupar", description: "Volumes do mesmo material e da mesma região podem formar uma oportunidade." },
  { number: "03", title: "Conectar", description: "Confira o coletor demonstrativo compatível e o mínimo de volume exigido." },
];

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function StackIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-7 w-7"><path d="m4 10 12-6 12 6-12 6-12-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="m4 16 12 6 12-6M4 22l12 6 12-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>;
}

export default function HomePage() {
  return <main className="overflow-hidden bg-[#f5f6f0] text-[#20352d]">
    <header className="relative z-10 border-b border-white/10 bg-[#123c32] text-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="EPPEN Circular, início" className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8edaa]">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#d6e9a4] text-[#123c32]"><StackIcon /></span>
          <span className="text-xs font-bold tracking-[.14em]">EPPEN <span className="font-medium text-[#bdd1c2]">CIRCULAR</span></span>
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 text-xs font-medium text-[#d4e1d6] md:flex">
          <a href="#problema" className="transition-colors hover:text-white">O problema</a>
          <a href="#como-funciona" className="transition-colors hover:text-white">Como funciona</a>
          <a href="#diferencial" className="transition-colors hover:text-white">Nosso diferencial</a>
        </nav>
        <Link href="/descarte?origem=landing" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#d6e9a4] px-4 text-xs font-bold text-[#183c31] transition-colors hover:bg-[#e4f2c1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6e9a4] sm:px-5">Simular descarte <span aria-hidden="true">↗</span></Link>
      </div>
    </header>

    <section aria-labelledby="hero-title" className="relative isolate bg-[#123c32] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[580px] w-[580px] rounded-full border border-[#d6e9a4]/10 sm:right-[-100px] sm:top-[-280px] sm:h-[780px] sm:w-[780px]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-55px] top-[-160px] -z-10 h-[470px] w-[470px] rounded-full border border-[#d6e9a4]/10 sm:right-[-40px] sm:top-[-230px] sm:h-[640px] sm:w-[640px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:px-12 lg:pb-24 lg:pt-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-[10px] font-bold tracking-[.15em] text-[#c7d8c9]"><span className="h-1.5 w-1.5 rounded-full bg-[#d6e9a4]" /> DESCARTE INTELIGENTE · OSASCO E REGIÃO</p>
          <h1 id="hero-title" className="max-w-3xl font-serif text-[43px] font-normal leading-[1.05] tracking-[-.055em] sm:text-6xl lg:text-[72px]">Transformando resíduos em <span className="text-[#d6e9a4]">oportunidades.</span></h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#cfddd1] sm:text-base sm:leading-8">Conectamos quem descarta recicláveis a coletores compatíveis e revelamos quando volumes da mesma região podem se juntar.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/descarte?origem=landing" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#d6e9a4] px-5 text-sm font-bold text-[#183c31] transition-colors hover:bg-[#e3f0c2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6e9a4]">Simular descarte <ArrowIcon /></Link>
            <a href="#como-funciona" className="inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-sm font-semibold text-[#e0e9e0] transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Conhecer a proposta <span aria-hidden="true" className="ml-2">↓</span></a>
          </div>
          <p className="mt-7 flex items-start gap-2 text-[11px] leading-5 text-[#a9c0b2]"><span aria-hidden="true" className="mt-px text-[#d6e9a4]">ⓘ</span><span>Protótipo com dados fictícios. Não há coletas ou pagamentos reais.</span></p>
        </div>

        <div className="relative mx-auto w-full max-w-[530px] rounded-[26px] border border-white/10 bg-[#f9faf5] p-4 text-[#20352d] shadow-[0_30px_90px_-35px_rgba(0,0,0,.55)] sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-[#e8ece4] pb-4">
            <div><p className="text-[10px] font-bold tracking-[.14em] text-[#668172]">EXEMPLO DE AGRUPAMENTO</p><p className="mt-1 text-sm font-semibold">Papelão · Osasco, Centro</p></div>
            <span className="shrink-0 rounded-full bg-[#eff4e8] px-3 py-1.5 text-[9px] font-bold tracking-[.08em] text-[#57705d]">SINTÉTICO</span>
          </div>
          <div className="mt-5 space-y-3">
            {[{ label: "Seu volume", quantity: "8 kg", width: "27%", color: "bg-[#7da98a]" }, { label: "Gerador B · fictício", quantity: "12 kg", width: "40%", color: "bg-[#4f896c]" }, { label: "Gerador C · fictício", quantity: "10 kg", width: "33%", color: "bg-[#2c7058]" }].map((item) => <div key={item.label} className="flex items-center gap-3"><span className="w-[126px] shrink-0 text-[11px] text-[#63746a]">{item.label}</span><div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e9eee7]"><div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }} /></div><strong className="w-12 text-right text-xs text-[#30473a]">{item.quantity}</strong></div>)}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#eaf2e8] px-4 py-4 sm:px-5"><div><p className="text-[10px] font-bold tracking-[.1em] text-[#5e7866]">VOLUME AGRUPADO</p><p className="mt-1 text-[11px] text-[#718178]">mesmo material · mesma região</p></div><strong className="font-serif text-3xl tracking-[-.04em] text-[#225b45]">30 <span className="font-sans text-sm font-semibold">kg</span></strong></div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-[#77847b]"><span>Mínimo fictício do cenário: 25 kg</span><span className="font-bold text-[#4e765c]">ACIMA DO LIMITE · +5 kg</span></div>
          <div className="mt-4 flex items-center gap-2 border-t border-[#e8ece4] pt-4 text-[10px] leading-4 text-[#77847b]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f0f3ed] text-[#698170]">i</span><span>Exemplo de regra determinística. Não representa oferta ou coleta real.</span></div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-6 sm:px-8 lg:px-12"><span className="text-[9px] font-bold tracking-[.16em] text-[#9ab4a2]">UMA DEMONSTRAÇÃO DE AGRUPAMENTO REGIONAL</span></div>
    </section>

    <section id="problema" aria-labelledby="problem-title" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-12 lg:py-24">
      <div><p className="text-[10px] font-bold tracking-[.16em] text-[#568070]">O PROBLEMA</p><h2 id="problem-title" className="mt-4 max-w-md font-serif text-3xl font-normal leading-tight tracking-[-.04em] text-[#20352d] sm:text-4xl">Volumes pequenos podem dificultar uma coleta viável.</h2></div>
      <div className="max-w-2xl lg:pt-7"><p className="text-base leading-7 text-[#5f7066]">Condomínios e pequenos comércios podem acumular recicláveis sem saber quais coletores aceitam cada material ou qual quantidade torna a retirada interessante.</p><p className="mt-4 text-sm leading-6 text-[#7a877e]">Nossa proposta explora uma hipótese: volumes separados, quando são do mesmo material e da mesma região, podem formar uma oportunidade que não aparecia para cada gerador individual. Essa hipótese ainda precisa ser validada com operadores reais.</p></div>
    </section>

    <section id="como-funciona" aria-labelledby="steps-title" className="bg-[#e9eee5]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold tracking-[.16em] text-[#568070]">COMO FUNCIONA</p><h2 id="steps-title" className="mt-3 font-serif text-3xl font-normal tracking-[-.04em] text-[#20352d] sm:text-4xl">Três passos para encontrar o próximo destino.</h2></div><p className="max-w-sm text-sm leading-6 text-[#718077]">Uma experiência direta para conferir compatibilidade e potencial de agrupamento.</p></div>
        <div className="mt-9 grid gap-3 md:grid-cols-3">
          {steps.map((step) => <article key={step.number} className="rounded-2xl border border-[#d9e2d8] bg-[#f8faf6] p-5 sm:p-6"><span className="text-xs font-bold tracking-[.12em] text-[#6b8876]">{step.number}</span><h3 className="mt-7 text-lg font-semibold text-[#294135]">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#718077]">{step.description}</p></article>)}
        </div>
      </div>
    </section>

    <section id="diferencial" aria-labelledby="difference-title" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-12 lg:py-24">
      <div><p className="text-[10px] font-bold tracking-[.16em] text-[#568070]">O DIFERENCIAL</p><h2 id="difference-title" className="mt-4 max-w-lg font-serif text-3xl font-normal leading-tight tracking-[-.04em] text-[#20352d] sm:text-4xl">Matching econômico-logístico com contexto local.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-[#718077]">A regra combina material aceito, bairro/centro selecionado e mínimo de volume do cenário. Regiões diferentes permanecem separadas, mesmo quando ficam em municípios vizinhos.</p></div>
      <div className="rounded-2xl border border-[#e1e8df] bg-white p-5 sm:p-7"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf4ea] text-[#397056]"><StackIcon /></span><div><p className="text-sm font-semibold text-[#30483a]">Agrupamento regional</p><p className="mt-1 text-xs text-[#849087]">Regras determinísticas · dados sintéticos</p></div></div><div className="mt-5 grid grid-cols-[1fr_auto] gap-y-3 border-t border-[#edf0eb] pt-5 text-sm"><span className="text-[#728077]">Material</span><span className="font-medium text-[#33483d]">igual</span><span className="text-[#728077]">Região selecionada</span><span className="font-medium text-[#33483d]">igual</span><span className="text-[#728077]">Quantidade agrupada</span><span className="font-medium text-[#33483d]">≥ mínimo fictício</span></div><p className="mt-5 rounded-xl bg-[#f5f7f2] p-3.5 text-xs leading-5 text-[#78867c]">O resultado identifica uma oportunidade no protótipo. Não calcula rota, preço, economia ou emissões reais.</p></div>
    </section>

    <section aria-labelledby="try-title" className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-[26px] bg-[#123c32] px-6 py-8 text-white sm:px-9 sm:py-10 lg:flex-row lg:items-center lg:px-12 lg:py-12">
        <div><p className="text-[10px] font-bold tracking-[.16em] text-[#bdd1c2]">EXPERIMENTE A SIMULAÇÃO</p><h2 id="try-title" className="mt-3 max-w-2xl font-serif text-3xl font-normal leading-tight tracking-[-.04em] sm:text-4xl">Veja como volumes próximos podem se juntar.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#c8d8cb]">Use os dados de exemplo e explore resultados elegíveis, insuficientes e sem coletor compatível.</p></div>
        <Link href="/descarte?origem=landing" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-[#d6e9a4] px-5 text-sm font-bold text-[#183c31] transition-colors hover:bg-[#e3f0c2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6e9a4]">Simular descarte <ArrowIcon /></Link>
      </div>
      <p className="mx-auto mt-5 max-w-7xl text-center text-[11px] leading-5 text-[#7e8980]">Este protótipo usa dados sintéticos e regras automatizadas. Não há IA de análise por imagem, coletas ou pagamentos reais.</p>
    </section>

    <footer className="border-t border-[#dfe5dc] bg-[#f0f2eb]"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-[10px] text-[#79867c] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><Link href="/" className="font-bold tracking-[.14em] text-[#3d5948]">EPPEN CIRCULAR</Link><span>Protótipo demonstrativo · Osasco e municípios do entorno</span><span>Sem coleta ou pagamento real</span></div></footer>
  </main>;
}
