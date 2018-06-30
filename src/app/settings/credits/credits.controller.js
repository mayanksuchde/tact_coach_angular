(function(){
    angular.module('app').controller('CreditsController', 
    [
     	'Notification',
        'HttpRequestFactory',
        '$q', 
        '$state', 
        creditsController
    ]
  );

    function creditsController(
    	Notification,		
        HttpRequestFactory, 
        $q, 
        $state
    ){
        var vm = this;
        vm.referralEmails = [];
        vm.emailValidation = {};
        vm.addReferralEmail = addReferralEmail;
        vm.deleteReferralEmail = deleteReferralEmail;
        vm.sendInvites = sendInvites;
        vm.moveToState = moveToState;
        vm.refresh = refresh;

        refresh();        

        function refresh(){
            getCredits();
        }

        function getCredits(){
            var deferred = $q.defer();
            var promise = HttpRequestFactory.getCreditsBySession();
            promise.then(function(response){
                if( response.apiresult == 0 ){
                    if(response.apivalue){
                        vm.creditObj = angular.copy(response.apivalue);
                    }
                    vm.address = response.apimessage;
                }
                deferred.resolve(response);
            }, function(rejection){
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function addReferralEmail(referralEmail){
            if(vm.emailAddForm.$valid){
                vm.emailValidation = {};
                if(vm.referralEmails.indexOf(referralEmail) >= 0){
                    vm.emailValidation.duplicateEmail = true;
                }else{
                    vm.referralEmails.push(referralEmail);
                    vm.referralEmail = '';
                }
            }
        }

        function deleteReferralEmail(index){
            vm.referralEmails.splice(index,1);
        }

        function sendInvites(){
            
            if(vm.referralEmailForm.$valid || vm.referralEmails.length > 0 ){
                if( vm.referralEmailForm.$valid){
                  addReferralEmail(vm.referralEmail);
                }
                
                var emails = {"emails" : vm.referralEmails};                
                //alert(JSON.stringify(emails));
                
                var deferred = $q.defer();
                var promise = HttpRequestFactory.sendInvitesByEmail(emails);
                promise.then(function(response){
                    if( response.apiresult == 0 ){
                    	Notification.success({message: 'Successfully Sent', delay: 4000});
                    } else {
                    	Notification.error({message: 'Something went wrong ['+response.apiresult+']', delay: 4000});
                    }
                    deferred.resolve(response);
                }, function(rejection){
                    deferred.reject(rejection);
                });
                return deferred.promise;
            } else{

            }
        }

        function moveToState(state){
            //debugger;
            // $state.go('^');
            // $state.go('^');
            setTimeout(function(){
                $state.go('settings.credits-info');
            },100);
            
        }
    };
})()