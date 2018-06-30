(function () {
    'use strict';
    angular
        .module('app')
        .service('EmployerService',
        ['HttpRequestFactory', createEmployerService]);

    function createEmployerService(HttpRequestFactory) {
        var employerService = {};

        employerService.getEmployerLogin = getEmployerLogin;
        
        function getEmployerLogin(){
            return HttpRequestFactory.post(`/test/dummy/post`,null, false, true);
        }


        return employerService
    }
})();