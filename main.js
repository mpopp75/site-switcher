var currentTab;

function updateActiveTab(tabs) {

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      console.log(currentTab.url);
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

browser.tabs.onUpdated.addListener(updateActiveTab);
browser.tabs.onActivated.addListener(updateActiveTab);
updateActiveTab();