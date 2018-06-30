(function () {
    'use strict';
    angular
        .module('app')
        .service('StrategyService',
        ['HttpRequestFactory', createStrategyService]);

    function createStrategyService(HttpRequestFactory) {
        var strategyService = {};

        strategyService.getStrategyInfo = getStrategyInfo;

        function getStrategyInfo() {
            return HttpRequestFactory.get(`/cview/get/learning/strategies/1/json`);
        }
        return strategyService
    }
})();