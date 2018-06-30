/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('MentorsController', MentorsController);

    function MentorsController(HttpRequestFactory,$scope, $q, $stateParams, MentorService, Notification, $window) {
        var vm = this

        vm.mentors = []

        vm.getMentors = getMentors
        vm.getLocaleDate = getLocaleDate

        function getMentors() {
            var deferred = $q.defer();
            var promise = MentorService.getMentors();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.mentors = angular.copy(response.apivalue)
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function getLocaleDate(date) {
            return new Date(date).toDateString()
        }

        function init() {
            getMentors()
        }

        init()
    }

    angular
        .module('app')
        .controller('MentorController', MentorController);

    function MentorController(HttpRequestFactory, $q, $stateParams, 
    		MentorService, Authentication, Notification, $window, $timeout) {
        var vm = this

        vm.mentorInfo = {}

        vm.title = $stateParams.title ? $stateParams.title : ""
        vm.authentication = Authentication;
        vm.finish = false

        vm.getLocaleDate = getLocaleDate;

        function getMentorInfo() {
            var deferred = $q.defer();
            //alert(vm.title)
            var promise = MentorService.getMentorInfo(vm.title);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                	//alert(JSON.stringify(response.apivalue))
                    vm.mentorInfo = angular.copy(response.apivalue)
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function getLocaleDate(date) {
            return new Date(date).toDateString()
        }
        
        var reloadPage = function() {
        	$window.location.reload();
        }
        
        var reloadPage = function() {
        	$window.location.reload();
        }

        function init() {
        	getMentorInfo()
        }

        init()

    }

})();