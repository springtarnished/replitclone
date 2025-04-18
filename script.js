// --- Constants and Configuration ---
const BACKEND_URL = 'https://web-production-c3cd2.up.railway.app/run';
const CURRENT_SCRIPT_KEY = 'pythonCode';
const SAVED_SCRIPTS_KEY = 'savedPythonScripts';
const THEME_KEY = 'editorTheme';
const WRAP_KEY = 'editorWrap';

// --- Code Examples ---
const CODE_EXAMPLES = {
    hello: `print("Hello, World!")
name = input("What's your name? ")
print(f"Hello, {name}! Welcome to Python Runner Pro.")`,

    math: `# Basic math operations in Python
a = 10
b = 5

print(f"a = {a}, b = {b}")
print(f"Addition: {a} + {b} = {a + b}")
print(f"Subtraction: {a} - {b} = {a - b}")
print(f"Multiplication: {a} * {b} = {a * b}")
print(f"Division: {a} / {b} = {a / b}")
print(f"Integer Division: {a} // {b} = {a // b}")
print(f"Modulus: {a} % {b} = {a % b}")
print(f"Exponentiation: {a} ** {b} = {a ** b}")

# More complex math
import math
print(f"Square root of {a}: {math.sqrt(a)}")
print(f"π (pi): {math.pi}")
print(f"sin(π/2): {math.sin(math.pi/2)}")`,

    loops: `# Working with loops and lists
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# For loop
print("Fruits in the list:")
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit.capitalize()}")

# List comprehension
uppercase_fruits = [fruit.upper() for fruit in fruits]
print("\\nUppercase fruits:")
print(uppercase_fruits)

# While loop with break
print("\\nSearching for 'cherry'...")
i = 0
while i < len(fruits):
    if fruits[i] == "cherry":
        print(f"Found 'cherry' at position {i+1}!")
        break
    print(f"Checked {fruits[i]}, moving on...")
    i += 1
    
# Nested loops
print("\\nLetter counts in each fruit:")
for fruit in fruits:
    count = {}
    for letter in fruit:
        if letter in count:
            count[letter] += 1
        else:
            count[letter] = 1
    print(f"{fruit}: {count}")`,

    functions: `# Functions in Python
def greet(name, greeting="Hello"):
    """Return a greeting message."""
    return f"{greeting}, {name}!"

def calculate_area(shape, **kwargs):
    """Calculate area of different shapes."""
    if shape == "rectangle":
        return kwargs.get("length", 0) * kwargs.get("width", 0)
    elif shape == "circle":
        return 3.14159 * kwargs.get("radius", 0) ** 2
    elif shape == "triangle":
        return 0.5 * kwargs.get("base", 0) * kwargs.get("height", 0)
    else:
        return 0

# Basic function call
print(greet("Alice"))
print(greet("Bob", greeting="Hi"))

# Using default parameters
print("\\nCalculating areas:")
print(f"Rectangle (3×5): {calculate_area('rectangle', length=3, width=5)}")
print(f"Circle (radius 4): {calculate_area('circle', radius=4)}")
print(f"Triangle (base 6, height 8): {calculate_area('triangle', base=6, height=8)}")

# Lambda function
double = lambda x: x * 2
numbers = [1, 2, 3, 4, 5]
doubled = list(map(double, numbers))
print("\\nNumbers:", numbers)
print("Doubled:", doubled)`,

    classes: `# Object-oriented programming in Python
class Animal:
    """Base class for animals"""
    def __init__(self, name, species):
        self.name = name
        self.species = species
        
    def make_sound(self):
        return "Some generic animal sound"
        
    def __str__(self):
        return f"{self.name} the {self.species}"

class Dog(Animal):
    """Dog class that inherits from Animal"""
    def __init__(self, name, breed):
        super().__init__(name, "Dog")
        self.breed = breed
        
    def make_sound(self):
        return "Woof!"
        
    def __str__(self):
        return f"{self.name} the {self.breed} dog"

class Cat(Animal):
    """Cat class that inherits from Animal"""
    def __init__(self, name, color):
        super().__init__(name, "Cat")
        self.color = color
        
    def make_sound(self):
        return "Meow!"
        
    def __str__(self):
        return f"{self.name} the {self.color} cat"

# Create some animals
fido = Dog("Fido", "Golden Retriever")
whiskers = Cat("Whiskers", "tabby")

# Use the animals
animals = [fido, whiskers]
for animal in animals:
    print(f"{animal} says: {animal.make_sound()}")

# Demonstrate polymorphism
def animal_sounds(animals):
    for animal in animals:
        print(f"{animal.name} says {animal.make_sound()}")
        
print("\\nDemonstrating polymorphism:")
animal_sounds(animals)`,

    fileio: `# File I/O Operations

# Write to a file
filename = "example.txt"

print(f"Writing to {filename}...")
with open(filename, "w") as file:
    file.write("Hello, this is line 1!\\n")
    file.write("This is line 2.\\n")
    file.write("And finally, line 3.\\n")

print(f"Successfully wrote to {filename}\\n")

# Read from a file
print(f"Reading from {filename}:")
try:
    with open(filename, "r") as file:
        content = file.read()
        print("File content:")
        print(content)
except FileNotFoundError:
    print(f"Error: {filename} not found.")

# Read line by line
print("\\nReading line by line:")
try:
    with open(filename, "r") as file:
        for i, line in enumerate(file, 1):
            print(f"Line {i}: {line.strip()}")
except FileNotFoundError:
    print(f"Error: {filename} not found.")

# Append to a file
print("\\nAppending to the file...")
with open(filename, "a") as file:
    file.write("This line was appended!\\n")

# Read the updated file
print("\\nReading the updated file:")
with open(filename, "r") as file:
    content = file.read()
    print(content)`,

    error: `# Error Handling in Python
import sys

def divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Division by zero!")
        return None
    except TypeError:
        print("Error: Invalid types for division!")
        return None
    finally:
        print("This always executes")

# Normal case
print("10 / 2 =", divide(10, 2))

# Division by zero
print("\\n10 / 0 =", divide(10, 0))

# Type error
print("\\n'10' / 2 =", divide("10", 2))

# Custom exceptions
class NegativeNumberError(Exception):
    pass

def square_root(n):
    if n < 0:
        raise NegativeNumberError("Cannot compute square root of a negative number")
    return n ** 0.5

# Using a try/except with custom exception
try:
    num = -25
    print(f"Square root of {num} =", square_root(num))
except NegativeNumberError as e:
    print(f"Error: {e}")

# Showing error traceback
def recursive_function(n):
    if n <= 0:
        return
    print(f"Recursion level: {n}")
    # Uncomment below to see a stack trace:
    # 1/0
    recursive_function(n - 1)

try:
    recursive_function(5)
except Exception as e:
    print(f"Error caught: {e}")
    print("\\nTraceback info:")
    import traceback
    traceback.print_exc(file=sys.stdout)`
};

