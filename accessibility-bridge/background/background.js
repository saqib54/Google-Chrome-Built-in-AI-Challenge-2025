// Background service worker for Accessibility Bridge Extension

class AccessibilityBridgeBackground {
  constructor() {
    this.initializeExtension();
  }

  initializeExtension() {
    // Extension installation handler
    chrome.runtime.onInstalled.addListener((details) => {
      console.log('Accessibility Bridge installed:', details.reason);
      this.setDefaultSettings();
    });

    // Handle messages from content scripts and popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // Keep message channel open for async responses
    });
  }

  async setDefaultSettings() {
    const defaultSettings = {
      textSimplification: true,
      altTextGeneration: true,
      translation: false,
      audioSummaries: true,
      highContrast: false,
      largeText: false,
      targetLanguage: 'en'
    };

    await chrome.storage.sync.set({ accessibilitySettings: defaultSettings });
  }

  async handleMessage(message, sender, sendResponse) {
    try {
      switch (message.type) {
        case 'GET_SETTINGS':
          const settings = await this.getSettings();
          sendResponse({ success: true, data: settings });
          break;

        case 'UPDATE_SETTINGS':
          await this.updateSettings(message.settings);
          sendResponse({ success: true });
          break;

        case 'SIMPLIFY_TEXT':
          const simplifiedText = await this.simplifyText(message.text);
          sendResponse({ success: true, data: simplifiedText });
          break;

        case 'GENERATE_ALT_TEXT':
          const altText = await this.generateAltText(message.imageContext);
          sendResponse({ success: true, data: altText });
          break;

        case 'TRANSLATE_TEXT':
          const translatedText = await this.translateText(message.text, message.targetLang);
          sendResponse({ success: true, data: translatedText });
          break;

        default:
          sendResponse({ success: false, error: 'Unknown message type' });
      }
    } catch (error) {
      console.error('Background script error:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async getSettings() {
    const result = await chrome.storage.sync.get('accessibilitySettings');
    return result.accessibilitySettings || {};
  }

  async updateSettings(newSettings) {
    const currentSettings = await this.getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    await chrome.storage.sync.set({ accessibilitySettings: updatedSettings });
  }

  async simplifyText(text) {
    try {
      // Check if Summarizer API is available
      if (!('ai' in window) || !('summarizer' in window.ai)) {
        throw new Error('Chrome AI Summarizer not available');
      }

      const summarizer = await window.ai.summarizer.create({
        type: 'key-points',
        format: 'plain-text',
        length: 'short'
      });

      const simplified = await summarizer.summarize(text);
      return simplified;
    } catch (error) {
      console.error('Text simplification error:', error);
      // Fallback: Basic sentence splitting and simplification
      return this.basicTextSimplification(text);
    }
  }

  basicTextSimplification(text) {
    // Fallback method for text simplification
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const simplified = sentences
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length < 100) // Keep shorter sentences
      .slice(0, 3) // Limit to first 3 sentences
      .join('. ');
    
    return simplified + (simplified.endsWith('.') ? '' : '.');
  }

  async generateAltText(imageContext) {
    try {
      // Check if Writer API is available
      if (!('ai' in window) || !('writer' in window.ai)) {
        throw new Error('Chrome AI Writer not available');
      }

      const writer = await window.ai.writer.create({
        tone: 'neutral',
        format: 'plain-text',
        length: 'short'
      });

      const prompt = `Generate a concise, descriptive alt text for an image. Context: ${imageContext}. Focus on essential visual information for screen readers.`;
      const altText = await writer.write(prompt);
      
      return altText.trim();
    } catch (error) {
      console.error('Alt text generation error:', error);
      return 'Image: ' + (imageContext || 'Visual content');
    }
  }

  async translateText(text, targetLanguage) {
    try {
      // Check if Translator API is available
      if (!('ai' in window) || !('translator' in window.ai)) {
        throw new Error('Chrome AI Translator not available');
      }

      const translator = await window.ai.translator.create({
        sourceLanguage: 'auto',
        targetLanguage: targetLanguage
      });

      const translated = await translator.translate(text);
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }
  }
}

// Initialize the background service
new AccessibilityBridgeBackground();