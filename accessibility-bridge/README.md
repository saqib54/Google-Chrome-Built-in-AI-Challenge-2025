# 🌐 Accessibility Bridge Chrome Extension

**AI-powered web accessibility enhancement using Chrome's built-in AI APIs**

*Created for Google Chrome Built-in AI Challenge 2025*

## 🎯 Overview

Accessibility Bridge is a **universal Chrome extension** that automatically makes ANY website more accessible by leveraging Chrome's built-in AI APIs. It works on every website you visit - from news sites to social media to e-commerce - providing real-time accessibility enhancements without requiring any setup from website owners.

**🌟 Key Advantage:** Works universally on all websites, not just specific ones!

## ✨ Features

### 🔄 **Universal Auto-Enhancement**
- **Automatic activation** on every website you visit
- **Real-time processing** as pages load
- **Smart detection** of content that needs accessibility improvements
- **Zero configuration** required from website owners

### 🔍 **Text Simplification**
- Uses Chrome's **Summarizer API** to convert complex text into easy-to-read summaries
- Maintains original meaning while improving readability
- Helps users with cognitive disabilities or reading difficulties

### 🖼️ **Smart Alt-Text Generation**
- Leverages Chrome's **Writer API** to automatically generate descriptive alt-text for images
- Uses context clues from surrounding content and image metadata
- Enhances screen reader compatibility

### 🌍 **Accessible Translation**
- Powered by Chrome's **Translator API** with accessibility preservation
- Maintains semantic structure during translation
- Supports 12+ languages with context-aware translations

### 🔊 **Audio-Friendly Summaries**
- Combines **Summarizer** and **Rewriter APIs** for screen reader optimization
- Creates concise, audio-friendly content summaries
- Includes speech synthesis integration

### 🎨 **Visual Accessibility Controls**
- High contrast mode for improved visual clarity
- Large text mode for better readability
- Dynamic styling adjustments

## 🚀 Installation

### Prerequisites
- Google Chrome Canary or Chrome Dev Channel
- Chrome AI origin trial enabled
- Windows, macOS, or Linux

### Development Installation
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `accessibility-bridge` directory
5. The extension icon should appear in your toolbar

### Production Installation
*Will be available on Chrome Web Store after the challenge*

## 🛠️ Usage

### Quick Start
1. Click the Accessibility Bridge icon in your Chrome toolbar
2. Visit any website (try the included restaurant demo)
3. Use the popup controls to activate features:
   - **📖 Simplify Text**: Makes complex content easier to read
   - **🖼️ Add Alt Text**: Generates descriptions for images
   - **🌍 Translate**: Translates content to your preferred language
   - **🔊 Audio Summary**: Creates screen reader-friendly summaries

### Advanced Settings
- **Auto-simplify**: Automatically simplify complex text as you browse
- **Auto-alt-text**: Generate alt-text for images without descriptions
- **High Contrast**: Improve visual contrast across websites
- **Large Text**: Increase text size for better readability

## 🔧 Technical Details

### Chrome AI APIs Used
- **`ai.summarizer`**: Text simplification and key point extraction
- **`ai.writer`**: Alt-text generation and content creation
- **`ai.translator`**: Multi-language translation with context preservation
- **`ai.rewriter`**: Audio-friendly content optimization

### Architecture
- **Manifest V3** Chrome extension
- **Service Worker** background script for AI processing
- **Content Script** for real-time page enhancement
- **Popup Interface** for user controls and settings

### Key Files
```
accessibility-bridge/
├── manifest.json              # Extension configuration
├── background/
│   └── background.js         # Service worker for AI processing
├── content/
│   ├── content.js           # Page enhancement logic
│   ├── accessibility.css    # Accessibility styling
│   └── ai-utils.js         # Chrome AI API utilities
├── popup/
│   ├── popup.html          # Extension popup interface
│   ├── popup.css           # Popup styling
│   └── popup.js            # Popup functionality
└── icons/                  # Extension icons
```

## 🎮 Demo

### Using the Restaurant Website Demo
1. Install the extension
2. Navigate to the included restaurant website (`index.html`)
3. Try these features:
   - **Simplify menu descriptions** for easier reading
   - **Generate alt-text** for food images
   - **Translate** the menu to different languages
   - **Create audio summaries** of restaurant information

### Demo Video
*[Link to demo video will be added after recording]*

## 🔒 Privacy & Security

- **Client-side processing**: All AI operations run locally using Chrome's built-in APIs
- **No data transmission**: Content never leaves your device
- **Privacy-first design**: No tracking, no external servers
- **Offline capable**: Works without internet connection

## 🧪 Testing

### Manual Testing
1. Load the extension in Chrome Canary
2. Visit various websites and test each feature
3. Verify accessibility improvements with screen readers
4. Test in different languages and content types

### Automated Testing
```bash
# Run extension tests (future implementation)
npm test
```

## 🚧 Development

### Setup
```bash
git clone [repository-url]
cd accessibility-bridge
# No build process needed - pure JavaScript
```

### Development Tips
- Use Chrome DevTools for debugging
- Test with Chrome Canary for latest AI API features
- Enable "Accessibility" panel in DevTools for testing
- Use screen readers (NVDA, JAWS, VoiceOver) for validation

## 📝 Chrome AI Challenge Compliance

### Requirements Met ✅
- [x] **New, original project** (built specifically for 2025 challenge)
- [x] **Uses Chrome built-in AI APIs** (Summarizer, Writer, Translator, Rewriter)
- [x] **Client-side execution** with Gemini Nano
- [x] **Open-source repository** with clear instructions
- [x] **Working demo** with real-world application
- [x] **Privacy-friendly** offline-capable design

### APIs Demonstrated
1. **Summarizer API**: Complex text → simplified summaries
2. **Writer API**: Context → descriptive alt-text
3. **Translator API**: Multi-language accessibility
4. **Rewriter API**: Audio-friendly content optimization

## 🎯 Impact & Innovation

### Social Impact
- **Digital inclusion**: Makes web content accessible to users with disabilities
- **Language barriers**: Breaks down multilingual accessibility challenges
- **Cognitive accessibility**: Simplifies complex information for better comprehension
- **Universal design**: Benefits all users, not just those with disabilities

### Technical Innovation
- **Multi-API integration**: Combines multiple Chrome AI APIs seamlessly
- **Real-time processing**: Instant accessibility enhancements
- **Context-aware**: Uses surrounding content for better AI outputs
- **Fallback mechanisms**: Graceful degradation when APIs unavailable

## 🏆 Future Enhancements

- Voice command integration
- Custom accessibility profiles
- Content structure analysis
- Integration with assistive technologies
- Advanced language support
- Performance optimizations

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 👨‍💻 Author

Created for Google Chrome Built-in AI Challenge 2025

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check Chrome AI API documentation
- Review accessibility guidelines (WCAG 2.1)

---

**Making the web accessible for everyone, powered by AI** 🌐✨