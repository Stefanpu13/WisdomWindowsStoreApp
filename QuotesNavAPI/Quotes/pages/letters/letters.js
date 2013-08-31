/// <reference path="../../js/viewmodels.js" />
/// <reference path="../../js/eventHandlers.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/Letters/letters.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
            ViewModels.getLetters();
        },
        ready: function (element, options) {
            // TODO: Initialize the page here.
            //var letters = ViewModels.getLetters();
            WinJS.Utilities.query("a").listen("click",
                EventHаndlers.linkClickEventHandler, false);
            //WinJS.Utilities.query('button.letters').listen('click',
            //    this.goToPage, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },
    });
})();
