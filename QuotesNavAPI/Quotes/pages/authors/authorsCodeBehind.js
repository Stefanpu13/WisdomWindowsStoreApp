/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var getClassName = function (htmlString) {
        var pattern = /class="(http:.*?)"/;
        var getClass = new RegExp(pattern);
        var className = getClass.exec(htmlString);
        return className[1];
    };

    var getAuthorQuotes = function (invokeEvent) {
        // get the listview selected items
        var listView = document.getElementById('authorsList').winControl;
        var selectionCount = listView.selection.count();
        var selectedAuthors = [];
        var quotesUrl = "";

        if (selectionCount > 0) {
            listView.selection.getItems().done(function (selection) {

                for (var i = 0; i < selectionCount; i++) {
                    selectedAuthors.push({
                        name: selection[i].data.name,
                        quotesUrl: selection[i].data.quotesUrl
                    });
                }
            });
        }
        else {
            var target = invokeEvent.target;
            var innerHTML = target.innerHTML;
            quotesUrl = getClassName(innerHTML);
            selectedAuthors.push({name: target.innerText, quotesUrl:quotesUrl});
        }

        var html = "pages/authorQuotes/authorQuotes.html";
        WinJS.Navigation.navigate(html, { selectedAuthors: selectedAuthors });
    }

    WinJS.Utilities.markSupportedForProcessing(getAuthorQuotes);

    WinJS.Namespace.define('AuthorsCodeBehind', {
        getAuthorQuotes: getAuthorQuotes
    })
})();