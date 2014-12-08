(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['common', '$location', admin]);

    function admin(common, $location) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Admin';
        vm.submit = submit;
        vm.documentTitle = "";
        vm.documentAbstract = "";

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
        }

        function submit() {
            //console.log(vm.title + vm.abstract);
            log(vm.documentTitle + vm.documentAbstract);
            var client = new WindowsAzure.MobileServiceClient('https://notificador.azure-mobile.net/', 'bbiIcbESnkRJqRxaMlppCYpoxrHQbm31'),
                todoItemTable = client.getTable('todoitem');
            todoItemTable.insert({ text: vm.documentTitle, complete: false });
            $location.path('/dashboard'); 
            return;
        }
    }
})();