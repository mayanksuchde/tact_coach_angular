/**
* Tact
*/
(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	function LoginController(Notification, HttpRequestFactory, $q, Authentication, Global, $state, googleService) {

		var vm = this;
		vm.HttpRequestFactory = HttpRequestFactory;
		vm.isEmployer = $state.current.name === 'employer-login';
		vm.user = {
			username: '',
			password: ''
		};
		vm.submitLogin = submitLogin;
		vm.googleSignIn = googleSignIn;
		vm.googleSignOut = googleService.signOut;

		function googleSignIn() {
			googleService.login()
				.then(function (response) {
					var deferred = $q.defer();
					var promise = HttpRequestFactory.googleLogin(response)

					promise.then(function (response) {
						var toState = "linkedin-profiles";
						var toParams = {};

						if (response.apiresult == 0) {
							var sessionDetails = response.apivalue;
							Authentication.storeSession(sessionDetails);
							Global.setIsLoggedIn(true)
							Global.user = angular.copy(sessionDetails)
							toState = Global.getToRequestState();


							/*$stateProvider.state('Project-info-public-page', {
								url: "/project/:projectid",
								templateUrl: 'project_info.html',
								controller: function ($stateParams) {
									// If we got here from a url of /contacts/42
									expect($stateParams).toBe({projectid: ""});
								}
							})*/

							if (angular.isDefined(toState) && angular.isDefined(toState.name)) {
								
								if (angular.isDefined(toState.params)) {
									toParams = angular.copy(toState.params)
								}
								toState = angular.copy(toState.name);
								Global.setToRequestState({});
							} else {
								toState = "linkedin-profiles"
							}
							$state.go(toState, toParams)
						} else {
							Notification.error({ message: 'Credentials might be wrong', delay: 4000 });
						}

						deferred.resolve(response);
					}, function (rejection) {
						deferred.reject(rejection);
					});
				}, function () {

				})


		}

		function submitLogin(isValid) {

			//alert('{submitLogin} isValid : '+isValid);

			// If the form is not validated, show an error message
			if (!isValid) {
				Notification.error({ message: 'Form Validation Error', delay: 4000 });
				return;
			}

			var deferred = $q.defer();
			if(vm.isEmployer){
				var promise = HttpRequestFactory.submitEmployerLogin(vm.user);		
				var toState = "candidates";
				var toParams = {};					
			}else{
				var promise = HttpRequestFactory.submitCoachLogin(vm.user);	
				var toState = "linkedin-profiles";
				var toParams = {};		
			}
			promise.then(function (response) {
				if (response.apiresult == 0) {
					var sessionDetails = response.apivalue;
					Authentication.storeSession(sessionDetails);
					if( vm.isEmployer ){
						Global.setIsEmployerLoggedIn(true);
						Global.employer = angular.copy(sessionDetails)						
					}else{
						Global.setIsLoggedIn(true)
						Global.user = angular.copy(sessionDetails)
					}
					toState = Global.getToRequestState();
					if (angular.isDefined(toState) && angular.isDefined(toState.name)) {
						if (angular.isDefined(toState.params)) {
							toParams = angular.copy(toState.params)
						}
						toState = angular.copy(toState.name);
						Global.setToRequestState({});
					} else {
						toState = vm.isEmployer ? "candiates" : "linkedin-profiles";
					}
					$state.go(toState, toParams)
				} else {
					Notification.error({ message: 'Credentials might be wrong', delay: 4000 });
				}

				deferred.resolve(response);
			}, function (rejection) {
				deferred.reject(rejection);
			});

			return deferred.promise;
		}


		this._init();
	} //- Login Controller
	
	/**
 * initialize the controller
 */
	LoginController.prototype._init = function () {
		this.pageReady = "super";
	};

	LoginController.$inject = ['Notification', 'HttpRequestFactory', '$q', 'Authentication', 'Global', '$state', 'googleService'];
})();