// --- Editor Configuration ---
let editor;
let isDarkTheme = false;
let isWrapping = true;

// --- Dom Elements ---
const runButton = document.getElementById('runButton');
const outputArea = document.getElementById('outputArea');
const clearButton = document.getElementById('clearButton');
const spinner = document.getElementById('spinner');
const exampleSelect = document.getElementById('exampleSelect');
const themeToggle = document.getElementById('themeToggle');
const wrapBtn = document.getElementById('wrapBtn');
const formatBtn = document.getElementById('formatBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const uploadFile = document.getElementById('uploadFile');
const saveScriptBtn = document.getElementById('saveScript');
const scriptNameInput = document.getElementById('scriptName');
const savedScriptsContainer = document.getElementById('savedScripts');

// --- Initialize Ace Editor ---
function initEditor() {
    // Basic initialization first
    editor = ace.edit("editor");
    editor.session.setMode("ace/mode/python");
    
    // Set some basic options
    editor.setOptions({
        fontSize: "14px",
        tabSize: 4,
        useSoftTabs: true
    });
    
    // Try to add advanced features if available
    try {
        ace.require("ace/ext/language_tools");
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
        });
    } catch (e) {
        console.log("Language tools not available, continuing with basic editor");
    }
    
    // Set default theme based on saved preference or system preference
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        isDarkTheme = savedTheme === 'dark';
    } else {
        // Try to detect system preference
        isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply theme
    updateTheme();
    
    // Set wrap mode from saved preference
    const savedWrap = localStorage.getItem(WRAP_KEY);
    isWrapping = savedWrap === null ? true : savedWrap === 'true';
    editor.session.setUseWrapMode(isWrapping);
    updateWrapButton();
    
    // Set up change event to save code
    editor.session.on('change', () => {
        localStorage.setItem(CURRENT_SCRIPT_KEY, editor.getValue());
    });
    
    // Force editor to refresh size
    setTimeout(() => {
        editor.resize();
    }, 200);
}

