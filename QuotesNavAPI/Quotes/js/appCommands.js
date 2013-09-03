/// <reference path="model.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="data.js" />
(function () {
    var createCollection = function () {
        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        var folderPicker = new Windows.Storage.Pickers.FolderPicker();
        Windows.Storage.KnownFolders.documentsLibrary.
            createFolderAsync("My Favorites",
            Windows.Storage.CreationCollisionOption.openIfExists)
            .then(function (folder) {
                savePicker.suggestedStartLocation = folder.folderRelativeId;
            })
            .then(function () {
                savePicker.fileTypeChoices.insert("Plain Text", [".txt"]);
                savePicker.suggestedFileName = "New Favorites Collection";

                savePicker.pickSaveFileAsync().then(function (file) {
                    for (var i = 0; i < Data.collectionItems.length; i++) {
                        var quote = JSON.stringify(Data.collectionItems[i]);
                        Windows.Storage.FileIO.writeTextAsync(file, quote).done(function () {
                            // Reset items to write to new collection
                            Data.collectionItems = [];                            
                        })
                    }
                });
            });
    }

    var addItemToShare = function () {
        for (var i = 0; i < Data.collectionItems.length; i++) {
            var quote = JSON.stringify(Data.collectionItems[i]);
            Data.collectionItems = [];
            return quote;
        }
    }

    var addItem = function (item) {
        var content = document.getElementById('quote-container').innerText;
        var author = document.getElementById('author-container').innerText;
        Data.collectionItems.push(new Models.Quote(content,author));
    }

    WinJS.Utilities.markSupportedForProcessing(addItem);

    WinJS.Namespace.define('Commands', {
        createCollection: createCollection,
        addItemToShare: addItemToShare,
        addItem: addItem
    });
})();