var { ToggleButton } = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var tl = require("./tablistener");

var buttonsEnabled = {
  "16": "./site-switcher-active-16.png",
  "32": "./site-switcher-active-32.png",
  "64": "./site-switcher-active-64.png"
};

var buttonsDisabled = {
  "16": "./site-switcher-inactive-16.png",
  "32": "./site-switcher-inactive-32.png",
  "64": "./site-switcher-inactive-64.png"
};

var button = ToggleButton({
  id: "mainicon",
  label: "Switch Site",
  icon: buttonsEnabled,
  disabled: false,
  onChange: buttonClicked
});

function buttonClicked(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

var panel = panels.Panel({
  width: 450,
  height: 300,
  contentURL: "./panel.html",
  onHide: handleHide,
  disabled: true,
  contentScriptFile: "./panelScript.js"
});

panel.port.on("go2url", function(url) {
    tabs.activeTab.url = url;
});

function handleHide() {
  button.state("window", {
     checked: false
  });
}

tl.tabListener(tabs, button, panel, buttonsEnabled, buttonsDisabled);