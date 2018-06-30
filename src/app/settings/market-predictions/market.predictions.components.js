(function () {
    'use strict';

    /**
    * @desc about me component that can be used show the about me information
    * @file about.me.component.js
    * @example <market-predictions-component></market-predictions-component>
    */
    angular
        .module('app')
        .component('marketPredictionsComponent', {
            templateUrl: "app/settings/market-predictions/market-predictions.html",
            controllerAs: 'vm',
            controller: 'creditsMarketPredictionsController'
        });

    angular.module('app').controller('creditsMarketPredictionsController',
        [
            'HttpRequestFactory',
            '$q',
            creditsMarketPredictionsController]);

    function creditsMarketPredictionsController(
        HttpRequestFactory,
        $q
    ) {
        var vm = this;

        vm.getMarketPredictionsInfo = getMarketPredictionsInfo;
        vm.updateMarketPredictionsInfo = updateMarketPredictionsInfo;



        function getMarketPredictionsInfo() {
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getMarketPredictionsInfo();
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    vm.marketPredictionsInfo = response.apivalue;
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function updateMarketPredictionsInfo() {
            var data = {
                content : vm.marketPredictionsInfo
            }
            var deferred = $q.defer();
            var promise = HttpRequestFactory.updateMarketPredictionsInfo(vm.marketPredictionsInfo);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    // Notification.success('Successfully Saved');
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }
    }
})();