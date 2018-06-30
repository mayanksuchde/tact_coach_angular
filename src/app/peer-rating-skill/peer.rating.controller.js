/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('PeerRatingController', PeerRatingController);

        function PeerRatingController($scope, $state, $stateParams,$q, Notification,peerRatingService)
        {
            var vm = this;
           
            vm.peerRatingInfo = {}
            vm.peerRating = peerRating

            function peerRating()
            {
                var deferred = $q.defer();

                var obj = {
                    github_link: vm.peerRatingInfo.github_link,
                    comment: vm.peerRatingInfo.comment,
                    skill_1: vm.peerRatingInfo.skill_1,
                    skill_2: vm.peerRatingInfo.skill_2,
                    skill_3: vm.peerRatingInfo.skill_3,
                    skill_4: vm.peerRatingInfo.skill_4,
                    skill_5: vm.peerRatingInfo.skill_5
                };

                var promise = peerRatingService.peerRating(obj);

                promise.then(function (response) {
                    if (response.apiresult == 0) {
                        Notification.success({message: 'Successfully saved', delay: 2000}); 
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


   