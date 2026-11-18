// Dubki Lab — skeleton (full app follows in next commit). ET 617 · 23B1541
document.getElementById('app').innerHTML = `
  <section class="card"><h1>Float or sink? Let's find out.</h1>
  <p>A 10-minute science mission. Coming online…</p></section>`;
document.getElementById('aboutBtn').onclick = () => {
  document.getElementById('app').innerHTML = `<section class="card"><h1>About</h1>
  <p>Dubki Lab — ET 617 End-Sem 2026. Identity token: <b>23B1541</b>.</p></section>`;
};
