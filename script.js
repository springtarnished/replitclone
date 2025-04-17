const codeInput = document.getElementById('codeInput');
const runButton = document.getElementById('runButton');
const outputArea = document.getElementById('outputArea');

// --- IMPORTANT ---
// Replace this URL with the actual URL provided by Railway after deploying your backend
const BACKEND_URL = 'https://web-production-c3cd2.up.railway.app/run';
// Example: const BACKEND_URL = 'https://my-python-runner-prod.up.railway.app/run';
// For local testing (if backend runs on port 8080):
// const BACKEND_URL = 'http://localhost:8080/run';


runButton.addEventListener('click', async () => {
    const pythonCode = codeInput.value;
    outputArea.textContent = 'Running...'; // Provide feedback
    runButton.disabled = true; // Disable button while running

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: pythonCode }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle HTTP errors (e.g., 400, 500)
            outputArea.textContent = `Error from server: ${response.status} ${response.statusText}\n\n${data.error || 'Unknown error'}`;
        } else {
            // Display the output (which might include stderr messages from the backend)
            outputArea.textContent = data.output || 'No output received.';
        }

    } catch (error) {
        // Handle network errors or issues parsing JSON
        console.error('Fetch error:', error);
        outputArea.textContent = `Network error or failed to connect to backend:\n${error.message}`;
    } finally {
        runButton.disabled = false; // Re-enable button
    }
});

// Optional: Add some default code for the user
codeInput.value = `import sys

print("Hello from Python!")
print(f"Python version: {sys.version.split()[0]}")

# Example with an error
# print(1 / 0)
`;