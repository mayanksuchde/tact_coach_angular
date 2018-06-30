(function () {
    'use strict';
    angular
        .module('app')
        .service('AddressService',
        ['HttpRequestFactory', createAddressService]);

    function createAddressService(HttpRequestFactory) {
        var addressService = {};

        addressService.getAddressInfo = getAddressInfo;

        function getAddressInfo() {
            return HttpRequestFactory.get(`/cview/get/address/json`);
        }

        return addressService
    }
    angular
        .module('app')
        .service('AddressServicePost',
        ['HttpRequestFactory', createAddressServicePost]);

    function createAddressServicePost(HttpRequestFactory) {
        var addressServicePost = {};

        addressServicePost.updateAddressInfo = updateAddressInfo;

        function updateAddressInfo(addressInfo) {
            return HttpRequestFactory.post(`/cview/update/address/json`,addressInfo);
        }

        return addressServicePost
    }
})();
    

