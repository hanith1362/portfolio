const { useState, useEffect, useRef } = React;

function TopNav({ active }) {
  const items = [
    { id: "about",    n: "01", t: "About" },
    { id: "skills",   n: "02", t: "Skills" },
    { id: "exp",      n: "03", t: "Experience" },
    { id: "projects", n: "04", t: "Projects" },
    { id: "datamate", n: "05", t: "Demo" },
    { id: "certs",    n: "06", t: "Credentials" },
  ];
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <div className="nav-brand">
          <span className="dot" />
          <span className="chev">~/</span><b>hanith</b><span className="chev">/</span>portfolio.v2
        </div>
        <div className="nav-links">
          {items.map(i => (
            <a key={i.id} href={`#${i.id}`} className={`nav-link ${active === i.id ? 'active' : ''}`}>
              <span className="idx">{i.n}</span> {i.t}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <a className="nav-cta" href={window.PORTFOLIO.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="nav-cta primary" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}

function StatusBar() {
  const [now, setNow] = useState(() => fmt(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  function fmt(d) {
    return d.toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/Chicago' });
  }
  return (
    <div className="shell">
      <div className="status">
        <span className="live">available now</span>
        <span className="sep">│</span>
        <span>Remote / On-site</span>
        <span className="sep">│</span>
        <span>{now} CST</span>
        <span className="sep">│</span>
        <span>last deploy: apr 20 · 2026</span>
        <span className="sep">│</span>
        <span>build #042</span>
      </div>
    </div>
  );
}

function Hero({ variant }) {
  const P = window.PORTFOLIO;
  return (
    <section className="hero">
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-col-l">
            <div className="row"><span className="k">/ role</span><span className="v">{P.title}</span></div>
            <div className="row"><span className="k">/ exp</span><span className="v">3+ years</span></div>
            <div className="row"><span className="k">/ certs</span><span className="v">PL-300 · SnowPro</span></div>
            <div className="row"><span className="k">/ avail</span><span className="v" style={{color:'var(--green)'}}>{P.availability}</span></div>
          </div>
          <div>
            {variant === 'compact' ? (
              <h1 className="hero-headline" style={{fontSize: 'clamp(40px, 5.6vw, 76px)'}}>
                {P.name}.<br/>
                <span className="muted">Data engineer who</span><br/>
                <span className="accent">ships the decisions.</span>
              </h1>
            ) : variant === 'metric' ? (
              <h1 className="hero-headline">
                <span className="accent">40/70/30</span><br/>
                <span className="muted">the numbers I moved.</span><br/>
                Let's move yours.
              </h1>
            ) : (
              <h1 className="hero-headline">
                {P.headline.line1}<br/>
                <span className="accent">into decisions</span><br/>
                <span className="muted">people act on.</span>
              </h1>
            )}
            <p className="hero-sub">{P.intro}</p>
            <div className="hero-ctas">
              <a className="btn primary" href="#projects">
                See the work <span className="arrow">→</span>
              </a>
              <a className="btn" href="#datamate">
                Try DataMate live
              </a>
              <a className="btn" href="assets/Hanith_Tummalapalli_Resume.pdf" download="Hanith_Tummalapalli_Resume.pdf">
                Résumé · PDF
              </a>
            </div>
          </div>
          <div className="hero-col-r">
            <div className="label">/ impact ledger</div>
            <div className="hero-cards">
              {P.heroStats.map((s, i) => (
                <div key={i} className="hero-card">
                  <div className="num">{s.num}<span className="unit">{s.unit}</span></div>
                  <div className="cap">{s.cap}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="marquee">
          <div className="marquee-track">
            {[...window.PORTFOLIO.keywords, ...window.PORTFOLIO.keywords].map((k, i) =>
              <span key={i}>{k}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TopNav, StatusBar, Hero });
