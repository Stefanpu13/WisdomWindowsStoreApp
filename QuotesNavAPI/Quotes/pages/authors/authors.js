/// <reference path="../../js/viewmodels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/authors/authors.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {            
            WinJS.Binding.processAll(element,
            ViewModels.getAuthors(options.selectedLetter));
                
        },

        ready: function (element, options) {
            // TODO: Initialize the page here.
            
        },

        processed: function (element, options) {
            
      
        },
        
        unload: function () {
            // TODO: Respond to navigations away from this page.
            // Keep in mind that reset binding should only be called when 
            // Returning to 'letters' view.
            ViewModels.resetBinding(ViewModels.authorsByLetterList);
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },
    });
})();
