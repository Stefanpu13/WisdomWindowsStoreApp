/// <reference path="../../js/viewmodels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/authors/authors.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
            //WinJS.Binding.processAll(element, ViewModels.resetBinding());
            WinJS.Binding.processAll(element,
          ViewModels.getAuthors(options.selectedLetter)
          //      .done(function (success) {
             
          //    ViewModels.loadAuthors();
          //}, function (error) {
          //    console.log(error.message);
          //})
          );
           
        },

        ready: function (element, options) {
           
            
            // TODO: Initialize the page here.
            //Data.getAuthorsByLetter(options.selectedLetter);
            //WinJS.Utilities.query("a").listen("click",
            //    Data.getAuthorsByLetter(Data.letters[6].letter), false);
            //WinJS.Utilities.query('button').
            //    listen('click', this.goToAuthorPage);
        },
        
        unload: function () {
            // TODO: Respond to navigations away from this page.
            // Keep in mind that reset binding should only be called when 
            // Returning to 'letters' view.
            ViewModels.resetBinding();
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },

        //linkClickEventHandler: function (eventInfo) {
        //    eventInfo.preventDefault();
        //    var link = eventInfo.target;
        //    WinJS.Navigation.navigate(link.href);
        //},

        
    });
})();
