(function () {


    var author = {
        name: "",
        quotes:[]
    };

    var authors = {
        name: "",
        authorUrl:''
    };

    var allAuthors = [];

    var ObservableAuthor = WinJS.Binding.define(author);

    WinJS.Namespace.define('Data', {
        getAuthor: function (name, quotes) {
            return new ObservableAuthor({
                name: name,
                quotes: quotes
            });
        },
        allAuthors: allAuthors
    });
})();