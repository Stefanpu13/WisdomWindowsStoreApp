/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="model.js" />
/// <reference path="data.js" />
(function () {
    // The listeners from the 'authors.js' file should take code from here.
    // which calls the functions in 'data.js'
    var lettersList = new WinJS.Binding.List([]);

    var loadLetters = function () {

        var currentCount = lettersList.dataSource.list.length;
        lettersList.dataSource.list.splice(0, currentCount);

        var letters = Data.letters;
        for (var i = 0; i < letters.length; i++) {
            lettersList.push(letters[i]);
        }
    }

    var getAuthors = function (letter) {        
        return Data.getAuthorsByLetter(letter).then(function (result) {
            var authors = JSON.parse("[" + result.responseText + "]")[0];

            for (var i = 0; i < authors.length; i++) {
                Models.AllAuthors.push(
                    new Models.AuthorsByLetterModel(authors[i].name, authors[i].http));
            }
        });
    }    

    WinJS.Namespace.define('ViewModels', {
        getAuthors: getAuthors,
        getLetters: loadLetters,
        lettersList:lettersList
    });
})();