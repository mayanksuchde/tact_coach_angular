angular.module('app').controller('settingsController',
 [
    //'TACommonConstantsService', 
    'HttpRequestFactory',
      '$q',
      'Notification',
      //'authentication', 
      '$sessionStorage', 
      createSettingsController]);

function createSettingsController(
    //TACommonConstantsService, 
    HttpRequestFactory, 
    $q, 
    Notification, 
   // authentication, 
    $sessionStorage)
    {
    var vm = this;
/*
    if( $sessionStorage.rockstar ) {
        vm.settingsMenu = TACommonConstantsService.settingsMenu;
    } else {
        vm.settingsMenu = TACommonConstantsService.settingsMenuEmployer;
    }
    vm.predictions = TACommonConstantsService.predictions
    */
    vm.saveSubscriptionDetails = saveSubscriptionDetails;
    vm.refresh = refresh;
    vm.subscriptionObj = {};
   // var SESSION_ID = authentication.getCurrentUser() ? authentication.getCurrentUser().sessionid : undefined;
    
    vm.refresh();

    function refresh(){
        getSubscription();
    }

    function getSubscription(){
        var deferred = $q.defer();
        var promise = HttpRequestFactory.getSubscription();
        promise.then(function(response){            
            if( response.apiresult == 0 ){
                if(response.apivalue){
                    var subscriptionDetailsObj = response.apivalue;
                    if( subscriptionDetailsObj ){
                        vm.subscriptionObj.market_predictor = (subscriptionDetailsObj.market_predictor == 1);
                        vm.subscriptionObj.newsletter = (subscriptionDetailsObj.newsletter == 1);
                    }
                }
            }
            deferred.resolve(response);
        }, function(rejection){
            deferred.reject(rejection);
        });
        return deferred.promise;
    }

    function saveSubscriptionDetails(){
        var subscriptionDetailsObj = {};
        subscriptionDetailsObj.market_predictor = vm.subscriptionObj.market_predictor ? 1 : 0;
        subscriptionDetailsObj.newsletter = vm.subscriptionObj.newsletter? 1 : 0;
        var deferred = $q.defer();
        var promise = HttpRequestFactory.updateSubscription(subscriptionDetailsObj);
        promise.then(function(response){
            if( response.apiresult == 0 ){
                Notification.success('Successfully Saved');
            }
            deferred.resolve(response);
        }, function(rejection){
            deferred.reject(rejection);
        });
        return deferred.promise;
    }
};