tooltip.addEventListener('mouseup', (event) => {
    event.stopPropagation();
    const { translatedText, targetLanguage } = state;

    console.log(state);

    if (translatedText !== '' && targetLanguage === 'fr') {
      chrome.runtime.sendMessage({ action: 'speak', text: translatedText, lang: 'fr-FR' });
    }
})