/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var getClassName = function (htmlString) {
        var pattern = /class="([a-zA-Z]+)"/;
        var getClass = new RegExp(pattern);
        var className = getClass.exec(htmlString);
        return className[1];
    };

    var goToPage = function (invokeEvent) {
        var listView = document.getElementById('lettersList').winControl;
        var selectionCount = listView.selection.count();
        var selectedLetter = [];
        var pageName = "";

        if (selectionCount > 0) {
            listView.selection.getItems().done(function (selection) {                                
                pageName = selection[0].data.letterClass;
                for (var i = 0; i < selectionCount; i++) {
                    selectedLetter.push(selection[i].data.letter);
                }
            });
        }
        else {
            var target = invokeEvent.target;
            var innerHTML = target.innerHTML;
            pageName = getClassName(innerHTML);
            selectedLetter.push(target.innerText);
        }
        
        var html = "pages/" + pageName + '/' + pageName + '.html';
        WinJS.Navigation.navigate(html, { selectedLetter: selectedLetter });
    }

    WinJS.Utilities.markSupportedForProcessing(goToPage);

    WinJS.Namespace.define('LettersCodeBehind', {
        goToPageByLetterPage:goToPage
    });

})();