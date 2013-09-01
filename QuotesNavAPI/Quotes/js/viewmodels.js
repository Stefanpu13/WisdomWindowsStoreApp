/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="model.js" />
/// <reference path="data.js" />
(function () {
    // The listeners from the 'authors.js' file should take code from here.
    // which calls the functions in 'data.js'
    var lettersList = new WinJS.Binding.List([]);
    var authorsByLetterList = new WinJS.Binding.List([]);
    var categoriesByLetterList = new WinJS.Binding.List([]);
    var error = new WinJS.Binding.define(Models.SearchError)

    var loadLetters = function () {

        var currentCount = lettersList.dataSource.list.length;
        lettersList.dataSource.list.splice(0, currentCount);

        var letters = Data.letters;
        for (var i = 0; i < letters.length; i++) {
            lettersList.push(letters[i]);
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

    var getAuthors = function (letters) {
        // Clean authors from previous request.
        Data.authorsByLetter = [];
        var allPromises = [];
        var authors;
        for (var i = 0; i <letters.length; i++) {
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
                //return new WinJS.Promise(function (complete, error) {
                //    error("Не бяха открити автори с буква " + letter + ".");
                //});


            }
            else {
                ViewModels.loadAuthors();
            }
        });
    }

    var getCategories = function (letters) {
        Data.categoriesByLetter = [];
        var allPromises = [];
        for (var i = 0; i < letters.length; i++) {
            var promise = Data.getCategoriesByLetter(letters[i]).then(function (result) {
                var categories = JSON.parse("[" + result.responseText + "]")[0];

                for (var i = 0; i < categories.length; i++) {
                    Data.categoriesByLetter.
                        push(new Models.AuthorsByLetterModel(categories[i].name, categories[i].http));
                }
            });

            allPromises.push(promise);
        }

        return WinJS.Promise.join(allPromises);
    }

    var resetBinding = function () {
        var currentAuthorCount = authorsByLetterList.dataSource.list.length;
        authorsByLetterList.dataSource.list.splice(0, currentAuthorCount);

        var  currentCategoryCount = categoriesByLetterList.dataSource.list.length;
        categoriesByLetterList.dataSource.list.splice(0, currentCategoryCount);
    }

    WinJS.Namespace.define('ViewModels', {
        getAuthors: getAuthors,
        getCategories: getCategories,
        loadLetters: loadLetters,
        loadAuthors: loadAuthorsByLetter,
        loadCategories: loadCategoriesByLetter,
        resetBinding:resetBinding,
        lettersList: lettersList,
        authorsByLetterList: authorsByLetterList,
        categoriesByLetterList: categoriesByLetterList
    });
})();