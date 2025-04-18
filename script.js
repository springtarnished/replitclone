// script.js
const BACKEND_URL = 'https://web-production-c3cd2.up.railway.app/run';

const runBtn   = document.getElementById('run-btn');
const codeIn   = document.getElementById('code-input');
const outputEl = document.getElementById('output');
const toggleDM = document.getElementById('toggle-dark');

runBtn.addEventListener('click', async () => {
  outputEl.textContent = 'Running…';
  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ code: codeIn.value }),
    });
    const data = await res.json();
    outputEl.textContent = data.output;
  } catch (err) {
    outputEl.textContent = 'Error connecting to backend.';
  }
});

toggleDM.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
