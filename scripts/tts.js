readTextButton.addEventListener('mouseup', (event) => {
    const { translatedText, selectedText, targetLanguage } = state;

    if ((translatedText !== '' && targetLanguage === 'fr') || (targetLanguage === 'en' && selectedText !== '')) {
        const text = targetLanguage === 'fr' ? translatedText : selectedText;
        
        chrome.runtime.sendMessage({ action: 'speak', text, lang: 'fr-FR' });
    }
})