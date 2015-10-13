self.port.on("resulturls", function(urls) {
    var div = document.getElementById('result');
    var resultHTML = "<ul>\n";
    for (var i = 0; i < urls.length; i++) {
        var domain = urls[i].match(/https?:\/\/(.*?)\//gi);
        resultHTML += "  <li data-url=\"" + urls[i] + "\">" + domain + "</li>\n";
    }
    resultHTML += "</ul>\n";

    div.innerHTML = resultHTML;

    // Listener for click events on links; send URL back to index.js
    window.addEventListener('click', function(event) {
        var t = event.target;
        var url = t.dataset.url;
        if (t.nodeName == 'LI') {
            self.port.emit('go2url', url);
        }
    }, false);
});