/**
* Tact
*/
(function () {
	'use strict';

	angular
    	.module('app')
    	.controller('ResetPasswordController', ResetPassController);

	function ResetPassController(Notification, HttpRequestFactory, $q, Authentication, Global, $state, $stateParams) {
		
		var vm = this;
		vm.HttpRequestFactory = HttpRequestFactory;
		vm.user = {
			password: '',
		};
		vm.user.password_token = $stateParams.token ? $stateParams.token : undefined;
		vm.submitResetPass = submitResetPass;
		function submitResetPass(isValid) {
			
			//alert('{submitResetPass} isValid : '+isValid);
			
			// If the form is not validated, show an error message
			if (!isValid) {
				Notification.error({message: 'Form Validation Error', delay: 4000});
				return;
			}			
			
			//alert('{submitResetPass} vm.user : '+JSON.stringify(vm.user))
			//return;
			
			var deferred = $q.defer();
			var promise = HttpRequestFactory.submitRockstarResetPass(vm.user);
			
			promise.then(function (response) {	
				
				//alert(JSON.stringify(response));
				
				if (response.apiresult == 0) {
					Notification.success({message: 'Successfully sent', delay: 4000});
					
					$('#form-div').hide(500);
					$('#send-button').hide(500);
					$('#title').text('Password successfully updated!');
					
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
		
	} //- ResetPass Controller

	/**
	 * initialize the controller
	 */
	ResetPassController.prototype._init = function () {
		this.pageReady = "super";
	};

	ResetPassController.$inject = ['Notification', 'HttpRequestFactory', '$q', 'Authentication', 'Global', '$state', '$stateParams'];
})();
