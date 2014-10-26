var chat = $.connection.notificadoRAngularHub;
$.connection.hub.start();

(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.toDoItems = [];
        vm.title = 'Dashboard';
        
        

        chat.client.broadcastMessage = function (message) {
            getToDoItems();
            toastr.info(message);
        };

        activate();

        function activate() {
            var promises = [getToDoItems()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getToDoItems() {
            return datacontext.getToDoItems().then(function (data) {
                chat.server.send('Updating clients');
                return vm.toDoItems = data;
            });
        }

    }
})();