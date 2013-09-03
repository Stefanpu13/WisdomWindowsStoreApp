/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var getNewRandomQuote = function () {
        setInterval(function () { bind(); }, 5000);
    }

    var bind = function (element) {
        WinJS.Binding.processAll(element, ViewModels.getRandomQuote().
            done(function (success) {
                ViewModels.loadRandomQuote();
            }));
    }

    WinJS.Namespace.define('ReloadRandom', {
        getNewRandomQuote: getNewRandomQuote
    })
})();