# 🚀 Accessibility Bridge - Installation Guide

## Quick Start (Chrome AI Challenge Demo)

### Prerequisites
- **Chrome Canary** or **Chrome Dev Channel** (required for AI APIs)
- **Chrome AI Origin Trial** access (sign up at [chrome.google.com/origintrials/](https://developer.chrome.com/origintrials/))
- Windows, macOS, or Linux

### Installation Steps

#### 1. Download Extension
```bash
# Clone or download this repository
git clone [your-repo-url]
cd accessibility-bridge
```

#### 2. Enable Developer Mode in Chrome
1. Open Chrome Canary
2. Navigate to `chrome://extensions/`
3. Toggle **"Developer mode"** (top right)

#### 3. Load Extension
1. Click **"Load unpacked"**
2. Select the `accessibility-bridge` folder
3. Extension should appear in your toolbar 🌐
4. **Note**: The extension may not show an icon initially - this is normal for development versions

#### 4. Pin Extension (Optional)
1. Click the **Extensions puzzle icon** in Chrome toolbar
2. Find **"Accessibility Bridge"** in the list
3. Click the **pin icon** to keep it visible

#### 4. Enable Chrome AI APIs (Required)
1. Visit `chrome://flags/`
2. Search for **"Experimental AI APIs"**
3. Enable the following flags:
   - `#optimization-guide-on-device-model`
   - `#prompt-api-for-gemini-nano`
   - `#summarization-api-for-gemini-nano`
   - `#translation-api`
   - `#language-model-api`
4. **Restart Chrome**

#### 5. Test Installation
1. Open the demo restaurant website (`index.html`)
2. Click the **Accessibility Bridge** icon in toolbar
3. Try the features:
   - 📖 Simplify Text
   - 🖼️ Add Alt Text  
   - 🌍 Translate
   - 🔊 Audio Summary

### Demo Mode
If Chrome AI APIs aren't available yet, the extension includes a **demo mode** with simulated AI responses for testing purposes.

### Troubleshooting

#### Chrome AI APIs Not Available
- Ensure you're using **Chrome Canary** (latest version)
- Check that AI flags are enabled in `chrome://flags/`
- Restart Chrome completely after enabling flags
- Some APIs may require Origin Trial participation

#### Extension Not Loading
- Check that **Developer mode** is enabled
- Ensure you selected the correct folder (`accessibility-bridge`)
- Check browser console for error messages

#### Features Not Working
- Verify the extension icon appears in toolbar
- Try reloading the webpage
- Check that you have an active internet connection
- Use demo mode for testing without live APIs

### Chrome AI Challenge Requirements ✅

This extension meets all challenge requirements:
- ✅ Uses Chrome's built-in AI APIs
- ✅ Client-side execution with Gemini Nano
- ✅ Original project created for 2025 challenge
- ✅ Open source with clear instructions
- ✅ Privacy-friendly offline operation
- ✅ Real-world accessibility application

### Next Steps
1. Test all features thoroughly
2. Record demo video (< 3 minutes)
3. Submit to Chrome AI Challenge
4. Fill out feedback form for bonus prize consideration

### Support
For issues:
- Check this guide first
- Review Chrome DevTools console
- Ensure latest Chrome Canary version
- Verify AI API availability

---
**Ready to make the web more accessible! 🌐✨**