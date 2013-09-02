/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var getClassName = function (htmlString) {
        var pattern = /class="(http:.*?)"/;
        var getClass = new RegExp(pattern);
        var className = getClass.exec(htmlString);
        return className[1];
    };

    var getCategoriesQuotes = function (invokeEvent) {
        var listView = document.getElementById('categoriesList').winControl;
        var selectionCount = listView.selection.count();
        var selectedCategories = [];
        var quotesUrl = "";

        if (selectionCount > 0) {
            listView.selection.getItems().done(function (selection) {

                for (var i = 0; i < selectionCount; i++) {
                    selectedCategories.push({
                        title: selection[i].data.name,
                        quotesUrl: selection[i].data.quotesUrl
                    });
                }
            });
        }
        else {
            var target = invokeEvent.target;
            var innerHTML = target.innerHTML;
            quotesUrl = getClassName(innerHTML);
            selectedCategories.push({ name: target.innerText, quotesUrl: quotesUrl });
        }

        var html = "pages/categoryQuotes/categoryQuotes.html";
        WinJS.Navigation.navigate(html, { selectedCategories: selectedCategories });
    }

    WinJS.Utilities.markSupportedForProcessing(getCategoriesQuotes);

    WinJS.Namespace.define('CategoriesCodeBehind', {
        getCategoriesQuotes: getCategoriesQuotes
    })
})();