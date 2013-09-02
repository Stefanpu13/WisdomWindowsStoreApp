/// <reference path="errors.js" />
(function () {
    // Populate bulgarian capital letters that are to be bound.
    var letters = [];
    var lettersFilled = false;

    (function () {
        var letterACode = 'А'.charCodeAt(0);
        if (!lettersFilled) {

            for (var i = letterACode; i < letterACode + 32; i++) {
                if (i - letterACode != 27 && i - letterACode != 29) {
                    var letter = String.fromCharCode(i);
                    letters.push({ letter: letter, letterClass: 'defaultClass' });
                }
            }
            lettersFilled = true;
        }
    })();

    WinJS.Namespace.define('Data', {
        // Get authors by given letter.
        // Each author has name and url to its page.
        baseUrl: "http://wisdomaccessapi.apphb.com/api/",

        letters: letters,

        randomQuote: [],

        authorsByLetter: [],

        categoriesByLetter: [],

        authorsQuotes: [],

        categoriesQuotes: [],

        quotes:[],

        getAuthorsByLetter: function (letter) {
            return WinJS.Promise.timeout(5000, WinJS.xhr({
                url: this.baseUrl + "Authors/" + letter,
                type: "GET"
            }));
        },
        // Not a function, but a page that has buttons/divs/letters
        // and clicking on a buttons/divs/letters goes to given author.
        getCategoriesByLetter: function (letter) {            
            return WinJS.xhr({
                url: this.baseUrl + "Categories/" + letter,
                type: "GET"
            });
        },

        getAuthorsQuotes: function (name, url) {           
            return WinJS.Promise.timeout(5000, WinJS.xhr({
                url: this.baseUrl + "Authors?name=" + name + "&url="+url,               
                type: "GET",
            }));
        },

        getCategoriesQuotes: function (name, url) {
            return WinJS.Promise.timeout(5000, WinJS.xhr({
                url: this.baseUrl + "Categories?categoryName=" + name +
                    "&categoryUrl=" + url,                                
                type: "GET",
            }));
        },

        getRandomQuote: function () {
            return WinJS.xhr({
                url: this.baseUrl + "Random",
                type: "GET"
            });
        }
    });
})();