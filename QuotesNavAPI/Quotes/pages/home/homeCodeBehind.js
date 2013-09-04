/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var randomQuoteIntervalSet = false;    

    var getNewRandomQuote = function (element) {
        if (!randomQuoteIntervalSet) {
            setInterval(function () {
                bindRandomQuote(element);
            }, 4000);
            randomQuoteIntervalSet = true;            
        }
        
    }

    var bindRandomQuote = function (element) {
        ViewModels.getRandomQuote().
            then(function (success) {                
                ViewModels.loadRandomQuote(); 
            });
    }

    WinJS.Namespace.define('ReloadRandom', {
        getNewRandomQuote: getNewRandomQuote
    })

    WinJS.Namespace.define('Processes', {})
})();