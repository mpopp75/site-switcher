var currentTab;
var sitesJson  = null;

// update currentTab (including browser storage) if new tab is active
function updateActiveTab(tabs) {

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      console.log(currentTab.url);

      browser.storage.local.set({
        ctab: currentTab.url
      });
    }

    var getting = browser.storage.local.get("sites");
    getting.then(setSitesJson, onError);
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

browser.tabs.onUpdated.addListener(updateActiveTab);
browser.tabs.onActivated.addListener(updateActiveTab);
updateActiveTab();

function setSitesJson(result) {
  sitesJson = result.sites || "";

  siteInJson();
}

// search if current URL is included in JSON
// enable/disable icon button accordingly
function siteInJson() {
  sites = JSON.parse(sitesJson);

  var found = false;
  for (var i = 0; i < sites.length; i++) {
    if (found === true) {
      break;
    }

    for (var j = 0; j < sites[i].length; j++) {
      if (currentTab.url.indexOf(sites[i][j]) === 0) {
        found = true;
        break;
      }
    }
  }

  if (found === false) {
    browser.browserAction.disable();
  } else {
    browser.browserAction.enable();
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}