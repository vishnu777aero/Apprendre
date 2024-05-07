const tooltipId = 'apprendre-tooltip';

// add tool tip
const tooltip = document.createElement('div');
tooltip.id = tooltipId;
document.body.appendChild(tooltip);

const state = {
    selectedText: "",
    targetLanguage: "",
    translatedText: "",
};

document.addEventListener('mouseup', async (event) => {
    const selectedText = window.getSelection().toString().trim();
    state.selectedText = selectedText;
    
    if(selectedText !== '') {
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        
        const tooltip = document.getElementById(tooltipId);

        tooltip.style.top = mouseY + 'px';
        tooltip.style.left = mouseX + 'px';
        tooltip.style.display = 'block';

        const detectionResponse = await detectLanguageApi(selectedText);
        state.targetLanguage = findTargetLanguage({ detectedLanguage: detectionResponse[0]?.language });
        const { targetLanguage } = state;
        const { translatedText } = await translateApi({ text: selectedText, target: targetLanguage });
        state.translatedText = translatedText;
        tooltip.innerText = translatedText;
    }
});

document.addEventListener('mousedown', (event) => {
    const tooltip = document.getElementById(tooltipId);
    if (event.target !== tooltip) {
        tooltip.style.display = 'none';
    }
});

const findTargetLanguage = ({ detectedLanguage }) => {
    switch (detectedLanguage) {
        case "en": return "fr";
        case "fr": return "en";
        default: return "en";
    }
}