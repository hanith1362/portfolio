function Tweaks() {
  const [on, setOn] = useState(false);
  const [state, setState] = useState(window.__TWEAKS || { accent: 'blue', density: 'default', hero: 'translator' });

  useEffect(() => {
    function onMsg(e) {
      if (e.data?.type === '__activate_edit_mode') setOn(true);
      if (e.data?.type === '__deactivate_edit_mode') setOn(false);
    }
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  useEffect(() => {
    const map = {
      blue: { a: '#4d7cfe', a2: '#6b93ff' },
      lime: { a: '#c2f542', a2: '#d5ff66' },
      orange: { a: '#ff6b35', a2: '#ff8a5e' },
      violet: { a: '#a78bfa', a2: '#b9a2ff' },
      mono: { a: '#e8e8e8', a2: '#ffffff' },
    };
    const c = map[state.accent] || map.blue;
    document.documentElement.style.setProperty('--accent', c.a);
    document.documentElement.style.setProperty('--accent-2', c.a2);
    document.body.classList.remove('dens-comfy', 'dens-compact');
    if (state.density === 'comfy') document.body.classList.add('dens-comfy');
    if (state.density === 'compact') document.body.classList.add('dens-compact');
    window.__TWEAKS = state;
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: state }, '*');
    window.dispatchEvent(new CustomEvent('tweak-change', { detail: state }));
  }, [state]);

  function set(k, v) { setState(s => ({ ...s, [k]: v })); }

  return (
    <div className={`tweaks ${on ? 'on' : ''}`}>
      <div className="tw-head">
        <b>▲ TWEAKS</b>
        <span>design controls</span>
      </div>
      <div className="tw-body">
        <div className="tw-group">
          <div className="lb">▲ Accent</div>
          <div className="tw-swatches">
            {[['blue','#4d7cfe'],['lime','#c2f542'],['orange','#ff6b35'],['violet','#a78bfa'],['mono','#e8e8e8']].map(([k,c]) => (
              <div key={k} className={`tw-sw ${state.accent === k ? 'sel' : ''}`} style={{background: c}} onClick={() => set('accent', k)} title={k}/>
            ))}
          </div>
        </div>
        <div className="tw-group">
          <div className="lb">▲ Density</div>
          <div className="tw-opts">
            {['compact','default','comfy'].map(d => (
              <div key={d} className={`tw-opt ${state.density === d ? 'sel' : ''}`} onClick={() => set('density', d)}>{d}</div>
            ))}
          </div>
        </div>
        <div className="tw-group">
          <div className="lb">▲ Hero Variant</div>
          <div className="tw-opts">
            {[['translator','translator'],['compact','compact'],['metric','40·70·30']].map(([k,l]) => (
              <div key={k} className={`tw-opt ${state.hero === k ? 'sel' : ''}`} onClick={() => set('hero', k)}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{fontSize: 10, color: 'var(--fg-3)', borderTop: '1px dashed var(--line-2)', paddingTop: 10, lineHeight: 1.6}}>
          toggle tweaks mode from the toolbar to hide this panel · changes persist
        </div>
      </div>
    </div>
  );
}

function App() {
  const [hero, setHero] = useState(window.__TWEAKS?.hero || 'translator');
  const [active, setActive] = useState('about');

  useEffect(() => {
    function onTweak(e) { if (e.detail.hero) setHero(e.detail.hero); }
    window.addEventListener('tweak-change', onTweak);
    return () => window.removeEventListener('tweak-change', onTweak);
  }, []);

  useEffect(() => {
    const ids = ['about','skills','exp','projects','datamate','certs'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) setActive(en.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <TopNav active={active} />
      <StatusBar />
      <Hero variant={hero} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <DataMateDemo />
      <Certs />
      <Contact />
      <Footer />
      <Tweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
