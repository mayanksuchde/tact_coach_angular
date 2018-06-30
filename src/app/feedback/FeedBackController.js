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
       
        function init() {
            getProjectInfo();
        }

       
        function getProjectInfo() {
        alert('loaded')
        }

  
        init();

    }
})();