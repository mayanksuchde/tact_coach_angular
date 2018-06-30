/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    function RegisterController(RegisterService, $q, Authentication, Global, Notification, $state) {
        var vm = this;

        vm.isEmployer = $state.current.name === 'employer-register';

        vm.RegisterService = RegisterService;
        vm.user = {
            email: '',
            password: '',
            confirmPassword: ''
        };
        vm.isRegistered = false
        vm.submitRegister = submitRegister;

        function submitRegister(isValid) {
            // If the form is not validated, show an error message
            if (!isValid) {
                return;
            }
            var deferred = $q.defer();
            if(vm.isEmployer){
                var promise = RegisterService.submitEmployerRegister(vm.user);                
            }else{
                var promise = RegisterService.submitRockstarRegister(vm.user);
            }
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.isRegistered = true
                }
                else {
                   // vm.isRegistered = false
                    Notification.error({message: 'The email is already registered', delay: 2000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        this._init();
    }

    /**
     * initialize the controller
     */
    RegisterController.prototype._init = function () {
        this.pageReady = "super";
    };

    RegisterController.$inject = ['RegisterService', '$q', 'Authentication', 'Global', 'Notification' ,'$state'];
})();
