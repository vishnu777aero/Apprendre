const tooltipId = 'apprendre-tooltip';

// add tool tip
const tooltip = document.createElement('div');
tooltip.id = tooltipId;
document.body.appendChild(tooltip);

document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString().trim();
    
    if(selectedText !== '') {
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        
        const tooltip = document.getElementById(tooltipId);
        tooltip.innerText = selectedText;
        tooltip.style.top = mouseY + 'px';
        tooltip.style.left = mouseX + 'px';
        tooltip.style.display = 'block';
    }
});

document.addEventListener('mousedown', (event) => {
    const tooltip = document.getElementById(tooltipId);
    if (event.target !== tooltip) {
        tooltip.style.display = 'none';
    }
});