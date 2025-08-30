// Application data and defaults
const defaults = {
  projectType: "Landing Page",
  designStyle: "Minimalist",
  theme: "Dark",
  primaryColor: "#3B82F6",
  paletteType: "Monochrome",
  shadowDepth: 2, // Maps to "Medium"
  deviceTarget: "Desktop",
  cssFramework: "Tailwind CSS",
  typography: "Geist",
  animationType: "Rotate",
  accessibilityLevel: "AA",
  jsLibrary: "Vanilla JS"
};

const shadowDepthMap = ["None", "Light", "Medium", "Heavy"];

// DOM Elements
const formElements = {
  projectType: document.getElementById('projectType'),
  designStyle: document.getElementById('designStyle'),
  theme: document.getElementById('theme'),
  primaryColor: document.getElementById('primaryColor'),
  colorText: document.getElementById('colorText'),
  paletteType: document.getElementById('paletteType'),
  shadowDepth: document.getElementById('shadowDepth'),
  deviceTarget: document.getElementById('deviceTarget'),
  cssFramework: document.getElementById('cssFramework'),
  typography: document.getElementById('typography'),
  animationType: document.getElementById('animationType'),
  accessibilityLevel: document.getElementById('accessibilityLevel'),
  jsLibrary: document.getElementById('jsLibrary')
};

const outputElements = {
  promptOutput: document.getElementById('promptOutput'),
  codeOutput: document.getElementById('codeOutput'),
  toast: document.getElementById('toast'),
  toastMessage: document.getElementById('toastMessage')
};

const buttons = {
  resetBtn: document.getElementById('resetBtn'),
  copyPromptBtn: document.getElementById('copyPromptBtn'),
  copyCodeBtn: document.getElementById('copyCodeBtn'),
  tabBtns: document.querySelectorAll('.tab-btn')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  generatePrompt();
  generateCode();
});

function initializeApp() {
  // Set default values
  Object.keys(defaults).forEach(key => {
    if (formElements[key]) {
      if (key === 'shadowDepth') {
        formElements[key].value = defaults[key];
      } else {
        formElements[key].value = defaults[key];
      }
    }
  });

  // Initialize color picker and text input sync
  syncColorInputs();
}

function setupEventListeners() {
  // Form element listeners for real-time updates
  Object.values(formElements).forEach(element => {
    if (element) {
      element.addEventListener('change', handleFormChange);
      element.addEventListener('input', handleFormChange);
    }
  });

  // Color picker special handling
  formElements.primaryColor.addEventListener('input', handleColorChange);
  formElements.colorText.addEventListener('input', handleColorTextChange);

  // Button listeners
  buttons.resetBtn.addEventListener('click', resetForm);
  buttons.copyPromptBtn.addEventListener('click', () => copyToClipboard('prompt'));
  buttons.copyCodeBtn.addEventListener('click', () => copyToClipboard('code'));

  // Tab switching
  buttons.tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabName = e.target.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
}

function handleFormChange() {
  generatePrompt();
  generateCode();
}

function handleColorChange(e) {
  const color = e.target.value;
  formElements.colorText.value = color;
  handleFormChange();
}

function handleColorTextChange(e) {
  const color = e.target.value;
  if (isValidHexColor(color)) {
    formElements.primaryColor.value = color;
    handleFormChange();
  }
}

function isValidHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

function syncColorInputs() {
  formElements.colorText.value = formElements.primaryColor.value;
}

function generatePrompt() {
  const values = getCurrentValues();
  
  const prompt = `Create a ${values.projectType} with ${values.designStyle} design style using ${values.theme} theme. Use ${values.primaryColor} as the primary accent color with ${values.paletteType} color palette and ${values.shadowDepth} shadows for depth. The design should be optimized for ${values.deviceTarget} devices using ${values.cssFramework}. Apply ${values.typography} typography with ${values.animationType} animations. Ensure the design is modern, accessible (WCAG ${values.accessibilityLevel}), and user-friendly with proper spacing and visual hierarchy.`;
  
  outputElements.promptOutput.textContent = prompt;
}

