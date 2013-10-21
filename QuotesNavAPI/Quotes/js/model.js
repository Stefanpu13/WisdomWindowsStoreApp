(function () {
    var author = {
        name: "",
        quotes:[]
    };

    var Quote = WinJS.Class.define(function (quote, author) {
        this.quote = quote;
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
    
    WinJS.Namespace.define('Models', {
        AuthorsByLetterModel: AuthorsByLetter,
        CategoriesByLetterModel: CategoriesByLetter,       
        Quote: Quote,
        SearchError: SearchError       
    });
})();