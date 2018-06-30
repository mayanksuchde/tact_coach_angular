(function () {
    'use strict';
    angular
        .module('app')
        .service('RegisterService',
        ['HttpRequestFactory', createRegisterService]);

    function createRegisterService(HttpRequestFactory) {
        var registerService = {};

        registerService.submitRockstarRegister = submitRockstarRegister;
        registerService.submitEmployerRegister = submitEmployerRegister;
        

        function submitRockstarRegister(userInfo) {
            return HttpRequestFactory.post(`/cview/register/json`, userInfo, false, true);
        }

        function submitEmployerRegister(userInfo){
            return HttpRequestFactory.post(`/eview/register/json`, userInfo, false, true);
        }

        return registerService
    }
})();