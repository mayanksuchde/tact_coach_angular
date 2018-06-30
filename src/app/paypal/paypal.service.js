(function () {
    'use strict';
    angular
        .module('app')
        .service('PaypalService',
        ['HttpRequestFactory', createPaypalService]);

    function createPaypalService(HttpRequestFactory) {
        var paypalService = {};

        paypalService.makePayment = makePayment;
        paypalService.completePayment = completePayment;

        function makePayment(obj) {
        	return HttpRequestFactory.post(`/test/paypal/pay`, obj, false, true);            
        }

        function completePayment(paymentInfo){
            return HttpRequestFactory.post(`/test/paypal/complete`, paymentInfo, false, true);
        }
        return paypalService
    }
})();