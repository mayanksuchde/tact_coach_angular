/**
 * Tact
 */

(function () {
    'use strict';
    angular
        .module('app')
        .controller('FeedBackController', FeedBackController);

    function FeedBackController($scope, $location, $q, $stateParams, $window, $timeout, Authentication, FeedBackService, Notification, $state, Global) {
        var vm = this;
        vm.currentState = {
            name: $state.current.name,
            params: $stateParams
        }

        // intiate function variable
        vm.sendFeedBackComment = sendFeedBackComment;

        vm.feedbackComment = {
            "comments": "",
            "rockstar_id": vm.rockstar_id,
            "updated_by": Authentication.getCurrentUser() ? Authentication.getCurrentUser().username : "",
            "updated_date": Date.now(),
            "title": "",
        };        
       
        function init() {
            getProjectInfo();
        }

        function sendFeedBackComment(isFormValid) {
            alert('dfdfdf')
            if (!isFormValid) {
                alert('invalid')
                return;
            }
            alert('submit');
            return;
            var deferred = $q.defer();
            var promise = feedsService.postFeedBack(vm.feedbackComment, vm.rockstar_id);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    Notification.success({ message: 'Successfully Saved', delay: 2000 });
                    $timeout(reloadPage, 2000);
                } else {
                    Notification.error({ message: 'Not updated properly', delay: 2000 });
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });

            return deferred.promise;            
        }        
       
        function getProjectInfo() {
        //    alert('loaded')
        }

  
        init();

    }
})();