document.addEventListener('mouseup', () => {
    var selectedText = window.getSelection().toString().trim();
    
    if(selectedText !== '') {
        console.log({ selectedText });
    }
});