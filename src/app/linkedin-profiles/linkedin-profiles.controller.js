/**
 * Tact
 */

(function () {
    'use strict';
   var myapp =  angular.module('app').controller('LinkedinProfilesController', LinkedinProfilesController);
   
    function LinkedinProfilesController($scope, $location, $q, $stateParams, $window, $timeout, Authentication, LinkedinProfilesService, Notification, $state, Global) {
        var vm = this;

        // hide response div intially
        vm.submitted = false;

        // intiate function variable
        vm.getlinkedinprofiles = getlinkedinprofiles;
        
        // form status
        vm.formstatus = 0;

        function init() {
            getlinkedinprofiles();
        }




        function getlinkedinprofiles() {


           
        
            var deferred = $q.defer();
            var promise = LinkedinProfilesService.getLinkedinInfo();
            promise.then(function (response) {
            vm.submitted = true;
            console.log(response)
            vm.formstatus = response.apiresult;
            if (response.apiresult == 0) {
                vm.scores = response.apivalue;
            } else {
            }
            deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        init();

    }
})();
