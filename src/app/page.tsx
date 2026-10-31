const etapas = [
  {
    numero: "01",
    titulo: "Entendam o contexto",
    descricao: "Conversem com as pessoas envolvidas e delimitem um problema real.",
    detalhe: "IMERSÃO",
  },
  {
    numero: "02",
    titulo: "Escolham um recorte",
    descricao: "Definam em equipe uma funcionalidade pequena que vale demonstrar.",
    detalhe: "IDEAÇÃO",
  },
  {
    numero: "03",
    titulo: "Construam e validem",
    descricao: "Implementem o fluxo principal e expliquem como observar seu impacto.",
    detalhe: "PROTÓTIPO",
  },
];

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M12 2.75 14.2 9.8l7.05 2.2-7.05 2.2L12 21.25 9.8 14.2l-7.05-2.2 7.05-2.2L12 2.75Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m19 2 .65 2.1L21.75 4.75l-2.1.65L19 7.5l-.65-2.1-2.1-.65 2.1-.65L19 2Z" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a aria-label="Hackathon EPPEN, início" className="brand" href="#inicio">
          <span className="brand-mark"><SparkIcon /></span>
          <span className="brand-name">HACKATHON <span>EPPEN</span></span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> KIT DE PROTOTIPAGEM</div>
      </header>

      <section aria-labelledby="hero-title" className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> PONTO DE PARTIDA</p>
          <h1 id="hero-title">Toda boa solução começa com <em>uma pergunta.</em></h1>
          <p className="hero-description">
            Este espaço prepara a equipe para transformar uma descoberta em protótipo.
            A ideia é de vocês — o brief continua em aberto até a imersão e a ideação.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#como-comecar">Conhecer o fluxo <span aria-hidden="true">↘</span></a>
            <a className="text-link" href="#guia">Como usar esta base <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-footnote"><span className="footnote-line" /> Nenhum problema ou produto foi pré-definido.</div>
        </div>

        <div aria-label="Prévia do kit: estrutura técnica pronta, brief ainda em aberto" className="workspace-card" role="img">
          <div className="workspace-topline">
            <span className="workspace-label">ÁREA DE TRABALHO</span>
            <span className="workspace-dots"><i /><i /><i /></span>
          </div>
          <div className="workspace-title">Seu espaço de criação<span className="cursor-mark">|</span></div>
          <p className="workspace-subtitle">O ponto de partida da equipe, pronto para receber uma ideia.</p>

          <div className="workspace-list">
            <div className="workspace-row">
              <span className="row-icon icon-ready" aria-hidden="true">✓</span>
              <span className="row-copy"><strong>Estrutura técnica</strong><small>Next.js · TypeScript · Tailwind</small></span>
              <span className="row-state">PRONTA</span>
            </div>
            <div className="workspace-row">
              <span className="row-icon icon-open" aria-hidden="true">↗</span>
              <span className="row-copy"><strong>Brief do MVP</strong><small>Aguardando decisões da equipe</small></span>
              <span className="row-state state-open">EM ABERTO</span>
            </div>
            <div className="workspace-row">
              <span className="row-icon icon-next" aria-hidden="true">＋</span>
              <span className="row-copy"><strong>Protótipo</strong><small>Começa depois da definição</small></span>
              <span className="row-state state-next">PRÓXIMO</span>
            </div>
          </div>
          <div className="workspace-bottom"><span>docs/BRIEF_MVP.md</span><span>ESTRUTURA REUTILIZÁVEL</span></div>
          <div aria-hidden="true" className="orbit orbit-one" />
          <div aria-hidden="true" className="orbit orbit-two" />
          <span aria-hidden="true" className="workspace-spark">*</span>
        </div>
      </section>

      <section aria-labelledby="flow-title" className="flow-section" id="como-comecar">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>02</span> DA DESCOBERTA À DEMONSTRAÇÃO</p>
            <h2 id="flow-title">Um caminho simples para começar.</h2>
          </div>
          <p className="section-aside">Três momentos para sair da conversa<br className="desktop-break" /> com algo que a equipe possa mostrar.</p>
        </div>
        <div className="steps-grid">
          {etapas.map((etapa) => (
            <article className="step-card" key={etapa.numero}>
              <div className="step-top"><span className="step-number">{etapa.numero}</span><span className="step-detail">{etapa.detalhe}</span></div>
              <h3>{etapa.titulo}</h3>
              <p>{etapa.descricao}</p>
              <span aria-hidden="true" className="step-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="guide-title" className="guide-section" id="guia">
        <div className="guide-number">03</div>
        <div className="guide-copy">
          <p className="eyebrow">QUANDO A EQUIPE DEFINIR A IDEIA</p>
          <h2 id="guide-title">Aí sim, a base vira protótipo.</h2>
          <p>Preencham o brief, alinhem o escopo com a equipe e usem esta estrutura como ponto de partida para implementar o fluxo escolhido.</p>
        </div>
        <div className="guide-file"><span className="file-icon" aria-hidden="true">MD</span><span><strong>Brief do MVP</strong><small>docs/BRIEF_MVP.md</small></span><span aria-hidden="true" className="file-arrow">↗</span></div>
      </section>

      <footer className="footer">
        <a aria-label="Hackathon EPPEN, início" className="footer-brand" href="#inicio">HACKATHON <span>EPPEN</span></a>
        <p>Base reutilizável · Sem solução pré-definida · Construída pela equipe durante o evento</p>
        <a href="#inicio" className="back-top">VOLTAR AO TOPO ↑</a>
      </footer>
    </main>
  );
}