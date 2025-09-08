chrome.storage.sync.get("redirectUrl", (data) => {
  if (data.redirectUrl) {
    window.location.href = data.redirectUrl;
  } else {
    // If no URL is set, redirect to the options page to configure one.
    window.location.href = "options.html";
  }
});
