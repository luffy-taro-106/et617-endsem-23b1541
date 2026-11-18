# DESIGN.md — "Float or Sink? Lab" (working title: **Dubki Lab**)

**ET 617 End-Sem · Identity token: 23B1541 · Darshan Sonawane**

| Card field | Choice |
|---|---|
| P | **P5 – Inquiry-based virtual laboratory** |
| T | **P5-T2 – Floating and sinking: density (Cl. 6–8)** |
| L | **L5 – Learner repeating the topic after failing it once, high anxiety, low self-efficacy** |
| C | **C4 – 10-minute sessions** (one full sequence ≤ 10 min, stop & resume where they left off) |
| ID | 23B1541 |

---

## 1. Educational problem

Sneha failed the "Floating and sinking" unit test because she believes **heavy things sink and light things float** (and that **size** decides it). Rote re-reading the textbook does not shake these beliefs, and every red cross makes her more anxious, so she avoids science practice altogether. She needs a **safe place to be wrong**: a lab where her own prediction is tested, where a "failed" experiment is treated as evidence rather than a mark against her, and where she discovers *for herself* that it is **mass compared with volume (density)**, not mass or size alone, that decides floating. Each visit must be short (one 10-minute mission on her mother's phone after dinner) and must resume exactly where she stopped.

### Learning outcomes (measurable)
- **LO1 – Predict** whether an object will float or sink in water by comparing its density with water's density (1 g/cm³).
- **LO2 – Calculate** the density of an object from its mass (balance) and volume (displacement in a measuring cylinder), in g/cm³.
- **LO3 – Explain**, using evidence from her own experiments, why neither mass alone nor size alone decides floating (e.g. a 3.6 kg wooden log floats but a 16 g iron nail sinks).

### Context of use
At home, 9:00–9:15 pm, on her mother's shared Android phone (360 px, patchy 4G), alone, in **one 10-minute mission** per evening. Also usable on the school lab desktop.

## 2. Learner persona (from L5)

- **Name / age:** Sneha Pawar, 13, Class 7 (repeating the Science term after failing), semi-English medium municipal school, Nashik.
- **Prior knowledge (prerequisites):** knows mass in g/kg and can read a kitchen scale; knows volume as "space taken"; has seen a measuring cylinder but never used displacement; division with decimals is shaky (needs a calculator).
- **Misconception M1 (mass):** "Heavy objects sink, light objects float."
- **Misconception M2 (size):** "Big things sink, small things float — if you cut a sinking thing into a tiny piece, the piece will float."
- **Device / time:** mother's Android phone, ~10 minutes after dinner; sometimes interrupted.
- **Language:** Marathi at home, studies in English; needs short, simple English sentences.
- **Motivation & affect:** wants to pass the re-test and stop being called "weak" in class. High anxiety: freezes at timers, red crosses and scores. Low self-efficacy: "I am just not a science person."

## 3. Content plan (one complete learning activity)

**Mission flow (~10 min, 7 states), saved after every step:**
1. **Welcome / Resume** – "Welcome back, you were on Step 3" (C4). No timer countdown; calm "about 6 min left" estimate.
2. **Warm-up predictions (diagnostic, ungraded)** – 2 prediction items + confidence slider → detects M1 / M2 → profile.
3. **My hypothesis** – learner completes "Things float when…" (chips or free text). AI classifies it (M1 / M2 / density / other).
4. **Lab** – virtual tank: choose object (wood, apple, wax, potato, eraser, pebble, iron) × size (tiny → huge) × liquid (tap water, salt water, oil). Tools: **balance** (mass), **measuring cylinder / overflow can** (volume by displacement), **data table**. Object floats at the physically correct depth (fraction submerged = ρobject/ρliquid).
5. **Unexpected result → support (design challenge)** – when the result contradicts her hypothesis, no answer is revealed. A 4-rung hint ladder (AI-generated Socratic question, filtered, with pre-written fallback): notice → compare → control a variable → measure both mass and volume. She revises her hypothesis (v1 → v2 history visible).
6. **Discover density** – she calculates mass ÷ volume for one row herself; the app fills the rest; pattern: every floater < 1 g/cm³. Conversational concept card.
7. **Check (5 items, 4 formats)** – MCQ (M1 probe), MCQ (M2 probe), numeric density + prediction, tap-to-sort float/sink, short explanation (AI-evaluated with rubric, keyword fallback). Targeted feedback for correct, M1 and M2.
8. **Summary** – what she discovered, confidence before vs after, "Next mission: salt water".

**Adaptivity:** profile (diagnostic → which challenge pair the lab suggests first), performance (wrong predictions escalate the hint rung; misconception answers in Check trigger a targeted card + twin retry item), interaction (hint requests, runs without using the tools → nudge to use balance/cylinder).

**AI features (each validated, each with a labelled fallback):** hypothesis classifier, Socratic nudge after a failed experiment (blocked if it reveals "density"/"mass ÷ volume" before rung 4), explanation evaluator.

**Tech:** static HTML/CSS/JS (no build step) + one Vercel serverless function `/api/ai` (key in Vercel env vars only). State in `localStorage` for resume.
