/**
* Tact
*/
(function () {
	'use strict';

	angular
		.module('app')
		.controller('ResumeController', ResumeController);

	function ResumeController(Notification, ResumeService, $q) {

        var vm = this;
        vm.resumeInfo = {};
        vm.submitResume = submitResume;
        vm.getResume = getResume;
        vm.resume_location = "";

		function submitResume(isValid) {
			if (!isValid) {
				Notification.error({ message: 'Form Validation Error', delay: 4000 });
				return;
            }
            if( vm.resumeInfo.file){
                var fileType =  vm.resumeInfo.file.type;
                if( fileType == "text/plain" || fileType == "" || fileType == "application/pdf"){
                    var deferred = $q.defer();
                    var promise = ResumeService.submitResume(vm.resumeInfo);		
                    promise.then(function (response) {
                        if (response.apiresult == 0) {
                            Notification.success({ message: 'Resume uploaded successfully!', delay: 4000 });
                        } else {
                            Notification.error({ message: 'Credentials might be wrong', delay: 4000 });
                        }
                        deferred.resolve(response);
                    }, function (rejection) {
                        deferred.reject(rejection);
                    });
                    return deferred.promise;
                }else{
    				Notification.error({ message: 'Invalid file type', delay: 4000 });
                }
            }else{
                Notification.error({ message: 'Form Validation Error', delay: 4000 });
            }
			
        }
        
        function getResume(){
            var deferred = $q.defer();
            var promise = ResumeService.getResume(vm.resumeInfo);		
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    if( response.apivalue && response.apivalue.resume_location){
                        vm.resume_location = response.apivalue.resume_location;
                    }
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        getResume();


		this._init();
	} //- Resume Controller
	
	/**
 * initialize the controller
 */
	ResumeController.prototype._init = function () {
		this.pageReady = "super";
	};

	ResumeController.$inject = ['Notification', 'ResumeService', '$q'];
})();