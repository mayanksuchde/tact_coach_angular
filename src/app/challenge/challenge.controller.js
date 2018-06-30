/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChallengesController', ChallengesController);

    function ChallengesController(HttpRequestFactory,$scope, $q, $stateParams, ChallengeService, Notification, $window) {
        var vm = this

        vm.challenges = []

        vm.getChallenges = getChallenges
        vm.getLocaleDate = getLocaleDate

        function getChallenges() {
            var deferred = $q.defer();
            var promise = ChallengeService.getChallenges();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.challenges = angular.copy(response.apivalue)
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
            getChallenges()
        }

        init()
    }

    angular
        .module('app')
        .controller('ChallengeController', ChallengeController);

    function ChallengeController(HttpRequestFactory, $q, $stateParams, 
    		ChallengeService, Authentication, Notification, $window, $timeout) {
        var vm = this

        vm.challengeInfo = {}
        vm.leader_board = {}

        vm.title = $stateParams.title ? $stateParams.title : ""
        vm.scores = [
                     { name: "Kumar", score: 87, last_updated: "10 days ago",project_link:"xyz" },
                     { name: "Kevin", score: 79, last_updated: "20 days ago",project_link:"abc"  },
                     { name: "Sammy", score: 90, last_updated: "15 days ago",project_link:"123"  }
        ]
        vm.codingInfo = {}
        vm.authentication = Authentication;
        vm.finish = false

        vm.getLocaleDate = getLocaleDate
        vm.submitChallenge = submitChallenge
        vm.forwardChallenge = forwardChallenge
        vm.acceptChallenge = acceptChallenge
        vm.syncProject = syncProject
        vm.finishProjectInfo = finishProjectInfo

        function getChallengeInfo() {
            var deferred = $q.defer();
            //alert(vm.title)
            var promise = ChallengeService.getChallengeInfo(vm.title);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                	//alert(JSON.stringify(response.apivalue))
                    vm.challengeInfo = angular.copy(response.apivalue)
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

        function submitChallenge() {
            var deferred = $q.defer();
          //  var challengeHistoryId = vm.challengeHistoryId;

            var promise = ChallengeService.submitCodingLinks(vm.codingInfo);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.codingInfo = {}
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function forwardChallenge(){
            var deferred = $q.defer();
            //debugger;

            //alert(vm.challengeInfo.to_email);
            //return;

            var obj = {
                sender_email : vm.challengeInfo.sender_email,
                to_email : vm.challengeInfo.to_email
            };

            var promise = ChallengeService.forwardChallenge(vm.challengeInfo.chid, obj);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    Notification.success({message: 'Successfully Saved', delay: 4000});
                }else {
                	Notification.error({message: 'Not updated properly', delay: 4000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;            
        }

        function acceptChallenge() {
            var deferred = $q.defer();
            
           //alert('acceptChallenge : '+JSON.stringify(vm.challengeInfo));
           //return;
            //vm.challengeInfo = {};
            
            var challengeId = vm.challengeInfo.challenge_id;
            
            //alert('acceptChallenge : '+JSON.stringify(vm.challengeInfo));
            var promise = ChallengeService.acceptChallenge(challengeId);
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

        function syncProject() {

//var SESSION_ID = Authentication.getCurrentUser() ? Authentication.getCurrentUser().sessionid : undefined;

            var deferred = $q.defer();
            //debugger;
            var obj = {
                project_link: vm.challengeInfo.project_link
             };            
           // var challengeId = vm.challengeInfo.challenge_id;
           //var challengeHistoryId = vm.challenge_history_id

            //alert(JSON.stringify(challengeHistoryId));
            //return;

            //alert('acceptChallenge : '+JSON.stringify(vm.challengeInfo));

            var challengeHistoryId = vm.challengeInfo.challenge_history_id;

            //alert('challengeHistoryId : '+JSON.stringify(challengeHistoryId));
            //return;

            //alert('issue : '+JSON.stringify(vm.challengeInfo.leader_board));
           //return;


            var promise = ChallengeService.syncProject(challengeHistoryId, obj);
            promise.then(function (response) {
                
                //alert(JSON.stringify(response));
               // return;

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

        function finishProjectInfo() {
            var deferred = $q.defer();
            //debugger;
            
            var promise = ChallengeService.finishProjectInfo(vm.challengeInfo.challenge_history_id);
            promise.then(function (response) {
               // alert(JSON.stringify(response));
                //return;
                if (response.apiresult == 0) {
                    Notification.success({message: 'Successfully Finished', delay: 2000});
                    vm.finish = true;
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


/*        angular.module('app').filter('mask', ['MaskService', function(MaskService) {
            return function(text, mask) {
                var result, 
        maskService = MaskService.create()
        if (!angular.isObject(mask)) {
            mask = { mask: mask }
          }
          maskService.generateRegex(mask).then(function() {
            result = maskService.getViewValue(text).withDivisors() 
          
          })
          return result
            }
      }])*/

      function init() {
        getChallengeInfo()
    }

    init()

    }

})();