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

        letters:letters,

        authors:[],

        getAuthorsByLetter: function (letter) {
           return WinJS.xhr({
                url: this.baseUrl + "AuthorsByLetter/" + letter
           })
        },



        // Not a function, but a page that has buttons/divs/letters
        // and clicking on a buttons/divs/letters goes to given author.
        //getCategories: function(){}
    });
})();