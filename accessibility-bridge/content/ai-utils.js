// AI utilities for Chrome's built-in AI APIs

class ChromeAIUtils {
  constructor() {
    this.summarizer = null;
    this.writer = null;
    this.translator = null;
    this.rewriter = null;
    this.isSupported = this.checkAISupport();
  }

  checkAISupport() {
    // Check if Chrome AI APIs are available
    if (typeof window !== 'undefined' && window.ai) {
      console.log('Chrome AI APIs detected');
      return true;
    }
    
    console.warn('Chrome AI APIs not available - using fallback methods');
    return false;
  }

  async initializeSummarizer() {
    if (!this.isSupported) {
      throw new Error('Chrome AI APIs not supported');
    }

    try {
      if (!this.summarizer) {
        this.summarizer = await window.ai.summarizer.create({
          type: 'key-points',
          format: 'plain-text',
          length: 'short'
        });
      }
      return this.summarizer;
    } catch (error) {
      console.error('Failed to initialize summarizer:', error);
      throw error;
    }
  }

  async initializeWriter() {
    if (!this.isSupported) {
      throw new Error('Chrome AI APIs not supported');
    }

    try {
      if (!this.writer) {
        this.writer = await window.ai.writer.create({
          tone: 'neutral',
          format: 'plain-text',
          length: 'short'
        });
      }
      return this.writer;
    } catch (error) {
      console.error('Failed to initialize writer:', error);
      throw error;
    }
  }

  async initializeTranslator(sourceLanguage = 'auto', targetLanguage = 'en') {
    if (!this.isSupported) {
      throw new Error('Chrome AI APIs not supported');
    }

    try {
      // Create new translator for each language pair
      const translator = await window.ai.translator.create({
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage
      });
      return translator;
    } catch (error) {
      console.error('Failed to initialize translator:', error);
      throw error;
    }
  }

  async initializeRewriter() {
    if (!this.isSupported) {
      throw new Error('Chrome AI APIs not supported');
    }

    try {
      if (!this.rewriter) {
        this.rewriter = await window.ai.rewriter.create({
          tone: 'more-casual',
          format: 'plain-text',
          length: 'shorter'
        });
      }
      return this.rewriter;
    } catch (error) {
      console.error('Failed to initialize rewriter:', error);
      throw error;
    }
  }

  async summarizeText(text, options = {}) {
    try {
      const summarizer = await this.initializeSummarizer();
      const result = await summarizer.summarize(text);
      return result;
    } catch (error) {
      console.error('Summarization failed:', error);
      // Fallback to basic text processing
      return this.fallbackSummarize(text);
    }
  }

  async generateAltText(context, imageElement = null) {
    try {
      const writer = await this.initializeWriter();
      
      let prompt = `Generate a concise, descriptive alt text for an image. Context: ${context}. `;
      
      // Add image attributes if available
      if (imageElement) {
        if (imageElement.src) {
          const filename = imageElement.src.split('/').pop().split('.')[0];
          prompt += `Image filename suggests: ${filename.replace(/[-_]/g, ' ')}. `;
        }
        if (imageElement.title) {
          prompt += `Image title: ${imageElement.title}. `;
        }
      }
      
      prompt += 'Focus on essential visual information for screen readers. Maximum 125 characters.';
      
      const result = await writer.write(prompt);
      return result.trim();
    } catch (error) {
      console.error('Alt text generation failed:', error);
      // Fallback alt text
      return this.fallbackAltText(context);
    }
  }

  async translateText(text, targetLanguage = 'en') {
    try {
      const translator = await this.initializeTranslator('auto', targetLanguage);
      const result = await translator.translate(text);
      return result;
    } catch (error) {
      console.error('Translation failed:', error);
      // Return original text as fallback
      return text;
    }
  }

  async rewriteText(text, options = {}) {
    try {
      const rewriter = await this.initializeRewriter();
      const result = await rewriter.rewrite(text);
      return result;
    } catch (error) {
      console.error('Rewriting failed:', error);
      return this.fallbackRewrite(text);
    }
  }

  async createAudioFriendlySummary(text) {
    try {
      // First summarize the text
      const summary = await this.summarizeText(text);
      
      // Then rewrite for better audio consumption
      const audioFriendly = await this.rewriteText(summary, {
        tone: 'more-casual',
        format: 'plain-text'
      });
      
      return audioFriendly;
    } catch (error) {
      console.error('Audio summary creation failed:', error);
      return this.fallbackAudioSummary(text);
    }
  }

  // Fallback methods for when AI APIs are not available
  fallbackSummarize(text) {
    // Basic text summarization
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const shortSentences = sentences
      .map(s => s.trim())
      .filter(s => s.length < 150)
      .slice(0, 3);
    
    return shortSentences.join('. ') + (shortSentences.length > 0 ? '.' : '');
  }

  fallbackAltText(context) {
    // Basic alt text generation
    if (context.includes('logo')) return 'Company logo';
    if (context.includes('menu') || context.includes('food')) return 'Food menu item image';
    if (context.includes('photo') || context.includes('picture')) return 'Photograph';
    if (context.includes('icon')) return 'Icon image';
    
    return 'Image: ' + context.substring(0, 50).trim();
  }

  fallbackRewrite(text) {
    // Basic text simplification
    return text
      .replace(/\b(furthermore|moreover|additionally|consequently)\b/gi, 'also')
      .replace(/\b(utilize|utilization)\b/gi, 'use')
      .replace(/\b(demonstrate|illustrate)\b/gi, 'show')
      .replace(/\b(approximately|approximately)\b/gi, 'about')
      .replace(/\b(numerous)\b/gi, 'many');
  }

  fallbackAudioSummary(text) {
    // Create audio-friendly summary
    const summary = this.fallbackSummarize(text);
    return "Here's a summary: " + summary.replace(/[^\w\s.,!?]/g, '');
  }

  // Utility methods
  isTextTooLong(text, maxLength = 1000) {
    return text.length > maxLength;
  }

  splitLongText(text, maxLength = 1000) {
    if (text.length <= maxLength) return [text];
    
    const sentences = text.split(/[.!?]+/);
    const chunks = [];
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > maxLength) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += sentence + '. ';
      }
    }
    
    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  }

  async processLongText(text, processingFunction) {
    if (!this.isTextTooLong(text)) {
      return await processingFunction(text);
    }
    
    const chunks = this.splitLongText(text);
    const results = [];
    
    for (const chunk of chunks) {
      try {
        const result = await processingFunction(chunk);
        results.push(result);
      } catch (error) {
        console.error('Error processing text chunk:', error);
        results.push(chunk); // Keep original on error
      }
    }
    
    return results.join(' ');
  }

  // Clean up resources
  async cleanup() {
    try {
      if (this.summarizer) {
        await this.summarizer.destroy();
        this.summarizer = null;
      }
      if (this.writer) {
        await this.writer.destroy();
        this.writer = null;
      }
      if (this.translator) {
        await this.translator.destroy();
        this.translator = null;
      }
      if (this.rewriter) {
        await this.rewriter.destroy();
        this.rewriter = null;
      }
    } catch (error) {
      console.error('Error cleaning up AI resources:', error);
    }
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChromeAIUtils;
} else if (typeof window !== 'undefined') {
  window.ChromeAIUtils = ChromeAIUtils;
}