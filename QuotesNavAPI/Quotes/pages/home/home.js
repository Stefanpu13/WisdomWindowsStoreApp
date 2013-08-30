(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Utilities.query("a").listen("click",
                this.linkClickEventHandler, false);
        },

        nameInputChanged: function (eventInfo) {
        var nameInput = eventInfo.srcElement;

            // Store the user's name for multiple sessions.
        var appData = Windows.Storage.ApplicationData.current;
        var roamingSettings = appData.roamingSettings;
        //roamingSettings.values["userName"] = nameInput.value;
    },        

 
    linkClickEventHandler: function (eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate(link.href);
    }
    });
})();
