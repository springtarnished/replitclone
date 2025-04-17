const codeInput = document.getElementById('codeInput');
const runButton = document.getElementById('runButton');
const outputArea = document.getElementById('outputArea');
const clearButton = document.getElementById('clearButton'); // Get the clear button

// --- IMPORTANT ---
// Replace this URL with the actual URL provided by Railway after deploying your backend
const BACKEND_URL = 'https://your-railway-app-name.up.railway.app/run';
// Example: const BACKEND_URL = 'https://my-python-runner-prod.up.railway.app/run';
// For local testing (if backend runs on port 8080):
// const BACKEND_URL = 'http://localhost:8080/run';

const LOCAL_STORAGE_KEY = 'pythonCode';

// --- Load Code from Local Storage on Page Load ---
function loadCode() {
    const savedCode = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCode) {
        codeInput.value = savedCode;
    } else {
        // Optional: Set default code if nothing is saved
        codeInput.value = `import sys
import platform

print("Hello from Python!")
print(f"Python version: {sys.version.split()[0]}")
print(f"OS: {platform.system()} {platform.release()}")

# Example with an error (uncomment to test stderr)
# print(1 / 0)
`;
    }
}

// --- Save Code to Local Storage on Input ---
codeInput.addEventListener('input', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, codeInput.value);
});

// --- Run Code Logic ---
runButton.addEventListener('click', async () => {
    const pythonCode = codeInput.value;
    // Save one last time before running (optional, input event should cover it)
    localStorage.setItem(LOCAL_STORAGE_KEY, pythonCode);

    outputArea.textContent = 'Running...'; // Provide feedback
    outputArea.className = ''; // Reset classes
    runButton.disabled = true; // Disable button while running
    runButton.textContent = 'Running...'; // Change button text

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: pythonCode }),
        });

        // Clear previous output before adding new results
        outputArea.textContent = '';

        const data = await response.json();

        if (!response.ok) {
            // Handle HTTP errors (e.g., 400, 500) from Flask itself
            outputArea.innerHTML = `<span class="error-message">Server Error: ${response.status} ${response.statusText}<br>${data.error || 'Unknown server error'}</span>`;
        } else {
            // Handle backend execution results (success or Python errors)

            // Display general errors (like timeout)
            if (data.error) {
                 const errorSpan = document.createElement('span');
                 errorSpan.className = 'error-message';
                 errorSpan.textContent = data.error;
                 outputArea.appendChild(errorSpan);
                 outputArea.appendChild(document.createElement('br')); // Newline
            }

            // Display standard output
            if (data.stdout) {
                 const stdoutSpan = document.createElement('span');
                 stdoutSpan.textContent = data.stdout;
                 outputArea.appendChild(stdoutSpan);
            }

            // Display standard error (styled differently)
            if (data.stderr) {
                 const stderrSpan = document.createElement('span');
                 stderrSpan.className = 'stderr-output'; // Apply error styling
                 stderrSpan.textContent = data.stderr;
                 outputArea.appendChild(stderrSpan);
            }

             // If no output or errors at all
            if (!data.stdout && !data.stderr && !data.error) {
                outputArea.textContent = '(No output)';
            }
        }

    } catch (error) {
        // Handle network errors or issues parsing JSON
        console.error('Fetch error:', error);
        outputArea.innerHTML = `<span class="error-message">Network error or failed to connect to backend:<br>${error.message}</span>`;
    } finally {
        runButton.disabled = false; // Re-enable button
        runButton.textContent = 'Run Code'; // Restore button text
    }
});

// --- Clear Output Logic ---
clearButton.addEventListener('click', () => {
    outputArea.textContent = '';
    outputArea.className = ''; // Reset any error classes
});

// --- Initial Load ---
loadCode(); // Load code when the script runs