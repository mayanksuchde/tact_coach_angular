/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')        
        .controller('PaypalController', PaypalController);

    function PaypalController(HttpRequestFactory, $scope, $location, $q, $stateParams, PaypalService, Notification, $window) {
        var vm = this
        
        vm.makePayment = makePayment
        
        function makePayment() {
        	
        	var deferred = $q.defer();
            
             var amountObj = {
            	'sum' :  8	 
             };
             
             var promise = PaypalService.makePayment(amountObj);
             promise.then(function (response) {
                 if (response.apiresult == 0) {
                 	//Notification.success({message: 'Successfully Saved', delay: 2000});                 	
                 	//$timeout(reloadPage, 2000);
                	 
                	 var redirect_url = response.apivalue.redirect_url;                	 
                	 //alert('made payment : '+redirect_url);
                	 
                	 $window.location.href = redirect_url;
                	 
                 } else {
                 	Notification.error({message: 'Not updated properly', delay: 2000});
                 }
                 deferred.resolve(response);
             }, function (rejection) {
                 deferred.reject(rejection);
             });
             
             return deferred.promise;
        }
        
        function init() {
            
        }

        init()
    }    
    
    
    angular
    .module('app')
    .controller('PaypalCompleteController', PaypalCompleteController);

    function PaypalCompleteController(HttpRequestFactory, $scope, $location, $q, $stateParams, PaypalService, Notification, $window) {
    	
        var vm = this
        vm.paymentInfo = $location.search();
        
    	vm.completePayment = completePayment
    
    	function completePayment() {
            var deferred = $q.defer();
            var promise = PaypalService.completePayment(vm.paymentInfo);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    Notification.success({message: 'Payment has been successful', delay: 2000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
    	}

    	function init() {        
            completePayment();
    	}

    	init()
	}

})();