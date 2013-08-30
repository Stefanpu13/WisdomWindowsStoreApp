(function () {
    WinJS.Namespace.define('Retriever', {



        // Get authors by given letter.
        // Each author has name and url to its page.
         baseUrl : "http://wisdomaccessapi.apphb.com/api/",

         getAuthors: function (letter) {
             WinJS.xhr({
                 url: this.baseUrl + "AuthorsByLetter/" + letter
             }).done(function (result) {
                 return result;
             });
         },

        // Not a function, but a page that has buttons/divs/letters
        // and clicking on a buttons/divs/letters goes to given author.
        //getCategories: function(){}
    });
})();