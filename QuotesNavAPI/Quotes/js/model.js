(function () {
    var author = {
        name: "",
        quotes:[]
    };
    var AuthorQuotes = WinJS.Class.define(function (name, quotes) {
        this.name = name;
        this.quotes = quotes;
    })

    var CategoryQuotes = WinJS.Class.define(function (name, quoteContent, authorName) {
        this.name = name;
        this.quoteContent = quoteContent;
        this.authorName = authorName;
    })

    var Quote = WinJS.Class.define(function (content, author) {
        this.content= content;
        this.author = author;
    })

    var AuthorsByLetter = WinJS.Class.define(function (name, url) {
        this.name = name;
        this.quotesUrl = url;
    });

    var CategoriesByLetter = WinJS.Class.define(function (name, url) {
        this.name = name;
        this.quotesUrl = url;
    });

    var SearchError = WinJS.Class.define(function (content) {
        this.message = content;
    });

    var RandomModel = WinJS.Class.define(function (quote, author) {
        this.quote = quote;
        this.author = author;
    });
    
    WinJS.Namespace.define('Models', {
        AuthorsByLetterModel: AuthorsByLetter,
        CategoriesByLetterModel: CategoriesByLetter,
        AuthorQuotesModel: AuthorQuotes,
        CategoryQuotesModel: CategoryQuotes,
        Quote: Quote,
        SearchError: SearchError,
        RandomModel: RandomModel,
    });
})();