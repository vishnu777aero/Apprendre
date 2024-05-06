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

        const detectionResponse = await detectLanguage(selectedText);
        state.targetLanguage = findTargetLanguage({ detectedLanguage: detectionResponse[0]?.language });
        const { targetLanguage } = state;
        const { translatedText } = await translate({ text: selectedText, target: targetLanguage });
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

const detectLanguage = async (text) => {
    return fetch("http://localhost:5000/detect", {
	    method: "POST",
	    body: JSON.stringify({
		q: text,
		api_key: ""
	    }),
	    headers: { "Content-Type": "application/json" }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("translation error")
        }
    }).catch((e) => {
        console.log(e);
    });
}

const translate = async ({ text, target }) => {
    return fetch("http://localhost:5000/translate", {
	method: "POST",
	body: JSON.stringify({
		q: text,
		source: "auto",
		target,
		format: "text",
		api_key: ""
	}),
	headers: { "Content-Type": "application/json" }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("translation error")
        }
    }).catch((e) => {
        console.log(e);
    });
}

const findTargetLanguage = ({ detectedLanguage }) => {
    switch (detectedLanguage) {
        case "en": return "fr";
        case "fr": return "en";
        default: return "en";
    }
}