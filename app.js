/* =========================================================================
   Dubki Lab — "Float or Sink?" inquiry lab · ET 617 End-Sem · 23B1541
   Card: P5 Virtual lab · P5-T2 Floating & sinking (density) · L5 anxious
   repeat learner · C4 10-minute sessions (stop & resume).
   All learner-facing CONTENT lives in the DATA block below so it can be
   changed in seconds (viva live change).
   ========================================================================= */

/* ----------------------------- DATA ----------------------------------- */
const ID = '23B1541';
const STORE = 'dubki-23b1541-v1';
const LEARNER = 'Sneha';

// Densities in g/cm³ (textbook values, rounded)
const MATERIALS = {
  wood:   { name: 'Wood',   emoji: '🪵', d: 0.5,  color: '#c58c4f' },
  apple:  { name: 'Apple',  emoji: '🍎', d: 0.8,  color: '#e0574a' },
  wax:    { name: 'Candle wax', emoji: '🕯️', d: 0.9, color: '#f4e6bb' },
  potato: { name: 'Potato', emoji: '🥔', d: 1.08, color: '#cfa96d' },
  eraser: { name: 'Rubber eraser', emoji: '🩷', d: 1.3, color: '#f2a7c3' },
  pebble: { name: 'Pebble', emoji: '🪨', d: 2.6,  color: '#9aa3a8' },
  iron:   { name: 'Iron',   emoji: '🔩', d: 7.9,  color: '#6f7c86' },
};
const SIZES = {
  tiny:  { name: 'Tiny',  v: 2,    px: 26 },
  small: { name: 'Small', v: 20,   px: 40 },
  big:   { name: 'Big',   v: 500,  px: 60 },
  huge:  { name: 'Huge',  v: 6000, px: 86 },
};
const LIQUIDS = {
  water: { name: 'Tap water',  d: 1.0 },
  salt:  { name: 'Very salty water', d: 1.2 },
  oil:   { name: 'Cooking oil', d: 0.92 },
};
const SPECIAL = { 'wood-huge': 'Wooden log', 'iron-tiny': 'Iron nail', 'iron-huge': 'Iron block',
  'wax-huge': 'Huge candle', 'wax-tiny': 'Tiny candle piece', 'pebble-huge': 'Big rock', 'apple-huge': 'Giant pumpkin-sized apple' };

const STEPS = [
  { key: 'welcome',  label: 'Start',     min: 0.5 },
  { key: 'warmup',   label: 'Warm-up',   min: 1 },
  { key: 'hypo',     label: 'My idea',   min: 1 },
  { key: 'lab',      label: 'Lab',       min: 3.5 },
  { key: 'discover', label: 'Discover',  min: 1.5 },
  { key: 'check',    label: 'Check',     min: 2 },
  { key: 'summary',  label: 'Done',      min: 0.5 },
];

// Hypothesis chips (primary input; free text is optional extra)
const HYPS = [
  { id: 'mass',      text: 'Heavy things sink, light things float' },
  { id: 'size',      text: 'Big things sink, small things float' },
  { id: 'shape_air', text: 'Things with air or holes inside float' },
  { id: 'material',  text: 'It depends on what it is made of' },
];

// Mission suggested in the lab (adapts to profile + hypothesis)
const MISSIONS = {
  mass: { text: 'Test your idea with the <b>heaviest</b> and the <b>lightest</b> thing.', pairs: [['wood','huge','water'], ['iron','tiny','water']] },
  size: { text: 'Keep the <b>same material</b>. Change <b>only the size</b>.', pairs: [['wax','tiny','water'], ['wax','huge','water'], ['iron','tiny','water'], ['iron','huge','water']] },
  other:{ text: 'Find <b>one result that surprises you</b>. Try a heavy floater and a light sinker.', pairs: [['wood','huge','water'], ['eraser','tiny','water']] },
};

// Static hint ladder (fallback when AI is unavailable or its hint fails checks).
// Rung 1 notice · 2 compare · 3 control one variable · 4 measure both.  Never states the answer.
const LADDER = {
  mass: [
    'You expected weight to decide. Look at your result again: was the heavier thing the one that sank?',
    'Find one heavy thing that floated and one light thing that sank in your table. What is different about them, apart from weight?',
    'Change only ONE thing: keep the size the same and change just the material. What happens?',
    'Use the ⚖️ balance and the 🧪 cylinder on two objects. How many grams sit in each 1 cm³ of each? Compare with water.',
  ],
  size: [
    'You expected size to decide. Did the size of this object match what happened?',
    'Look at a tiny thing and a huge thing that did the same in your table. If size decided, would that happen?',
    'Keep the material the same and change ONLY the size. Does the result change?',
    'Weigh ⚖️ and measure 🧪 a tiny piece and a huge piece of the same material. How many grams in each 1 cm³? Same or different?',
  ],
  other: [
    'This result surprised you. What did you think would make it go the other way?',
    'Compare it with something in your table that did the opposite. Which is heavier? Which is bigger?',
    'Change only ONE thing at a time — material, size or liquid. Which change flips the result?',
    'Use the ⚖️ balance and 🧪 cylinder on two objects. How many grams in each 1 cm³? Compare with water.',
  ],
};

// Warm-up diagnostic (ungraded)
const WARMUP = [
  { id: 'w1', q: 'A <b>huge wooden log</b> 🪵 (3 kg) and a <b>tiny iron nail</b> 🔩 (16 g) go into a bucket of water. Which one sinks?',
    opts: [ ['log', 'The log — it is heavier'], ['nail', 'The nail'], ['both', 'Both sink'], ['ns', 'Not sure yet'] ] },
  { id: 'w2', q: 'A <b>big iron block</b> sinks. We cut a <b>tiny piece</b> from it. The tiny piece will…',
    opts: [ ['float', 'Float — it is tiny now'], ['sink', 'Sink'], ['ns', 'Not sure yet'] ] },
];

