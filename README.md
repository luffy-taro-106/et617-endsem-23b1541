# Dubki Lab — "Float or Sink?" · ET 617 End-Sem · 23B1541

Inquiry-based virtual lab (P5) on **floating, sinking and density** (P5-T2) for a **repeat learner with high anxiety** (L5), designed as **one 10-minute mission with stop & resume** (C4).

- **Live:** https://et617-23b1541.vercel.app
- **Design doc:** [DESIGN.md](DESIGN.md) · **Report:** [report/ET617_EndSem_Report_23B1541.pdf](report/ET617_EndSem_Report_23B1541.pdf)

## Structure
| File | What it is |
|---|---|
| `index.html` | Shell: header (progress + Save & stop), main, footer with identity token |
| `styles.css` | Mobile-first styles (360 px), no framework |
| `app.js` | Whole app. **All learner-facing content is in the DATA block at the top** (materials & densities, hint ladder, warm-up, check questions + feedback) |
| `api/ai.js` | Vercel serverless function → Google Gemini (classify / nudge / evaluate), with validators and model failover |

No starter template, framework or UI library was used. No code from the course project.

## Run locally
```bash
python3 -m http.server 5173
```
Open http://localhost:5173. Without `/api/ai` the app uses its labelled offline fallback (everything still works).

## AI key
`GEMINI_API_KEY` is set only as a Vercel environment variable. It is never committed (`.env*` is git-ignored).

## Viva live change
1. `git switch -c viva` (production stays frozen).
2. Edit the DATA block in `app.js` (e.g. add a material to `MATERIALS`, change a hint in `LADDER`, add a question to `CHECK`).
3. Demo on the local server above, or as a **preview** deployment, never production.
