/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('WeeklyChallengesController', WeeklyChallengesController);

    function WeeklyChallengesController(HttpRequestFactory, $q, $stateParams, leaderBoardService, Notification, $scope) {

        var vm = this;
        vm.i = {} // (short format for vm.info)

        vm.getWeeklyLeaderBoard = getWeeklyLeaderBoard

        function getWeeklyLeaderBoard() {
            var deferred = $q.defer();
            var promise = leaderBoardService.getWeeklyLeaderBoard();
            
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.i = angular.copy(response.apivalue);
                    
                    var email = [];
                    var curiosity_score = [];
                    var overall_score = [];
                    var effort_score = [];
                    //var self_rating = [];
                    
                    angular.forEach(vm.i, function(obj, index){
                        email.push(obj.email);
                        curiosity_score.push(obj.curiosity_score || 0);
                        overall_score.push(obj.overall_score || 0);
                        effort_score.push(obj.effort_score || 0);
                       
                    });                                       
                     
                } else {
                	//alert('not found');                	
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            
            
            
            return deferred.promise;
        }       

        
        	getWeeklyLeaderBoard();
        

        

        
       // init();
          
        
    }
})();

                