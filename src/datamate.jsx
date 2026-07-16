const DM_SCHEMA = [
  {
    name: "customers",
    cols: [
      { n: "id", t: "int PK" },
      { n: "name", t: "text" },
      { n: "country", t: "text" },
      { n: "tier", t: "text" },
      { n: "created_at", t: "timestamp" },
    ],
  },
  {
    name: "orders",
    cols: [
      { n: "id", t: "int PK" },
      { n: "cust_id", t: "int FK" },
      { n: "total", t: "numeric" },
      { n: "status", t: "text" },
      { n: "placed_at", t: "timestamp" },
    ],
  },
  {
    name: "products",
    cols: [
      { n: "id", t: "int PK" },
      { n: "sku", t: "text" },
      { n: "category", t: "text" },
      { n: "price", t: "numeric" },
    ],
  },
  {
    name: "order_items",
    cols: [
      { n: "order_id", t: "int FK" },
      { n: "product_id", t: "int FK" },
      { n: "qty", t: "int" },
      { n: "unit_price", t: "numeric" },
    ],
  },
];

const DM_SUGGESTIONS = [
  "top 5 customers by revenue last quarter",
  "monthly order count trend in 2025",
  "which product category has highest margin",
  "customers who haven't ordered in 90 days",
];

// Lightweight "mock" fallbacks in case AI call fails
const DM_FALLBACK = {
  "top 5 customers by revenue last quarter": {
    sql: `SELECT c.name, c.country, ROUND(SUM(o.total), 2) AS revenue
FROM customers c
JOIN orders o ON o.cust_id = c.id
WHERE o.placed_at >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 months')
  AND o.placed_at <  DATE_TRUNC('quarter', CURRENT_DATE)
  AND o.status = 'fulfilled'
GROUP BY 1, 2
ORDER BY revenue DESC
LIMIT 5;`,
    cols: ["name", "country", "revenue"],
    rows: [
      ["Aperture Sci.", "US", 284902.15],
      ["Black Mesa Labs", "US", 241337.00],
      ["Umbrella Corp.", "DE", 198410.50],
      ["Tyrell Corp.", "JP", 164280.75],
      ["Cyberdyne Inc.", "CA", 152991.40],
    ],
  },
  "monthly order count trend in 2025": {
    sql: `SELECT DATE_TRUNC('month', placed_at) AS month,
       COUNT(*) AS orders
FROM orders
WHERE placed_at >= '2025-01-01' AND placed_at < '2026-01-01'
GROUP BY 1
ORDER BY 1;`,
    cols: ["month", "orders"],
    rows: [
      ["2025-01", 1240], ["2025-02", 1398], ["2025-03", 1612],
      ["2025-04", 1489], ["2025-05", 1708], ["2025-06", 1822],
      ["2025-07", 1956], ["2025-08", 2041], ["2025-09", 2188],
      ["2025-10", 2334], ["2025-11", 2510], ["2025-12", 2742],
    ],
  },
  "which product category has highest margin": {
    sql: `SELECT p.category,
       ROUND(AVG((oi.unit_price - p.price * 0.6) / oi.unit_price) * 100, 2) AS avg_margin_pct
FROM products p
JOIN order_items oi ON oi.product_id = p.id
GROUP BY p.category
ORDER BY avg_margin_pct DESC;`,
    cols: ["category", "avg_margin_pct"],
    rows: [
      ["Software", 62.40], ["Services", 48.10], ["Accessories", 38.20],
      ["Hardware", 24.50], ["Consumables", 18.70],
    ],
  },
  "customers who haven't ordered in 90 days": {
    sql: `SELECT c.id, c.name, c.tier, MAX(o.placed_at) AS last_order
FROM customers c
LEFT JOIN orders o ON o.cust_id = c.id
GROUP BY 1, 2, 3
HAVING MAX(o.placed_at) < CURRENT_DATE - INTERVAL '90 days'
   OR MAX(o.placed_at) IS NULL
ORDER BY last_order NULLS FIRST
LIMIT 10;`,
    cols: ["id", "name", "tier", "last_order"],
    rows: [
      [8812, "Initech", "enterprise", "2025-11-02"],
      [9021, "Globex", "pro", "2025-10-18"],
      [7738, "Hooli", "enterprise", "2025-09-27"],
      [8801, "Pied Piper", "starter", "2025-09-11"],
      [9122, "Stark Ind.", "pro", "—"],
    ],
  },
};

