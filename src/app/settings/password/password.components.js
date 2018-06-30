(function () {
    'use strict';

    /**
    * @desc about me component that can be used show the about me information
    * @file about.me.component.js
    * @example <password-component></password-component>
    */
    angular
        .module('app')
        .component('passwordComponent', {
            templateUrl: "app/settings/password/password.html",
            controllerAs: 'vm',
            controller: 'passwordComponentController'
        });

    angular.module('app').controller('passwordComponentController',
        [
         	'Notification',
            'HttpRequestFactory',
            '$q',
            '$stateParams',
            createPasswordComponentController
            ]);

    
    function createPasswordComponentController(
    		Notification,
            HttpRequestFactory,
            $q,
            $stateParams
    ) {
        var vm = this;
        var token = $stateParams.token ? $stateParams.token : undefined;

        //vm.updatePasswordByToken = updatePasswordByToken;
        vm.savePasswordDetails = savePasswordDetails;

        function updatePasswordByToken(data) {		
            HttpRequestFactory.updatePasswordByToken(data,token)
            .then(function(resp){
                if(resp.apimessage =="OK") {
                    Notification.success({message: 'Successfully Saved', delay: 4000});
                    $('#form-div').hide(500);
                    $('#title').html('<h2>your password has been changed successfully!</h2>'+
                    '<a href="#/candidate-login">Click here</a> to login');
                }else if( resp.apiresult == 1004){
                    Notification.error({message: resp.apimessage, delay: 4000});
                }
            }, function(error){
                alert('error');
            });
        }
       
        function savePasswordDetails(password) {

            var passswordMap = {password : password}

            var deferred = $q.defer();
            var promise = HttpRequestFactory.savePasswordDetails(passswordMap);
            
            //alert(JSON.stringify(password));          

            promise.then(function (response) {
                if (response.apiresult == 0) {
                	Notification.success({message: 'Successfully Saved', delay: 4000});
                } else {
                	Notification.error({message: 'Not updated properly', delay: 4000});
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;            
        }	
    };

})();
