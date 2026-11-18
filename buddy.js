/* Bubbles 🫧 — feelings buddy (viva change) · ET 617 · 23B1541
   A floating side-chat agent. After every answer it pops open, asks
   "How do you feel?" with emoji, replies to encourage, then shrinks back
   into a small circle. Tap the circle anytime to talk again.
   All words live in BUDDY below, so they are easy to change. */

const BUDDY = {
  ask: {
    correct: ['You got that right! 🎉 How do you feel?', 'Spot on! ⭐ How are you feeling now?', 'Yes! That’s correct! 🙌 How do you feel?'],
    surprise: ['Woah, that was a surprise! 😮 How do you feel?', 'Ooh, a surprise result! 🔍 How are you feeling?', 'Plot twist! 🌊 How do you feel about that one?'],
    idle: ['Hi! I’m Bubbles 🫧 How are you feeling right now?'],
  },
  moods: [['😄', 'great'], ['🙂', 'good'], ['😐', 'okay'], ['😕', 'unsure'], ['😟', 'worried']],
  reply: {
    correct: {
      great: 'Yesss! 🎉 That smile is earned — your brain did that!',
      good: 'Nice! 🌟 You’re really getting the hang of this.',
      okay: 'Correct AND calm — that’s how real scientists work. 🧪',
      unsure: 'You got it right even while unsure — you know more than you think! 💪',
      worried: 'Hey, you got it RIGHT! 🌈 Take a slow breath — you’re doing great.',
    },
    surprise: {
      great: 'Love that energy! 😄 Surprises are where the learning happens.',
      good: 'That’s the spirit! 🔍 Let’s find out why — together.',
      okay: 'Fair enough 🙂 Every surprise is a clue. Let’s use it!',
      unsure: 'Totally normal 🤗 Even scientists get surprised. Try the hint — one small step.',
      worried: 'It’s okay 💛 This is a safe place to be wrong. No marks, no rush. You’ve got this!',
    },
    idle: {
      great: 'Woohoo! 😄 Let’s keep going!', good: 'Lovely 🙂 On we go!', okay: 'Okay! Small steps 🐢',
      unsure: 'That’s fine 🤗 Tap “I’m stuck” any time.', worried: 'I’m right here 💛 You can Save & stop anytime.',
    },
  },
  breakMsg: 'Feeling worried twice in a row? 💛 Want a short break? Your progress is saved.',
};

const buddy = (() => {
  const el = document.createElement('div');
  el.id = 'buddy';
  el.innerHTML = `<button class="bd-ball" aria-label="Talk to Bubbles, your feelings buddy"><span class="bd-face">🫧</span></button>
    <div class="bd-card" role="dialog" aria-live="polite" aria-label="Bubbles asks how you feel">
      <div class="bd-head"><span class="bd-av">🫧</span><b>Bubbles</b><button class="bd-x" aria-label="Close">×</button></div>
      <p class="bd-msg"></p><div class="bd-moods"></div><div class="bd-extra"></div></div>`;
  document.body.appendChild(el);
  const $b = (s) => el.querySelector(s);
  let kind = 'idle', worriedRun = 0, closeT;
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const track = (ev, data) => { try { if (typeof log === 'function') log(ev, data); } catch (e) {} };

  function open(k, msg) {
    clearTimeout(closeT); kind = k;
    $b('.bd-msg').textContent = msg || pick(BUDDY.ask[k] || BUDDY.ask.idle);
    $b('.bd-moods').innerHTML = BUDDY.moods.map(([e, m]) => `<button class="bd-mood" data-m="${m}" aria-label="${m}">${e}</button>`).join('');
    $b('.bd-extra').innerHTML = '';
    el.classList.remove('done'); el.classList.add('open');
  }
  function close(face) {
    el.classList.remove('open'); el.classList.add('done');
    $b('.bd-face').textContent = face || '🫧';
    setTimeout(() => { $b('.bd-face').textContent = '🫧'; el.classList.remove('done'); }, 1800);
  }
  function burst(emojis) {
    for (let i = 0; i < 10; i++) {
      const s = document.createElement('span'); s.className = 'bd-spark'; s.textContent = pick(emojis);
      s.style.setProperty('--dx', (Math.random() * 160 - 80).toFixed(0) + 'px');
      s.style.setProperty('--dy', (-60 - Math.random() * 120).toFixed(0) + 'px');
      s.style.animationDelay = (i * 0.04).toFixed(2) + 's';
      el.appendChild(s); setTimeout(() => s.remove(), 1400);
    }
  }
  el.addEventListener('click', (e) => {
    if (e.target.closest('.bd-ball')) { el.classList.contains('open') ? close() : open('idle'); return; }
    if (e.target.closest('.bd-x')) { close(); return; }
    if (e.target.closest('.bd-break')) { close('💤'); document.getElementById('saveBtn').click(); return; }
    const mb = e.target.closest('.bd-mood'); if (!mb) return;
    const mood = mb.dataset.m; const face = mb.textContent;
    el.querySelectorAll('.bd-mood').forEach((b) => b.classList.toggle('picked', b === mb));
    worriedRun = mood === 'worried' ? worriedRun + 1 : 0;
    track('feeling', { after: kind, mood });
    $b('.bd-msg').textContent = (BUDDY.reply[kind] || BUDDY.reply.idle)[mood];
    if (mood === 'great' || mood === 'good') burst(kind === 'correct' ? ['🎉', '⭐', '✨', '💙'] : ['🫧', '✨', '🔍']);
    if (worriedRun >= 2) {
      $b('.bd-extra').innerHTML = `<p class="bd-small">${BUDDY.breakMsg}</p><button class="bd-break">💾 Take a break</button>`;
      closeT = setTimeout(() => close(face), 6500); return;
    }
    closeT = setTimeout(() => close(face), 2600);
  });
  // ask after a short delay so the learner first sees the feedback
  return { ask: (k, delay = 1400) => setTimeout(() => open(k), delay), open, close };
})();
