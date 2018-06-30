/**
* Tact
*/
(function () {
	'use strict';

	angular
    	.module('app')
    	.controller('FCIController', FCIController);

	function FCIController(Notification, FCIService, $q, Authentication, Global, $state, $stateParams) {
		
		var vm = this;
        vm.searchKey = '';
        vm.searchResults = [];

		vm.searchCompany = searchCompany;
		function searchCompany(isValid) {
			if (!isValid) {
				Notification.error({message: 'Form Validation Error', delay: 4000});
				return;
			}			
			var deferred = $q.defer();
			var promise = FCIService.getCompanyDetails(vm.searchKey);
			
			promise.then(function (response) {	
				if (response.apiresult == 0) {
                    Notification.success({message: 'Successfully sent', delay: 4000});
                    vm.searchResults = [{
                        "companyName" : "Wipro",
                        "companyId" : "1"
                    },{
                        "companyName" : "Infosys",
                        "companyId" : "2"
                    },{
                        "companyName" : "CTS",
                        "companyId" : "3"
                    },{
                        "companyName" : "TCS",
                        "companyId" : "4"
                    },{
                        "companyName" : "Zoho",
                        "companyId" : "5"
                    }]
				} else {
					Notification.error({message: 'Something went wrong. Please check with our administrators', delay: 4000});
				}
				
				deferred.resolve(response);
			}, function (rejection) {
				deferred.reject(rejection);
			});
			return deferred.promise;
		}

		this._init();
		
	} 

	FCIController.$inject = ['Notification', 'FCIService', '$q', 'Authentication', 'Global', '$state', '$stateParams'];
})();
