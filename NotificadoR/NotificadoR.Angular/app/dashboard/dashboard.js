(function () {
    'use strict';

    var controllerId = 'dashboard';
    var chat = $.connection.ngHub;

    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.toDoItems = [];
        vm.title = 'Dashboard';

        chat.client.push = function (message) {
            getToDoItems();
            toastr.info(message);
        };

        activate();

        function activate() {
            var promises = [getToDoItems()];
            common.activateController(promises, controllerId)
                .then(function () {
                    log('Activated Dashboard View');
                    $.connection.hub.start()
                             .done(function () {
                                 chat.server.send('Updating clients');
                             });

                });
        }

        function getToDoItems() {
            return datacontext.getToDoItems().then(function (data) {
                //chat.server.send('Updating clients');
                return vm.toDoItems = data;
            });
        }

    }
})();