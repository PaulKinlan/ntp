let redirectUrl;

chrome.storage.sync.get("redirectUrl", (data) => {
  if (data.redirectUrl) {
    redirectUrl = data.redirectUrl;
    chrome.tabs.update({ url: redirectUrl });
  } else {
    // If no URL is set, redirect to the options page to configure one.
    chrome.tabs.update({ url: "options.html" });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    if (tab.url === redirectUrl) {
      chrome.tabs.sendMessage(tabId, { action: "focus" });
    }
  }
});
