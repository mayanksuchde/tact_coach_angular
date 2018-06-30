/**
* Tact
*/
(function () {
	'use strict';

	angular
    	.module('app')
    	.controller('ForgotController', ForgotController);

	function ForgotController(Notification, HttpRequestFactory, $q, Authentication, Global, $state) {
		
		var vm = this;
		vm.HttpRequestFactory = HttpRequestFactory;
		vm.user = {
				email: '',
				password_token : '',
				password : ''
		};
		vm.submitForgot = submitForgot;

		function submitForgot(isValid) {
			
			//alert('{submitForgot} isValid : '+isValid);
			
			// If the form is not validated, show an error message
			if (!isValid) {
				Notification.error({message: 'Form Validation Error', delay: 4000});
				return;
			}			
			
			//alert('{submitForgot} vm.user : '+JSON.stringify(vm.user))
			//return;
			
			var deferred = $q.defer();
			var promise = HttpRequestFactory.submitRockstarForgot(vm.user);
			
			promise.then(function (response) {	
				
				//alert(JSON.stringify(response));
				
				if (response.apiresult == 0) {
					Notification.success({message: 'Successfully sent', delay: 4000});
					
					$('#form-div').hide(500);
					$('#send-button').hide(500);
					$('#title').text('Email has been sent');
					
				} else {
					Notification.error({message: 'Something went wrong', delay: 4000});
				}
				
				deferred.resolve(response);
			}, function (rejection) {
				deferred.reject(rejection);
			});
			
			return deferred.promise;
			
		}

		this._init();
		
	} //- Forgot Controller

	/**
	 * initialize the controller
	 */
	ForgotController.prototype._init = function () {
		this.pageReady = "super";
	};

	ForgotController.$inject = ['Notification', 'HttpRequestFactory', '$q', 'Authentication', 'Global', '$state'];
})();
