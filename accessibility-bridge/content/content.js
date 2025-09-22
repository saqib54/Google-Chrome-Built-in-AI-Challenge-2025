// Content script for Accessibility Bridge Extension

class AccessibilityBridge {
  constructor() {
    this.settings = {};
    this.isActive = false;
    this.originalContent = new Map();
    this.accessibilityPanel = null;
    this.enhancementCount = 0;
    
    this.init();
  }

  async init() {
    // Load settings
    await this.loadSettings();
    
    // Create accessibility controls
    this.createAccessibilityPanel();
    
    // Set up observers and listeners
    this.setupObservers();
    this.setupEventListeners();
    
    // Apply initial accessibility features automatically
    this.applyAccessibilityFeatures();
    
    // Auto-apply features based on settings
    setTimeout(() => {
      if (this.settings.textSimplification) {
        this.simplifyPageText();
      }
      if (this.settings.altTextGeneration) {
        this.generateAltTextForImages();
      }
    }, 2000); // Wait 2 seconds for page to fully load
    
    console.log('Accessibility Bridge: Initialized on', window.location.hostname);
  }

  async loadSettings() {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
      if (response.success) {
        this.settings = response.data;
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      // Use default settings
      this.settings = {
        textSimplification: true,
        altTextGeneration: true,
        translation: false,
        audioSummaries: true,
        highContrast: false,
        largeText: false,
        targetLanguage: 'en'
      };
    }
  }

  createAccessibilityPanel() {
    // Create floating accessibility panel
    this.accessibilityPanel = document.createElement('div');
    this.accessibilityPanel.id = 'accessibility-bridge-panel';
    this.accessibilityPanel.innerHTML = `
      <div class="ab-panel-header">
        <span class="ab-title">🌐 Accessibility Bridge</span>
        <button class="ab-toggle" id="ab-toggle">−</button>
      </div>
      <div class="ab-panel-content" id="ab-panel-content">
        <div class="ab-auto-features">
          <div class="ab-feature-status">
            <span class="ab-status-text">Auto-enhancing this page...</span>
          </div>
        </div>
        <div class="ab-controls">
          <button class="ab-btn" id="ab-simplify-text" title="Simplify text on page">
            📖 Simplify Text
          </button>
          <button class="ab-btn" id="ab-generate-alt" title="Generate alt text for images">
            🖼️ Add Alt Text
          </button>
          <button class="ab-btn" id="ab-translate" title="Translate page content">
            🌍 Translate
          </button>
          <button class="ab-btn" id="ab-audio-summary" title="Create audio-friendly summary">
            🔊 Audio Summary
          </button>
          <button class="ab-btn" id="ab-high-contrast" title="Toggle high contrast">
            🎨 High Contrast
          </button>
          <button class="ab-btn" id="ab-large-text" title="Toggle large text">
            📏 Large Text
          </button>
        </div>
        <div class="ab-website-info">
          <div class="ab-site-name">${window.location.hostname}</div>
          <div class="ab-enhancement-count">0 enhancements applied</div>
        </div>
        <div class="ab-status" id="ab-status">Ready for ${window.location.hostname}</div>
      </div>
    `;

    // Add panel to page
    document.body.appendChild(this.accessibilityPanel);
  }

