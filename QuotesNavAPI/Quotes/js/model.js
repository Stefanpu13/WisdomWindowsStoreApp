(function () {


    var author = {
        name: "",
        quotes:[]
    };

    var AuthorsByLetter = WinJS.Class.define(function (name, url) {
        this.name = name;
        this.qoutesUrl = url;
    });

    var allAuthors = [];

    WinJS.Namespace.define('Models', {
        AuthorsByLetterModel: AuthorsByLetter,
        AllAuthors: allAuthors
    });

    //var ObservableAuthor = WinJS.Binding.define(author);

    //WinJS.Namespace.define('Data', {
    //    getAuthor: function (name, quotes) {
    //        return new ObservableAuthor({
    //            name: name,
    //            quotes: quotes
    //        });
    //    },
    //    allAuthors: allAuthors
    //});
})();