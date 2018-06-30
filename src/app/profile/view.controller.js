(function () {
    'use strict';

    /**
    * @desc view profile component that can be used show the view profile information
    * @file view profile.component.js
    * @example <view-profile-component></view-profile-component>
    */
    angular
        .module('app')
        .component('viewProfileComponent', {
            templateUrl: "app/profile/view.html",
            controllerAs: 'vm',
            controller: 'viewProfileController'
        });

    angular.module('app').controller('viewProfileController',
        [
            'ProfileService',
            '$q',
            'Authentication',
            'Global',
            '$state',
            createViewProfileComponentController]);
    function createViewProfileComponentController(ProfileService, $q, Authentication, Global, $state) {
        var vm = this;
        vm.profileInfo = {}
        vm.init = init
        vm.getViewProfileInfo = getViewProfileInfo

        var init = function(){
            getViewProfileInfo()
        }

        var getViewProfileInfo = function(){
            var deferred = $q.defer();
            var promise = ProfileService.getViewProfileInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.profileInfo = angular.copy(response.apivalue)
                    vm.basicDetails = Object.assign({}, vm.profileInfo.basic_details)
                    vm.interviewAnswers = Object.assign({}, vm.profileInfo.interview_answers)  
                    vm.learned = Object.assign({}, vm.profileInfo.learned)         
                    vm.problem_solved = Object.assign({}, vm.profileInfo.problem_solved)
                    vm.profile_complete_percentage = Object.assign({}, vm.profileInfo.profile_complete_percentage)
                    vm.projects = Object.assign({}, vm.profileInfo.projects)
                    vm.skills = Object.assign({}, vm.profileInfo.skills)
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        init()

    }
})();