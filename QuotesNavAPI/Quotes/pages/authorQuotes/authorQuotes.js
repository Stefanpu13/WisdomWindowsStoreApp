/// <reference path="../../js/viewmodels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/authorQuotes/authorQuotes.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
            WinJS.Binding.processAll(element,
          ViewModels.getAuthorsQuotes(options.selectedAuthors));
            
        },
        ready: function (element, options) {
            // TODO: Initialize the page here.
        },

        processed: function (element, options) {
            //QuotesHandlers.addQuotesHandlers(element);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            ViewModels.resetBinding(ViewModels.authorsQuotesList);
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
