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

    var openCollection = function () {
        // Create the picker object and set options
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        // Users expect to have a filtered view of their folders depending on the scenario.
        // For example, when choosing a documents folder, restrict the filetypes to documents for your application.
        openPicker.fileTypeFilter.replaceAll([".txt"]);

        Windows.Storage.KnownFolders.documentsLibrary.
            createFolderAsync("My Favorites",
            Windows.Storage.CreationCollisionOption.openIfExists)
            .then(function (folder) {
                openPicker.suggestedStartLocation = folder.folderRelativeId;
            })
            .then(function () {
                // Open the picker for the user to pick a file
                openPicker.pickSingleFileAsync().then(function (file) {
                    if (file) {
                        fileToken = Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList.add(file);
                        Windows.Storage.FileIO.readTextAsync(file).then(function (result) {
                            var collectionToJson = JSON.parse('[' + result + ']');
                            Data.collectionItems = collectionToJson;
                        });

                    } else {
                        // The picker was dismissed with no selected file
                        WinJS.log && WinJS.log("Operation cancelled.", "sample", "status");
                    }
                });
            })
    }

    var playCollection = function () {
        if (Data.collectionItems.length > 0) {
            ViewModels.loadCurrentCollection();
            // Animate change of display.
            var randomDispay = document.getElementById('randomList');
            randomDispay.style.display = 'none';
            var collectionDispay = document.getElementById('collectionList');
            collectionDispay.style.display = 'display';

            setInterval(function () { displayNextItem() }, 2000);


        }
    }

    var currentItemIndex = 0;
    var displayNextItem = function () {
        if (currentItemIndex == Data.collectionItems.length - 1) {
            currentItemIndex = 0;
            ViewModels.loadcurrentDisplayedItem(Data.collectionItems[currentItemIndex]);

        }

    }

    WinJS.Utilities.markSupportedForProcessing(addItem);

    WinJS.Namespace.define('Commands', {
        createCollection: createCollection,
        addItemToShare: addItemToShare,
        addItem: addItem
    });
})();