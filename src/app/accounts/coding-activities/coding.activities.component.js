(function () {
    'use strict';

    /**
    * @desc coding activities component that can be used show the coding activities information
    * @file coding.activities.component.js
    * @example <coding-activities-component></coding-activities-component>
    */
    angular
        .module('app')
        .component('codingActivitiesComponent', {
            templateUrl: "app/accounts/coding-activities/coding-activities.html",
            controllerAs: 'vm',
            controller: 'codingActivitiesComponentController'
        });

    angular.module('app').controller('codingActivitiesComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            createCodingActivitiesComponentController]);

    function createCodingActivitiesComponentController(
    	Notification,
    	HttpRequestFactory,
        $q
    ) {
        var vm = this;

        vm.getCodingActivitiesInfo = getCodingActivitiesInfo;
        vm.updateCodingActivitiesInfo = updateCodingActivitiesInfo;

        vm.refresh = function () {
            vm.getCodingActivitiesInfo();
        }

        vm.refresh();

        function getCodingActivitiesInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getCodingActivitiesInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.codingActivitiesInfo = response.apivalue;
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function updateCodingActivitiesInfo(valid) {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.updateCodingActivitiesInfo(vm.codingActivitiesInfo);
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