// --- Theme Management ---
function updateTheme() {
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
        editor.setTheme("ace/theme/monokai");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        editor.setTheme("ace/theme/github");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem(THEME_KEY, isDarkTheme ? 'dark' : 'light');
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    updateTheme();
}

// --- Line Wrapping ---
function toggleWrap() {
    isWrapping = !isWrapping;
    editor.session.setUseWrapMode(isWrapping);
    updateWrapButton();
    localStorage.setItem(WRAP_KEY, isWrapping.toString());
}

function updateWrapButton() {
    if (isWrapping) {
        wrapBtn.classList.add('active');
    } else {
        wrapBtn.classList.remove('active');
    }
}

// --- Fullscreen Mode ---
function toggleFullscreen() {
    const editorContainer = document.querySelector('.editor-container');
    if (editorContainer.classList.contains('fullscreen')) {
        editorContainer.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    } else {
        editorContainer.classList.add('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    }
    editor.resize();
}

// --- Code Formatting ---
function formatCode() {
    // Getting current cursor position
    const cursor = editor.getCursorPosition();
    
    // This isn't a true Python formatter but adds some basic spacing
    let code = editor.getValue();
    
    // Add spacing after commas if there isn't one
    code = code.replace(/,([^\s])/g, ', $1');
    
    // Add spacing around operators
    const operators = ['=', '+', '-', '*', '/', '%', '==', '!=', '>=', '<=', '>', '<'];
    operators.forEach(op => {
        // Skip formatting inside strings
        // This is a simplistic approach - a real formatter would be more sophisticated
        const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        code = code.replace(new RegExp(`([^\\s"'])${escapedOp}([^\\s"'])`, 'g'), `$1 ${op} $2`);
    });
    
    // Set the formatted code
    editor.setValue(code);
    
    // Restore cursor position
    editor.moveCursorToPosition(cursor);
    editor.clearSelection();
}

// --- Copy to Clipboard ---
function copyOutput() {
    const text = outputArea.textContent;
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Visual feedback for error
        copyBtn.innerHTML = '<i class="fas fa-times"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 1500);
    });
}

// --- File Operations ---
function downloadCode() {
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'python_script.py';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        editor.setValue(e.target.result, -1);
    };
    reader.readAsText(file);
    
    // Reset the file input so the same file can be selected again
    event.target.value = '';
}

// --- Saved Scripts Management ---
function loadSavedScripts() {
    const savedScripts = getSavedScripts();
    
    // Clear container
    savedScriptsContainer.innerHTML = '';
    
    if (Object.keys(savedScripts).length === 0) {
        savedScriptsContainer.innerHTML = '<div class="empty-state">No saved scripts</div>';
        return;
    }
    
    // Create elements for each saved script
    const template = document.getElementById('savedScriptTemplate');
    
    Object.entries(savedScripts).forEach(([name, code]) => {
        const clone = template.content.cloneNode(true);
        const scriptElement = clone.querySelector('.saved-script');
        const scriptName = clone.querySelector('.script-name');
        const loadButton = clone.querySelector('.load-script');
        const deleteButton = clone.querySelector('.delete-script');
        
        scriptName.textContent = name;
        scriptElement.dataset.name = name;
        
        loadButton.addEventListener('click', () => loadScript(name));
        deleteButton.addEventListener('click', () => deleteScript(name));
        
        savedScriptsContainer.appendChild(clone);
    });
}

function saveCurrentScript() {
    const name = scriptNameInput.value.trim();
    if (!name) {
        alert('Please enter a name for your script');
        return;
    }
    
    const code = editor.getValue();
    if (!code) {
        alert('Cannot save empty script');
        return;
    }
    
    const savedScripts = getSavedScripts();
    
    // If script already exists, confirm overwrite
    if (savedScripts[name] && !confirm(`Script "${name}" already exists. Overwrite?`)) {
        return;
    }
    
    // Save the script
    savedScripts[name] = code;
    localStorage.setItem(SAVED_SCRIPTS_KEY, JSON.stringify(savedScripts));
    
    // Clear input
    scriptNameInput.value = '';
    
    // Refresh the list
    loadSavedScripts();
    
    // Visual feedback
    saveScriptBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        saveScriptBtn.innerHTML = '<i class="fas fa-save"></i>';
    }, 1500);
}

function loadScript(name) {
    const savedScripts = getSavedScripts();
    if (savedScripts[name]) {
        editor.setValue(savedScripts[name], -1);
    }
}

