# 🧪 Test Guide for Accessibility Bridge Extension

## Quick Test Run Steps

### 1. Load Extension
1. Open **Chrome Canary** (required for AI APIs)
2. Type `chrome://extensions/` in address bar
3. Turn ON **"Developer mode"** (top right toggle)
4. Click **"Load unpacked"** button
5. Navigate to and select: `F:\Desktop\abc\htdocs\mod5_solution\accessibility-bridge`
6. Extension should load successfully

### 2. Find Your Extension
- Look for **"Accessibility Bridge"** in the extensions list
- Click the **puzzle piece icon** in Chrome toolbar
- Find "Accessibility Bridge" and click the **pin icon** to keep it visible

### 3. Test on Demo Website
1. Open the restaurant website: `F:\Desktop\abc\htdocs\mod5_solution\index.html`
2. You should see a **green demo button** at bottom-left: "🌐 Demo Accessibility Features"
3. Click it to open the demo menu

### 4. Test Individual Features

#### A) Test Text Simplification
- Click **"📖 Simplify Text"** in demo menu
- Watch complex restaurant descriptions become simplified
- Look for yellow highlighted simplified text

#### B) Test Alt Text Generation  
- Click **"🖼️ Add Alt Text"** in demo menu
- Check images now have green borders (indicating alt text added)
- Hover over images to see generated descriptions

#### C) Test Translation
- Click **"🌍 Translate"** in demo menu
- Enter language code: `es` (Spanish) or `fr` (French)
- Watch text elements get translated with blue highlights

#### D) Test Audio Summary
- Click **"🔊 Audio Summary"** in demo menu
- A popup should appear with page summary
- Click "🔊 Read Aloud" to test speech synthesis

#### E) Test Visual Accessibility
- Click **"🎨 High Contrast"** - page should become high contrast
- Click **"📏 Large Text"** - text should become larger

### 5. Test Extension Popup
1. Click the **Accessibility Bridge** icon in toolbar (or from extensions menu)
2. The popup should open showing:
   - Quick action buttons
   - Settings checkboxes
   - Language selection dropdown
   - Status indicator

### 6. Test Real Chrome AI APIs (Advanced)
If you have Chrome AI APIs enabled:
1. Enable flags in `chrome://flags/`:
   - Search: "Experimental AI APIs"
   - Enable all AI-related flags
   - Restart Chrome
2. Test on any website (not just demo)
3. Real AI processing should work

## Expected Results ✅

### Demo Mode Results:
- ✅ Text simplification with yellow highlights
- ✅ Images get green borders + alt text
- ✅ Translation with blue highlights  
- ✅ Audio summary popup appears
- ✅ Visual changes (contrast/text size)
- ✅ Extension popup loads properly

### With Real AI APIs:
- ✅ Actual AI-generated text simplification
- ✅ Context-aware alt text generation
- ✅ Real-time translation
- ✅ AI-powered audio summaries

## Troubleshooting 🔧

### Extension Won't Load:
- Check you're in the right folder
- Ensure Developer mode is ON
- Try restarting Chrome

### Features Not Working:
- Refresh the webpage
- Check browser console (F12) for errors
- Try demo mode first before real AI APIs

### No Extension Icon:
- Click puzzle piece icon in toolbar
- Find "Accessibility Bridge" 
- Pin it for easier access

## Demo Video Recording Tips 📹

Record these steps for your submission:
1. Show extension loading in Chrome
2. Visit restaurant website
3. Demonstrate each feature working
4. Show popup interface
5. Explain AI APIs being used

## Success Indicators 🎯

You'll know it's working when:
- ✅ Extension loads without errors
- ✅ Demo button appears on restaurant site
- ✅ All 6 demo features work
- ✅ Popup interface opens properly
- ✅ Visual changes are visible
- ✅ No console errors

Ready for Chrome AI Challenge submission! 🚀