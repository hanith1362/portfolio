function SecHead({ num, label, title, sub }) {
  return (
    <div className="shell">
      <div className="sec-head">
        <div className="sec-label"><span className="num">{num}</span>{label}</div>
        <h2 className="sec-title" dangerouslySetInnerHTML={{__html: title}} />
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about">
      <SecHead num="01" label="./about" title='I read the schema <em>before</em> I read the ticket.' />
      <div className="shell">
        <div className="sec-body">
          <div className="sec-meta">
            <div><span className="k">role</span> <span className="v">Data Engineer</span></div>
            <div><span className="k">focus</span> <span className="v">Pipelines · BI · AI</span></div>
            <div><span className="k">exp</span> <span className="v">3+ years</span></div>
            <div><span className="k">certs</span> <span className="v">PL-300 · SnowPro</span></div>
            <div><span className="k">avail</span> <span className="v" style={{color:'var(--green)'}}>Immediately</span></div>
          </div>
          <div className="about-grid">
            <div className="about-prose">
              <p>
                I started as an analyst who kept getting pulled <b>deeper into the stack</b>:
                from dashboards, to the SQL behind them, to the <span className="hl">SSIS</span> jobs feeding the warehouse,
                to the ADF pipelines hydrating the lake. Somewhere in there I stopped being a user of data and started
                being a builder of the systems that produce it.
              </p>
              <p>
                At <b>Digital Realty</b> I owned SSIS packages that cut ETL failures by <span className="hl">40%</span> and
                shaved <span className="hl">30%</span> off Power BI refresh times. Small enough numbers to tell the truth,
                large enough to change what the ops team could ask on a Monday morning.
              </p>
              <p>
                Most recently I engineered an on-premises <b>RAG platform</b> at Advanced Medical Transport, cutting
                document lookup time by <span className="hl">60%</span> while keeping every byte of inference on-prem, and
                shipped side projects like <b>DataMate</b>, an NL→SQL engine that lets non-SQL people query production
                data safely. Looking for a role where the data is hard and the people who use it are real.
              </p>
            </div>
            <div className="about-card">
              <div className="about-card-head">
                <span className="dots"><i/><i/><i/></span>
                <span>hanith.py · read-only</span>
                <span>py · 1.0.0</span>
              </div>
              <div className="about-card-body">
                <div className="line"><span className="ln">1</span><span><span className="com"># who</span></span></div>
                <div className="line"><span className="ln">2</span><span><span className="kw">def</span> <span className="fn">hanith</span>():</span></div>
                <div className="line"><span className="ln">3</span><span>{'\u00A0\u00A0\u00A0\u00A0'}<span className="kw">return</span> {'{'}</span></div>
                <div className="line"><span className="ln">4</span><span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}<span className="str">"loves"</span>: [<span className="str">"clean schemas"</span>, <span className="str">"fast SQL"</span>],</span></div>
                <div className="line"><span className="ln">5</span><span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}<span className="str">"hates"</span>: [<span className="str">"silent failures"</span>],</span></div>
                <div className="line"><span className="ln">6</span><span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}<span className="str">"ships"</span>: <span className="num">{'True'}</span>,</span></div>
                <div className="line"><span className="ln">7</span><span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}<span className="str">"years_exp"</span>: <span className="num">3</span>,</span></div>
                <div className="line"><span className="ln">8</span><span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}<span className="str">"available"</span>: <span className="num">{'True'}</span>,</span></div>
                <div className="line"><span className="ln">9</span><span>{'\u00A0\u00A0\u00A0\u00A0'}{'}'}</span></div>
                <div className="line"><span className="ln">10</span><span>&nbsp;</span></div>
                <div className="line"><span className="ln">11</span><span><span className="com"># ready to start now</span></span></div>
                <div className="line"><span className="ln">12</span><span><span className="kw">assert</span> <span className="fn">hanith</span>()[<span className="str">"ships"</span>]</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const P = window.PORTFOLIO;
  return (
    <section id="skills">
      <SecHead num="02" label="./skills" title='Stack tested in production.<br/><em>Not a résumé buzzword list.</em>' />
      <div className="shell">
        <div className="sec-body">
          <div className="sec-meta">
            <div><span className="k">cats</span> <span className="v">6</span></div>
            <div><span className="k">primary</span> <span className="v" style={{color:'var(--accent)'}}>■ production</span></div>
            <div><span className="k">legend</span> <span className="v">□ working</span></div>
            <br/>
            <div className="k" style={{fontSize:10}}>primary = used at work<br/>on live systems, not tutorials.</div>
          </div>
          <div className="skills-grid">
            {P.skills.map(s => (
              <div key={s.n} className="skill-cat">
                <div className="skill-cat-head">
                  <span className="num">{s.n}</span>
                  <span className="ttl">{s.t}</span>
                </div>
                <div className="skill-chips">
                  {s.items.map((it, i) => (
                    <span key={i} className={`chip ${it.pri ? 'pri' : ''}`}>{it.k}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SecHead, About, Skills });
