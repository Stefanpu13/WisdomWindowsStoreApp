(function () {
    var author = {
        name: "",
        quotes:[]
    };
    var AuthorQuotes = WinJS.Class.define(function (name, quotes) {
        this.name = name;
        this.quotes = quotes;
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
        this.qoutesUrl = url;
    });

    var SearchError = WinJS.Class.define(function (content) {
        this.message = content;
    });
    
    WinJS.Namespace.define('Models', {
        AuthorsByLetterModel: AuthorsByLetter,
        CategoriesByLetterModel: CategoriesByLetter,
        AuthorQuotesModel: AuthorQuotes,
        Quote: Quote,
        SearchError: SearchError        
    });
})();