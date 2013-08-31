/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var getClassName = function (htmlString) {
        var pattern = /class="([a-zA-Z]+)"/;
        var getClass = new RegExp(pattern);
        var className = getClass.exec(htmlString);
        return className[1];
    };

    var goToPage = function(invokeEvent){
        var h = invokeEvent.target;        
        var innerHTML = h.innerHTML;
        var pageName = getClassName(innerHTML);

        var html = "pages/" + pageName + '/' + pageName + '.html';
        WinJS.Navigation.navigate(html);
    }

    WinJS.Utilities.markSupportedForProcessing(goToPage);

    WinJS.Namespace.define('LettersCodeBehind', {
        goToPageByLetterPage:goToPage
    });

})();