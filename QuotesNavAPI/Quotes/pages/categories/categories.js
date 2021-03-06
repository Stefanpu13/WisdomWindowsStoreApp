﻿/// <reference path="../../js/viewmodels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/categories/categories.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        init: function (element, options) {
            WinJS.Binding.processAll(element,
          ViewModels.getCategories(options.selectedLetter)
          //      .then(function (success) {
          //    ViewModels.loadCategories();
          //}, function (error) {
          //    console.log(error.message);
          //})
          );
        },
        ready: function (element, options) {
            WinJS.Utilities.query("a").listen("click",
                Data.getCategoriesByLetter(Data.letters[28].letter), false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            // Keep in mind that reset binding should only be called when 
            // Returning to 'letters' view.
            ViewModels.resetBinding(ViewModels.categoriesByLetterList);
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