function deleteScript(name) {
    if (!confirm(`Delete script "${name}"?`)) {
        return;
    }
    
    const savedScripts = getSavedScripts();
    delete savedScripts[name];
    localStorage.setItem(SAVED_SCRIPTS_KEY, JSON.stringify(savedScripts));
    
    // Refresh the list
    loadSavedScripts();
}

function getSavedScripts() {
    const scripts = localStorage.getItem(SAVED_SCRIPTS_KEY);
    return scripts ? JSON.parse(scripts) : {};
}

// --- Load Code ---
function loadCode() {
    const savedCode = localStorage.getItem(CURRENT_SCRIPT_KEY);
    if (savedCode) {
        editor.setValue(savedCode, -1);
    } else {
        // Set default code
        editor.setValue(CODE_EXAMPLES.hello, -1);
    }
}

// --- Run Code Logic ---
async function runCode() {
    const pythonCode = editor.getValue();
    
    // Save current code
    localStorage.setItem(CURRENT_SCRIPT_KEY, pythonCode);
    
    // Show loading state
    outputArea.innerHTML = '<span class="stdout-output">Running...</span>';
    runButton.disabled = true;
    spinner.style.display = 'flex';
    
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: pythonCode }),
        });
        
        outputArea.textContent = '';
        const data = await response.json();
        
        if (!response.ok) {
            outputArea.innerHTML = `<span class="error-message">Server Error: ${response.status} ${response.statusText}<br>${data.error || 'Unknown server error'}</span>`;
        } else {
            // Handle different response formats
            if (data.error) {
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error-message';
                errorSpan.textContent = data.error;
                outputArea.appendChild(errorSpan);
                outputArea.appendChild(document.createElement('br'));
            }
            
            // Check for the old API format
            if (data.output !== undefined) {
                // Old API format
                outputArea.textContent = data.output;
            } else if (data.stdout || data.stderr) {
                // New API format with separate stdout/stderr
                if (data.stdout) {
                    const stdoutSpan = document.createElement('span');
                    stdoutSpan.className = 'stdout-output';
                    stdoutSpan.textContent = data.stdout;
                    outputArea.appendChild(stdoutSpan);
                }
                
                if (data.stderr) {
                    if (data.stdout) {
                        outputArea.appendChild(document.createElement('br'));
                    }
                    const stderrSpan = document.createElement('span');
                    stderrSpan.className = 'stderr-output';
                    stderrSpan.textContent = data.stderr;
                    outputArea.appendChild(stderrSpan);
                }
            }
            
            // If no output was received
            if (outputArea.textContent === '') {
                outputArea.textContent = '(No output)';
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        outputArea.innerHTML = `<span class="error-message">Network error or failed to connect to backend:<br>${error.message}</span>`;
    } finally {
        // Hide loading state
        runButton.disabled = false;
        spinner.style.display = 'none';
    }
}

// --- Clear Output ---
function clearOutput() {
    outputArea.textContent = '';
}

// --- Load Example ---
function loadExample() {
    const example = exampleSelect.value;
    if (example && CODE_EXAMPLES[example]) {
        if (editor.getValue().trim() !== '' && 
            !confirm('This will replace your current code. Continue?')) {
            exampleSelect.value = ''; // Reset select
            return;
        }
        
        editor.setValue(CODE_EXAMPLES[example], -1);
        exampleSelect.value = ''; // Reset select
    }
}

// --- Keyboard Shortcuts ---
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });
}

// --- Event Listeners ---
function setupEventListeners() {
    // Run button
    runButton.addEventListener('click', runCode);
    
    // Clear output button
    clearButton.addEventListener('click', clearOutput);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Examples dropdown
    exampleSelect.addEventListener('change', loadExample);
    
    // Line wrap toggle
    wrapBtn.addEventListener('click', toggleWrap);
    
    // Format code button
    formatBtn.addEventListener('click', formatCode);
    
    // Fullscreen mode button
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Copy output button
    copyBtn.addEventListener('click', copyOutput);
    
    // Download code button
    downloadBtn.addEventListener('click', downloadCode);
    
    // Upload file
    uploadFile.addEventListener('change', handleFileUpload);
    
    // Save script
    saveScriptBtn.addEventListener('click', saveCurrentScript);
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
}

// --- Initialization ---
function init() {
    initEditor();
    loadCode();
    loadSavedScripts();
    setupEventListeners();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init);