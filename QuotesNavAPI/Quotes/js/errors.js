/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
   var  isConnected = function () {
        var connectivity = Windows.Networking.Connectivity;
        var profile = connectivity.NetworkInformation.getInternetConnectionProfile();
        if (profile) {            
            return true;
        }
        else {
            return false;
        }
   }

   var createGeneralPromiseErrorHandler = function () {
       WinJS.Promise.onerror = errorHandler
   }

   var errorHandler = function (error) {
       if (error) {
           console.log(error);
       }
   }

   WinJS.Namespace.define('Errors', {
       connectivityOk: isConnected,
       generalPromiseErrorHandler: createGeneralPromiseErrorHandler
   })
})();