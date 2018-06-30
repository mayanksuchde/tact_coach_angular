(function () {
    'use strict';

    /**
    * @desc goals component that can be used show the address information
    * @file goals.component.js
    * @example <goals-component></goals-component>
    * goal_components
    */
    angular.module('app').component('goalsComponent', {
        templateUrl: "app/settings/goals/goals.html",
        controllerAs: 'vm',
        controller: 'goalsComponentController'
    });



    angular.module('app').controller('goalsComponentController',
        [  
            '$httpParamSerializer',
            'HttpRequestFactory',
            '$q',
            '$state',
            createGoalsComponentController]);

    function createGoalsComponentController(
      $httpParamSerializer, HttpRequestFactory, $q, $state) {
        var vm = this;
       // var SESSION_ID = authentication.getCurrentUser() ? authentication.getCurrentUser().sessionid : '';

        vm.isNoGoals = true;
        vm.currentGoalsList = [];
        vm.goalEntries = [];
        vm.canCreateGoal = true;
        vm.previousGoals = [];
        vm.createGoalFlag = false;

        vm.refresh = function () {
            getCurrentGoals();
        }

        vm.refresh();

        vm.saveGoalDetails = saveGoalDetails;

        vm.getCurrentGoals = getCurrentGoals;

        vm.getPreviousGoals = getPreviousGoals;

        vm.createGoal = createGoal;

        function createGoal(){
            //debugger;
            vm.createGoalFlag = true;
        }

        function getCurrentGoals() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getCurrentGoals();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    if (response.apivalue && response.apivalue.length > 0) {
                        vm.currentGoalsList = response.apivalue;
                        vm.canCreateGoal = false;
                    }
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function saveGoalDetails() {


            var deferred = $q.defer();
            var promise = HttpRequestFactory.saveGoalDetails(vm.goal);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                   // Notification.success('Successfully Saved');
                    vm.goal = {};
                    vm.goal_form.$setPristine();
                    vm.refresh();
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function getPreviousGoals(){
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getCurrentGoals();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    if (response.apivalue && response.apivalue.length > 0) {
                        vm.previousGoals = response.apivalue;
                    }
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

    };

    angular.module('app').component('goalEntriesComponent', {
        templateUrl: "app/settings/goals/goals-entry.html",
        controllerAs: 'vm',
        controller: 'goalsEntriesComponentController'
    });


    angular.module('app').controller('goalsEntriesComponentController',
        [  
            'HttpRequestFactory',
            '$q',
            '$stateParams',
            createGoalsEntriesComponentController]);

    function createGoalsEntriesComponentController(
        HttpRequestFactory, $q, $stateParams) {

        var vm = this;
        //var SESSION_ID = authentication.getCurrentUser() ? authentication.getCurrentUser().sessionid : '';

        var goalId = $stateParams.goalId;

        vm.getGoalEntries = getGoalEntries;
        vm.addGoalEntry = addGoalEntry;
        vm.goal_entry = {};
        vm.goal_entry.goalid = $stateParams.goalId;
        vm.getCurrentGoals = getCurrentGoals;

        vm.deleteGoalEntry = deleteGoalEntry;

        function deleteGoalEntry(goalsEntry){
            var deferred = $q.defer();
            var promise = HttpRequestFactory.deleteGoalEntry(goalsEntry.GEID);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                  //  Notification.success('Goal entry has been deleted successfully!');
                    refresh();
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }
        
        function getCurrentGoals() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getCurrentGoals();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    if (response.apivalue && response.apivalue.length > 0) {
                        vm.currentGoalsList = response.apivalue;
                    }
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function addGoalEntry() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.addGoalEntry(vm.goal_entry);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    //Notification.success('Successfully Saved');
                    vm.goal_entry = {};
                    vm.goal_entry.goalid = $stateParams.goalId;
                    vm.goal_entry_form.$setPristine();
                    refresh();
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function getGoalEntries(){
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getAllGoalEntries({ goalid : vm.goal_entry.goalid});
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.goalsEntries = response.apivalue;
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function refresh(){
            vm.getGoalEntries();
            vm.getCurrentGoals();
        }

        refresh();
        


    }


})();
