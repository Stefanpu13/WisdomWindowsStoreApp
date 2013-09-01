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

   WinJS.Namespace.define('Errors', {
       connectivityOk: isConnected
   })
})();