function generateCode() {
  const values = getCurrentValues();
  const code = generateStarterCode(values);
  outputElements.codeOutput.textContent = code;
}

function getCurrentValues() {
  return {
    projectType: formElements.projectType.value,
    designStyle: formElements.designStyle.value,
    theme: formElements.theme.value,
    primaryColor: formElements.primaryColor.value,
    paletteType: formElements.paletteType.value,
    shadowDepth: shadowDepthMap[parseInt(formElements.shadowDepth.value)],
    deviceTarget: formElements.deviceTarget.value,
    cssFramework: formElements.cssFramework.value,
    typography: formElements.typography.value,
    animationType: formElements.animationType.value,
    accessibilityLevel: formElements.accessibilityLevel.value,
    jsLibrary: formElements.jsLibrary.value
  };
}

function generateStarterCode(values) {
  const cdnLinks = getCDNLinks(values);
  const htmlContent = getHTMLContent(values);
  const cssContent = getCSSContent(values);
  const jsContent = getJSContent(values);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${values.projectType}</title>
    ${cdnLinks}
    <style>
${cssContent}
    </style>
</head>
<body>
${htmlContent}
    
    <script>
${jsContent}
    </script>
</body>
</html>`;
}

function getCDNLinks(values) {
  const links = [];
  
  // CSS Framework CDN
  switch (values.cssFramework) {
    case 'Tailwind CSS':
      links.push('    <script src="https://cdn.tailwindcss.com"></script>');
      break;
    case 'Bootstrap 5':
      links.push('    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">');
      break;
    case 'Bulma':
      links.push('    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">');
      break;
  }

  // Typography CDN
  switch (values.typography) {
    case 'Geist':
      links.push('    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.0.0/style.css">');
      break;
    case 'Inter':
      links.push('    <link rel="preconnect" href="https://fonts.googleapis.com">');
      links.push('    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
      links.push('    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">');
      break;
    case 'Roboto':
      links.push('    <link rel="preconnect" href="https://fonts.googleapis.com">');
      links.push('    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
      links.push('    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">');
      break;
    case 'Poppins':
      links.push('    <link rel="preconnect" href="https://fonts.googleapis.com">');
      links.push('    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
      links.push('    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">');
      break;
  }

  // JS Library CDN
  switch (values.jsLibrary) {
    case 'Alpine.js':
      links.push('    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>');
      break;
    case 'React':
      links.push('    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>');
      links.push('    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>');
      break;
    case 'Vue':
      links.push('    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>');
      break;
    case 'GSAP':
      links.push('    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>');
      break;
  }

  return links.join('\n');
}

function getHTMLContent(values) {
  let classes = '';
  
  if (values.cssFramework === 'Tailwind CSS') {
    const themeClass = values.theme === 'Dark' ? 'dark' : '';
    classes = `class="min-h-screen ${getResponsiveClasses(values)} ${themeClass}"`;
  } else if (values.cssFramework === 'Bootstrap 5') {
    classes = `class="min-vh-100 ${getBootstrapTheme(values)}"`;
  }

  return `    <div ${classes}>
        <header class="header">
            <div class="container">
                <h1 class="title">${values.projectType}</h1>
                <p class="subtitle">Built with ${values.cssFramework}</p>
            </div>
        </header>
        
        <main class="main-content">
            <div class="container">
                <section class="hero-section">
                    <h2 class="hero-title">Welcome to Your ${values.projectType}</h2>
                    <p class="hero-description">This is a ${values.designStyle.toLowerCase()} design with ${values.theme.toLowerCase()} theme.</p>
                    <button class="cta-button">Get Started</button>
                </section>
            </div>
        </main>
    </div>`;
}

function getResponsiveClasses(values) {
  if (values.deviceTarget === 'Mobile') {
    return 'px-4 py-6';
  } else if (values.deviceTarget === 'Desktop') {
    return 'px-8 py-12 lg:px-16 lg:py-20';
  }
  return 'px-4 py-6 md:px-8 md:py-12 lg:px-16 lg:py-20';
}

function getBootstrapTheme(values) {
  return values.theme === 'Dark' ? 'bg-dark text-light' : 'bg-light text-dark';
}

function getCSSContent(values) {
  const fontFamily = getFontFamily(values.typography);
  const shadows = getShadowStyles(values.shadowDepth);
  const animations = getAnimationStyles(values.animationType);
  
  return `        :root {
            --primary-color: ${values.primaryColor};
            --font-family: ${fontFamily};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: var(--font-family);
            line-height: 1.6;
            color: ${values.theme === 'Dark' ? '#f8f9fa' : '#333'};
            background: ${getBackgroundStyles(values)};
        }
        
        .container {
            max-width: ${values.deviceTarget === 'Mobile' ? '480px' : '1200px'};
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        .header {
            padding: 2rem 0;
            text-align: center;
        }
        
        .title {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
            ${animations}
        }
        
        .subtitle {
            font-size: 1.1rem;
            opacity: 0.8;
        }
        
        .hero-section {
            text-align: center;
            padding: 4rem 0;
        }
        
        .hero-title {
            font-size: 3rem;
            margin-bottom: 1rem;
            ${animations}
        }
        
        .hero-description {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .cta-button {
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            transition: transform 0.2s ease;
            ${shadows}
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            ${getShadowStyles('Heavy')}
        }
        
        ${getResponsiveCSS(values)}`;
}

function getFontFamily(typography) {
  switch (typography) {
    case 'Inter':
      return "'Inter', sans-serif";
    case 'Roboto':
      return "'Roboto', sans-serif";
    case 'Poppins':
      return "'Poppins', sans-serif";
    case 'Geist':
    default:
      return "'Geist', system-ui, sans-serif";
  }
}

function getBackgroundStyles(values) {
  if (values.theme === 'Dark') {
    return '#1a1a1a';
  } else if (values.theme === 'Light') {
    return '#ffffff';
  }
  return values.theme === 'Auto' ? '#f8f9fa' : '#ffffff';
}

function getShadowStyles(depth) {
  switch (depth) {
    case 'None':
      return 'box-shadow: none;';
    case 'Light':
      return 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
    case 'Heavy':
      return 'box-shadow: 0 10px 25px rgba(0,0,0,0.2);';
    case 'Medium':
    default:
      return 'box-shadow: 0 4px 8px rgba(0,0,0,0.15);';
  }
}

function getAnimationStyles(animationType) {
  switch (animationType) {
    case 'Rotate':
      return 'animation: rotate 3s ease-in-out infinite alternate;';
    case 'Fade':
      return 'animation: fadeIn 2s ease-in-out;';
    case 'Slide':
      return 'animation: slideIn 1s ease-out;';
    case 'Scale':
      return 'animation: scale 2s ease-in-out infinite alternate;';
    case 'Bounce':
      return 'animation: bounce 2s infinite;';
    case 'Parallax':
      return 'transform: translateZ(0);';
    default:
      return '';
  }
}

function getResponsiveCSS(values) {
  if (values.deviceTarget === 'Mobile') {
    return `
        @media (max-width: 768px) {
            .hero-title { font-size: 2rem; }
            .title { font-size: 2rem; }
        }`;
  } else if (values.deviceTarget === 'Responsive') {
    return `
        @media (max-width: 768px) {
            .hero-title { font-size: 2rem; }
            .title { font-size: 2rem; }
            .hero-section { padding: 2rem 0; }
        }
        
        @media (min-width: 1200px) {
            .hero-title { font-size: 4rem; }
        }`;
  }
  return '';
}

function getJSContent(values) {
  switch (values.jsLibrary) {
    case 'Alpine.js':
      return `        // Alpine.js reactive data
        document.addEventListener('alpine:init', () => {
            Alpine.data('app', () => ({
                message: 'Hello from Alpine.js!',
                toggleMessage() {
                    this.message = this.message === 'Hello from Alpine.js!' 
                        ? 'Alpine.js is awesome!' 
                        : 'Hello from Alpine.js!';
                }
            }));
        });`;
    
    case 'React':
      return `        // React component example
        const { useState } = React;
        
        function App() {
            const [count, setCount] = useState(0);
            
            return React.createElement('div', null,
                React.createElement('h3', null, 'React Counter: ', count),
                React.createElement('button', {
                    onClick: () => setCount(count + 1),
                    style: { margin: '10px', padding: '5px 10px' }
                }, 'Increment')
            );
        }
        
        // Render React component
        ReactDOM.render(React.createElement(App), document.querySelector('.main-content'));`;
    
    case 'Vue':
      return `        // Vue.js application
        const { createApp } = Vue;
        
        createApp({
            data() {
                return {
                    message: 'Hello Vue.js!',
                    count: 0
                };
            },
            methods: {
                increment() {
                    this.count++;
                }
            }
        }).mount('.main-content');`;
    
    case 'GSAP':
      return `        // GSAP animations
        gsap.from('.title', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: 'bounce'
        });
        
        gsap.from('.hero-title', {
            duration: 1.5,
            scale: 0.5,
            opacity: 0,
            delay: 0.3
        });
        
        // Button hover animation
        document.querySelector('.cta-button').addEventListener('mouseenter', function() {
            gsap.to(this, { duration: 0.3, scale: 1.05 });
        });
        
        document.querySelector('.cta-button').addEventListener('mouseleave', function() {
            gsap.to(this, { duration: 0.3, scale: 1 });
        });`;
    
    default: // Vanilla JS
      return `        // Vanilla JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            console.log('${values.projectType} loaded successfully!');
            
            // Add click event to CTA button
            const ctaButton = document.querySelector('.cta-button');
            if (ctaButton) {
                ctaButton.addEventListener('click', function() {
                    alert('Welcome to your ${values.projectType}!');
                });
            }
            
            // Add some interactivity
            const title = document.querySelector('.hero-title');
            if (title) {
                title.addEventListener('click', function() {
                    this.style.color = this.style.color === '${values.primaryColor}' ? 'inherit' : '${values.primaryColor}';
                });
            }
        });`;
  }
}

function switchTab(tabName) {
  // Update tab buttons
  buttons.tabBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    }
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const targetTab = document.getElementById(tabName + 'Tab');
  if (targetTab) {
    targetTab.classList.add('active');
  }
}

function copyToClipboard(type) {
  const content = type === 'prompt' 
    ? outputElements.promptOutput.textContent 
    : outputElements.codeOutput.textContent;
  
  if (!content.trim()) {
    showToast('Nothing to copy!');
    return;
  }
  
  navigator.clipboard.writeText(content).then(() => {
    showToast(`${type === 'prompt' ? 'Prompt' : 'Code'} copied to clipboard!`);
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = content;
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(`${type === 'prompt' ? 'Prompt' : 'Code'} copied to clipboard!`);
  });
}

function resetForm() {
  // Reset all form elements to defaults
  Object.keys(defaults).forEach(key => {
    if (formElements[key]) {
      formElements[key].value = defaults[key];
    }
  });
  
  // Sync color inputs
  syncColorInputs();
  
  // Regenerate outputs
  generatePrompt();
  generateCode();
  
  showToast('Form reset to defaults!');
}

function showToast(message) {
  outputElements.toastMessage.textContent = message;
  outputElements.toast.classList.remove('hidden');
  
  setTimeout(() => {
    outputElements.toast.classList.add('hidden');
  }, 3000);
}

// Add CSS animations to the document
const style = document.createElement('style');
style.textContent = `
@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(5deg); }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

@keyframes scale {
    0% { transform: scale(1); }
    100% { transform: scale(1.05); }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -10px, 0); }
    70% { transform: translate3d(0, -5px, 0); }
    90% { transform: translate3d(0, -2px, 0); }
}
`;
document.head.appendChild(style);