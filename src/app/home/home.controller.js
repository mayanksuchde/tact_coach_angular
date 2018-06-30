/**
* Tact
*/
(function () {
	'use strict';

	angular
    	.module('app')
    	.controller('HomeController', HomeController);

	function HomeController(Notification, HttpRequestFactory, $q, $state) {
		var vm = this;
		this._init();
		
		vm.user = {
			email: ''
		};
		
		vm.subscribeNewsletter = subscribeNewsletter;
		
		function subscribeNewsletter(isValid) {
			//alert('inside '+JSON.stringify(vm.user));
			
			if (!isValid) {
				Notification.error({message: 'Invalid Email ID', delay: 3000});
				return;
			}			
			
			var deferred = $q.defer();
			var promise = HttpRequestFactory.subscribeNewsletter(vm.user);
			
			promise.then(function (response) {
				if (response.apiresult == 0) {
					
					$('#email_box').hide(100);
					Notification.success({message: 'Thanks for subscribing', delay: 1000});				
										
				} else {
					Notification.error({message: 'Something went wrong.', delay: 4000});
				}
				
				deferred.resolve(response);
			}, function (rejection) {
				deferred.reject(rejection);
			});
			
			
			return deferred.promise;			
		}		
	}

	/**
	 * initialize the controller
	 */
	HomeController.prototype._init = function () {
		this.pageReady = true;
	};

	HomeController.prototype.next = function (isValid) {
		var vm = this;
		// If the form is not validated, show an error message
		if (!isValid) {
    	
			return;
		}

		vm.selectedIndex += 1;
	};

	HomeController.$inject = ['Notification', 'HttpRequestFactory', '$q', '$state'];
})();
