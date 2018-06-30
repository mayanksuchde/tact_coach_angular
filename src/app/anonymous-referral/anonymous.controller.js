/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('anonymousController', anonymousController);

    function anonymousController(HttpRequestFactory, $q, $stateParams, 
        anonymousService, Authentication, Notification, $window, $timeout) {
        var vm = this
        vm.anonymousInfo = {}
        vm.anonymousReferralInfo = anonymousReferralInfo

        function anonymousReferralInfo() {
            
            //alert('anonymousReferralInfo : '+JSON.stringify(vm.anonymousInfo));
            //return;

            var deferred = $q.defer();
            //debugger;


            var obj = {
                sender_name: vm.anonymousInfo.sender_name,
                sender_email: vm.anonymousInfo.sender_email,
                to_emails: vm.anonymousInfo.to_emails,
                message: vm.anonymousInfo.message,
            };            
            //alert('acceptChallenge : '+JSON.stringify(vm.challengeInfo));
            var promise = anonymousService.anonymousReferralInfo(obj);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                	Notification.success({message: 'Successfully Saved', delay: 2000});
                	$timeout(reloadPage, 2000);
                } else {
                	Notification.error({message: 'Not updated properly', delay: 2000});
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

        function init() {
            
        }

        init();
    }

})();