function highlightSql(sql) {
  const kw = /\b(SELECT|FROM|JOIN|LEFT|RIGHT|INNER|OUTER|ON|WHERE|AND|OR|GROUP|BY|ORDER|LIMIT|AS|HAVING|CASE|WHEN|THEN|END|ELSE|IS|NOT|NULL|NULLS|FIRST|LAST|DESC|ASC|WITH|UNION|INTERVAL|DATE_TRUNC|CURRENT_DATE|DISTINCT|IN)\b/g;
  const fn = /\b(SUM|COUNT|AVG|MIN|MAX|ROUND|COALESCE|DATE_TRUNC|TO_DATE|EXTRACT)\b/g;
  const str = /'[^']*'/g;
  const num = /\b(\d+(\.\d+)?)\b/g;
  const com = /(--[^\n]*)/g;
  return sql
    .replace(com, m => `\u0001COM\u0001${m}\u0002`)
    .replace(str, m => `\u0001STR\u0001${m}\u0002`)
    .replace(kw, m => `\u0001KW\u0001${m}\u0002`)
    .replace(fn, m => `\u0001FN\u0001${m}\u0002`)
    .replace(num, m => `\u0001NUM\u0001${m}\u0002`)
    .replace(/\u0001COM\u0001(.*?)\u0002/g, (_,m) => `<span class="com">${m}</span>`)
    .replace(/\u0001STR\u0001(.*?)\u0002/g, (_,m) => `<span class="str">${m}</span>`)
    .replace(/\u0001KW\u0001(.*?)\u0002/g, (_,m) => `<span class="kw">${m}</span>`)
    .replace(/\u0001FN\u0001(.*?)\u0002/g, (_,m) => `<span class="fn">${m}</span>`)
    .replace(/\u0001NUM\u0001(.*?)\u0002/g, (_,m) => `<span class="num">${m}</span>`);
}

