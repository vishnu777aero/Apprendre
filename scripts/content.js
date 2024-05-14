const tooltipId = 'apprendre-tooltip';

// add tool tip
const tooltip = document.createElement('div');
tooltip.id = tooltipId;
document.body.appendChild(tooltip);

const state = {
    selectedText: "",
    targetLanguage: "",
    translatedText: "",
    isDragging: false,
    offsetX: 0.0,
    offsetY: 0.0,
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

tooltip.addEventListener('mousedown', (event) => {
  state.isDragging = true;
  state.offsetX = event.clientX - tooltip.getBoundingClientRect().left;
  state.offsetY = event.clientY - tooltip.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (event) => {
  if (state.isDragging) {
    const newX = event.clientX - state.offsetX;
    const newY = event.clientY - state.offsetY;
    tooltip.style.left = newX + 'px';
    tooltip.style.top = newY + 'px';
  }
});