/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/pages/home.html", {
        ready: function (element, options) {
            registerForPrintContract();
        }
    });

    function registerForPrintContract() {
        var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
        printManager.onprinttaskrequested = onPrintTaskRequested;
        WinJS.log && WinJS.log("Print Contract registered with customization. Use the Charms bar to print.", "sample", "status");
    }

    function onPrintTaskRequested(printEvent) {
        var printTask = printEvent.request.createPrintTask("Print Sample", function (args) {
            args.setSource(MSApp.getHtmlPrintDocumentSource(document));

            // Choose the printer options to be shown.
            // The order in which the options are appended determines the order in which they appear in the UI
            printTask.options.displayedOptions.clear();
            printTask.options.displayedOptions.append(Windows.Graphics.Printing.StandardPrintTaskOptions.copies);
            printTask.options.displayedOptions.append(Windows.Graphics.Printing.StandardPrintTaskOptions.mediaSize);
            printTask.options.displayedOptions.append(Windows.Graphics.Printing.StandardPrintTaskOptions.orientation);
            printTask.options.displayedOptions.append(Windows.Graphics.Printing.StandardPrintTaskOptions.duplex);

            // Preset the default value of the printer option
            printTask.options.mediaSize = Windows.Graphics.Printing.PrintMediaSize.northAmericaLegal;

            // Register the handler for print task completion event
            printTask.oncompleted = onPrintTaskCompleted;
        });
    }

    function onPrintTaskCompleted(printTaskCompletionEvent) {
        // Notify the user about the failure
        if (printTaskCompletionEvent.completion === Windows.Graphics.Printing.PrintTaskCompletion.failed) {
            
        }
    }

    WinJS.Namespace.define("Print", {
        onPrintTaskRequested: onPrintTaskRequested
    })
})();
