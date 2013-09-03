/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var addQuotesHandlers = function (element) {
        var div = element.getElementsByClassName("container");
        var container = div.authorsQuotesContainer;
        container.addEventListener('click', swipeSelect);
    }

    function swipeSelect() {  
        selectionTarget.style.transform = "translate(0px, 100px)";
        selectionMark.style.transform = "translate(0px, 100px)";
        WinJS.UI.Animation.swipeSelect(selectionTarget, selectionMark);
        selectionMark.style.display = "inherit";
    }

    function swipeDeselect() {
        // Programmatically move the item down, then run the animation.
        // Normally, it would be the user moving the element down via direct manipulation.
        selectionTarget.style.transform = "translate(0px, 100px)";
        selectionMark.style.transform = "translate(0px, 100px)";
        WinJS.UI.Animation.swipeDeselect(selectionTarget, selectionMark);
        selectionMark.style.display = "none";
    }

   

    WinJS.Namespace.define('QuotesHandlers', {
        addQuotesHandlers: addQuotesHandlers,
        swipeSelect: swipeSelect
    })
})();