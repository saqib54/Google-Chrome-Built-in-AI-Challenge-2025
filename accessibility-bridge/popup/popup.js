// Popup script for Accessibility Bridge Extension

class AccessibilityBridgePopup {
  constructor() {
    this.settings = {};
    this.currentTab = null;
    this.init();
  }

  async init() {
    // Load current settings
    await this.loadSettings();
    
    // Get current tab
    await this.getCurrentTab();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Update UI with current settings
    this.updateUI();
    
    console.log('Accessibility Bridge Popup: Initialized');
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

  async getCurrentTab() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      this.currentTab = tab;
    } catch (error) {
      console.error('Failed to get current tab:', error);
    }
  }

  setupEventListeners() {
    // Feature buttons
    document.getElementById('simplify-text').addEventListener('click', () => {
      this.triggerFeature('simplify-text');
    });

    document.getElementById('generate-alt').addEventListener('click', () => {
      this.triggerFeature('generate-alt');
    });

    document.getElementById('translate-page').addEventListener('click', () => {
      this.triggerFeature('translate-page');
    });

    document.getElementById('audio-summary').addEventListener('click', () => {
      this.triggerFeature('audio-summary');
    });

    // Settings checkboxes
    document.getElementById('auto-simplify').addEventListener('change', (e) => {
      this.updateSetting('textSimplification', e.target.checked);
    });

    document.getElementById('auto-alt-text').addEventListener('change', (e) => {
      this.updateSetting('altTextGeneration', e.target.checked);
    });

    document.getElementById('high-contrast').addEventListener('change', (e) => {
      this.updateSetting('highContrast', e.target.checked);
      this.triggerFeature('toggle-high-contrast');
    });

    document.getElementById('large-text').addEventListener('change', (e) => {
      this.updateSetting('largeText', e.target.checked);
      this.triggerFeature('toggle-large-text');
    });

    // Language selection
    document.getElementById('target-language').addEventListener('change', (e) => {
      this.updateSetting('targetLanguage', e.target.value);
    });

    // Footer links
    document.getElementById('help-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.showHelp();
    });

    document.getElementById('about-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.showAbout();
    });
  }

  updateUI() {
    // Update checkboxes
    document.getElementById('auto-simplify').checked = this.settings.textSimplification || false;
    document.getElementById('auto-alt-text').checked = this.settings.altTextGeneration || false;
    document.getElementById('high-contrast').checked = this.settings.highContrast || false;
    document.getElementById('large-text').checked = this.settings.largeText || false;
    
    // Update language selection
    document.getElementById('target-language').value = this.settings.targetLanguage || 'en';
  }

  async updateSetting(key, value) {
    this.settings[key] = value;
    
    try {
      await chrome.runtime.sendMessage({
        type: 'UPDATE_SETTINGS',
        settings: { [key]: value }
      });
      
      // Notify content script of settings change
      if (this.currentTab) {
        await chrome.tabs.sendMessage(this.currentTab.id, {
          type: 'SETTINGS_UPDATED',
          settings: this.settings
        });
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  }

  async triggerFeature(featureType) {
    if (!this.currentTab) {
      this.updateStatus('No active tab found', 'error');
      return;
    }

    const button = this.getButtonByFeature(featureType);
    if (button) {
      button.classList.add('loading');
    }

    this.updateStatus('Processing...', 'processing');

    try {
      let message = {};
      
      switch (featureType) {
        case 'simplify-text':
          message = { type: 'TRIGGER_SIMPLIFY_TEXT' };
          break;
        case 'generate-alt':
          message = { type: 'TRIGGER_GENERATE_ALT' };
          break;
        case 'translate-page':
          message = { 
            type: 'TRIGGER_TRANSLATE',
            targetLanguage: this.settings.targetLanguage 
          };
          break;
        case 'audio-summary':
          message = { type: 'TRIGGER_AUDIO_SUMMARY' };
          break;
        case 'toggle-high-contrast':
          message = { type: 'TOGGLE_HIGH_CONTRAST' };
          break;
        case 'toggle-large-text':
          message = { type: 'TOGGLE_LARGE_TEXT' };
          break;
      }

      // Send message to content script
      await chrome.tabs.sendMessage(this.currentTab.id, message);
      
      this.updateStatus('Feature activated', 'success');
      
      // Auto-close popup after successful action
      setTimeout(() => {
        window.close();
      }, 1000);
      
    } catch (error) {
      console.error('Failed to trigger feature:', error);
      this.updateStatus('Feature failed', 'error');
    } finally {
      if (button) {
        button.classList.remove('loading');
      }
    }
  }

  getButtonByFeature(featureType) {
    const buttonMap = {
      'simplify-text': 'simplify-text',
      'generate-alt': 'generate-alt',
      'translate-page': 'translate-page',
      'audio-summary': 'audio-summary'
    };
    
    const buttonId = buttonMap[featureType];
    return buttonId ? document.getElementById(buttonId) : null;
  }

  updateStatus(message, type = 'success') {
    const statusText = document.getElementById('status-text');
    if (statusText) {
      statusText.textContent = message;
      statusText.className = `status-text ${type}`;
      
      // Reset status after 3 seconds
      setTimeout(() => {
        statusText.textContent = 'Ready';
        statusText.className = 'status-text';
      }, 3000);
    }
  }

  showHelp() {
    const helpContent = `
      <h3>Accessibility Bridge Help</h3>
      <p><strong>Simplify Text:</strong> Makes complex text easier to read using AI summarization.</p>
      <p><strong>Add Alt Text:</strong> Generates descriptive text for images without alt attributes.</p>
      <p><strong>Translate:</strong> Translates page content while preserving accessibility features.</p>
      <p><strong>Audio Summary:</strong> Creates screen reader-friendly summaries of page content.</p>
      <p><strong>High Contrast:</strong> Improves visual contrast for better readability.</p>
      <p><strong>Large Text:</strong> Increases text size for easier reading.</p>
    `;
    
    this.showModal('Help', helpContent);
  }

  showAbout() {
    const aboutContent = `
      <h3>About Accessibility Bridge</h3>
      <p>Version 1.0.0</p>
      <p>AI-powered web accessibility enhancement using Chrome's built-in AI APIs.</p>
      <p>This extension helps make web content more accessible through:</p>
      <ul>
        <li>Text simplification</li>
        <li>Automatic alt text generation</li>
        <li>Accessible translation</li>
        <li>Audio-friendly summaries</li>
        <li>Visual accessibility controls</li>
      </ul>
      <p><strong>Created for Google Chrome Built-in AI Challenge 2025</strong></p>
    `;
    
    this.showModal('About', aboutContent);
  }

  showModal(title, content) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 300px;
      max-height: 400px;
      overflow-y: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    modalContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2 style="font-size: 16px; margin: 0;">${title}</h2>
        <button id="modal-close" style="background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
      </div>
      <div style="font-size: 13px; line-height: 1.5;">${content}</div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => {
      document.body.removeChild(modal);
    };
    
    document.getElementById('modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityBridgePopup();
});