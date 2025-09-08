// Saves options to chrome.storage
function save_options() {
  var url = document.getElementById("redirect-url").value;
  chrome.storage.sync.set(
    {
      redirectUrl: url,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores input box state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(
    {
      redirectUrl: "", // default to empty string
    },
    function (items) {
      document.getElementById("redirect-url").value = items.redirectUrl;
    }
  );
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("options-form").addEventListener("submit", (e) => {
  e.preventDefault();
  save_options();
});
