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

        activate();

        function activate() {
            var promises = [getToDoItems()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getToDoItems() {
            return datacontext.getToDoItems().then(function (data) {
                return vm.toDoItems = data;
            });
        }

    }
})();