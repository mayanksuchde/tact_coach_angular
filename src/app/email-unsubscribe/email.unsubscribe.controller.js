/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('emailController', emailController);

    function emailController(HttpRequestFactory, $q, emailService, Notification, $timeout,$stateParams) {

        var vm = this
        //vm.thankYou = false;
        //vm.thankYou = false;
        //vm.feedback = false;
        vm.isUnsubscribed = false
        vm.referrerid = $stateParams.referrerid;
        
        vm.emailOptionInfo = {}
        vm.emailUnsubscribeOption = emailUnsubscribeOption
        vm.emailResubscribeOption = emailResubscribeOption

        function emailUnsubscribeOption()
        {
            var deferred = $q.defer();

            var referrorid_object = {
                'referrerid' : vm.referrerid
                //'region' : vm.region
            };

            var promise = emailService.emailUnsubscribeOption(referrorid_object);

            promise.then(function (response) {
                if (response.apiresult == 0) {
                    Notification.success({message: 'Unsubscribed Successfully', delay: 2000});
                    vm.isUnsubscribed = true
                   // vm.thankYou = true;
                    //alert('test1.1')

                    
                } else {
                	Notification.error({message: 'Not updated properly', delay: 2000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function emailResubscribeOption()
        {
            var deferred = $q.defer();

            var referrorid_objects = {
                'referrerid' : vm.referrerid
            };



            var promise = emailService.emailResubscribeOption(referrorid_objects);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                	Notification.success({message: 'Subscribed Successfully', delay: 2000});
                	//$timeout(reloadPage, 2000);
                } else {
                	Notification.error({message: 'Not updated properly', delay: 2000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            
            return deferred.promise;
        }
    }
        
})();