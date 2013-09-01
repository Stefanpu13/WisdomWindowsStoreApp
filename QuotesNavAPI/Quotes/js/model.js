(function () {
    var author = {
        name: "",
        quotes:[]
    };

    var AuthorsByLetter = WinJS.Class.define(function (name, url) {
        this.name = name;
        this.qoutesUrl = url;
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
        SearchError: SearchError        
    });
})();