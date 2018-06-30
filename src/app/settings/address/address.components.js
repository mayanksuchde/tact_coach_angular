(function () {
    'use strict';

    /**
    * @desc about me component that can be used show the about me information
    * @file about.me.component.js
    * @example <address-component></address-component>
    */
    angular
        .module('app')
        .component('addressComponent', {
            templateUrl: "app/settings/address/address.html",
            controllerAs: 'vm',
            controller: 'addressComponentController'
        });

    angular.module('app').controller('addressComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            createAddressComponentController]);

    function createAddressComponentController(
    	Notification,	
        HttpRequestFactory,
        $q
    ) {
        var vm = this;

        vm.getAddressInfo = getAddressInfo;
        vm.updateAddressInfo = updateAddressInfo;

        vm.refresh = function () {
            vm.getAddressInfo();
        }

        vm.refresh();

        function getAddressInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getAddressInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.addressInfo = response.apivalue;
                }
                deferred.resolve(response);
            }, function (rejection) {
              deferred.reject(rejection);
            });
            return deferred.promise;
        }


        function updateAddressInfo() {
            var data = {
                content : vm.addressInfo
            }
            var deferred = $q.defer();
            var promise = HttpRequestFactory.updateAddressInfo(vm.addressInfo);
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
