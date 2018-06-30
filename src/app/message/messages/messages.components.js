(function () {
    'use strict';

    /**
    * @desc about me component that can be used show the about me information
    * @file about.me.component.js
    * @example <messages-component></messages-component>
    */
    angular
        .module('app')
        .component('messageComponent', {
            templateUrl: "app/message/messages/messages.html",
            controllerAs: 'vm',
            controller: 'messageComponentController'
        });

    angular.module('app').controller('messageComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            createMessageComponentController
            ]);

    function createMessageComponentController(
    	Notification,
        HttpRequestFactory,
        $q,      
    ) {
        var vm = this;

        vm.getMessageInfo = getMessageInfo;
        vm.messageInfo = {};
      
        function getMessageInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getMessageInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.messageInfo = angular.copy(response.apivalue)
                } else {
                    vm.messageInfo = angular.copy({
                        "content": "Systems that used to be separate are now interconnected and interdependent, which means that they are, by definition, more complex." ,
                        "sender": "admin" ,
                        "content": "Collectively we know a good deal about how to navigate complexity - but that knowledge hasn't permeated the thinking of most of today's executives or the business schools that teach tomorrow' managers." ,
                        "content": "It's easy to confuse the merely complicated with the genuinely complex. \n Managers need to know the difference: If you manage a complex organization as if it were just a complicated one, you'll make serious, expensive mistakes."
                    })
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        
    };

})();