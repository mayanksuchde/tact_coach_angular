(function () {
    'use strict';
    angular
        .module('app')
        .service('BasicDetailsService',
        ['HttpRequestFactory', createBasicDetailsService]);

    function createBasicDetailsService(HttpRequestFactory) {
        var basicDetailsService = {};

        basicDetailsService.getBasicDetailInfo = getBasicDetailInfo;
        basicDetailsService.updateBasicDetailInfo = updateBasicDetailInfo;

        function getBasicDetailInfo() {
            return HttpRequestFactory.get(`/cview/get/basic/details/json`);
        }
        function updateBasicDetailInfo(basicDetailInfo) {
            //alert('basicDetailInfo : '+basicDetailInfo);
            return HttpRequestFactory.post(`/cview/update/basic/details/json`,basicDetailInfo);
        }
        return basicDetailsService
    }
})();


       