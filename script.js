const BACKEND_URL = 'https://web-production-c3cd2.up.railway.app/run';

// 1) Initialize CodeMirror from the textarea
const textarea = document.getElementById('code-input');
const editor = CodeMirror.fromTextArea(textarea, {
  mode: 'python',
  lineNumbers: true,
  indentUnit: 4,
  matchBrackets: true,
  autofocus: true,
});

// 2) Snippet library data
const snippets = [
  { name: 'Import math', code: 'import math\n' },
  { name: 'Import requests', code: 'import requests\n' },
  {
    name: 'HTTP GET (requests)',
    code:
`import requests
resp = requests.get("https://api.example.com/data")
print(resp.json())
`
  },
  {
    name: 'Fibonacci function',
    code:
`def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print([fib(i) for i in range(10)])
`
  }
];

// 3) Populate snippet dropdown
const sel = document.getElementById('snippet-select');
snippets.forEach((s, i) => {
  const o = document.createElement('option');
  o.value = i;
  o.textContent = s.name;
  sel.appendChild(o);
});

// 4) Insert snippet at cursor
document.getElementById('insert-snippet').onclick = () => {
  const idx = sel.value;
  if (idx === '') return;
  const snippet = snippets[idx].code;
  const doc = editor.getDoc();
  const pos = doc.getCursor();
  doc.replaceRange(snippet, pos);
};

// 5) Run code
document.getElementById('run-btn').onclick = async () => {
  const out = document.getElementById('output');
  out.textContent = 'Running…';
  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ code: editor.getValue() }),
    });
    const data = await res.json();
    out.textContent = data.output;
  } catch (e) {
    out.textContent = '❌ Error connecting to backend';
  }
};

// 6) Dark‑mode toggle
document.getElementById('toggle-dark').onclick = () => {
  document.body.classList.toggle('dark');
};
