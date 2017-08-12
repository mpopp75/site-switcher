function saveOptions(e) {
  browser.storage.local.set({
    sites: document.querySelector("#sites").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#sites").value = result.sites || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("sites");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);