function DataMateDemo() {
  const [prompt, setPrompt] = useState("top 5 customers by revenue last quarter");
  const [sql, setSql] = useState(DM_FALLBACK["top 5 customers by revenue last quarter"].sql);
  const [result, setResult] = useState(DM_FALLBACK["top 5 customers by revenue last quarter"]);
  const [tab, setTab] = useState("sql");
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState(1.3);
  const [err, setErr] = useState(null);

  async function run() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setErr(null);
    setTab("sql");
    const t0 = performance.now();
    try {
      const schemaBlock = DM_SCHEMA.map(t =>
        `TABLE ${t.name} (${t.cols.map(c => `${c.n} ${c.t}`).join(", ")})`
      ).join("\n");

      const instruction = `You are DataMate, a NL→SQL engine. Given this schema:\n${schemaBlock}\n\nUser question: "${prompt}"\n\nRespond ONLY with valid JSON in this exact shape, no markdown, no commentary:\n{"sql": "<postgres SQL>", "cols": ["col1","col2"], "rows": [[...],[...]]}\n\nRules:\n- Use PostgreSQL dialect.\n- Generate 5-10 realistic sample rows that would match the query.\n- Numbers should be plausible business figures, not placeholders.\n- Keep SQL under 20 lines.`;

      const raw = await window.claude.complete(instruction);
      // Strip code fences if present
      let cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/, "").trim();
      // Find first { and last }
      const s = cleaned.indexOf("{");
      const e = cleaned.lastIndexOf("}");
      if (s >= 0 && e > s) cleaned = cleaned.slice(s, e + 1);
      const parsed = JSON.parse(cleaned);

      if (!parsed.sql || !Array.isArray(parsed.cols) || !Array.isArray(parsed.rows)) {
        throw new Error("Bad shape");
      }
      setSql(parsed.sql);
      setResult({ sql: parsed.sql, cols: parsed.cols, rows: parsed.rows });
      setLatency(((performance.now() - t0) / 1000).toFixed(2));
    } catch (ex) {
      // Fall back to a close suggestion or the first one
      const key = Object.keys(DM_FALLBACK).find(k => prompt.toLowerCase().includes(k.split(" ")[0].toLowerCase())) || "top 5 customers by revenue last quarter";
      const fb = DM_FALLBACK[key];
      setSql(fb.sql);
      setResult(fb);
      setLatency(((performance.now() - t0) / 1000).toFixed(2));
      setErr("model fallback · using cached response");
    } finally {
      setLoading(false);
    }
  }

  function onKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    }
  }

  return (
    <section id="datamate">
      <SecHead num="05" label="./demo" title='DataMate · ask in English, <br/><em>get SQL + results back.</em>' />
      <div className="shell">
        <div className="sec-body">
          <div className="sec-meta">
            <div><span className="k">engine</span> <span className="v">NL → SQL</span></div>
            <div><span className="k">dialect</span> <span className="v">PostgreSQL</span></div>
            <div><span className="k">schema</span> <span className="v">4 tables · mock ops DB</span></div>
            <div><span className="k">latency</span> <span className="v" style={{color:'var(--accent)'}}>P50 1.3s</span></div>
            <br/>
            <div className="k" style={{fontSize: 10, lineHeight: 1.6}}>
              Live demo. Type a business question,<br/>
              ⌘/ctrl-enter to run. SQL is <b>displayed</b> for<br/>
              review: trust comes from transparency.
            </div>
          </div>

          <div className="dm-wrap">
            <div className="dm-head">
              <div className="title"><span className="dot"/><b>DataMate</b> · query playground</div>
              <div/>
              <div className="status">online</div>
            </div>
            <div className="dm-body">
              <div className="dm-left">
                <div className="dm-schema">
                  <div style={{color:'var(--fg-3)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10}}>▲ schema · ops_db</div>
                  {DM_SCHEMA.map(t => (
                    <div key={t.name} className="tbl">
                      <div><span className="tn">{t.name}</span> <span style={{color:'var(--fg-3)'}}>({t.cols.length})</span></div>
                      {t.cols.map(c => (
                        <div key={c.n} className="col">
                          <span>{c.n}</span><span className="t">{c.t}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="dm-prompt">
                  <div className="lb">▲ question</div>
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    onKeyDown={onKey}
                    placeholder="e.g. top 5 customers by revenue last quarter"
                  />
                  <div className="dm-suggestions">
                    {DM_SUGGESTIONS.map(s => (
                      <span key={s} className="dm-sug" onClick={() => setPrompt(s)}>{s}</span>
                    ))}
                  </div>
                  <div className="dm-actions">
                    <button className="dm-run" onClick={run} disabled={loading}>
                      {loading ? "generating…" : <>▶ run query <span style={{opacity:.65, fontWeight: 400}}>⌘↵</span></>}
                    </button>
                    <span className="dm-hint">{err ? <span style={{color:'var(--amber)'}}>⚠ {err}</span> : `last: ${latency}s`}</span>
                  </div>
                </div>
              </div>

              <div className="dm-right">
                <div className="dm-tabs">
                  <div className={`dm-tab ${tab === 'sql' ? 'active' : ''}`} onClick={() => setTab('sql')}>▲ generated sql</div>
                  <div className={`dm-tab ${tab === 'results' ? 'active' : ''}`} onClick={() => setTab('results')}>▲ results</div>
                </div>

                {tab === 'sql' && (
                  <div className="dm-sql">
                    {loading ? (
                      <div className="dm-loading">
                        <div className="line">&nbsp;parsing intent…</div>
                        <div className="line">&nbsp;grounding schema…</div>
                        <div className="line">&nbsp;generating sql…</div>
                      </div>
                    ) : (
                      <pre style={{fontFamily: 'inherit', margin: 0, whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: highlightSql(sql)}}/>
                    )}
                  </div>
                )}

                {tab === 'results' && (
                  <div style={{padding: 14, flex: 1, overflow: 'auto'}}>
                    {loading ? (
                      <div className="dm-empty">executing…</div>
                    ) : result ? (
                      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 12}}>
                        <thead>
                          <tr>
                            {result.cols.map(c => (
                              <th key={c} style={{textAlign:'left', color:'var(--fg-3)', fontWeight: 500, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 8px', borderBottom: '1px solid var(--line)'}}>{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.rows.map((row, ri) => (
                            <tr key={ri}>
                              {row.map((v, ci) => {
                                const isNum = typeof v === 'number';
                                return <td key={ci} style={{padding: '5px 8px', borderBottom: '1px solid var(--line)', color: isNum ? 'var(--accent)' : 'var(--fg-2)', textAlign: isNum ? 'right' : 'left', fontVariantNumeric: 'tabular-nums'}}>
                                  {isNum ? v.toLocaleString() : String(v)}
                                </td>;
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="dm-empty">Run a query to see results.</div>
                    )}
                  </div>
                )}

                <div style={{padding: '10px 14px', borderTop: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--fg-3)', display: 'flex', justifyContent: 'space-between'}}>
                  <span>{result ? `${result.rows.length} rows · ${latency}s` : 'idle'}</span>
                  <span>dialect: postgres · mode: read-only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DataMateDemo });
