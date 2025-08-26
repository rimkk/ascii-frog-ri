// ASCII Frog Generator JavaScript

// ASCII Art Templates
const frogTemplates = {
    'American Bullfrog': `
       @@@@@@@@@@@@@@@@@@@@@@@@
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@    @@@@    @@@@@@@@@@@@@@
@@@@@@@@@@@@    @@@@    @@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@
       @@@@@@@@@@@@@@@@@@@@@@@@`,

    'Tree Frog': `
        /\\   /\\
       (  . .)
    o_)#   #(_o
       \\_)_(_/
    .-"\\   /"-.
   /    | |    \\
  /     | |     \\
 (_______)_______)`,

    'Poison Dart Frog': `
      .-.   .-.
     /   '-'   \\
    |  o     o  |
     \\    ~    /
      | \\___/ |
      \\       /
       '-----'
       /  |  \\
      /   |   \\
     '    |    '`,

    'Toad': `
       .-"""-.
      /       \\
     |  O   O  |
     |    <    |
      \\   ---  /
       '.___.'
      /|     |\\
     / |     | \\
    |  |_____|  |
     \\         /
      '-------'`
};

// DOM Elements
const selectDropdown = document.querySelector('.select-dropdown');
const generateButton = document.querySelector('.generate-button');
const copyButton = document.querySelector('.copy-button');
const asciiArt = document.querySelector('.ascii-art');
const navTabs = document.querySelectorAll('.nav-tab');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    displayRandomFrog();
});

// Event Listeners
function setupEventListeners() {
    // Generate button click
    if (generateButton) {
        generateButton.addEventListener('click', generateRandomFrog);
    }

    // Copy button click
    if (copyButton) {
        copyButton.addEventListener('click', copyAsciiToClipboard);
    }

    // Select dropdown change event
    if (selectDropdown) {
        selectDropdown.addEventListener('change', onFrogTemplateChange);
    }

    // Navigation tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target === generateButton) {
                e.preventDefault();
                generateRandomFrog();
            }
        }
        if (e.ctrlKey && e.key === 'c') {
            if (document.activeElement === copyButton || document.activeElement.closest('.terminal-window')) {
                e.preventDefault();
                copyAsciiToClipboard();
            }
        }
    });
}

// Functions
function generateRandomFrog() {
    const templates = Object.keys(frogTemplates);
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    // Update select dropdown
    if (selectDropdown) {
        selectDropdown.value = randomTemplate;
    }
    
    // Update ASCII art with animation
    if (asciiArt) {
        asciiArt.style.opacity = '0';
        setTimeout(() => {
            asciiArt.textContent = frogTemplates[randomTemplate];
            asciiArt.style.opacity = '1';
        }, 150);
    }

    // Add generation effect
    addGenerationEffect();
}

function displayRandomFrog() {
    const templates = Object.keys(frogTemplates);
    const randomTemplate = templates[0]; // Start with American Bullfrog
    
    if (asciiArt) {
        asciiArt.textContent = frogTemplates[randomTemplate];
    }
}

function copyAsciiToClipboard() {
    if (asciiArt) {
        const text = asciiArt.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            fallbackCopyTextToClipboard(text);
        });
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback() {
    if (copyButton) {
        const originalText = copyButton.querySelector('span').textContent;
        copyButton.querySelector('span').textContent = 'Copied!';
        copyButton.style.background = 'rgba(40, 200, 64, 0.2)';
        
        setTimeout(() => {
            copyButton.querySelector('span').textContent = originalText;
            copyButton.style.background = '';
        }, 1500);
    }
}

function addGenerationEffect() {
    // Add a subtle flash effect to the terminal
    const terminal = document.querySelector('.terminal-window');
    if (terminal) {
        terminal.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.3)';
        setTimeout(() => {
            terminal.style.boxShadow = '';
        }, 300);
    }
}

function onFrogTemplateChange() {
    const selectedTemplate = selectDropdown.value;
    
    if (asciiArt && frogTemplates[selectedTemplate]) {
        asciiArt.style.opacity = '0';
        setTimeout(() => {
            asciiArt.textContent = frogTemplates[selectedTemplate];
            asciiArt.style.opacity = '1';
        }, 150);
    }
    
    // Add selection effect
    addGenerationEffect();
}

function switchTab(clickedTab) {
    // Remove active class from all tabs
    navTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    clickedTab.classList.add('active');
    
    // In a real implementation, you might switch between different generators
    // For now, we'll just show a console message
    const tabName = clickedTab.querySelector('span').textContent;
    console.log(`Switched to ${tabName} generator`);
    
    // You could add different ASCII art sets for different tab types here
    if (tabName === 'ascii-frog') {
        displayRandomFrog();
    }
}

// Terminal animation effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize with some terminal atmosphere
setTimeout(() => {
    const terminalText = document.querySelector('.terminal-text');
    if (terminalText) {
        const cursor = document.createElement('span');
        cursor.textContent = '_';
        cursor.style.animation = 'blink 1s infinite';
        cursor.style.marginLeft = '4px';
        
        // Add blinking cursor CSS if not already added
        if (!document.querySelector('#blink-style')) {
            const style = document.createElement('style');
            style.id = 'blink-style';
            style.textContent = `
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add cursor to the last paragraph
        const lastP = terminalText.querySelector('p:last-child');
        if (lastP) {
            lastP.appendChild(cursor);
        }
    }
}, 1000);
