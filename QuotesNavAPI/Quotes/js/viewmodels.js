/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="model.js" />
/// <reference path="data.js" />
(function () {
    // The listeners from the 'authors.js' file should take code from here.
    // which calls the functions in 'data.js'
    var lettersList = new WinJS.Binding.List([]);
    var authorsByLetterList = new WinJS.Binding.List([]);
    var categoriesByLetterList = new WinJS.Binding.List([]);
    var authorsQuotesList = new WinJS.Binding.List([]);
    var categoriesQuotesList = new WinJS.Binding.List([]);
    var randomQuoteList = new WinJS.Binding.List([]);
    var currentDisplayedItem = new WinJS.Binding.List([]);
    var currentCollection = new WinJS.Binding.List([]);
    var error = new WinJS.Binding.define(Models.SearchError);

    var lettersChanged = function (first, second) {
        return first.join() != second.join();
    }

    var decodeElements = function (text) {
        var pattern = /\&#\d+;/g;        
        var decoded;
        var code;  

        var matches = text.match(pattern);
        if (matches) {
            for (var i = 0; i < matches.length; i++) {
                code = matches[i].substring(2);
                decoded = String.fromCharCode(code.substr(0, code.length -1));
                text = text.replace(matches[i], decoded.substr(-1));
            }
        }

        return text;
    }

    var getAuthorsQuotes = function (authors) {
        Data.authorsQuotes = [];
        var allPromises = [];
        var author;
        for (var i = 0; i < authors.length; i++) {
            var promise =
                Data.getAuthorsQuotes(authors[i].name, authors[i].quotesUrl).then(function (result) {
                    author = JSON.parse("[" + result.responseText + "]")[0];

                    for (var j = 0; j < author.quotes.length; j++) {
                        var quotes = decodeElements(author.quotes[j]);

                        Data.authorsQuotes.
                        push(new Models.Quote(quotes, author.name));
                    }
                });
            allPromises.push(promise);
        }

        return WinJS.Promise.join(allPromises).done(function () {
            if (Data.authorsByLetter.length == 0) {

            }
            else {                
                ViewModels.loadAuthorsQuotes();
            }
        });
    }

    var getCategoriesQuotes = function (categories) {
        Data.categoriesQuotes = [];
        var allPromises = [];
        var category;
        for (var i = 0; i < categories.length; i++) {
            var promise =
                Data.getCategoriesQuotes(categories[i].name, categories[i].quotesUrl).then(function (result) {
                    category = JSON.parse(result.responseText);
                    var allQuotes = category.quotes;
                    var quoteText;
                    var authorName;                    
                    var newQuote; 

                    // As 'category.quotes' is object eith properties, we have to
                    // enumerate and Push all props and their values in 'newQuote'
                    for (var prop in allQuotes) {
                        newQuote = new Models.CategoryQuotesModel(category.title);
                        quoteText = decodeElements(prop);
                        authorName = allQuotes[prop];
                        newQuote.authorName = allQuotes[prop];
                        newQuote.quoteContent = decodeElements(prop);
                        Data.categoriesQuotes.push(newQuote);
                    }

                    
                });
            allPromises.push(promise);
        }

        return WinJS.Promise.join(allPromises).done(function () {
            if (Data.categoriesByLetter.length == 0) {
                // TODO: Error responce
            }
            else {
                ViewModels.loadCategoriesQuotes();
            }
        });
    }

    var getAuthors = function (letters) {
        // Clean authors from previous request.        

        if (lettersChanged(letters, Data.selectedLetters)) {
            Data.authorsByLetter = [];
            var allPromises = [];
            var authors;
            for (var i = 0; i < letters.length; i++) {
                var promise =
                    Data.getAuthorsByLetter(letters[i]).then(function (result) {
                        authors = JSON.parse("[" + result.responseText + "]")[0];

                        for (var i = 0; i < authors.length; i++) {
                            Data.authorsByLetter.
                                push(new Models.AuthorsByLetterModel(authors[i].name, authors[i].http));
                        }
                    });
                allPromises.push(promise);
            }
            return WinJS.Promise.join(allPromises).done(function () {
                if (Data.authorsByLetter.length == 0) {
                }
                else {
                    ViewModels.loadAuthors();
                }
            });
        }
    }

    var getCategories = function (letters) {
        Data.categoriesByLetter = [];
        var allPromises = [];
        for (var i = 0; i < letters.length; i++) {
            var promise = Data.getCategoriesByLetter(letters[i]).then(function (result) {
                var categories = JSON.parse("[" + result.responseText + "]")[0];

                for (var i = 0; i < categories.length; i++) {
                    Data.categoriesByLetter.
                        push(new Models.CategoriesByLetterModel(categories[i].name, categories[i].http));
                }
            });

            allPromises.push(promise);
        }

        return WinJS.Promise.join(allPromises).done(function () {
            if (Data.categoriesByLetter.length == 0) {
                //return new WinJS.Promise(function (complete, error) {
                //    error("Не бяха открити категории с буква " + letter + ".");
                //});
            }
            else {
                ViewModels.loadCategories();
            }
        });
    }

    var getRandomAtInterval = function () {
        setInterval(function () { getRandom(); }, 4000);
    }

    var getRandom = function () {
        var allPromises = [];
        var quote;
        var promise = Data.getRandomQuote().then(function (result) {
            quote = JSON.parse("[" + result.responseText + "]")[0];
            Data.randomQuote.pop();
            Data.randomQuote.push(new Models.RandomModel(quote.quote, quote.author));
        });
        allPromises.push(promise);

        return WinJS.Promise.join(allPromises);
    }

    var loadLetters = function () {

        var currentCount = lettersList.dataSource.list.length;
        lettersList.dataSource.list.splice(0, currentCount);

        var letters = Data.letters;
        for (var i = 0; i < letters.length; i++) {
            lettersList.push(letters[i]);
        }
    }

    var loadcurrentDisplayedItem = function (item) {
        var currentCount = currentDisplayedItem.dataSource.list.length;
        currentDisplayedItem.dataSource.list.splice(0, currentCount);

        Data.currentDisplayedItem.push(item);
        currentDisplayedItem.push(Data.currentDisplayedItem[0]);

    }

    var loadCurrentCollection = function () {
        //var currentCount = currentCollection.dataSource.list.length;
        //currentCollection.dataSource.list.splice(0, currentCount);
        var collection = Data.collectionItems;
        for (var i = 0; i < collection.length; i++) {
            currentCollection.push(collection[i]);
        }
    }

    var loadAuthorsByLetter = function () {

        var authors = Data.authorsByLetter;
        for (var i = 0; i < authors.length; i++) {
            authorsByLetterList.push(authors[i]);
        }
    }

    var loadCategoriesByLetter = function () {
        var categories = Data.categoriesByLetter;

        for (var i = 0; i < categories.length; i++) {
            categoriesByLetterList.push(categories[i]);
        }
    }

    var loadAuthorsQuotes = function () {
        var authorsQuotes = Data.authorsQuotes;

        for (var i = 0; i < authorsQuotes.length; i++) {
            authorsQuotesList.push(authorsQuotes[i]);
        }
    }

    var loadCategoriesQuotes = function () {
        var categoriesQuotes = Data.categoriesQuotes;

        for (var i = 0; i < categoriesQuotes.length; i++) {
            categoriesQuotesList.push(categoriesQuotes[i]);
        }
    }

    var loadRandomQuote = function () {

        var quote = Data.randomQuote;
        for (var i = 0; i < quote.length; i++) {
            randomQuoteList.push(quote[i]);
        }
    }

    var resetBinding = function (bindList) {
        var bindListCount = bindList.dataSource.list.length;
        bindList.dataSource.list.splice(0, bindListCount);       
    }

    WinJS.Namespace.define('ViewModels', {
        getAuthors: getAuthors,
        getCategories: getCategories,
        getAuthorsQuotes: getAuthorsQuotes,
        getCategoriesQuotes: getCategoriesQuotes,
        getRandomQuote: getRandom,
        loadRandomQuote: loadRandomQuote,
        loadLetters: loadLetters,
        loadAuthors: loadAuthorsByLetter,
        loadCategories: loadCategoriesByLetter,
        loadAuthorsQuotes: loadAuthorsQuotes,
        loadCategoriesQuotes: loadCategoriesQuotes,
        loadcurrentDisplayedItem: loadcurrentDisplayedItem,
        loadCurrentCollection: loadCurrentCollection,
        resetBinding:resetBinding,
        lettersList: lettersList,
        authorsByLetterList: authorsByLetterList,
        categoriesByLetterList: categoriesByLetterList,
        authorsQuotesList: authorsQuotesList,
        categoriesQuotesList: categoriesQuotesList,
        randomQuoteList: randomQuoteList,
        currentDisplayedItem: currentDisplayedItem
    });
})();