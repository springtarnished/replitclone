// --- Configuration ---
// IMPORTANT: Replace with the actual URL where your Flask backend is running
// If frontend is served from GitHub Pages and backend on Railway/Heroku/etc.,
// this needs to be the full public URL of the backend.
// const BACKEND_URL = 'http://127.0.0.1:8080'; // For local testing
const BACKEND_URL = 'https://web-production-c3cd2.up.railway.app/run'; // Replace with your deployed backend URL

// --- DOM Elements ---
const editorDiv = document.getElementById('editor');
const outputPre = document.getElementById('output');
const runButton = document.getElementById('run-button');
const clearButton = document.getElementById('clear-button');
const statusIndicator = document.getElementById('status-indicator');

// --- CodeMirror Setup ---
// Ensure CodeMirror objects are available (loaded from CDN/local files)
const { EditorState } = CodeMirror.state;
const { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine } = CodeMirror.view;
const { defaultKeymap, history, historyKeymap, indentWithTab } = CodeMirror.commands;
const { python } = CodeMirror.langPython;
const { bracketMatching, indentOnInput, syntaxHighlighting, defaultHighlightStyle } = CodeMirror.language;
const { lintKeymap } = CodeMirror.lint;
const { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } = CodeMirror.autocomplete;

// Theme (using the one loaded from CDN)
const editorTheme = CodeMirror.dracula; // Or try other themes like basicDark

// Basic extensions for CodeMirror
const basicSetup = [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }), // Use default highlighter
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    crosshairCursor(),
    highlightActiveLine(),
    keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...historyKeymap,
        ...completionKeymap,
        ...lintKeymap,
        indentWithTab, // Use Tab key for indentation
    ])
];

// Load initial code from local storage or use default
const initialCode = localStorage.getItem('pythonCodeDraft') || `# Welcome to the Python Runner!
import sys
import datetime

print(f"Hello from Python {sys.version.split()[0]}!")
print(f"Current time: {datetime.datetime.now()}")

# Try uncommenting the line below to see stderr
# print("This is an error message", file=sys.stderr)

# Example of input (will not work with the basic backend)
# name = input("Enter your name: ")
# print(f"Hello, {name}")
`;

const startState = EditorState.create({
    doc: initialCode,
    extensions: [
        basicSetup,
        python(), // Enable Python language support
        editorTheme // Apply the theme
        // Add other extensions as needed
    ]
});

const editorView = new EditorView({
    state: startState,
    parent: editorDiv
});

// --- Autosave ---
let autosaveTimeout;
editorView.dispatch({
    changes: { from: 0 } // Trigger an initial state change to potentially trigger update listener
}); // Force initial update to attach listener

const autosaveListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
        clearTimeout(autosaveTimeout);
        autosaveTimeout = setTimeout(() => {
            localStorage.setItem('pythonCodeDraft', editorView.state.doc.toString());
            console.log("Draft saved.");
        }, 1500); // Save 1.5 seconds after the last change
    }
});

// Add the listener as a compartment so it can be potentially reconfigured
editorView.dispatch({
    effects: CodeMirror.state.StateEffect.appendConfig.of(autosaveListener)
});


// --- Status Update Function ---
function updateStatus(state, message = '') {
    statusIndicator.className = `status ${state}`; // e.g., 'status running'
    let text = state.charAt(0).toUpperCase() + state.slice(1); // Capitalize
    if (message) {
        text += `: ${message}`;
    } else if (state === 'ready') {
        text = 'Ready';
    } else if (state === 'running') {
        text = 'Running...';
    }
    statusIndicator.textContent = text;
}

// --- Backend Interaction ---
async function runCode() {
    const code = editorView.state.doc.toString();
    if (!code.trim()) {
        outputPre.textContent = "Editor is empty. Nothing to run.";
        return;
    }

    runButton.disabled = true;
    clearButton.disabled = true;
    outputPre.textContent = 'Running code...';
    updateStatus('running');

    try {
        const response = await fetch(`${BACKEND_URL}/run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        });

        const result = await response.json();

        if (!response.ok) {
            // Handle HTTP errors (e.g., 400, 500) from Flask
            outputPre.textContent = `Backend Error: ${response.status} ${response.statusText}\n\n${result.error || 'Unknown error'}`;
             updateStatus('error', `Backend Error ${response.status}`);
        } else {
            // Process successful response (status 200)
            displayOutput(result.output, result.error);
             updateStatus(result.error ? 'error' : 'success', result.error ? 'Finished with errors' : 'Finished');
        }

    } catch (error) {
        console.error("Network or fetch error:", error);
        outputPre.textContent = `Error connecting to backend: ${error.message}\n\nIs the backend server running at ${BACKEND_URL}?`;
         updateStatus('error', 'Connection Failed');
    } finally {
        runButton.disabled = false;
        clearButton.disabled = false;
        // Optionally re-focus the editor
        // editorView.focus();
    }
}

// --- Output Display ---
function displayOutput(outputText, errorOccurred) {
     // Clear previous output
    outputPre.innerHTML = '';

    // Simple check for common error indicators in the output text itself
    const timeoutPattern = /Execution timed out/i;
    const stderrPattern = /--- STDERR ---/i;
    const exitCodePattern = /--- Exited with code (\d+) ---/i;

    if (timeoutPattern.test(outputText)) {
        const timeoutSpan = document.createElement('span');
        timeoutSpan.className = 'timeout-error';
        timeoutSpan.textContent = outputText;
        outputPre.appendChild(timeoutSpan);
    } else if (stderrPattern.test(outputText)) {
         // Split output by the stderr marker
        const parts = outputText.split(stderrPattern);

        // Display stdout part normally
        const stdoutSpan = document.createElement('span');
        stdoutSpan.textContent = parts[0];
        outputPre.appendChild(stdoutSpan);

        if (parts.length > 1) {
            // Display stderr part with special styling
            const stderrContent = parts[1].trim();
            const stderrSpan = document.createElement('span');
            stderrSpan.className = 'stderr-output';

            // Check for exit code within stderr part
            const exitCodeMatch = stderrContent.match(exitCodePattern);
            if (exitCodeMatch) {
                 const stderrText = stderrContent.replace(exitCodePattern, '').trim();
                 stderrSpan.textContent = `\n--- STDERR ---\n${stderrText}`;
                 outputPre.appendChild(stderrSpan);

                 const exitCodeSpan = document.createElement('span');
                 exitCodeSpan.className = 'exit-code-info';
                 exitCodeSpan.textContent = `\n--- Exited with code ${exitCodeMatch[1]} ---`;
                 outputPre.appendChild(exitCodeSpan);
            } else {
                 stderrSpan.textContent = `\n--- STDERR ---\n${stderrContent}`;
                 outputPre.appendChild(stderrSpan);
            }
        }
    }
     else {
         // No specific error markers found, display as plain text
        outputPre.textContent = outputText;
    }

    // Scroll to the bottom of the output pane
    outputPre.scrollTop = outputPre.scrollHeight;
}


// --- Event Listeners ---
runButton.addEventListener('click', runCode);

clearButton.addEventListener('click', () => {
    outputPre.textContent = '';
    updateStatus('ready'); // Reset status
});

// Keyboard shortcut (Ctrl+Enter or Cmd+Enter)
editorDiv.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault(); // Prevent default newline insertion
        runCode();
    }
});

// --- Initial Status ---
updateStatus('ready');