// Check questions: 5 items, 4 formats (mcq, numeric+predict, sort, explain). Twins = adaptive retry.
const CHECK = [
  { id: 'q1', lo: 'LO1', type: 'mcq', q: 'A <b>3 kg wooden log</b> and a <b>16 g iron nail</b> are dropped into a pond. What happens?',
    opts: [
      ['a', 'The log sinks, the nail floats', 'mass'],
      ['b', 'Both sink — they are both solid', 'other'],
      ['c', 'The log floats, the nail sinks', 'ok'],
      ['d', 'Both float — a pond has lots of water', 'other'] ],
    model: 'The log floats and the nail sinks. Wood has about 0.5 g in each cm³ (less than water’s 1 g), iron has 7.9 g (more than water).',
    fb: {
      ok: 'Yes! 🎉 Weight alone does not decide. Each cm³ of wood holds only 0.5 g — less than water’s 1 g — so the log floats. Each cm³ of iron holds 7.9 g, so even a tiny nail sinks.',
      mass: 'You are thinking “heavy sinks, light floats”. Many people think this! But remember your lab: the <mark>3 kg log floated</mark>. It is heavy, but its mass is spread over a huge space. Each cm³ of wood has only 0.5 g — less than water.',
      other: 'Not quite. The amount of water and being “solid” do not decide it. What decides is how much mass is packed into each cm³, compared with water.' },
    twin: 'q1b' },
  { id: 'q1b', lo: 'LO1', type: 'mcq', twinOf: 'q1', q: 'Try one more like it: a <b>10 kg bamboo raft</b> and a <b>5 g steel coin</b>. Which one sinks?',
    opts: [ ['a', 'The raft — it is heavier', 'mass'], ['b', 'The coin', 'ok'], ['c', 'Both', 'other'] ],
    model: 'The coin sinks. Steel packs about 7.8 g into each cm³; bamboo less than 1 g.',
    fb: { ok: 'You’ve got it! Heavy-but-spread-out (raft) floats, light-but-packed (coin) sinks. 💪',
      mass: 'Still thinking weight decides — that’s okay, this idea is sticky! Let’s test it once more in the lab with the log and the nail.',
      other: 'Look at how tightly each thing is packed, not how heavy it is.' } },
  { id: 'q2', lo: 'LO1', type: 'mcq', q: 'An <b>iron key</b> sinks. You file it down to a <b>tiny speck</b> of iron. The speck will…',
    opts: [ ['a', 'Float, because it is tiny now', 'size'], ['b', 'Sink, because it is still iron', 'ok'], ['c', 'Float halfway', 'other'] ],
    model: 'It sinks. Cutting does not change the material: each cm³ is still iron, 7.9 g — more than water.',
    fb: { ok: 'Exactly! Cutting changes the size, not the material. A speck of iron still packs 7.9 g into each cm³, so it sinks. 🔩',
      size: 'You are thinking “small things float”. But a tiny piece is still iron! Remember your lab: the <mark>tiny iron nail sank</mark> just like the huge iron block. Same material → same result.',
      other: 'Floating halfway happens only when the object and the liquid are very close in density. Iron is much denser than water.' },
    twin: 'q2b' },
  { id: 'q2b', lo: 'LO1', type: 'mcq', twinOf: 'q2', q: 'One more: a <b>small wooden block</b> floats. A <b>giant wooden log</b>, 100 times bigger, will…',
    opts: [ ['a', 'Sink — it is too big', 'size'], ['b', 'Float', 'ok'] ],
    model: 'It floats. Same wood, same 0.5 g in each cm³.',
    fb: { ok: 'Yes! Bigger or smaller, wood is still wood. 🪵',
      size: 'Size again! Let’s go back to the lab and drop a tiny and a huge piece of the same thing side by side.',
      other: '' } },
  { id: 'q3', lo: 'LO2', type: 'numeric', q: 'An <b>ice cube</b> 🧊 has mass <b>92 g</b> and volume <b>100 cm³</b>. How many grams are packed in each cm³? Then predict: float or sink in water?',
    answer: 0.92, tol: 0.03, sinkAnswer: 'float',
    model: '92 ÷ 100 = 0.92 g/cm³. That is less than water (1 g/cm³), so ice floats — mostly under water.',
    fb: { ok: 'Perfect! 92 ÷ 100 = <mark>0.92 g/cm³</mark>, less than water’s 1, so it floats — and it floats <i>low</i>, with 92% under water. That is why icebergs hide under the sea!',
      calc: 'Let’s do it together: grams ÷ cm³ = 92 ÷ 100 = <b>0.92</b>.',
      mass: '92 g sounds heavy, but what matters is 92 g spread over 100 cm³ — only 0.92 g in each cm³, less than water. So it floats.' } },
  { id: 'q4', lo: 'LO1', type: 'sort', q: 'Tap <b>Float</b> or <b>Sink</b> for each one (in water). Use the numbers!',
    items: [
      { n: '🥥 Coconut — 900 g, 1200 cm³', a: 'float', trap: 'mass' },
      { n: '🔮 Glass marble — 5 g, 2 cm³', a: 'sink', trap: 'mass' },
      { n: '🎃 Pumpkin — 3000 g, 3750 cm³', a: 'float', trap: 'mass' },
      { n: '🧱 Brick — 2400 g, 1200 cm³', a: 'sink', trap: 'size' } ],
    model: 'Coconut 0.75 → float · Marble 2.5 → sink · Pumpkin 0.8 → float · Brick 2.0 → sink',
    fb: { ok: 'All four right! You used grams-per-cm³ like a scientist. 🔬',
      mass: 'Some heavy things float and some light things sink here. Try dividing grams by cm³ for the ones you changed.',
      size: 'Big is not the same as sinking. Divide grams by cm³ and compare with 1.' } },
  { id: 'q5', lo: 'LO3', type: 'explain', q: 'Your friend Rohit says: <i>“The log floated because it is light.”</i> But the log weighs <b>3 kg</b>! In 1–2 lines, tell Rohit what <b>really</b> decides whether something floats.',
    model: 'It is not weight alone. It depends on how much mass is packed into each cm³ (its density = mass ÷ volume). Wood has 0.5 g per cm³, less than water’s 1 g, so the log floats even though it is heavy.' },
];

/* ----------------------------- STATE ---------------------------------- */
function fresh() {
  return { v: 1, step: 0, started: Date.now(), lastSeen: Date.now(), sessions: 1,
    profile: { w1: null, w2: null, conf0: null }, hyps: [], label: null,
    sel: { mat: 'wood', size: 'huge', liq: 'water' }, pred: null, runs: [], measured: {},
    rung: 0, hintsUsed: 0, support: null, noToolRuns: 0,
    disc: { row: null, tries: 0, done: false },
    check: { order: ['q1', 'q2', 'q3', 'q4', 'q5'], i: 0, res: {}, twinsUsed: {} },
    conf1: null, log: [] };
}
let S;
try { S = JSON.parse(localStorage.getItem(STORE)) || fresh(); } catch (e) { S = fresh(); }
if (!S || S.v !== 1) S = fresh();
const save = () => { S.lastSeen = Date.now(); try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} };
const log = (ev, data = {}) => { S.log.push({ t: new Date().toISOString(), step: STEPS[S.step].key, ev, ...data }); if (S.log.length > 400) S.log.shift(); save(); };

