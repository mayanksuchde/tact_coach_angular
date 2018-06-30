/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployerController', EmployerController);

    function EmployerController(HttpRequestFactory, $q, $stateParams, 
        EmployerService, Authentication, Notification, $window, $timeout) {
        var vm = this


        vm.getEmployerLogin = getEmployerLogin


        function getEmployerLogin() {
            var deferred = $q.defer();

            //debugger;

            
            
            var promise = EmployerService.getEmployerLogin();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    //Notification.success({message: 'Successfully login', delay: 2000});
                } else {
                	Notification.error({message: 'Not updated properly', delay: 2000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            
            return deferred.promise;
        }

      function init() {
        getEmployerLogin()
    }

    init()

    }

})();