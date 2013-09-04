/// <reference path="../../js/eventHandlers.js" />
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        init: function (element, options) {
            //WinJS.Binding.processAll(element, ViewModels.getRandomQuote().then(function (success) {
            //    ViewModels.loadRandomQuote();
            //}));
        },

        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Utilities.query("a").listen("click",
                EventHаndlers.linkClickEventHandler, false);

            EventHаndlers.attachAllHandlers();

            var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
            printManager.onprinttaskrequested = Print.onPrintTaskRequested;

            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.addEventListener("datarequested", Share.shareTextHandler);

            ReloadRandom.getNewRandomQuote(element);     
        },

        unload: function () {
            ViewModels.resetBinding(ViewModels.randomQuoteList);
        },

        nameInputChanged: function (eventInfo) {
            var nameInput = eventInfo.srcElement;

            // Store the user's name for multiple sessions.
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            //roamingSettings.values["userName"] = nameInput.value;
        },
    });
})();
