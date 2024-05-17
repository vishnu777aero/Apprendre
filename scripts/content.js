const tooltipId = 'apprendre-tooltip';

// add tool tip
const tooltip = document.createElement('div');
tooltip.id = tooltipId;
document.body.appendChild(tooltip);

const logo = document.createElement('div');
const logoUrl = chrome.runtime.getURL("icons/logo-32px.png");
logo.style.backgroundImage = `url(${logoUrl})`;

logo.classList.add('logo');

const text = document.createElement('div');
text.classList.add("apprendre-text");

tooltip.appendChild(logo);
tooltip.appendChild(text);

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
    
    if(selectedText !== '' && !state.isDragging) {
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        
        const tooltip = document.getElementById(tooltipId);

        tooltip.style.top = mouseY + 'px';
        tooltip.style.left = mouseX + 'px';
        tooltip.style.display = 'flex';

        const detectionResponse = await detectLanguageApi(selectedText);
        state.targetLanguage = findTargetLanguage({ detectedLanguage: detectionResponse[0]?.language });
        const { targetLanguage } = state;
        const { translatedText } = await translateApi({ text: selectedText, target: targetLanguage });
        state.translatedText = translatedText;
        text.innerText = translatedText;
    }

    state.isDragging = false;
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
  state.offsetX = event.clientX - tooltip.getBoundingClientRect().left - window.scrollX;
  state.offsetY = event.clientY - tooltip.getBoundingClientRect().top  - window.scrollY;
  event.stopPropagation();
});

tooltip.addEventListener('mousemove', (event) => {
  if (state.isDragging) {
    const newX = event.clientX - state.offsetX;
    const newY = event.clientY - state.offsetY;
    tooltip.style.left = newX + 'px';
    tooltip.style.top = newY + 'px';
  }
});