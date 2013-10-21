/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var timerId;

    var getRandomQuote = function () {
        // If there is no loaded quote that means that we are just starting the app.
        // Run 'bindRandomQuote' once.
        if (!isQuoteDefined(Data.randomQuote)) {
            bindRandomQuote();
        } else {
            ViewModels.loadRandomQuote();
        }

        if (!timerId) {
            timerId = setInterval(function () {
                bindRandomQuote();
            }, 20000);
        }
    }

    var isQuoteDefined = function (quote) {
        return quote.author && quote.quote;
    }

    var stopRandomQuote = function () {
        if (timerId) {
            clearInterval(timerId);
            timerId = undefined;
        }
    }

    var bindRandomQuote = function () {
        ViewModels.getRandomQuote().
            then(function () {
                ViewModels.loadRandomQuote();
            });
    }

    var onQuoteChange = function (value) {
        var authorElements = document.getElementById("container");
        WinJS.UI.Animation.enterContent(authorElements, null).done(function () {
            // Needs to have 'authorElements' quered one more time, because it now holds
            // previous value.
            var authorElements = document.getElementById("container");
            // Operation might be completed in other page ('authors.html' for example);
            // then 'authorElements' is null, but the data is stored and will be loaded
            // when returning to 'home.html'.
            if (authorElements) {
                var author = authorElements.children[0].innerText;
                var quoteText = authorElements.children[1].innerText;
                var quote = new Models.Quote(author, quoteText);
                WinJS.Application.sessionState.quote = quote;
            }
        });
    }

    WinJS.Namespace.define('HomeCodeBehind', {
        getRandomQuote: getRandomQuote,
        stopRandomQuote: stopRandomQuote,
        onQuoteChange: onQuoteChange
    })

    WinJS.Namespace.define('Processes', {})
})();