(function () {
    'use strict';

    /**
    * @desc about me component that can be used show the about me information
    * @file about.me.component.js
    * @example <basic-detail-component></basic-detail-component>
    */
    angular
        .module('app')
        .component('basicDetailComponent', {
            templateUrl: "app/settings/basic-details/basic-detail.html",
            controllerAs: 'vm',
            controller: 'basicDetailComponentController'
        });

    angular.module('app').controller('basicDetailComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            '$window',
            '$timeout',
            createBasicDetailComponentController
            ]);

    function createBasicDetailComponentController(
    	Notification,
        HttpRequestFactory,        
        $q,
        $window,
        $timeout,
    ) {
        var vm = this;

        vm.getBasicDetailInfo = getBasicDetailInfo;
        vm.updateBasicDetailInfo = updateBasicDetailInfo;

        vm.refresh = function () {
            vm.getBasicDetailInfo();
        }

        vm.refresh();

        function getBasicDetailInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getBasicDetailInfo();
            promise.then(function (response) {
                
                if (response.apiresult == 0) {
                    vm.basicDetailInfo = response.apivalue;
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            
            return deferred.promise;
        }

        function updateBasicDetailInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.updateBasicDetailInfo(vm.basicDetailInfo);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                	Notification.success({message: 'Successfully Saved', delay: 4000});
                } else if (response.apiresult == 1203) {
                	Notification.error({message: 'Username not avaiable', delay: 4000});
                	$timeout(reloadPage, 3000);
            	} else {
                	Notification.error({message: 'Not updated properly', delay: 4000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }
        
        var reloadPage = function() {
        	$window.location.reload();
        }
    };

})();