/* ----------------------------- HELPERS -------------------------------- */
const $ = (s, r = document) => r.querySelector(s);
const app = $('#app');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const objName = (m, s) => SPECIAL[`${m}-${s}`] || `${SIZES[s].name} ${MATERIALS[m].name.toLowerCase()}`;
const massOf = (m, s) => +(MATERIALS[m].d * SIZES[s].v).toFixed(1);
const fmtMass = (g) => (g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g < 10 ? g.toFixed(1) : Math.round(g)} g`);
const outcome = (m, l) => (MATERIALS[m].d < LIQUIDS[l].d ? 'float' : 'sink');
const keyOf = (m, s) => `${m}-${s}`;
function toast(msg, ms = 3200) { const t = $('#toast'); t.innerHTML = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), ms); }
function minsLeft() { return Math.max(0, Math.ceil(STEPS.slice(S.step).reduce((a, s) => a + s.min, 0))); }
function header() {
  const pct = Math.round((S.step / (STEPS.length - 1)) * 100);
  $('#bar').style.width = pct + '%';
  $('#stepLabel').textContent = S.step === 0 ? 'A 10-minute mission' :
    `Step ${S.step} of ${STEPS.length - 1} · ${STEPS[S.step].label} · about ${minsLeft()} min left`;
}
function go(step) { S.step = step; S.support = null; if (step === 2) S.hypBase = S.hyps.length; log('enter_step'); save(); render(); app.focus(); window.scrollTo(0, 0); }
function labelFromText(t) { // keyword fallback classifier (also used to cross-check the AI)
  t = (t || '').toLowerCase();
  if (/dens|for its size|packed|per ?cm|mass.*(volume|space|size)|(volume|space|size).*mass|compare.*water|than water/.test(t)) return 'density';
  if (/heav|weigh|light|vajan|wajan|wazan|bhari|jad|halk|halka/.test(t)) return 'mass';
  if (/big|small|size|large|tiny|huge|mota|chhot|lahan|motha/.test(t)) return 'size';
  if (/air|hollow|hole|shape|flat|hawa/.test(t)) return 'shape_air';
  if (/made of|material|wood|iron|metal|plastic/.test(t)) return 'material';
  return 'other';
}
const missionKey = () => (S.label === 'mass' || S.label === 'size') ? S.label : (S.profile.w1 === 'log' ? 'mass' : S.profile.w2 === 'float' ? 'size' : 'other');

/* ----------------------------- AI CLIENT ------------------------------ */
// Server: /api/ai (Gemini). Every response is validated here AGAIN before the learner sees it.
const BANNED = /dens|mass\s*(÷|\/|divided)|divide|per\s*cm|g\/cm|wrong|incorrect|the answer is/i;
async function ai(task, payload) {
  try {
    const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), 9000);
    const r = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task, ...payload }), signal: ctrl.signal });
    clearTimeout(tm);
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}
const tagAI = (src) => src === 'ai' ? '<span class="pill ai">✨ AI · checked</span>' : '<span class="pill">📘 Offline hint (AI unavailable)</span>';

/* ----------------------------- SCREENS -------------------------------- */
function render() {
  header();
  const k = STEPS[S.step].key;
  ({ welcome, warmup, hypo, lab, discover, check, summary })[k]();
}

function welcome() {
  const resuming = S.log.length > 2 && S.step === 0 && S.resumeStep > 0;
  app.innerHTML = `
  <section class="card fade">
    <div class="hero" aria-hidden="true">🫧🪵🔩</div>
    <h1>Float or sink? Let’s find out — together.</h1>
    <p>Hi ${LEARNER}! This is a <b>10-minute science mission</b>. You will make guesses, drop things in water, and discover the secret rule yourself.</p>
    <ul class="steps">
      <li><b>Guess</b> — no marks, no wrong answers.</li>
      <li><b>Test</b> in the lab — surprises are good news!</li>
      <li><b>Discover</b> the rule and check it.</li>
    </ul>
    <p class="muted">You can tap <b>Save &amp; stop</b> anytime. Next time, you’ll start right where you left off.</p>
    ${resuming ? `<div class="fb info">👋 Welcome back! You stopped at <b>Step ${S.resumeStep}: ${STEPS[S.resumeStep].label}</b>. Your ${S.runs.length} experiment(s) are saved.</div>
      <button class="btn" data-a="resume">Continue from Step ${S.resumeStep}</button>
      <button class="btn quiet" data-a="restart">Start a fresh mission</button>`
    : `<button class="btn" data-a="start">Start my mission →</button>`}
  </section>`;
}

function warmup() {
  const p = S.profile;
  app.innerHTML = `
  <section class="card fade">
    <span class="pill">Warm-up · no marks</span>
    <h1>First, your guesses</h1>
    <p>There are no wrong answers here. We will <b>test</b> your guesses in the lab.</p>
  </section>
  ${WARMUP.map((w) => `
  <section class="card">
    <p>${w.q}</p>
    <div class="opts">${w.opts.map(([v, t]) => `<button class="opt" aria-pressed="${p[w.id] === v}" data-a="warm" data-q="${w.id}" data-v="${v}">${esc(t)}</button>`).join('')}</div>
  </section>`).join('')}
  <section class="card">
    <p><b>How sure do you feel about floating and sinking right now?</b></p>
    <div class="scale" role="group" aria-label="Confidence">${['😟', '😕', '😐', '🙂', '😄'].map((e, i) => `<button class="${p.conf0 === i + 1 ? 'sel' : ''}" data-a="conf0" data-v="${i + 1}" aria-label="${i + 1} of 5">${e}</button>`).join('')}</div>
    <button class="btn" data-a="next" ${p.w1 && p.w2 && p.conf0 ? '' : 'disabled'}>Next: my idea →</button>
  </section>`;
}

function hypo() {
  const cur = S.hyps[S.hyps.length - 1];
  app.innerHTML = `
  <section class="card fade">
    <span class="pill">Your idea = your hypothesis</span>
    <h1>Why do things float?</h1>
    <p>Pick the idea closest to yours — or write your own. Scientists start with a guess and then <b>test</b> it.</p>
    <p><b>I think things float or sink because…</b></p>
    <div class="opts">${HYPS.map((h) => `<button class="opt" aria-pressed="${cur && cur.id === h.id}" data-a="hyp" data-v="${h.id}">${esc(h.text)}</button>`).join('')}</div>
    <label class="lbl" for="own">…or in my own words (English / Marathi / Hindi words are fine)</label>
    <textarea id="own" rows="2" placeholder="e.g. heavy things go down…">${cur && cur.id === 'own' ? esc(cur.text) : ''}</textarea>
    <button class="btn ghost" data-a="ownhyp">Use my own words</button>
    <div id="hypfb"></div>
    <button class="btn" data-a="tolab" ${cur ? '' : 'disabled'}>Test my idea in the lab →</button>
  </section>`;
  if (cur) showHypFb(cur);
}
function showHypFb(h) {
  const el = $('#hypfb'); if (!el) return;
  const names = { mass: 'weight', size: 'size', density: 'packing (mass and space together)', shape_air: 'air and shape', material: 'material', other: 'something else' };
  el.innerHTML = `<div class="fb info">Your idea is about <b>${names[h.label] || 'something'}</b>. ${h.src === 'ai' ? '<span class="pill ai">✨ AI read your words</span>' : h.src === 'rule' ? '<span class="pill">📘 read offline</span>' : ''}<br>Great — now let’s see if the water agrees! 💧</div>`;
}

function lab() {
  const { mat, size, liq } = S.sel;
  const mk = missionKey(); const M = MISSIONS[mk];
  const cur = S.hyps[S.hyps.length - 1];
  const canDiscover = S.runs.length >= 3 && S.runs.some((r) => r.res === 'float') && S.runs.some((r) => r.res === 'sink');
  const meas = S.measured[keyOf(mat, size)] || {};
  app.innerHTML = `
  <section class="card mission fade">
    <span class="pill">Mission</span>
    <p>${M.text}</p>
    <div class="chips">${M.pairs.map(([m, s, l]) => `<button class="chip ${mat === m && size === s && liq === l ? 'sel' : ''}" data-a="preset" data-m="${m}" data-s="${s}" data-l="${l}">${MATERIALS[m].emoji} ${objName(m, s)}</button>`).join('')}</div>
    ${cur ? `<div class="idea">💡 My idea: ${S.hyps.map((h, i) => i < S.hyps.length - 1 ? `<s>v${i + 1} “${esc(h.text)}”</s> → ` : `<b>v${i + 1} “${esc(h.text)}”</b>`).join('')}</div>` : ''}
  </section>

  <section class="card">
    <div class="tank liq-${liq}" id="tank">
      <div class="liquid"></div><span class="surface-tag">${LIQUIDS[liq].name}</span>
      <div class="ripple" id="ripple"></div>
      <div class="obj" id="obj" style="width:${SIZES[size].px}px;height:${SIZES[size].px}px;background:${MATERIALS[mat].color}"><span style="font-size:${SIZES[size].px * 0.55}px">${MATERIALS[mat].emoji}</span></div>
      <div class="result" id="resTag"></div>
    </div>
    <div class="pickers" style="margin-top:10px">
      <div class="plabel">1 · Object</div>
      <div class="picker">${Object.entries(MATERIALS).map(([k, m]) => `<button class="${k === mat ? 'sel' : ''}" data-a="mat" data-v="${k}">${m.emoji} ${m.name}</button>`).join('')}</div>
      <div class="plabel">2 · Size</div>
      <div class="picker">${Object.entries(SIZES).map(([k, s]) => `<button class="${k === size ? 'sel' : ''}" data-a="size" data-v="${k}">${s.name}</button>`).join('')}</div>
      <div class="plabel">3 · Liquid</div>
      <div class="picker">${Object.entries(LIQUIDS).map(([k, l]) => `<button class="${k === liq ? 'sel' : ''}" data-a="liq" data-v="${k}">${l.name}</button>`).join('')}</div>
    </div>
    <div class="tools" style="margin-top:10px">
      <button class="tool" data-a="weigh"><b>⚖️ Balance</b>${meas.m ? `Mass = <b class="key">${fmtMass(massOf(mat, size))}</b>` : 'Tap to weigh it'}</button>
      <button class="tool" data-a="measure"><b>🧪 ${SIZES[size].v <= 20 ? 'Measuring cylinder' : 'Overflow can'}</b>${meas.v ? volText(size) : 'Tap to find its volume'}</button>
    </div>
    <p style="margin-top:12px"><b>Before you drop the ${esc(objName(mat, size).toLowerCase())}: what do you predict?</b></p>
    <div class="row">
      <button class="opt ${S.pred === 'float' ? 'sel' : ''}" data-a="pred" data-v="float">⬆️ It will float</button>
      <button class="opt ${S.pred === 'sink' ? 'sel' : ''}" data-a="pred" data-v="sink">⬇️ It will sink</button>
    </div>
    <button class="btn" data-a="drop" ${S.pred ? '' : 'disabled'}>💧 Drop it in!</button>
  </section>

  <div id="support">${S.support ? supportHTML() : ''}</div>

  <section class="card soft">
    <h2>📋 My lab notebook (${S.runs.length})</h2>
    ${S.runs.length ? tableHTML(false) : '<p class="muted">Your results will appear here.</p>'}
    <button class="btn quiet" data-a="hint">🤔 I’m stuck — give me a hint</button>
    <button class="btn" data-a="todiscover" ${canDiscover ? '' : 'disabled'}>I think I see a pattern →</button>
    ${canDiscover ? '' : `<p class="muted" style="font-size:.85rem">Do at least 3 drops, with at least one float and one sink, to unlock the next step.</p>`}
  </section>`;
}
function volText(size) {
  const v = SIZES[size].v;
  return v <= 20 ? `Water rose 50 → ${50 + v} mL<br>Volume = <b class="key">${v} cm³</b>` : `${v} mL water spilled out<br>Volume = <b class="key">${v} cm³</b>`;
}
function tableHTML(withDensity) {
  const rows = withDensity ? uniqueRows() : S.runs.slice().reverse();
  return `<div class="tblwrap"><table><thead><tr><th>Object</th><th>Liquid</th>${withDensity ? '<th>Mass</th><th>Volume</th><th>g in each cm³</th>' : '<th>Guess</th>'}<th>Result</th></tr></thead><tbody>
  ${rows.map((r) => {
    const meas = S.measured[keyOf(r.m, r.s)] || {};
    return `<tr><td>${MATERIALS[r.m].emoji} ${esc(objName(r.m, r.s))}</td><td>${LIQUIDS[r.l].name}</td>
    ${withDensity ? `<td>${massOf(r.m, r.s)} g</td><td>${SIZES[r.s].v} cm³</td><td><b>${r.showD ? MATERIALS[r.m].d : '?'}</b></td>`
      : `<td>${r.pred === 'float' ? '⬆️' : '⬇️'}${r.pred !== r.res ? ' <span class="pill amber">surprise</span>' : ''}</td>`}
    <td class="${r.res === 'float' ? 'f' : 's'}">${r.res === 'float' ? 'Floats' : 'Sinks'}</td></tr>`;
  }).join('')}</tbody></table></div>`;
}
function uniqueRows() {
  const seen = {}; const out = [];
  S.runs.filter((r) => r.l === 'water').forEach((r) => { const k = keyOf(r.m, r.s); if (!seen[k]) { seen[k] = 1; out.push({ ...r }); } });
  return out;
}
function placeObj(animate) {
  const tank = $('#tank'); const obj = $('#obj'); if (!tank || !obj) return;
  const { mat, size, liq } = S.sel; const h = SIZES[size].px; const H = tank.clientHeight; const surf = 78;
  const res = outcome(mat, liq); const f = Math.min(1, MATERIALS[mat].d / LIQUIDS[liq].d);
  const top = res === 'float' ? surf - h * (1 - f) : H - h - 4;
  if (!animate) { obj.style.transition = 'none'; }
  obj.style.top = top + 'px';
  const tag = $('#resTag'); tag.textContent = res === 'float' ? `Floats · ${Math.round(f * 100)}% under` : 'Sinks to the bottom';
  tag.classList.add('show');
  if (animate) { const r = $('#ripple'); r.classList.remove('go'); void r.offsetWidth; r.classList.add('go'); }
}

function supportHTML() {
  const sp = S.support; if (!sp) return '';
  if (sp.kind === 'stuck') return `<section class="card support fade" aria-live="polite"><h2>🤔 Let’s think together</h2>
    <div class="hint" id="hintBox">${sp.hint ? `${esc(sp.hint)}<br>${tagAI(sp.src)}` : '<span class="spinner"></span> Thinking of a helpful question…'}</div>
    <p class="muted" style="font-size:.85rem">Hint ${S.rung} of 4 · tap again for a stronger hint.</p></section>`;
  if (sp.kind === 'match') return `<section class="card fade" style="border-left:5px solid var(--ok)"><h2>✅ Just as you predicted!</h2>
    <p>The ${esc(sp.obj)} ${sp.res === 'float' ? 'floated' : 'sank'}. Nice. Now try to <b>break your idea</b> — find a result that does not fit it. That is how scientists check.</p></section>`;
  return `<section class="card support fade" aria-live="polite">
    <h2>🔍 A surprise! Scientists love these.</h2>
    <p>You predicted <b>${sp.pred}</b>, but the <b>${esc(sp.obj)}</b> <b>${sp.res === 'float' ? 'floated' : 'sank'}</b>. This is not a mistake — it is <mark>new evidence</mark>.</p>
    <div class="hint" id="hintBox">${sp.hint ? `${esc(sp.hint)}<br>${tagAI(sp.src)}` : '<span class="spinner"></span> Thinking of a helpful question…'}</div>
    <p class="muted" style="font-size:.85rem">Hint ${S.rung} of 4 · we won’t just tell you the answer — you’ll find it.</p>
    <div class="row"><button class="btn ghost" data-a="revise">✏️ Change my idea</button><button class="btn ghost" data-a="keep">🧪 Test more first</button></div>
  </section>`;
}

async function giveHint(trigger) {
  S.rung = Math.min(4, S.rung + 1);
  const mk = missionKey(); const fallback = LADDER[mk][S.rung - 1];
  const last = S.runs[S.runs.length - 1];
  if (trigger === 'surprise') S.support = { kind: 'surprise', pred: last.pred, res: last.res, obj: objName(last.m, last.s), hint: null };
  else S.support = S.support && S.support.kind === 'surprise' ? { ...S.support, hint: null } : { kind: 'stuck', hint: null };
  log('hint_request', { rung: S.rung, trigger }); S.hintsUsed++;
  $('#support').innerHTML = supportHTML();
  if (trigger === 'stuck') $('#support').scrollIntoView({ behavior: 'smooth', block: 'center' });
  const cur = S.hyps[S.hyps.length - 1] || { text: '', label: mk };
  const out = await ai('nudge', { rung: S.rung, hypothesis: cur.text, label: mk,
    last: last ? { object: objName(last.m, last.s), liquid: LIQUIDS[last.l].name, predicted: last.pred, result: last.res, mass_g: massOf(last.m, last.s), volume_cm3: SIZES[last.s].v } : null,
    table: S.runs.slice(-6).map((r) => ({ object: objName(r.m, r.s), liquid: LIQUIDS[r.l].name, mass_g: massOf(r.m, r.s), volume_cm3: SIZES[r.s].v, result: r.res })) });
  let hint = fallback, src = 'fallback';
  if (out && typeof out.hint === 'string' && out.hint.split(/\s+/).length <= 40 && out.hint.includes('?') && !(S.rung < 4 && BANNED.test(out.hint))) { hint = out.hint; src = 'ai'; }
  S.support.hint = hint; S.support.src = src; log('hint_shown', { rung: S.rung, src, hint }); save();
  const box = $('#hintBox'); if (box) box.innerHTML = `${esc(hint)}<br>${tagAI(src)}`;
}

function discover() {
  const rows = uniqueRows();
  if (S.disc.row == null) { S.disc.row = Math.max(0, rows.findIndex((r) => r.res === 'float')); save(); }
  const r = rows[S.disc.row] || rows[0];
  if (!r) { app.innerHTML = `<section class="card"><p>Please do a few drops in <b>tap water</b> first.</p><button class="btn" data-a="back">← Back to the lab</button></section>`; return; }
  const m = massOf(r.m, r.s), v = SIZES[r.s].v;
  rows.forEach((x) => (x.showD = S.disc.done));
  const floaters = rows.filter((x) => x.res === 'float'), sinkers = rows.filter((x) => x.res === 'sink');
  const heavyF = floaters.sort((a, b) => massOf(b.m, b.s) - massOf(a.m, a.s))[0];
  const tinyS = sinkers.sort((a, b) => massOf(a.m, a.s) - massOf(b.m, b.s))[0];
  app.innerHTML = `
  <section class="card fade">
    <span class="pill">Discover</span>
    <h1>Let’s crack the secret together</h1>
    <p>Here are your water results with <b>mass</b> (⚖️) and <b>volume</b> (🧪) for each object.</p>
    <div id="dt">${tableWithD(rows)}</div>
  </section>
  ${S.disc.done ? conceptHTML(heavyF, tinyS) : `
  <section class="card">
    <h2>Your turn: one small calculation</h2>
    <p>The <b>${esc(objName(r.m, r.s).toLowerCase())}</b> has mass <b class="key">${m} g</b> and volume <b class="key">${v} cm³</b>.</p>
    <p>How many grams are packed into <mark>each 1 cm³</mark>? <span class="muted">(grams ÷ cm³ — a calculator is fine)</span></p>
    <input type="number" step="0.01" inputmode="decimal" id="dIn" placeholder="e.g. 0.7">
    <button class="btn" data-a="dcheck">Check</button>
    <div id="dfb"></div>
  </section>`}`;
}
function tableWithD(rows) {
  const sorted = S.disc.done ? rows.slice().sort((a, b) => MATERIALS[a.m].d - MATERIALS[b.m].d) : rows;
  let waterDrawn = false;
  return `<div class="tblwrap"><table><thead><tr><th>Object</th><th>Mass</th><th>Volume</th><th>g in each cm³</th><th>Result</th></tr></thead><tbody>
  ${sorted.map((x) => {
    let wl = '';
    if (S.disc.done && !waterDrawn && MATERIALS[x.m].d > 1) { waterDrawn = true; wl = `<tr class="waterline"><td colspan="5">💧 WATER = 1 g in each cm³</td></tr>`; }
    return `${wl}<tr><td>${MATERIALS[x.m].emoji} ${esc(objName(x.m, x.s))}</td><td>${fmtMass(massOf(x.m, x.s))}</td><td>${SIZES[x.s].v} cm³</td><td><b>${S.disc.done ? MATERIALS[x.m].d : '?'}</b></td><td class="${x.res === 'float' ? 'f' : 's'}">${x.res === 'float' ? 'Floats' : 'Sinks'}</td></tr>`;
  }).join('')}
  ${S.disc.done && !waterDrawn ? `<tr class="waterline"><td colspan="5">💧 WATER = 1 g in each cm³</td></tr>` : ''}
  </tbody></table></div>`;
}
function conceptHTML(heavyF, tinyS) {
  return `<section class="card fade">
    <h2>🎯 So what really decides?</h2>
    <p>Let us look at <b>your own</b> evidence:</p>
    <ol class="steps">
      ${heavyF ? `<li>The <b>${esc(objName(heavyF.m, heavyF.s).toLowerCase())}</b> (${fmtMass(massOf(heavyF.m, heavyF.s))}) <b>floated</b>. So it is <mark>not weight alone</mark>.</li>` : '<li>Heavy things can float — so it is <mark>not weight alone</mark>.</li>'}
      ${tinyS ? `<li>The <b>${esc(objName(tinyS.m, tinyS.s).toLowerCase())}</b> (only ${SIZES[tinyS.s].v} cm³) <b>sank</b>. So it is <mark>not size alone</mark>.</li>` : '<li>Tiny things can sink — so it is <mark>not size alone</mark>.</li>'}
      <li>What decides is <b>how much mass is packed into each cm³</b>. Scientists call this <mark><b>density</b> = mass ÷ volume</mark>.</li>
    </ol>
    <div class="fb info">💧 Water has <b>1 g in each cm³</b>.<br>⬆️ Less than 1 → <b>floats</b>. &nbsp; ⬇️ More than 1 → <b>sinks</b>.<br>🔩 Cutting iron smaller does not change its density — that is why the tiny nail still sinks.</div>
    <p class="muted" style="font-size:.88rem">Bonus: a potato (1.08) sinks in tap water but floats in very salty water (1.2). Try it later! 🥔</p>
    <button class="btn" data-a="next">Check my understanding →</button>
  </section>`;
}

/* ---- check ---- */
function check() {
  const c = S.check; const id = c.order[c.i]; const Q = CHECK.find((q) => q.id === id);
  if (!Q) { go(6); return; }
  const done = c.res[id];
  const n = c.order.filter((x) => !CHECK.find((q) => q.id === x).twinOf).indexOf(id) + 1;
  let body = '';
  if (Q.type === 'mcq') {
    body = `<div class="opts">${Q.opts.map(([v, t, tag]) => `<button class="opt ${done ? (tag === 'ok' ? 'right' : done.v === v ? 'gentle' : '') : ''}" ${done ? 'disabled' : ''} data-a="mcq" data-v="${v}">${esc(t)}</button>`).join('')}</div>`;
  } else if (Q.type === 'numeric') {
    body = `<label class="lbl" for="nIn">Grams in each cm³</label><input type="number" step="0.01" inputmode="decimal" id="nIn" ${done ? 'disabled' : ''} value="${done ? esc(done.num) : ''}">
      <p style="margin-top:10px"><b>In water it will…</b></p>
      <div class="row"><button class="opt ${S._fs === 'float' || (done && done.fs === 'float') ? 'sel' : ''}" data-a="fs" data-v="float" ${done ? 'disabled' : ''}>⬆️ Float</button><button class="opt ${S._fs === 'sink' || (done && done.fs === 'sink') ? 'sel' : ''}" data-a="fs" data-v="sink" ${done ? 'disabled' : ''}>⬇️ Sink</button></div>
      ${done ? '' : '<button class="btn" data-a="numcheck">Check</button>'}`;
  } else if (Q.type === 'sort') {
    S._sort = S._sort || {};
    body = Q.items.map((it, i) => `<div class="sortitem"><span class="nm">${it.n}${done ? (done.ans[i] === it.a ? ' ✅' : ` <span class="pill amber">${it.a}s</span>`) : ''}</span>
      <div class="seg"><button class="${(done ? done.ans[i] : S._sort[i]) === 'float' ? 'sel' : ''}" data-a="sort" data-i="${i}" data-v="float" ${done ? 'disabled' : ''}>Float</button><button class="${(done ? done.ans[i] : S._sort[i]) === 'sink' ? 'sel' : ''}" data-a="sort" data-i="${i}" data-v="sink" ${done ? 'disabled' : ''}>Sink</button></div></div>`).join('')
      + (done ? '' : `<button class="btn" data-a="sortcheck">Check</button>`);
  } else if (Q.type === 'explain') {
    body = `<textarea id="exIn" rows="3" placeholder="Rohit, it is not just about…" ${done ? 'disabled' : ''}>${done ? esc(done.text) : ''}</textarea>${done ? '' : '<button class="btn" data-a="excheck">Check my explanation</button>'}`;
  }
  app.innerHTML = `
  <section class="card fade">
    <span class="pill">${Q.twinOf ? 'One more like it' : `Check ${n} of 5`} · ${Q.lo}</span>
    <p style="margin-top:8px">${Q.q}</p>
    ${body}
    <div id="qfb">${done ? done.fbHTML : ''}</div>
    ${done ? `<button class="btn" data-a="qnext">${done.toLab ? '🧪 Show me in the lab' : 'Next →'}</button>${done.toLab ? '<button class="btn quiet" data-a="qnext" data-skip="1">Continue the check →</button>' : ''}` : ''}
  </section>`;
}
function finishQ(Q, rec) {
  const c = S.check;
  // ADAPTIVE RULE: misconception answer → targeted feedback + twin item (once). Misconception again on the twin → offer the lab pair.
  if (rec.tag !== 'ok' && rec.tag !== 'calc' && Q.twin && !c.twinsUsed[Q.id]) { c.twinsUsed[Q.id] = 1; c.order.splice(c.i + 1, 0, Q.twin); rec.fbHTML += `<p class="muted" style="font-size:.85rem">Let’s try one more like this, so the idea really sticks.</p>`; }
  if (Q.twinOf && rec.tag !== 'ok') rec.toLab = rec.tag;
  c.res[Q.id] = rec; log('answer', { q: Q.id, tag: rec.tag, v: rec.v || rec.num || rec.text || rec.ans }); save(); check();
}
function fbBox(tag, html, extra = '') { return `<div class="fb ${tag === 'ok' ? 'ok' : 'mis'}">${html}${extra}</div>`; }

function summary() {
  const r = S.check.res; const ok = (id) => r[id] && r[id].tag === 'ok';
  const lo1 = [ok('q1') || ok('q1b'), ok('q2') || ok('q2b'), ok('q4')].filter(Boolean).length;
  const lo2 = (S.disc.tries <= 2 ? 1 : 0) + (ok('q3') ? 1 : 0);
  const lo3 = r.q5 ? r.q5.score : 0;
  const row = (t, good) => `<div class="lo"><span>${t}</span><span class="pill ${good ? 'ok' : 'amber'}">${good ? '✔ Strong' : '↻ Practise once more'}</span></div>`;
  app.innerHTML = `
  <section class="card fade">
    <div class="hero" aria-hidden="true">🏅</div>
    <h1>You did it, ${LEARNER}!</h1>
    <p>You didn’t just learn a rule — you <b>discovered</b> it from your own experiments.</p>
    <div class="fb ok">It’s <b>not weight</b>. It’s <b>not size</b>. It’s <mark><b>density</b></mark> — how much mass is packed into each cm³, compared with water.</div>
    ${S.hyps.length > 1 ? `<div class="idea">💡 Your idea grew: ${S.hyps.map((h, i) => `v${i + 1} “${esc(h.text)}”`).join(' → ')}<br>Changing your idea when the evidence says so is what real scientists do. 👏</div>` : ''}
  </section>
  <section class="card">
    <h2>What you can do now</h2>
    ${row('Predict float or sink (LO1)', lo1 >= 2)}
    ${row('Calculate density from mass and volume (LO2)', lo2 >= 1)}
    ${row('Explain why weight or size alone is not enough (LO3)', lo3 >= 1)}
    <p style="margin-top:12px"><b>How sure do you feel now?</b> <span class="muted">(before: ${['', '😟', '😕', '😐', '🙂', '😄'][S.profile.conf0 || 3]})</span></p>
    <div class="scale">${['😟', '😕', '😐', '🙂', '😄'].map((e, i) => `<button class="${S.conf1 === i + 1 ? 'sel' : ''}" data-a="conf1" data-v="${i + 1}">${e}</button>`).join('')}</div>
    ${S.conf1 ? `<div class="fb info">${S.conf1 > (S.profile.conf0 || 3) ? 'Your confidence went up! 🚀 That came from your own evidence.' : 'That’s okay. Confidence grows with practice — tomorrow’s 10-minute mission is the salt-water surprise 🥔🧂.'}</div>` : ''}
  </section>
  <section class="card soft">
    <h2>🗓️ Next mission (tomorrow, 10 min)</h2>
    <p>Why does a potato sink in tap water but float in very salty water? Make a prediction tonight!</p>
    <button class="btn ghost" data-a="restart">Start a fresh mission</button>
  </section>`;
}

function about() {
  header(); $('#stepLabel').textContent = 'About';
  app.innerHTML = `
  <section class="card fade">
    <h1>About Dubki Lab</h1>
    <p><b>Dubki Lab</b> (“dubki” = a dip) is an inquiry-based virtual lab where learners discover <b>density</b> by predicting, dropping objects, measuring and revising their own ideas.</p>
    <table><tbody>
      <tr><th>Identity token</th><td><b>${ID}</b></td></tr>
      <tr><th>Course</th><td>ET 617 End-Semester 2026</td></tr>
      <tr><th>Problem</th><td>P5 – Inquiry-based virtual laboratory</td></tr>
      <tr><th>Topic</th><td>P5-T2 – Floating and sinking: density (Cl. 6–8)</td></tr>
      <tr><th>Learner</th><td>L5 – Repeating the topic, high anxiety, low self-efficacy</td></tr>
      <tr><th>Constraint</th><td>C4 – 10-minute sessions, stop &amp; resume</td></tr>
    </tbody></table>
    <p class="muted" style="font-size:.88rem;margin-top:10px">Physics is computed in the app (no AI) so results are always correct. AI (Gemini) only reads free-text ideas, writes Socratic hints and checks explanations — every AI output is checked before you see it, with a labelled offline fallback. Your progress stays on this device; there is no login.</p>
    <button class="btn ghost" data-a="showlog">Show my learning log (for teacher / research)</button>
    <pre class="log" id="logBox" hidden></pre>
    <button class="btn" data-a="closeabout">← Back to my mission</button>
  </section>`;
}

/* ----------------------------- EVENTS --------------------------------- */
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-a]'); if (!b || b.disabled) return;
  const a = b.dataset.a, v = b.dataset.v;
  const nextStep = () => go(S.step + 1);
  switch (a) {
    case 'start': log('start'); nextStep(); break;
    case 'resume': { const st = S.resumeStep; S.resumeStep = 0; S.sessions++; log('resume', { to: st }); go(st); break; }
    case 'restart': S = fresh(); save(); log('restart'); render(); break;
    case 'next': nextStep(); break;
    case 'back': go(3); break;
    case 'warm': S.profile[b.dataset.q] = v; log('warmup', { q: b.dataset.q, v }); save(); warmup(); break;
    case 'conf0': S.profile.conf0 = +v; log('confidence_before', { v: +v }); save(); warmup(); break;
    case 'conf1': S.conf1 = +v; log('confidence_after', { v: +v }); save(); summary(); break;
    case 'hyp': { const h = HYPS.find((x) => x.id === v); pushHyp({ id: h.id, text: h.text, label: h.id, src: 'chip' }); break; }
    case 'ownhyp': {
      const t = $('#own').value.trim(); if (t.length < 3) { toast('Write a few words first 🙂'); return; }
      b.disabled = true; b.innerHTML = '<span class="spinner"></span> Reading your idea…';
      const rule = labelFromText(t); const out = await ai('classify', { text: t });
      const ENUM = ['mass', 'size', 'density', 'shape_air', 'material', 'other'];
      let label = rule, src = 'rule';
      if (out && ENUM.includes(out.label) && typeof out.confidence === 'number' && out.confidence >= 0.6) { label = out.label; src = 'ai'; }
      pushHyp({ id: 'own', text: t, label, src, rule }); break;
    }
    case 'tolab': if (S.hyps.length) { go(3); } break;
    case 'preset': S.sel = { mat: b.dataset.m, size: b.dataset.s, liq: b.dataset.l }; S.pred = null; S._justDropped = false; log('preset', S.sel); save(); lab(); break;
    case 'mat': S.sel.mat = v; S.pred = null; S._justDropped = false; save(); lab(); break;
    case 'size': S.sel.size = v; S.pred = null; S._justDropped = false; save(); lab(); break;
    case 'liq': S.sel.liq = v; S.pred = null; S._justDropped = false; save(); lab(); break;
    case 'weigh': case 'measure': {
      const k = keyOf(S.sel.mat, S.sel.size); S.measured[k] = { ...(S.measured[k] || {}), [a === 'weigh' ? 'm' : 'v']: 1 };
      S.usedTool = true; log('tool', { tool: a, obj: k }); save(); const keep = S._justDropped; lab(); if (keep) placeObj(false); break;
    }
    case 'pred': S.pred = v; save(); { const keep = S._justDropped; S._justDropped = false; lab(); } break;
    case 'drop': {
      const { mat, size, liq } = S.sel; const res = outcome(mat, liq);
      const run = { m: mat, s: size, l: liq, pred: S.pred, res, t: Date.now() };
      S.runs.push(run); log('experiment', { obj: keyOf(mat, size), liq, pred: S.pred, res, surprise: S.pred !== res });
      if (!S.measured[keyOf(mat, size)]) S.noToolRuns++;
      S._justDropped = true; const pred = S.pred; S.pred = null;
      S.support = pred === res ? { kind: 'match', obj: objName(mat, size), res } : null;
      save(); lab(); requestAnimationFrame(() => requestAnimationFrame(() => placeObj(true)));
      if (pred !== res) setTimeout(() => giveHint('surprise'), 900);
      else if (S.noToolRuns >= 2 && !S.usedTool) setTimeout(() => toast('Tip: weigh it ⚖️ and measure it 🧪 — the numbers hide a pattern.'), 1300);
      break;
    }
    case 'hint': giveHint('stuck'); break;
    case 'revise': log('revise_open'); go(2); break;
    case 'keep': S.support = null; log('keep_testing'); save(); $('#support').innerHTML = ''; toast('Great — change one thing and drop again 🧪'); break;
    case 'todiscover': if (S.returnToCheck) { S.returnToCheck = false; go(5); } else go(4); break;
    case 'dcheck': {
      const rows = uniqueRows(); const r = rows[S.disc.row] || rows[0]; const val = parseFloat($('#dIn').value); const ans = MATERIALS[r.m].d;
      S.disc.tries++;
      if (Math.abs(val - ans) <= Math.max(0.05, ans * 0.05)) { S.disc.done = true; log('density_calc', { ok: true, val }); save(); discover(); toast('Yes! ' + ans + ' g in each cm³ 🎉'); }
      else {
        log('density_calc', { ok: false, val });
        const m = massOf(r.m, r.s), vv = SIZES[r.s].v;
        $('#dfb').innerHTML = `<div class="fb mis">${S.disc.tries === 1 ? `Close try! Remember: <b>grams ÷ cm³</b>. Here that is <b>${m} ÷ ${vv}</b>. Try again.` : `Let’s do it together: ${m} ÷ ${vv} = <b>${ans}</b>. So each cm³ holds ${ans} g. <button class="btn" data-a="dshow">Got it — show me all of them</button>`}</div>`;
        save();
      }
      break;
    }
    case 'dshow': S.disc.done = true; save(); discover(); break;
    case 'mcq': {
      const Q = CHECK.find((q) => q.id === S.check.order[S.check.i]); const o = Q.opts.find((x) => x[0] === v); const tag = o[2];
      finishQ(Q, { v, tag, fbHTML: fbBox(tag, Q.fb[tag] || Q.fb.other, tag !== 'ok' ? `<p style="margin-top:6px"><b>Model answer:</b> ${Q.model}</p>` : '') }); break;
    }
    case 'fs': { const n = $('#nIn') ? $('#nIn').value : ''; S._fs = v; save(); check(); if ($('#nIn')) $('#nIn').value = n; break; }
    case 'numcheck': {
      const Q = CHECK.find((q) => q.id === 'q3'); const num = parseFloat($('#nIn').value); const fs = S._fs;
      if (isNaN(num) || !fs) { toast('Fill in the number and pick float or sink 🙂'); return; }
      const numOk = Math.abs(num - Q.answer) <= Q.tol; const fsOk = fs === Q.sinkAnswer;
      const tag = numOk && fsOk ? 'ok' : !fsOk ? 'mass' : 'calc';
      S._fs = null; finishQ(Q, { num, fs, tag, fbHTML: fbBox(tag, tag === 'ok' ? Q.fb.ok : (numOk ? '' : Q.fb.calc + ' ') + (!fsOk ? Q.fb.mass : '')) }); break;
    }
    case 'sort': S._sort = S._sort || {}; S._sort[b.dataset.i] = v; save(); check(); break;
    case 'sortcheck': {
      const Q = CHECK.find((q) => q.id === 'q4'); const ans = Q.items.map((_, i) => (S._sort || {})[i]);
      if (ans.some((x) => !x)) { toast('Choose Float or Sink for all four 🙂'); return; }
      const wrong = Q.items.filter((it, i) => ans[i] !== it.a); const tag = wrong.length ? (wrong[0].trap) : 'ok';
      S._sort = {}; finishQ(Q, { ans, tag, fbHTML: fbBox(tag, Q.fb[tag], `<p style="margin-top:6px"><b>Model answer:</b> ${Q.model}</p>`) }); break;
    }
    case 'excheck': {
      const Q = CHECK.find((q) => q.id === 'q5'); const text = $('#exIn').value.trim();
      if (text.length < 8) { toast('Write one or two lines for Rohit 🙂'); return; }
      b.disabled = true; b.innerHTML = '<span class="spinner"></span> Reading your explanation…';
      const rule = ruleScore(text); const out = await ai('evaluate', { text });
      let score = rule.score, mis = rule.mis, fb = rule.fb, src = 'fallback';
      if (out && [0, 1, 2].includes(out.score) && ['mass', 'size', 'none'].includes(out.misconception) && typeof out.feedback === 'string'
        && out.feedback.split(/\s+/).length <= 50 && !/wrong|incorrect|stupid/i.test(out.feedback) && Math.abs(out.score - rule.score) < 2) {
        score = out.score; mis = out.misconception; fb = out.feedback; src = 'ai';
      }
      const tag = score === 2 ? 'ok' : mis === 'mass' ? 'mass' : mis === 'size' ? 'size' : 'other';
      finishQ(Q, { text, score, tag, src, fbHTML: fbBox(tag, `${esc(fb)} ${tagAI(src)}`, `<p style="margin-top:6px"><b>Model answer:</b> ${Q.model}</p><p class="muted" style="font-size:.85rem">Score ${score} of 2</p>`) });
      break;
    }
    case 'qnext': {
      const c = S.check; const cur = c.res[c.order[c.i]];
      if (cur && cur.toLab && !b.dataset.skip) {
        S.sel = cur.toLab === 'size' ? { mat: 'iron', size: 'tiny', liq: 'water' } : { mat: 'wood', size: 'huge', liq: 'water' };
        cur.toLab = null; c.i++; S.returnToCheck = true; log('adaptive_back_to_lab', { reason: cur.tag }); go(3);
        toast('Drop it and see for yourself 💧 Then tap “I think I see a pattern” to come back.', 5000); return;
      }
      c.i++; save(); if (c.i >= c.order.length) go(6); else check(); window.scrollTo(0, 0); break;
    }
    case 'showlog': { const el = $('#logBox'); el.hidden = !el.hidden; el.textContent = JSON.stringify({ id: ID, runs: S.runs, hyps: S.hyps, log: S.log }, null, 1); break; }
    case 'closeabout': render(); break;
  }
});
function pushHyp(h) {
  // while on this screen, re-picking replaces this version instead of adding a new one
  if (S.hyps.length > (S.hypBase || 0)) S.hyps.pop();
  const prev = S.hyps[S.hyps.length - 1];
  if (!prev || prev.text !== h.text) S.hyps.push(h);
  S.label = h.label; log('hypothesis', { v: S.hyps.length, ...h }); save(); hypo();
}
function ruleScore(t) {
  const s = t.toLowerCase();
  const dens = /dens|packed|for its size|per ?cm|each cm|mass.*(volume|space|size)|(volume|space|size).*(mass|weight)|÷|divid/.test(s);
  const water = /water|1 ?g|than 1|less than one|more than one/.test(s);
  const massOnly = /light|heav|weigh/.test(s) && !dens; const sizeOnly = /big|small|size|huge|tiny/.test(s) && !dens;
  const score = dens && water ? 2 : dens ? 1 : 0;
  const mis = score === 2 ? 'none' : massOnly ? 'mass' : sizeOnly ? 'size' : 'none';
  const fb = score === 2 ? 'Brilliant! You compared mass with space and with water — that is exactly the idea of density.'
    : score === 1 ? 'Good start — you talked about mass and space together. Now add: compare it with water (1 g in each cm³).'
    : mis === 'mass' ? 'You are still using weight. Remember the 3 kg log floated! Talk about how much mass is packed into each cm³.'
    : mis === 'size' ? 'Size alone did not decide in your lab. Talk about mass AND volume together, compared with water.'
    : 'Try using the words mass, volume and water in your answer.';
  return { score, mis, fb };
}

/* Save & stop (C4) — works from any step, resumes exactly there */
$('#saveBtn').onclick = () => {
  if (S.step === 0) { toast('Nothing to save yet — start your mission 🙂'); return; }
  S.resumeStep = S.step; log('save_stop', { at: S.step }); S.step = 0; save();
  header();
  app.innerHTML = `<section class="card fade"><div class="hero">💾</div><h1>Saved! Rest well, ${LEARNER}.</h1>
  <p>You stopped at <b>Step ${S.resumeStep}: ${STEPS[S.resumeStep].label}</b>. Your ideas and ${S.runs.length} experiment(s) are saved on this phone.</p>
  <p class="muted">Close the app anytime. Next time you open it, you’ll continue right here.</p>
  <button class="btn" data-a="resume">Continue now</button></section>`;
};
$('#aboutBtn').onclick = () => { log('about'); about(); };
$('#homeBtn').onclick = () => { if (S.step > 0) { S.resumeStep = S.step; S.step = 0; save(); } render(); };

// On load: if a mission is in progress, show the Welcome-back screen (C4 resume)
if (S.step > 0) { S.resumeStep = S.step; S.step = 0; S.sessions++; save(); }
render();
