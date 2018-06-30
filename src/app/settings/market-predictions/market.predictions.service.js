(function () {
    'use strict';
    angular
        .module('app')
        .service('MarketPredictionsService',
        ['HttpRequestFactory', createMarketPredictionsService]);

    function createMarketPredictionsService(HttpRequestFactory) {
        var marketPredictionsService = {};

        marketPredictionsService.getMarketPredictionsInfo = getMarketPredictionsInfo ;

        function marketPredictionsService() {
            return HttpRequestFactory.get(`/cview/get/market/prediction/info/json`);
        }

        return marketPredictionsService
    }
})();

(function () {
    'use strict';
    angular
        .module('app')
        .service('MarketPredictionsServicePost',
        ['HttpRequestFactory', createMarketPredictionsServicePost]);

    function createMarketPredictionsServicePost(HttpRequestFactory) {
        var marketPredictionsServicePost = {};

        marketPredictionsServicePost.updateMarketPredictionsInfo = updateMarketPredictionsInfo;

        function updateMarketPredictionsInfo(data) {
            return HttpRequestFactory.get(`/cview/get/market/predictions/info/${data}/json`);
        }

        return marketPredictionsServicePost
    }
})();