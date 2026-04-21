# Hanith Tummalapalli — Portfolio

Live site: **[hanith1362.github.io/portfolio](https://hanith1362.github.io/portfolio/)**

A single-page, terminal-inspired portfolio built as plain HTML + React (via Babel standalone) + CSS. No build step, no bundler — just open `index.html`.

## Stack
- Vanilla HTML / CSS (custom, no framework)
- React 18 + inline JSX (Babel standalone)
- Google Fonts: Inter Tight + JetBrains Mono
- Live NL→SQL demo powered by the host's `window.claude.complete` shim

## Run locally
Any static server works. Easiest:
```bash
python3 -m http.server 8080
# → http://localhost:8080
```
Or just double-click `index.html`.

## Deploy

### GitHub Pages
Push to `main`, then Settings → Pages → Source: `main` / root → Save.
→ `https://<username>.github.io/<repo>/`

### Vercel
Import repo at vercel.com. Framework: **Other**. Build command + output dir: **leave empty**. Deploy.

### Netlify
Drag the project folder onto https://app.netlify.com/drop.

## Structure
```
.
├── index.html          # entry
├── src/
│   ├── styles.css      # all CSS, tokens at top
│   ├── data.js         # resume/content data
│   ├── hero.jsx        # TopNav, StatusBar, Hero
│   ├── sections.jsx    # About, Skills, SecHead
│   ├── projects.jsx    # Projects, Experience, Certs, Contact, Footer
│   ├── datamate.jsx    # live NL→SQL demo
│   └── app.jsx         # root App + Tweaks panel
└── README.md
```

## Contact
- Email: thanith1362@gmail.com
- LinkedIn: [/in/hanithtummalapalli](https://www.linkedin.com/in/hanithtummalapalli/)
- GitHub: [@hanith1362](https://github.com/hanith1362)
