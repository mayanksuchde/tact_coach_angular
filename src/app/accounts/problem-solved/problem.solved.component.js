(function () {
    'use strict';

    /**
    * @desc problem solved component that can be used show the problem solved information
    * @file problem.solved.component.js
    * @example <problem-solved-component></problem-solved-component>
    */
    angular
        .module('app')
        .component('problemSolvedComponent', {
            templateUrl: "app/accounts/problem-solved/problem-solved.html",
            controllerAs: 'vm',
            controller: 'problemSolvedComponentController'
        });

    angular.module('app').controller('problemSolvedComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            createProblemSolvedComponentController]);

    function createProblemSolvedComponentController(
    	Notification,	
        HttpRequestFactory,
        $q
    ) {
        var vm = this;
        vm.problemSolvedInfo = {}
        vm.problemSolvedInfo.list = []

        vm.getProblemSolvedInfo = getProblemSolvedInfo;
        vm.updateProblemSolvedInfo = updateProblemSolvedInfo;
        vm.addEmptyRow = addEmptyRow;
        vm.deleteRow = deleteRow;

        vm.refresh = function () {
            vm.getProblemSolvedInfo();
        }

        vm.refresh();

        function addEmptyRow() {
            vm.problemSolvedInfo.list.unshift({
                ps: ""
            })
        }

        function deleteRow(index) {
            vm.problemSolvedInfo.list.splice(index, 1);
        }

        function getProblemSolvedInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getProblemSolvedInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.problemSolvedInfo.list = angular.copy(response.apivalue);
                }else{
                    addEmptyRow()
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function updateProblemSolvedInfo() {
            var data = {}
            angular.forEach(vm.problemSolvedInfo.list, function (value, key) {
                key++
                data["ps_line_"+key] = value.ps
            });
            data["element_count"] = vm.problemSolvedInfo.list.length
            var deferred = $q.defer();
            var promise = HttpRequestFactory.updateProblemSolvedInfo(data);
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
