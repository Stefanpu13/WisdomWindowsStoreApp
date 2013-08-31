/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var linkClickEventHandler = function (eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        Data.letters.forEach(function (letter) { letter.letterClass = link.id; });
        WinJS.Navigation.navigate(link.href);        
    };

    var letterTypeEventHandler = function (eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        var href = 'pages/' + link.id + '/' + link.id + '.html';
        link.href = href;
        WinJS.Navigation.navigate(link.href);
    }

    WinJS.Namespace.define("EventHаndlers", {
         linkClickEventHandler: linkClickEventHandler
    });
})();