// Dubki Lab AI endpoint · ET 617 · 23B1541
// Vercel serverless function. Key lives ONLY in the Vercel env var GEMINI_API_KEY.
// Every model output is parsed + validated here; invalid output → 422 and the app uses its labelled offline fallback.

const MODELS = [process.env.AI_MODEL, 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash'].filter(Boolean);

const BANNED_HINT = /dens|mass\s*(÷|\/|divided)|divide|per\s*cm|g\/cm|wrong|incorrect|the answer is/i;
const LABELS = ['mass', 'size', 'density', 'shape_air', 'material', 'other'];

const TASKS = {
  // 1) Hypothesis classifier
  classify: {
    system: `You classify a Class 7 Indian student's hypothesis about why things float or sink.
Labels:
- "mass": weight/heaviness alone decides (heavy sinks, light floats).
- "size": bigness alone decides (big sinks, small floats, or the reverse).
- "density": compares mass with volume/space/size ("heavy for its size", "how tightly packed", "compared with water").
- "shape_air": air inside, holes, hollow, flat shape.
- "material": what it is made of (wood, iron, plastic) without mentioning mass and volume.
- "other": anything else.
The student may mix English with Marathi or Hindi words (e.g. "jad", "halka", "bhari", "vajan" = heavy/light/weight; "mota", "lahan", "chhota" = big/small).
Reply ONLY with JSON: {"label": "<one label>", "confidence": <0..1>, "evidence": "<short quote from the student>"}`,
    user: (b) => `Student hypothesis: """${String(b.text || '').slice(0, 300)}"""`,
    validate: (o) => (o && LABELS.includes(o.label) && typeof o.confidence === 'number' && o.confidence >= 0 && o.confidence <= 1
      ? { label: o.label, confidence: o.confidence, evidence: String(o.evidence || '').slice(0, 120) } : null),
  },

  // 2) Socratic nudge after an unsuccessful (surprising) experiment
  nudge: {
    system: `You are a kind lab partner for Sneha, 13, in Class 7. She failed this topic once and gets anxious easily.
Her experiment result did NOT match her prediction (or she is stuck).
Write ONE short Socratic question (max 30 words, simple English, Class 6 vocabulary) that helps her notice what to test next.
Rules:
- Never say she is wrong. Never give the answer.
- Do NOT use the words: density, dense, denser, divide, "mass divided by volume", "per cm3", "g/cm3".
- Refer to her actual objects and numbers.
- End with a question mark.
Hint level (1-4): 1 = notice the surprise; 2 = compare with another object in her table; 3 = suggest changing only ONE variable; 4 = suggest weighing AND measuring the volume of two objects and comparing grams in each 1 cm3 with water.
Reply ONLY with JSON: {"hint": "<question>"}`,
    user: (b) => `Hint level: ${Number(b.rung) || 1}
Her hypothesis: "${String(b.hypothesis || '').slice(0, 200)}" (type: ${b.label})
Last experiment: ${JSON.stringify(b.last || null)}
Her lab notebook (latest first): ${JSON.stringify((b.table || []).slice(0, 6))}`,
    validate: (o, b) => {
      if (!o || typeof o.hint !== 'string') return null;
      const h = o.hint.trim();
      if (h.split(/\s+/).length > 40 || !h.includes('?')) return null;
      if ((Number(b.rung) || 1) < 4 && BANNED_HINT.test(h)) return null; // must not reveal the answer
      if (/wrong|incorrect|stupid|silly/i.test(h)) return null;
      return { hint: h };
    },
  },

  // 3) Explanation evaluator (Check item 5)
  evaluate: {
    system: `You assess a Class 7 student's short explanation.
Question: Rohit says "The log floated because it is light." But the log weighs 3 kg. In 1-2 lines, explain what really decides whether something floats.
Rubric:
2 = says it depends on mass compared with volume/size (density, "heavy for its size", "how much mass is packed in each cm3") AND compares with water.
1 = mentions density, or mass together with volume/size, but no comparison with water.
0 = only weight/heaviness, or only size, or unrelated.
Misconception: "mass" if the reasoning uses weight alone; "size" if size alone; otherwise "none".
Feedback: max 35 words, warm, simple English, start with what is good, never use the word "wrong", give one next step.
Reply ONLY with JSON: {"score": 0|1|2, "misconception": "mass"|"size"|"none", "feedback": "<text>"}`,
    user: (b) => `Student answer: """${String(b.text || '').slice(0, 500)}"""`,
    validate: (o) => (o && [0, 1, 2].includes(o.score) && ['mass', 'size', 'none'].includes(o.misconception)
      && typeof o.feedback === 'string' && o.feedback.split(/\s+/).length <= 50 && !/wrong|incorrect|stupid/i.test(o.feedback)
      ? { score: o.score, misconception: o.misconception, feedback: o.feedback.trim() } : null),
  },
};

async function callGemini(system, user) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not set');
  let lastErr;
  for (const model of MODELS) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: user }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 400, responseMimeType: 'application/json', thinkingConfig: { thinkingBudget: 0 } },
      }),
    });
    if (r.ok) {
      const j = await r.json();
      const text = j?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
      return { text, model };
    }
    lastErr = new Error(`${model}: HTTP ${r.status} ${(await r.text()).slice(0, 160)}`);
    if (r.status !== 404 && r.status !== 400) break; // only fall through to the next model if this one is unknown/unsupported
  }
  throw lastErr;
}

function parseJSON(t) {
  try { return JSON.parse(t); } catch (e) {}
  const m = String(t).match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch (e) {} }
  return null;
}

export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json({ ok: true, id: '23B1541', keySet: !!process.env.GEMINI_API_KEY, models: MODELS });
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  let body = req.body || {};
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const spec = TASKS[body.task];
  if (!spec) return res.status(400).json({ error: 'unknown task' });
  try {
    const { text, model } = await callGemini(spec.system, spec.user(body));
    const out = spec.validate(parseJSON(text), body);
    if (!out) return res.status(422).json({ error: 'AI output failed validation', raw: String(text).slice(0, 300) });
    return res.status(200).json({ ...out, source: 'ai', model });
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e).slice(0, 300) });
  }
}
