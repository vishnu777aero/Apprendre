chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.insertCSS(tabId, {file: 'css/tooltip.css'});
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'speak') {
        chrome.tts.speak(request.text, { lang: request.lang });
    }
  });
  