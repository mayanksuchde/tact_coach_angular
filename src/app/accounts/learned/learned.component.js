(function () {
    'use strict';

    /**
    * @desc learned component that can be used show the learned information
    * @file learned.component.js
    * @example <learned-component></learned-component>
    */
    angular
        .module('app')
        .component('learnedComponent', {
            templateUrl: "app/accounts/learned/learned.html",
            controllerAs: 'vm',
            controller: 'learnedComponentController'
        });

    angular.module('app').controller('learnedComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            createLearnedComponentController]);

    function createLearnedComponentController(
    	Notification,		
        HttpRequestFactory,
        $q
    ) {
        var vm = this;
        vm.learnedInfo = {}
        vm.learnedInfo.list = []

        vm.getLearnedInfo = getLearnedInfo;
        vm.updateLearnedInfo = updateLearnedInfo;
        vm.addEmptyRow = addEmptyRow;
        vm.deleteRow = deleteRow;

        vm.refresh = function () {
            vm.getLearnedInfo();
        }

        vm.refresh();

        function addEmptyRow() {
            vm.learnedInfo.list.unshift({
                learned: ""
            })
        }

        function deleteRow(index) {
            vm.learnedInfo.list.splice(index, 1);
        }

        function getLearnedInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getLearnedInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.learnedInfo.list = response.apivalue;
                }else{
                    addEmptyRow()
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function updateLearnedInfo() {
            var data = {}
            angular.forEach(vm.learnedInfo.list, function (value, key) {
                key++
                data["learned_"+key] = value.learned
            });
            data["element_count"] = vm.learnedInfo.list.length
            var deferred = $q.defer();
            var promise = HttpRequestFactory.updateLearnedInfo(data);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                	Notification.success({message: 'Successfully Saved', delay: 4000});
                } else {
                	Notification.error({message: 'Not upated properly', delay: 4000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }
    };

})();
