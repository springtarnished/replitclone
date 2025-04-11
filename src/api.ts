export async function runCode(code: string, language: 'python' | 'html') {
    const res = await fetch('https://your-backend-url.onrailway.app/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    });
    return res.json();
  }
  