// --- IMPORTANT: Backend URL and Local Storage Key remain the same ---
const BACKEND_URL = 'https://web-production-c3cd2.up.railway.app/run'; // Use your actual URL
const LOCAL_STORAGE_KEY = 'pythonCode';

// --- Get DOM Elements ---
// const codeInput = document.getElementById('codeInput'); // Remove this
const runButton = document.getElementById('runButton');
const outputArea = document.getElementById('outputArea');
const clearButton = document.getElementById('clearButton');
const spinner = document.getElementById('spinner'); // Get spinner element

// --- Initialize Ace Editor ---
var editor = ace.edit("editor"); // Use the ID of the div
editor.setTheme("ace/theme/monokai"); // Set theme
editor.session.setMode("ace/mode/python"); // Set language mode
editor.setOptions({
    fontSize: "1rem", // Match font size if desired
    useSoftTabs: true,
    tabSize: 4,
    wrap: true // Enable line wrapping
});


// --- Load Code from Local Storage on Page Load ---
function loadCode() {
    const savedCode = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCode) {
        editor.setValue(savedCode, -1); // Use editor.setValue(), -1 moves cursor to start
    } else {
        // Set default code in the editor
        editor.setValue(`import sys
import platform

print("Hello from Python!")
print(f"Python version: {sys.version.split()[0]}")
print(f"OS: {platform.system()} {platform.release()}")

# Example with an error (uncomment to test stderr)
# print(1 / 0)
`, -1); // -1 moves cursor to start
    }
}

// --- Save Code to Local Storage on Editor Change ---
editor.session.on('change', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, editor.getValue());
});

// --- Run Code Logic ---
runButton.addEventListener('click', async () => {
    const pythonCode = editor.getValue(); // Get code from Ace editor
    // Save one last time (optional, change event should cover it)
    localStorage.setItem(LOCAL_STORAGE_KEY, pythonCode);

    // Show loading state
    outputArea.textContent = 'Running...';
    outputArea.className = '';
    runButton.disabled = true;
    runButton.textContent = 'Running...';
    spinner.style.display = 'inline-block'; // Show spinner

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: pythonCode }),
        });

        outputArea.textContent = ''; // Clear 'Running...' message
        const data = await response.json();

        if (!response.ok) {
            outputArea.innerHTML = `<span class="error-message">Server Error: ${response.status} ${response.statusText}<br>${data.error || 'Unknown server error'}</span>`;
        } else {
            // Display results (same logic as before)
            if (data.error) {
                 const errorSpan = document.createElement('span');
                 errorSpan.className = 'error-message';
                 errorSpan.textContent = data.error;
                 outputArea.appendChild(errorSpan);
                 outputArea.appendChild(document.createElement('br'));
            }
            if (data.stdout) {
                 const stdoutSpan = document.createElement('span');
                 stdoutSpan.textContent = data.stdout;
                 outputArea.appendChild(stdoutSpan);
            }
            if (data.stderr) {
                 const stderrSpan = document.createElement('span');
                 stderrSpan.className = 'stderr-output';
                 stderrSpan.textContent = data.stderr;
                 outputArea.appendChild(stderrSpan);
            }
            if (!data.stdout && !data.stderr && !data.error) {
                outputArea.textContent = '(No output)';
            }
        }

    } catch (error) {
        console.error('Fetch error:', error);
        outputArea.textContent = ''; // Clear 'Running...'
        outputArea.innerHTML = `<span class="error-message">Network error or failed to connect to backend:<br>${error.message}</span>`;
    } finally {
        // Hide loading state
        runButton.disabled = false;
        runButton.textContent = 'Run Code';
        spinner.style.display = 'none'; // Hide spinner
    }
});

// --- Clear Output Logic (remains the same) ---
clearButton.addEventListener('click', () => {
    outputArea.textContent = '';
    outputArea.className = '';
});

// --- Initial Load ---
loadCode(); // Load code into Ace editor when the script runs