(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', '$http', datacontext]);

    function datacontext(common, $http) {
        var $q = common.$q;

        var service = {
            getToDoItems: getToDoItems
        };

        return service;

        function getToDoItems() {
            var client = new WindowsAzure.MobileServiceClient("https://notificador.azure-mobile.net/", "DpxvfRquJnLnSoyKfTHNdFsKCavOTX75");
            var todoItemTable = client.getTable('todoitem');
            var query = todoItemTable.where({ complete: false });
            return $q.when(query.read());
        }
    }
})();