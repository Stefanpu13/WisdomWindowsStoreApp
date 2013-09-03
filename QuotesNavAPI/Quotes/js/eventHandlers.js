/// <reference path="appCommands.js" />
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

    var attachCreateNewCollection = function (eventInfo) {
        var newCollectionButton = document.getElementById('createNewCollection');
        newCollectionButton.addEventListener('click', Commands.createCollection);
    }

    var attachAllHandlers = function (element) {
        attachCreateNewCollection();
    };

    WinJS.Namespace.define("EventHаndlers", {
        linkClickEventHandler: linkClickEventHandler,
        attachAllHandlers: attachAllHandlers
    });
})();