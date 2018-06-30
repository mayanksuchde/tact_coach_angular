(function () {
    'use strict';

    /**
    * @desc about me component that can be used show the about me information
    * @file about.me.component.js
    * @example <about-me-component></about-me-component>
    */
    angular
        .module('app')
        .component('aboutMeComponent', {
            templateUrl: "app/accounts/about-me/about-me.html",
            controllerAs: 'vm',
            controller: 'aboutMeComponentController'
        });

    angular.module('app').controller('aboutMeComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            createAboutMeComponentController]);

    function createAboutMeComponentController(
    	Notification,	
        HttpRequestFactory,
        $q
    ) {
        var vm = this;

        vm.getAboutMeInfo = getAboutMeInfo;
        vm.updateAboutMeInfo = updateAboutMeInfo;

        vm.refresh = function () {
            vm.getAboutMeInfo();
        }

        vm.refresh();

        function getAboutMeInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getAboutMeInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.aboutMeInfo = response.apivalue;
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function updateAboutMeInfo() {
            var data = {
                content : vm.aboutMeInfo.about_me
            }
            var deferred = $q.defer();
            var promise = HttpRequestFactory.updateAboutMeInfo(data);
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
