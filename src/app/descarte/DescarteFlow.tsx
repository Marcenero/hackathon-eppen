"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  collectors,
  formatQuantity,
  groupedVolumes,
  materials,
  regions,
  type Collector,
  type MaterialId,
  type RegionId,
} from "@/lib/descarte";

type Step = 1 | 2 | 3;

function MaterialIcon({ icon }: { icon: string }) {
  const paths: Record<string, ReactNode> = {
    box: <><path d="m3.5 7 8.5-4 8.5 4v10L12 21l-8.5-4V7Z" /><path d="m3.8 7.2 8.2 4 8.2-4M12 11.2V21M7.5 5.1l8.6 4.1" /></>,
    bottle: <><path d="M9 3h6M10 3v4l-2 2v10.5A1.5 1.5 0 0 0 9.5 21h5a1.5 1.5 0 0 0 1.5-1.5V9l-2-2V3" /><path d="M8.5 12h7" /></>,
    glass: <><path d="M5 4h14l-1.5 16h-11L5 4Z" /><path d="M6 9h12M9 4V2m6 2V2" /></>,
    drop: <><path d="M12 3s6.5 7.2 6.5 11.2a6.5 6.5 0 0 1-13 0C5.5 10.2 12 3 12 3Z" /><path d="M9 15a3.2 3.2 0 0 0 3 2" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">{paths[icon]}</svg>;
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}><path d="m4 10.5 4 4L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function StepProgress({ step }: { step: Step }) {
  const labels = ["Seu material", "Oportunidade", "Confirmação"];
  return (
    <ol aria-label="Etapas do descarte" className="grid grid-cols-3 gap-2">
      {labels.map((label, index) => {
        const number = index + 1;
        const active = step === number;
        const complete = step > number;
        return (
          <li key={label} className="min-w-0">
            <div className={`mb-2 h-1 rounded-full ${active || complete ? "bg-[#176c5c]" : "bg-[#dfe7e0]"}`} />
            <div className={`flex items-center gap-2 text-[11px] font-semibold sm:text-xs ${active ? "text-[#155d50]" : complete ? "text-[#54776b]" : "text-[#8a9991]"}`}>
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${active ? "bg-[#176c5c] text-white" : complete ? "bg-[#e0eee5] text-[#176c5c]" : "bg-[#edf1ec] text-[#7a8981]"}`}>
                {complete ? <CheckIcon className="h-3.5 w-3.5" /> : number}
              </span>
              <span className="truncate">{label}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function CollectorCard({ collector, chosen, onChoose }: { collector: Collector; chosen: boolean; onChoose: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={chosen}
      onClick={onChoose}
      className={`w-full rounded-2xl border p-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176c5c] ${chosen ? "border-[#176c5c] bg-[#f0f8f3] ring-1 ring-[#176c5c]" : "border-[#e4eae3] bg-white hover:border-[#a8c5b4]"}`}
    >
      <span className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f0e8] text-xs font-bold text-[#286454]">{collector.initials}</span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-start justify-between gap-2">
            <span>
              <span className="block font-semibold text-[#20362e]">{collector.name}</span>
              <span className="mt-1 block text-xs text-[#77847d]">{collector.description}</span>
            </span>
            <span className="rounded-full bg-[#f1f4ef] px-2.5 py-1 text-[11px] font-medium text-[#617169]">{collector.distanceKm.toFixed(1).replace(".", ",")} km</span>
          </span>
          <span className="mt-3 flex items-center justify-between gap-3 border-t border-[#e8eee7] pt-3 text-xs text-[#56665e]">
            <span>{collector.nextWindow}</span>
            <span className={`grid h-5 w-5 place-items-center rounded-full border ${chosen ? "border-[#176c5c] bg-[#176c5c] text-white" : "border-[#cad5cc] text-transparent"}`}><CheckIcon className="h-3.5 w-3.5" /></span>
          </span>
        </span>
      </span>
    </button>
  );
}

export default function DescarteFlow({ origin }: { origin?: "folder" }) {
  const [step, setStep] = useState<Step>(1);
  const [materialId, setMaterialId] = useState<MaterialId>("papelao");
  const [quantity, setQuantity] = useState("4");
  const [regionId, setRegionId] = useState<RegionId>("centro");
  const [selectedCollectorId, setSelectedCollectorId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  const material = materials.find((item) => item.id === materialId) ?? materials[0];
  const region = regions.find((item) => item.id === regionId) ?? regions[0];
  const enteredQuantity = Number(quantity);
  const matches = useMemo(
    () => collectors.filter((collector) => collector.region === regionId && collector.materials.some((item) => item === materialId)),
    [materialId, regionId],
  );
  const chosenCollector = matches.find((collector) => collector.id === selectedCollectorId) ?? matches[0];
  const grouped = groupedVolumes[materialId][regionId];
  const combinedQuantity = grouped.quantity + (Number.isFinite(enteredQuantity) ? enteredQuantity : 0);

  function findCollectors(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!Number.isFinite(enteredQuantity) || enteredQuantity <= 0) {
      setFormError("Informe uma quantidade maior que zero.");
      return;
    }
    if (matches.length === 0) {
      setFormError("Ainda não encontramos um coletor para esta combinação.");
      return;
    }
    setFormError("");
    setSelectedCollectorId(matches[0].id);
    setStep(2);
  }

  function restart() {
    setStep(1);
    setMaterialId("papelao");
    setQuantity("4");
    setRegionId("centro");
    setSelectedCollectorId(null);
    setFormError("");
  }

  return (
    <main className="min-h-screen bg-[#f4f6f1] text-[#20352d]">
      <header className="border-b border-[#e2e9e1] bg-white/80">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-7 lg:px-10">
          <Link href="/" aria-label="EPPEN, página inicial" className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176c5c]">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#176c5c] text-white">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M5 12.2 9.2 16 19 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </span>
            <span className="text-sm font-bold tracking-[.12em] text-[#20352d]">EPPEN <span className="font-medium text-[#839087]">· circular</span></span>
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e4eae3] bg-white px-3 py-1.5 text-[10px] font-bold tracking-[.11em] text-[#607169] sm:text-[11px]"><span className="h-1.5 w-1.5 rounded-full bg-[#c77c40]" /> MODO DEMONSTRAÇÃO</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-7 px-4 pb-12 pt-6 sm:px-7 sm:pt-9 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:px-10 lg:pt-12">
        <section className="min-w-0">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#65756c] hover:text-[#176c5c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176c5c]"><span aria-hidden="true">←</span> Início</Link>
            {origin === "folder" && <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f0e8] px-3 py-1.5 text-[11px] font-medium text-[#436153]"><span aria-hidden="true">▦</span> Acesso pelo QR · Folder</span>}
          </div>

          <div className="mb-8">
            <p className="mb-2 text-[10px] font-bold tracking-[.18em] text-[#568070]">DESCARTE COM DESTINO</p>
            <h1 className="max-w-2xl font-serif text-[35px] leading-[1.1] tracking-[-.04em] text-[#1d332a] sm:text-[43px]">Um bom destino começa com um pequeno passo.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#6c7971]">Conte o que você tem. A gente encontra coletores e junta volumes na sua região.</p>
          </div>

          <div className="rounded-[24px] border border-[#e2e8e0] bg-white p-4 shadow-[0_12px_40px_-35px_rgba(20,50,35,.28)] sm:p-7">
            <StepProgress step={step} />

            {step === 1 && <form className="mt-8" onSubmit={findCollectors}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div><p className="text-xs font-semibold text-[#6c7971]">ETAPA 01</p><h2 className="mt-1 text-xl font-semibold tracking-[-.02em] text-[#20352d]">O que você quer descartar?</h2></div>
                <span className="hidden rounded-full bg-[#f3f6f1] px-3 py-1.5 text-[11px] font-medium text-[#617269] sm:inline-flex">Leva menos de 1 minuto</span>
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-[#33483d]">Escolha um material</legend>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {materials.map((item) => {
                    const selected = materialId === item.id;
                    return <button key={item.id} type="button" aria-pressed={selected} onClick={() => { setMaterialId(item.id); setFormError(""); }} className={`flex min-h-[76px] items-center gap-3 rounded-2xl border p-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176c5c] ${selected ? "border-[#176c5c] bg-[#f0f8f3] ring-1 ring-[#176c5c]" : "border-[#e5ebe4] bg-white hover:border-[#b8cbbb]"}`}>
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${selected ? "bg-[#deeee3] text-[#176c5c]" : "bg-[#f1f4ef] text-[#76857b]"}`}><MaterialIcon icon={item.icon} /></span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#2c4036]">{item.name}</span><span className="mt-1 block text-xs text-[#7d8981]">{item.detail}</span></span>
                      <span className={`h-4 w-4 rounded-full border ${selected ? "border-[5px] border-[#176c5c]" : "border-[#c9d3ca]"}`} />
                    </button>;
                  })}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block text-sm font-semibold text-[#33483d]">Quantidade aproximada</span><span className="flex h-12 items-center rounded-xl border border-[#dfe7df] bg-white focus-within:border-[#176c5c] focus-within:ring-2 focus-within:ring-[#176c5c]/15"><input aria-label={`Quantidade em ${material.unit}`} className="h-full min-w-0 flex-1 rounded-l-xl bg-transparent px-4 text-sm text-[#24382f] outline-none" type="number" inputMode="decimal" min="0.1" step="0.1" value={quantity} onChange={(event) => { setQuantity(event.target.value); setFormError(""); }} /><span className="border-l border-[#e5ebe4] px-4 text-sm text-[#6d7c73]">{material.unit}</span></span></label>
                <label className="block"><span className="mb-2 block text-sm font-semibold text-[#33483d]">Região de coleta</span><span className="relative block"><select className="h-12 w-full appearance-none rounded-xl border border-[#dfe7df] bg-white px-4 pr-10 text-sm text-[#33483d] outline-none focus:border-[#176c5c] focus:ring-2 focus:ring-[#176c5c]/15" value={regionId} onChange={(event) => { setRegionId(event.target.value as RegionId); setFormError(""); }}>{regions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7c73]"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span></label>
              </div>
              <p className="mt-2 text-xs text-[#87928a]">{material.unit === "L" ? "Informe o total aproximado em litros." : "Informe o peso aproximado em quilos."}</p>
              {formError && <p role="alert" className="mt-4 rounded-xl bg-[#fff3ef] px-3 py-2.5 text-sm text-[#9c4d34]">{formError}</p>}
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#edf0eb] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#7c8980]">Sem cadastro e sem compromisso. Só uma simulação.</p>
                <Button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#176c5c] px-5 text-sm shadow-sm hover:bg-[#0f5c4d] sm:w-auto">Encontrar coletores <span aria-hidden="true">→</span></Button>
              </div>
            </form>}

            {step === 2 && <div className="mt-8">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div><p className="text-xs font-semibold text-[#6c7971]">ETAPA 02</p><h2 className="mt-1 text-xl font-semibold tracking-[-.02em] text-[#20352d]">Encontramos uma oportunidade</h2><p className="mt-2 text-sm text-[#728077]">Coletores compatíveis com {material.name.toLowerCase()} em {region.name}.</p></div>
                <button type="button" onClick={() => setStep(1)} className="rounded-lg px-3 py-2 text-xs font-semibold text-[#176c5c] hover:bg-[#f1f6f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176c5c]">Editar dados</button>
              </div>

              <div className="mb-5 rounded-2xl border border-[#cddfd0] bg-[#f0f7ef] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#dfede0] text-[#26705d]"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M4 12.5h16M12 4.5v16M6.5 6.5l11 11m0-11-11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
                  <div className="min-w-0 flex-1"><p className="text-[10px] font-bold tracking-[.14em] text-[#54806c]">AGRUPAMENTO NA SUA REGIÃO</p><p className="mt-1 text-sm font-semibold text-[#284337]">Seu volume se junta ao de outras pessoas</p><p className="mt-1 text-xs leading-5 text-[#6e8075]">Há {grouped.participants} participantes com {formatQuantity(grouped.quantity, material.unit)} de {material.name.toLowerCase()} em {region.name}.</p></div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-white/80 px-3.5 py-3"><span className="text-xs text-[#6e7c73]">Total potencial com sua contribuição</span><strong className="text-sm text-[#24614f]">{formatQuantity(combinedQuantity, material.unit)}</strong></div>
              </div>

              <div className="mb-3 flex items-center justify-between gap-3"><h3 className="text-sm font-semibold text-[#33483d]">Coletores compatíveis</h3><span className="text-xs text-[#859188]">{matches.length} opções</span></div>
              <div className="space-y-2.5">{matches.map((collector) => <CollectorCard key={collector.id} collector={collector} chosen={chosenCollector?.id === collector.id} onChoose={() => setSelectedCollectorId(collector.id)} />)}</div>
              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#edf0eb] pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-[#7c8980]">Agenda e distâncias são ilustrativas.</p><Button type="button" disabled={!chosenCollector} onClick={() => setStep(3)} className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#176c5c] px-5 text-sm hover:bg-[#0f5c4d] sm:w-auto">Continuar com este coletor <span aria-hidden="true">→</span></Button></div>
            </div>}

            {step === 3 && <div className="mt-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e4f1e6] text-[#176c5c]"><CheckIcon className="h-8 w-8" /></div>
              <p className="mt-5 text-xs font-bold tracking-[.15em] text-[#58806e]">ETAPA 03 · SIMULAÇÃO CONCLUÍDA</p>
              <h2 className="mt-2 font-serif text-3xl tracking-[-.04em] text-[#20352d]">Boa escolha. Seu material ganhou um destino.</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#718077]">A entrega foi registrada apenas nesta demonstração. Nenhuma coleta real foi agendada.</p>
              <div className="mx-auto mt-7 max-w-md rounded-2xl border border-[#e2e9e1] bg-[#f8faf7] p-5 text-left">
                <div className="flex items-center justify-between border-b border-[#e7ece6] pb-4"><span className="text-xs text-[#79867e]">PROTOCOLO DEMONSTRATIVO</span><span className="rounded-full bg-[#e7f1e8] px-2.5 py-1 text-[10px] font-bold text-[#366e58]">SIMULADO</span></div>
                <p className="py-3 text-lg font-bold tracking-[.08em] text-[#2e5543]">REC-0428</p>
                <dl className="grid grid-cols-[1fr_auto] gap-y-2.5 text-sm"><dt className="text-[#7b8880]">Material</dt><dd className="text-right font-medium text-[#354a3e]">{material.name}</dd><dt className="text-[#7b8880]">Quantidade</dt><dd className="text-right font-medium text-[#354a3e]">{formatQuantity(enteredQuantity, material.unit)}</dd><dt className="text-[#7b8880]">Região</dt><dd className="text-right font-medium text-[#354a3e]">{region.name}</dd><dt className="text-[#7b8880]">Coletor</dt><dd className="text-right font-medium text-[#354a3e]">{chosenCollector?.name ?? "—"}</dd></dl>
              </div>
              <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center"><Button type="button" onClick={restart} className="min-h-12 rounded-xl bg-[#176c5c] px-5 text-sm hover:bg-[#0f5c4d]">Fazer outra simulação</Button><Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#dce5dc] bg-white px-5 text-sm font-semibold text-[#42584b] hover:bg-[#f5f8f3]">Voltar ao início</Link></div>
            </div>}
          </div>

          <p className="mt-4 flex items-start gap-2 px-1 text-[11px] leading-5 text-[#849087]"><span aria-hidden="true" className="mt-0.5 text-[#58806e]">ⓘ</span><span>Esta é uma experiência de demonstração com dados sintéticos. Os coletores, volumes, distâncias e horários não representam serviços reais.</span></p>
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-8 overflow-hidden rounded-[24px] border border-[#e1e8df] bg-white">
            <div className="relative h-48 overflow-hidden bg-[#dfece0]">
              <div aria-hidden="true" className="absolute inset-0 opacity-80" style={{ backgroundImage: "radial-gradient(ellipse at 20% 35%, transparent 0 17%, #c6dcc9 17.5% 18%, transparent 18.5%), radial-gradient(ellipse at 80% 65%, transparent 0 20%, #bfd7c2 20.5% 21%, transparent 21.5%), linear-gradient(28deg, transparent 47%, #f7faf5 47.5% 49%, transparent 49.5%), linear-gradient(115deg, transparent 58%, #f7faf5 58.5% 60%, transparent 60.5%)" }} />
              <span className="absolute left-[48%] top-[37%] grid h-11 w-11 place-items-center rounded-full border-[5px] border-white bg-[#176c5c] text-white shadow-lg"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.6" /></svg></span>
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#476050]">MAPA ILUSTRATIVO</span>
            </div>
            <div className="p-5"><p className="text-[10px] font-bold tracking-[.14em] text-[#738178]">COMO FUNCIONA</p><div className="mt-4 space-y-4">{[["01", "Escolha material e quantidade", "Conte o que você tem para encaminhar."], ["02", "Veja a combinação local", "Volumes da mesma região podem ser agrupados."], ["03", "Confirme a simulação", "Confira o resumo fictício da entrega."]].map(([number, title, detail]) => <div key={number} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f0f4ef] text-[10px] font-bold text-[#668071]">{number}</span><span><strong className="block text-xs text-[#34483c]">{title}</strong><span className="mt-1 block text-[11px] leading-4 text-[#829087]">{detail}</span></span></div>)}</div>
              <div className="mt-5 rounded-xl bg-[#f3f7f2] p-3.5"><p className="text-[10px] font-bold tracking-[.1em] text-[#58806e]">DADOS DA DEMONSTRAÇÃO</p><p className="mt-1.5 text-[11px] leading-5 text-[#78867c]">Regras locais de compatibilidade · volumes sintéticos · sem geolocalização</p></div>
            </div>
          </div>
        </aside>
      </div>

      <footer className="border-t border-[#e2e9e1] bg-white/60"><div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-[10px] text-[#8a968e] sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10"><span>HACKATHON EPPEN · protótipo demonstrativo</span><span>Dados sintéticos · sem agendamento ou coleta real</span></div></footer>
    </main>
  );
}
