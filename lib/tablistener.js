function tabListener(tabs, button, panel, buttonsEnabled, buttonsDisabled) {
    tabs.on("activate", function(tab) {
        tabChanged(tab, button, panel, buttonsEnabled, buttonsDisabled);
    });

    tabs.on("load", function(tab) {
        tabChanged(tab, button, panel, buttonsEnabled, buttonsDisabled);
    });
}

function tabChanged(tab, button, panel, buttonsEnabled, buttonsDisabled) {
    var simplePrefs = require("sdk/simple-prefs");

    try {
        var sitesJSON = simplePrefs.prefs["sites"];
        var sites = JSON.parse(sitesJSON);

        var found = false;
        for (var i = 0; i < sites.length; i++) {
            for (var j = 0; j < sites[i].length; j++) {
                if (tab.url.indexOf(sites[i][j]) === 0) {
                    siteFound(sites[i], j, button, panel, buttonsEnabled, tab);
                    found = true;
                    break;
                }
            }
        }

        if (found === false) {
            button.disabled = true;
            button.icon = buttonsDisabled;
            panel.disabled = true;
        }
    } catch (e) {
        button.disabled = true;
        button.icon = buttonsDisabled;
        panel.disabled = true;
    }
}

function siteFound(sites, j, button, panel, buttonsEnabled, tab) {
    button.disabled = false;
    button.icon = buttonsEnabled;
    panel.disabled = false;

    var urls = [];
    var resultId = 0;
    for (var i = 0; i < sites.length; i++) {
        // skip current URL
        if (i == j) {
            continue;
        }

        urls[resultId++] = tab.url.replace(sites[j], sites[i]);
    }

    // make panel's height 30px times the number of entries
    panel.height = 20 + 40 * resultId;

    panel.port.emit("resulturls", urls);
}

exports.tabListener = tabListener;