// Demo enhancement script for restaurant website
// This shows how the Accessibility Bridge extension transforms content

(function() {
    'use strict';
    
    // Demo data to simulate AI API responses for testing
    const DEMO_DATA = {
        simplifications: {
            "David Chu's China Bistro offers authentic Chinese cuisine in a kosher certified restaurant environment. Our establishment has been serving the Baltimore community with traditional recipes passed down through generations.": 
            "David Chu's serves authentic Chinese food. We're kosher certified and have been in Baltimore for many years using traditional recipes.",
            
            "Our culinary team specializes in traditional Chinese cooking techniques combined with contemporary presentation styles to create an exceptional dining experience for our valued customers.":
            "Our chefs use traditional Chinese cooking with modern style to create great meals for our customers.",
            
            "We provide comprehensive delivery services within a 3-4 mile radius of our establishment, with a minimum order requirement of $20 plus a $3 delivery charge for all orders.":
            "We deliver within 3-4 miles. Minimum order is $20 plus $3 delivery fee."
        },
        
        altTexts: {
            "star-k-logo.png": "Star-K Kosher certification logo indicating kosher compliance",
            "restaurant": "Interior view of David Chu's China Bistro dining room with traditional Chinese decor",
            "food": "Traditional Chinese dish served at David Chu's China Bistro",
            "logo": "David Chu's China Bistro restaurant logo"
        },
        
        translations: {
            "es": {
                "Hours:": "Horarios:",
                "Address:": "Dirección:",
                "The best Chinese restaurant I've been to!": "¡El mejor restaurante chino al que he ido!",
                "Amazing food! Great service!": "¡Comida increíble! ¡Excelente servicio!"
            },
            "fr": {
                "Hours:": "Heures:",
                "Address:": "Adresse:",
                "The best Chinese restaurant I've been to!": "Le meilleur restaurant chinois où je sois allé!",
                "Amazing food! Great service!": "Nourriture incroyable! Excellent service!"
            }
        }
    };

    function addDemoButton() {
        // Add demo button to test extension features
        const demoButton = document.createElement('div');
        demoButton.id = 'accessibility-demo-btn';
        demoButton.innerHTML = `
            <button style="
                position: fixed; 
                bottom: 20px; 
                left: 20px; 
                z-index: 9999; 
                background: #28a745; 
                color: white; 
                border: none; 
                padding: 12px 20px; 
                border-radius: 25px; 
                cursor: pointer; 
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                font-size: 14px;
            " onclick="runAccessibilityDemo()">
                🌐 Demo Accessibility Features
            </button>
        `;
        document.body.appendChild(demoButton);
    }

    function simulateTextSimplification() {
        console.log('Demo: Simulating text simplification...');
        
        const textElements = document.querySelectorAll('p, .navbar-brand p, #testimonials p');
        textElements.forEach(element => {
            const originalText = element.textContent.trim();
            
            // Find matching simplification in demo data
            for (const [original, simplified] of Object.entries(DEMO_DATA.simplifications)) {
                if (originalText.includes(original.substring(0, 50))) {
                    element.innerHTML = `<span style="background: #fff3cd; padding: 4px 8px; border-radius: 4px; border-left: 3px solid #ffc107;">${simplified}</span>`;
                    element.title = `Original: ${originalText}`;
                    break;
                }
            }
        });
        
        showDemoNotification('📖 Text Simplified', 'Complex text has been made easier to read');
    }

    function simulateAltTextGeneration() {
        console.log('Demo: Simulating alt text generation...');
        
        const images = document.querySelectorAll('img:not([alt]), img[alt=""]');
        images.forEach(img => {
            let altText = 'Generated alt text: ';
            
            // Check image source for context
            const src = img.src.toLowerCase();
            if (src.includes('star-k-logo')) {
                altText += DEMO_DATA.altTexts['star-k-logo.png'];
            } else if (src.includes('logo')) {
                altText += DEMO_DATA.altTexts['logo'];
            } else if (src.includes('food') || src.includes('menu')) {
                altText += DEMO_DATA.altTexts['food'];
            } else {
                altText += DEMO_DATA.altTexts['restaurant'];
            }
            
            img.setAttribute('alt', altText);
            img.style.border = '2px solid #28a745';
            img.style.borderRadius = '4px';
            img.title = altText;
        });
        
        showDemoNotification('🖼️ Alt Text Added', `Generated descriptions for ${images.length} images`);
    }

    function simulateTranslation() {
        const targetLang = prompt('Enter language code (es for Spanish, fr for French):') || 'es';
        console.log(`Demo: Simulating translation to ${targetLang}...`);
        
        if (!DEMO_DATA.translations[targetLang]) {
            showDemoNotification('🌍 Translation Error', 'Language not available in demo');
            return;
        }
        
        const translations = DEMO_DATA.translations[targetLang];
        const textElements = document.querySelectorAll('span, #hours span, #address span, #testimonials p');
        
        textElements.forEach(element => {
            const originalText = element.textContent.trim();
            
            for (const [english, translated] of Object.entries(translations)) {
                if (originalText.includes(english)) {
                    element.innerHTML = `<span style="background: #d1ecf1; padding: 4px 8px; border-radius: 4px; border-left: 3px solid #17a2b8;">${originalText.replace(english, translated)}</span>`;
                    element.title = `Original: ${originalText}`;
                    break;
                }
            }
        });
        
        showDemoNotification('🌍 Translation Complete', `Content translated to ${targetLang}`);
    }

    function simulateAudioSummary() {
        console.log('Demo: Creating audio summary...');
        
        // Extract main content
        const mainContent = [
            "David Chu's China Bistro serves authentic Chinese food.",
            "We're kosher certified and located in Baltimore.",
            "We deliver within 3-4 miles with a $20 minimum order.",
            "Open Sun-Thurs 11:15am-10pm, Fri 11:15am-2:30pm, Saturday closed."
        ].join(' ');
        
        // Create audio summary display
        const summaryDiv = document.createElement('div');
        summaryDiv.id = 'demo-audio-summary';
        summaryDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 500px;
            width: 90%;
            background: white;
            border: 2px solid #28a745;
            border-radius: 8px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            z-index: 100000;
            font-family: Arial, sans-serif;
        `;
        
        summaryDiv.innerHTML = `
            <div style="background: #28a745; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; font-weight: 600; display: flex; justify-content: space-between; align-items: center;">
                🔊 Audio-Friendly Summary
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px; border-radius: 50%;">×</button>
            </div>
            <div style="padding: 20px; line-height: 1.6; font-size: 16px;">
                ${mainContent}
            </div>
            <div style="padding: 15px 20px; border-top: 1px solid #dee2e6; text-align: center;">
                <button onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${mainContent.replace(/'/g, "\\'")}'))" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    🔊 Read Aloud
                </button>
            </div>
        `;
        
        document.body.appendChild(summaryDiv);
        
        showDemoNotification('🔊 Audio Summary', 'Screen reader-friendly summary created');
    }

    function simulateHighContrast() {
        document.body.classList.toggle('demo-high-contrast');
        
        if (!document.getElementById('demo-contrast-style')) {
            const style = document.createElement('style');
            style.id = 'demo-contrast-style';
            style.textContent = `
                body.demo-high-contrast {
                    filter: contrast(150%) !important;
                }
                body.demo-high-contrast * {
                    background-color: black !important;
                    color: white !important;
                    border-color: white !important;
                }
                body.demo-high-contrast a {
                    color: #ffff00 !important;
                }
                body.demo-high-contrast button {
                    background-color: #333 !important;
                    color: white !important;
                    border: 2px solid white !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        const isActive = document.body.classList.contains('demo-high-contrast');
        showDemoNotification('🎨 High Contrast', isActive ? 'Enabled' : 'Disabled');
    }

    function simulateLargeText() {
        document.body.classList.toggle('demo-large-text');
        
        if (!document.getElementById('demo-text-style')) {
            const style = document.createElement('style');
            style.id = 'demo-text-style';
            style.textContent = `
                body.demo-large-text {
                    font-size: 18px !important;
                    line-height: 1.6 !important;
                }
                body.demo-large-text * {
                    font-size: inherit !important;
                    line-height: inherit !important;
                }
                body.demo-large-text h1 { font-size: 2.2em !important; }
                body.demo-large-text h2 { font-size: 1.8em !important; }
                body.demo-large-text h3 { font-size: 1.5em !important; }
            `;
            document.head.appendChild(style);
        }
        
        const isActive = document.body.classList.contains('demo-large-text');
        showDemoNotification('📏 Large Text', isActive ? 'Enabled' : 'Disabled');
    }

    function showDemoNotification(title, message) {
        // Remove existing notification
        const existing = document.getElementById('demo-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.id = 'demo-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0066cc;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 999999;
            font-family: Arial, sans-serif;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
            <div style="font-size: 14px; opacity: 0.9;">${message}</div>
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    function createDemoMenu() {
        const menu = document.createElement('div');
        menu.id = 'demo-menu';
        menu.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 20px;
            background: white;
            border: 2px solid #0066cc;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 99999;
            font-family: Arial, sans-serif;
            display: none;
            min-width: 250px;
        `;
        
        menu.innerHTML = `
            <div style="background: #0066cc; color: white; padding: 12px 15px; font-weight: 600; border-radius: 6px 6px 0 0;">
                🌐 Demo Features
            </div>
            <div style="padding: 15px;">
                <button onclick="simulateTextSimplification()" style="width: 100%; margin: 5px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: #f8f9fa;">📖 Simplify Text</button>
                <button onclick="simulateAltTextGeneration()" style="width: 100%; margin: 5px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: #f8f9fa;">🖼️ Add Alt Text</button>
                <button onclick="simulateTranslation()" style="width: 100%; margin: 5px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: #f8f9fa;">🌍 Translate</button>
                <button onclick="simulateAudioSummary()" style="width: 100%; margin: 5px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: #f8f9fa;">🔊 Audio Summary</button>
                <button onclick="simulateHighContrast()" style="width: 100%; margin: 5px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: #f8f9fa;">🎨 High Contrast</button>
                <button onclick="simulateLargeText()" style="width: 100%; margin: 5px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: #f8f9fa;">📏 Large Text</button>
            </div>
        `;
        
        document.body.appendChild(menu);
        return menu;
    }

    // Global function for demo button
    window.runAccessibilityDemo = function() {
        const menu = document.getElementById('demo-menu') || createDemoMenu();
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };

    // Make demo functions global
    window.simulateTextSimplification = simulateTextSimplification;
    window.simulateAltTextGeneration = simulateAltTextGeneration;
    window.simulateTranslation = simulateTranslation;
    window.simulateAudioSummary = simulateAudioSummary;
    window.simulateHighContrast = simulateHighContrast;
    window.simulateLargeText = simulateLargeText;

    // Initialize demo when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addDemoButton);
    } else {
        addDemoButton();
    }

    console.log('🌐 Accessibility Bridge Demo loaded! Click the demo button to try features.');
})();