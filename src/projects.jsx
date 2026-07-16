function ProjectViz({ kind }) {
  if (kind === 'resq') {
    return (
      <div className="proj-viz">
        <div className="proj-viz-head"><span>resq360 · dispatch map</span><span style={{color:'var(--green)'}}>● 4 units live</span></div>
        <div style={{padding: 14}}>
          <svg viewBox="0 0 400 140" style={{width:'100%', display:'block'}}>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e1e27" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="400" height="140" fill="url(#grid)"/>
            <path d="M40 110 Q 120 80 200 90 T 360 40" stroke="#4d7cfe" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
            <circle cx="40" cy="110" r="4" fill="#ff6b6b"><animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/></circle>
            <text x="50" y="108" fill="#e6e6ee" fontSize="9" fontFamily="monospace">AMB-07</text>
            <circle cx="200" cy="90" r="3" fill="#f3c969"/>
            <text x="208" y="88" fill="#9a9aab" fontSize="9" fontFamily="monospace">AMB-02</text>
            <rect x="352" y="32" width="12" height="12" fill="#6fcf97"/>
            <text x="368" y="42" fill="#e6e6ee" fontSize="9" fontFamily="monospace">St. Mercy</text>
          </svg>
          <div style={{display:'flex', justifyContent:'space-between', fontFamily:'var(--mono)', fontSize: 10.5, color:'var(--fg-3)', marginTop: 8}}>
            <span>ETA: <span style={{color:'var(--accent)'}}>04:12</span></span>
            <span>Severity: <span style={{color:'#ff6b6b'}}>CRITICAL · 0.91</span></span>
            <span>WS: <span style={{color:'var(--green)'}}>connected</span></span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'datamate') {
    return (
      <div className="proj-viz">
        <div className="proj-viz-head">
          <span>datamate · preview</span>
          <span style={{color:'var(--accent)'}}>NL → SQL</span>
        </div>
        <div className="proj-viz-body">
          <div style={{color:'var(--fg-3)'}}>› <span style={{color:'var(--fg)'}}>"top 5 customers by revenue last quarter"</span></div>
          <div style={{marginTop: 8, lineHeight: 1.75}}>
            <span style={{color:'#c792ea'}}>SELECT</span> c.name, <span style={{color:'var(--accent)'}}>SUM</span>(o.total) <span style={{color:'#c792ea'}}>AS</span> rev<br/>
            <span style={{color:'#c792ea'}}>FROM</span> orders o<br/>
            <span style={{color:'#c792ea'}}>JOIN</span> customers c <span style={{color:'#c792ea'}}>ON</span> c.id = o.cust_id<br/>
            <span style={{color:'#c792ea'}}>WHERE</span> o.placed_at &gt;= <span style={{color:'var(--green)'}}>'2025-10-01'</span><br/>
            <span style={{color:'#c792ea'}}>GROUP BY</span> <span style={{color:'var(--amber)'}}>1</span> <span style={{color:'#c792ea'}}>ORDER BY</span> <span style={{color:'var(--amber)'}}>2</span> <span style={{color:'#c792ea'}}>DESC</span> <span style={{color:'#c792ea'}}>LIMIT</span> <span style={{color:'var(--amber)'}}>5</span>;
          </div>
          <div style={{marginTop: 10, fontSize: 10.5, color:'var(--fg-3)'}}>⎯ generated in 1.3s · dialect: postgres</div>
        </div>
      </div>
    );
  }
  if (kind === 'stocks') {
    const ticks = [34, 37, 33, 40, 44, 42, 48, 52, 49, 55, 58, 54, 61, 65, 62, 68, 72, 76, 73, 80];
    const max = Math.max(...ticks);
    return (
      <div className="proj-viz">
        <div className="proj-viz-head"><span>AAPL · live ticks</span><span style={{color:'var(--green)'}}>● WS connected</span></div>
        <div style={{padding: 14}}>
          <svg viewBox="0 0 400 100" style={{width:'100%', display:'block'}}>
            <polyline fill="none" stroke="var(--accent)" strokeWidth="1.5"
              points={ticks.map((v,i) => `${i * (400/(ticks.length-1))},${100 - (v/max)*80}`).join(' ')}/>
            <polyline fill="rgba(77,124,254,0.08)" stroke="none"
              points={`0,100 ${ticks.map((v,i) => `${i * (400/(ticks.length-1))},${100 - (v/max)*80}`).join(' ')} 400,100`}/>
          </svg>
          <div style={{display:'flex', justifyContent:'space-between', fontFamily:'var(--mono)', fontSize: 10.5, color:'var(--fg-3)', marginTop: 8}}>
            <span>PnL: <span style={{color:'var(--green)'}}>+$2,480</span></span>
            <span>Rec: <span style={{color:'var(--accent)'}}>BUY · 0.82</span></span>
            <span>Rank: <span style={{color:'var(--fg)'}}>#3</span></span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'fda') {
    return (
      <div className="proj-viz">
        <div className="proj-viz-head"><span>fda_drugs · mysql</span><span style={{color:'var(--accent)'}}>1.6M rows</span></div>
        <div style={{padding: 14, fontFamily:'var(--mono)', fontSize: 11, color:'var(--fg-2)', lineHeight: 1.8}}>
          <div style={{color:'var(--fg-3)'}}>› stream-parsing drug-label-0001.json</div>
          <div>✓ applications <span style={{color:'var(--fg-3)'}}>198,421</span></div>
          <div>✓ products <span style={{color:'var(--fg-3)'}}>287,104</span></div>
          <div>✓ active_ingredients <span style={{color:'var(--fg-3)'}}>412,860</span></div>
          <div>✓ packaging <span style={{color:'var(--fg-3)'}}>344,210</span></div>
          <div>✓ manufacturers <span style={{color:'var(--fg-3)'}}>18,402</span></div>
          <div style={{color:'var(--green)'}}>✓ loaded 1,607,219 rows · 3NF</div>
          <div style={{color:'var(--fg-3)'}}>dedup removed 23% duplicates</div>
        </div>
      </div>
    );
  }
  if (kind === 'pipeline') {
    return (
      <div className="proj-viz">
        <div className="proj-viz-head"><span>pipeline · synapse</span><span style={{color:'var(--accent)'}}>12 loads/day</span></div>
        <div style={{padding: 14}}>
          <svg className="pipe-svg" viewBox="0 0 420 140">
            <rect className="node-rect" x="6" y="50" width="80" height="36" rx="3"/>
            <text x="46" y="72" textAnchor="middle">SQL Server</text>
            <path className="flow hl" d="M86 68 L136 68"/>
            <rect className="node-rect hl" x="136" y="50" width="80" height="36" rx="3"/>
            <text x="176" y="66" textAnchor="middle">ADF</text>
            <text x="176" y="78" textAnchor="middle" fill="#60606e">extract · clean · mask</text>
            <path className="flow hl" d="M216 68 L266 68"/>
            <rect className="node-rect" x="266" y="50" width="80" height="36" rx="3"/>
            <text x="306" y="66" textAnchor="middle">Synapse</text>
            <text x="306" y="78" textAnchor="middle" fill="#60606e">warehouse</text>
            <path className="flow" d="M346 68 L396 68"/>
            <rect className="node-rect" x="396" y="58" width="20" height="20" rx="2"/>
            <text x="406" y="72" textAnchor="middle" fill="#4d7cfe" fontSize="8">BI</text>
            <text x="176" y="110" textAnchor="middle" fill="#60606e">quality · PHI-safe · lineage</text>
          </svg>
        </div>
      </div>
    );
  }
  if (kind === 'star') {
    return (
      <div className="proj-viz">
        <div className="proj-viz-head"><span>schema · star</span><span style={{color:'var(--accent)'}}>dbt · snowflake</span></div>
        <div style={{padding: 14}}>
          <svg className="pipe-svg" viewBox="0 0 420 180">
            <rect className="node-rect hl" x="160" y="70" width="100" height="40" rx="3"/>
            <text x="210" y="88" textAnchor="middle" fill="#4d7cfe">fct_transactions</text>
            <text x="210" y="100" textAnchor="middle" fill="#60606e">40M rows</text>
            <rect className="node-rect" x="30" y="10" width="84" height="32" rx="3"/>
            <text x="72" y="30" textAnchor="middle">dim_customer</text>
            <rect className="node-rect" x="306" y="10" width="84" height="32" rx="3"/>
            <text x="348" y="30" textAnchor="middle">dim_account</text>
            <rect className="node-rect" x="30" y="138" width="84" height="32" rx="3"/>
            <text x="72" y="158" textAnchor="middle">dim_date</text>
            <rect className="node-rect" x="306" y="138" width="84" height="32" rx="3"/>
            <text x="348" y="158" textAnchor="middle">dim_fx</text>
            <path className="flow" d="M114 32 L170 75"/>
            <path className="flow" d="M306 32 L250 75"/>
            <path className="flow" d="M114 148 L170 105"/>
            <path className="flow" d="M306 148 L250 105"/>
          </svg>
        </div>
      </div>
    );
  }
  return null;
}

function Project({ p, open, onToggle }) {
  return (
    <div className="proj" onClick={onToggle} role="button" tabIndex={0} aria-expanded={open}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}>
      <div className="proj-meta">
        <div className="idx">▲ {p.idx} / {window.PORTFOLIO.projects.length.toString().padStart(2,'0')}</div>
        <span className="k">year</span><span className="v">{p.year}</span>
        <span className="k">status</span><span className="v" style={{color: p.award ? 'var(--amber)' : 'var(--green)'}}>{p.award || p.status}</span>
        <span className="k">kind</span><span className="v">{p.kind}</span>
        <span className="k">impact</span><span className="v" style={{color:'var(--accent)'}}>{p.impact}</span>
      </div>
      <div className="proj-main">
        <h3>{p.name} <span style={{color:'var(--fg-3)', fontWeight: 400, fontSize: 18}}>· {p.tagline}</span></h3>
        <div className="tag-row">
          {p.tags.map(t => <span key={t} className="pill">{t}</span>)}
        </div>
        <div style={{display:'grid', gap: 12, marginTop: 4}}>
          <div>
            <div style={{fontFamily:'var(--mono)', fontSize: 10.5, color:'var(--fg-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4}}>▲ problem</div>
            <p style={{color:'var(--fg-2)', fontSize: 14, lineHeight: 1.6, margin: 0}}>{p.problem}</p>
          </div>
          <div>
            <div style={{fontFamily:'var(--mono)', fontSize: 10.5, color:'var(--fg-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4}}>▲ solution</div>
            <p style={{color:'var(--fg-2)', fontSize: 14, lineHeight: 1.6, margin: 0}}>{p.solution}</p>
          </div>
        </div>
        <div className="stack" style={{marginTop: 14}}>stack: {p.stack.map((s, i) => <span key={i}>{s}{i < p.stack.length-1 ? ' · ' : ''}</span>)}</div>
        <div style={{marginTop: 12, fontFamily:'var(--mono)', fontSize: 11, color:'var(--fg-3)'}}>
          {open ? '▼ collapse' : '▶ expand'} · impact · learnings{p.links?.github ? ' · repo' : ''}
        </div>
      </div>
      <ProjectViz kind={p.viz}/>
      {open && (
        <div className="proj-expand" onClick={e => e.stopPropagation()}>
          <div className="col">
            <div className="hd">▲ impact</div>
            <ul>{p.impactPts.map((l,i) => <li key={i}>{l}</li>)}</ul>
          </div>
          <div className="col">
            <div className="hd">▲ what I learned</div>
            <ul>{p.learned.map((l,i) => <li key={i}>{l}</li>)}</ul>
          </div>
          <div className="col">
            <div className="hd">▲ links</div>
            <ul>
              {p.links?.github && <li><a href={p.links.github} target="_blank" rel="noreferrer" style={{color:'var(--accent)'}}>github repo ↗</a></li>}
              <li>case study · coming soon</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function Projects() {
  const [openId, setOpenId] = useState("datamate");
  const P = window.PORTFOLIO;
  return (
    <section id="projects">
      <SecHead num="04" label="./projects" title='Six projects. Real systems.<br/><em>Problem → solution → impact.</em>' />
      <div className="shell">
        <div className="proj-list">
          {P.projects.map(p => (
            <Project key={p.id} p={p} open={openId === p.id} onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const P = window.PORTFOLIO;
  return (
    <section id="exp">
      <SecHead num="03" label="./experience" title='Every bullet is a number I moved.' />
      <div className="shell">
        <div className="exp-list">
          {P.experience.map((e, i) => (
            <div key={i} className="exp-row">
              <div className="exp-when">
                <div>{e.start}</div>
                <div>→</div>
                {e.active ? <div className="active">{e.end}</div> : <div>{e.end}</div>}
              </div>
              <div className="exp-role">
                <div className="co">{e.co}</div>
                <h4>{e.role}</h4>
                <div className="loc">{e.loc}</div>
                <ul>
                  {e.bullets.map((b, j) => <li key={j} dangerouslySetInnerHTML={{__html: b}}/>)}
                </ul>
              </div>
              <div className="exp-impact">
                <div className="hd">▲ impact</div>
                {e.metrics.map((m, j) => (
                  <div key={j} className="metric">
                    <span className="lb">{m.lb}</span>
                    <span className="vl">{m.vl}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certs() {
  const P = window.PORTFOLIO;
  return (
    <section id="certs">
      <SecHead num="06" label="./credentials" title='Certified, enrolled, actively researching.' />
      <div className="shell">
        <div className="sec-body">
          <div className="sec-meta">
            <div><span className="k">active</span> <span className="v" style={{color:'var(--green)'}}>4 credentials</span></div>
            <div><span className="k">cert</span> <span className="v">PL-300</span></div>
            <div><span className="k">cert</span> <span className="v">SnowPro Core</span></div>
            <div><span className="k">education</span> <span className="v">MSDS · Bradley</span></div>
            <div><span className="k">gpa</span> <span className="v">4.0 / 4.0</span></div>
          </div>
          <div className="certs-row">
            {P.certs.map((c, i) => {
              const inner = (
                <>
                  <div className="hd">
                    <div className="ic">{c.ic}</div>
                    <div className="st">{c.status}</div>
                  </div>
                  <h5>{c.name}</h5>
                  <div className="iss">{c.iss}{c.url ? <span style={{color:'var(--accent)', marginLeft: 6}}>· verify ↗</span> : null}</div>
                  <div className="meta">
                    <span>{c.code}</span>
                    <span>{c.date}</span>
                  </div>
                </>
              );
              return c.url
                ? <a key={i} className="cert" href={c.url} target="_blank" rel="noreferrer" style={{display:'block'}}>{inner}</a>
                : <div key={i} className="cert">{inner}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const P = window.PORTFOLIO;
  return (
    <section id="contact" className="contact">
      <div className="shell">
        <div className="contact-grid">
          <div>
            <div className="sec-label" style={{marginBottom: 16}}><span className="num">07</span>./contact</div>
            <h2>
              Let's build <em>something</em><br/>
              <span className="accent">that actually ships.</span>
            </h2>
            <p className="contact-sub">
              Open to Data Engineering, Data / AI Analytics, and ML Engineering roles — available immediately.
              Also open to contract work if the problem is interesting.
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href={`mailto:${P.email}`}>
                Email me <span className="arrow">→</span>
              </a>
              <a className="btn" href={P.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="btn" href={P.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <div className="contact-card">
            <div className="ln"><span className="k">email</span><span className="v"><a href={`mailto:${P.email}`}>{P.email}</a></span></div>
            <div className="ln"><span className="k">phone</span><span className="v">{P.phone}</span></div>
            <div className="ln"><span className="k">github</span><span className="v"><a href={P.github} target="_blank" rel="noreferrer">hanith1362 ↗</a></span></div>
            <div className="ln"><span className="k">linkedin</span><span className="v"><a href={P.linkedin} target="_blank" rel="noreferrer">/in/hanithtummalapalli ↗</a></span></div>
            <div className="ln"><span className="k">status</span><span className="v" style={{color:'var(--green)'}}>Available Immediately</span></div>
            <div className="ln"><span className="k">response</span><span className="v" style={{color:'var(--green)'}}>within 24h</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot shell">
      <div>© 2026 Hanith Tummalapalli · built with intent</div>
      <div className="signoff">› end of file · go run a query today</div>
    </footer>
  );
}

Object.assign(window, { Projects, Experience, Certs, Contact, Footer });
