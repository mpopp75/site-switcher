var currentTab = null;
var sitesJson  = null;
var sites      = [];

var getting = browser.storage.local.get("ctab");
getting.then(setCurrentTab, onError);

var getting = browser.storage.local.get("sites");
getting.then(setSitesJson, onError);

function setCurrentTab(result) {
  currentTab = result.ctab || "";

  if(currentTab !== null && sitesJson !== null) {
    setupPanel();
  }
}

function setSitesJson(result) {
  sitesJson = result.sites || "";

  if(currentTab !== null && sitesJson !== null) {
    setupPanel();
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

// create HTML inside Panel
function setupPanel() {
    sites = JSON.parse(sitesJson);

    var resultHtml = "<ul>\n";

    for (var i = 0; i < sites.length; i++) {
        for (var j = 0; j < sites[i].length; j++) {
            if (currentTab.indexOf(sites[i][j]) === 0) {
                resultHtml += foundSite(sites[i], j, currentTab);
            }
        }
    }
    resultHtml += "</ul>\n";

    document.querySelector("#output").innerHTML = resultHtml;
}

// we found the correct set of sites[], now generate links for
// all elements, except the current URL itself (i.e. k !== j)
function foundSite(sites, j, currentTab) {
    var resultHtml = "";

    for (var k = 0; k < sites.length; k++) {
        var newUrl = currentTab.replace(sites[j], sites[k]);
        if (k !== j) {
            resultHtml += "  <li data-url=\"" + newUrl + "\">" + sites[k] + "</li>\n";
        }
    }

    return resultHtml;
}

// Listen for clicks in the panel, open URL in tab
window.addEventListener('click', function(event) {
    var t = event.target;
    var url = t.dataset.url;
    if (t.nodeName == 'LI') {
        console.log("Go to link: " + url);

        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            browser.tabs.update(tabs[0].id, {url: url});
            currentTab = url;
            setupPanel();
        });
    }
}, false);