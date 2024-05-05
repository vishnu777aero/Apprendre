chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.insertCSS(tabId, {file: 'css/tooltip.css'});
    }
});