  setupEventListeners() {
    // Panel toggle
    document.getElementById('ab-toggle').addEventListener('click', () => {
      this.togglePanel();
    });

    // Feature buttons
    document.getElementById('ab-simplify-text').addEventListener('click', () => {
      this.simplifyPageText();
    });

    document.getElementById('ab-generate-alt').addEventListener('click', () => {
      this.generateAltTextForImages();
    });

    document.getElementById('ab-translate').addEventListener('click', () => {
      this.translatePageContent();
    });

    document.getElementById('ab-audio-summary').addEventListener('click', () => {
      this.createAudioSummary();
    });

    document.getElementById('ab-high-contrast').addEventListener('click', () => {
      this.toggleHighContrast();
    });

    document.getElementById('ab-large-text').addEventListener('click', () => {
      this.toggleLargeText();
    });

    // Listen for settings updates
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'SETTINGS_UPDATED') {
        this.settings = message.settings;
        this.applyAccessibilityFeatures();
      }
    });
  }

  setupObservers() {
    // Observe DOM changes to apply accessibility features to new content
    const observer = new MutationObserver((mutations) => {
      let hasNewContent = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          hasNewContent = true;
        }
      });
      
      if (hasNewContent) {
        setTimeout(() => this.applyAccessibilityFeatures(), 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  togglePanel() {
    const content = document.getElementById('ab-panel-content');
    const toggle = document.getElementById('ab-toggle');
    
    if (content.style.display === 'none') {
      content.style.display = 'block';
      toggle.textContent = '−';
    } else {
      content.style.display = 'none';
      toggle.textContent = '+';
    }
  }

  updateEnhancementCount(increment = 0) {
    this.enhancementCount += increment;
    const countElement = document.querySelector('.ab-enhancement-count');
    if (countElement) {
      countElement.textContent = `${this.enhancementCount} enhancements applied`;
    }
  }

  updateStatus(message) {
    const status = document.getElementById('ab-status');
    if (status) {
      status.textContent = message;
      setTimeout(() => {
        status.textContent = `Ready for ${window.location.hostname}`;
      }, 3000);
    }
  }

  async simplifyPageText() {
    this.updateStatus('Simplifying text...');
    
    try {
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, div');
      let processedCount = 0;
      
      for (const element of textElements) {
        const text = element.textContent.trim();
        
        // Skip short text or already processed elements
        if (text.length < 50 || element.hasAttribute('data-ab-simplified')) {
          continue;
        }
        
        // Store original content
        if (!this.originalContent.has(element)) {
          this.originalContent.set(element, element.innerHTML);
        }
        
        try {
          const response = await chrome.runtime.sendMessage({
            type: 'SIMPLIFY_TEXT',
            text: text
          });
          
          if (response.success && response.data !== text) {
            element.innerHTML = `<span class="ab-simplified">${response.data}</span>`;
            element.setAttribute('data-ab-simplified', 'true');
            element.title = 'Original: ' + text.substring(0, 100) + '...';
            processedCount++;
          }
        } catch (error) {
          console.error('Failed to simplify text for element:', error);
        }
        
        // Limit processing to avoid overwhelming the page
        if (processedCount >= 10) break;
      }
      
      this.updateStatus(`Simplified ${processedCount} text blocks`);
      this.updateEnhancementCount(processedCount);
    } catch (error) {
      console.error('Text simplification failed:', error);
      this.updateStatus('Text simplification failed');
    }
  }

  async generateAltTextForImages() {
    this.updateStatus('Generating alt text...');
    
    try {
      const images = document.querySelectorAll('img:not([alt]), img[alt=""]');
      let processedCount = 0;
      
      for (const img of images) {
        try {
          // Get context from surrounding elements
          const context = this.getImageContext(img);
          
          const response = await chrome.runtime.sendMessage({
            type: 'GENERATE_ALT_TEXT',
            imageContext: context
          });
          
          if (response.success) {
            img.setAttribute('alt', response.data);
            img.setAttribute('data-ab-alt-generated', 'true');
            processedCount++;
          }
        } catch (error) {
          console.error('Failed to generate alt text for image:', error);
        }
        
        // Limit processing
        if (processedCount >= 20) break;
      }
      
      this.updateStatus(`Generated alt text for ${processedCount} images`);
      this.updateEnhancementCount(processedCount);
    } catch (error) {
      console.error('Alt text generation failed:', error);
      this.updateStatus('Alt text generation failed');
    }
  }

  getImageContext(img) {
    let context = '';
    
    // Check image src for clues
    if (img.src) {
      const filename = img.src.split('/').pop().split('.')[0];
      context += filename.replace(/[-_]/g, ' ') + ' ';
    }
    
    // Check nearby text
    const parent = img.parentElement;
    if (parent) {
      const siblings = parent.textContent.trim();
      if (siblings.length > 0 && siblings.length < 200) {
        context += siblings + ' ';
      }
    }
    
    // Check figure caption
    const figure = img.closest('figure');
    if (figure) {
      const caption = figure.querySelector('figcaption');
      if (caption) {
        context += caption.textContent.trim() + ' ';
      }
    }
    
    return context.trim() || 'image on webpage';
  }

  async translatePageContent() {
    const targetLang = prompt('Enter target language code (e.g., es, fr, de):');
    if (!targetLang) return;
    
    this.updateStatus(`Translating to ${targetLang}...`);
    
    try {
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
      let processedCount = 0;
      
      for (const element of textElements) {
        const text = element.textContent.trim();
        
        if (text.length < 10 || element.hasAttribute('data-ab-translated')) {
          continue;
        }
        
        // Store original content
        if (!this.originalContent.has(element)) {
          this.originalContent.set(element, element.innerHTML);
        }
        
        try {
          const response = await chrome.runtime.sendMessage({
            type: 'TRANSLATE_TEXT',
            text: text,
            targetLang: targetLang
          });
          
          if (response.success && response.data !== text) {
            element.innerHTML = `<span class="ab-translated">${response.data}</span>`;
            element.setAttribute('data-ab-translated', 'true');
            element.title = 'Original: ' + text;
            processedCount++;
          }
        } catch (error) {
          console.error('Failed to translate text for element:', error);
        }
        
        if (processedCount >= 15) break;
      }
      
      this.updateStatus(`Translated ${processedCount} elements`);
    } catch (error) {
      console.error('Translation failed:', error);
      this.updateStatus('Translation failed');
    }
  }

  async createAudioSummary() {
    this.updateStatus('Creating audio summary...');
    
    try {
      // Get main content
      const mainContent = this.extractMainContent();
      
      if (mainContent.length < 50) {
        this.updateStatus('Insufficient content for summary');
        return;
      }
      
      const response = await chrome.runtime.sendMessage({
        type: 'SIMPLIFY_TEXT',
        text: mainContent
      });
      
      if (response.success) {
        // Create audio summary display
        this.displayAudioSummary(response.data);
        this.updateStatus('Audio summary created');
      }
    } catch (error) {
      console.error('Audio summary creation failed:', error);
      this.updateStatus('Audio summary failed');
    }
  }

  extractMainContent() {
    // Try to find main content area
    const mainSelectors = ['main', 'article', '.content', '#content', '.post', '.entry'];
    
    for (const selector of mainSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element.textContent.trim();
      }
    }
    
    // Fallback: get all paragraph text
    const paragraphs = document.querySelectorAll('p');
    return Array.from(paragraphs)
      .map(p => p.textContent.trim())
      .filter(text => text.length > 20)
      .slice(0, 10)
      .join(' ');
  }

  displayAudioSummary(summary) {
    // Remove existing summary
    const existing = document.getElementById('ab-audio-summary');
    if (existing) existing.remove();
    
    // Create summary display
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'ab-audio-summary';
    summaryDiv.className = 'ab-audio-summary';
    summaryDiv.innerHTML = `
      <div class="ab-summary-header">
        🔊 Audio-Friendly Summary
        <button class="ab-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
      <div class="ab-summary-content">${summary}</div>
      <div class="ab-summary-actions">
        <button onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${summary.replace(/'/g, "\\'")}'))">
          🔊 Read Aloud
        </button>
      </div>
    `;
    
    document.body.appendChild(summaryDiv);
  }

  toggleHighContrast() {
    document.body.classList.toggle('ab-high-contrast');
    const isActive = document.body.classList.contains('ab-high-contrast');
    this.updateStatus(isActive ? 'High contrast enabled' : 'High contrast disabled');
  }

  toggleLargeText() {
    document.body.classList.toggle('ab-large-text');
    const isActive = document.body.classList.contains('ab-large-text');
    this.updateStatus(isActive ? 'Large text enabled' : 'Large text disabled');
  }

  applyAccessibilityFeatures() {
    // Apply settings-based features
    if (this.settings.highContrast) {
      document.body.classList.add('ab-high-contrast');
    }
    
    if (this.settings.largeText) {
      document.body.classList.add('ab-large-text');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityBridge();
  });
} else {
  new AccessibilityBridge();
}