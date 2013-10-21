/// <reference path="../../js/viewmodels.js" />
/// <reference path="../../js/eventHandlers.js" />
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        init: function (element, options) {
            HomeCodeBehind.getRandomQuote();
        },

        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Utilities.query("a").listen("click",
                EventHаndlers.linkClickEventHandler, false);

            // Bind random quote properties for animation purposes.
            // It is enough to bind just one property
            ViewModels.randomQuote.bind('author', HomeCodeBehind.onQuoteChange);

            var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
            printManager.onprinttaskrequested = Print.onPrintTaskRequested;

            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.addEventListener("datarequested", Share.shareTextHandler);

            // Find the container and bind the observable quote to it.
            var container = document.getElementById('container');
            WinJS.Binding.processAll(container, ViewModels.randomQuote);


        },

        unload: function () {
            HomeCodeBehind.stopRandomQuote()
        }
    });
})();
