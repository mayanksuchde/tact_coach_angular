/**
 * Search services are handle here
 *
*/

(function () {
    'use strict'; 
    angular
        .module('app')
        .service('PSAEntryService',
        ['HttpRequestFactory', createPSAEntryService]);

    function createPSAEntryService(HttpRequestFactory) {

        var psaEntryService = {};

		psaEntryService.getPSAEntries = getPSAEntries;  
		psaEntryService.getPaging = getPaging; 

        function getPSAEntries(email){
            
        	var emailObj = {
        		email : email
        	}
        	//alert(JSON.stringify(emailObj))
            return HttpRequestFactory.getWithParam(`/cview/get/psa/entries/by/email`, emailObj, false, true);            
		}
		
		function getPaging(email, currentPageNo){
			
        	var emailObj = {
        		email : email
        	}

			return HttpRequestFactory.getWithParam('/cview/get/psa/entries/by/email/page/'+currentPageNo+'/json',emailObj,false,true);
		}

        return psaEntryService
    }
})();
/**
 * Search services are handle here
 *
*/
/*
(function () {
    'use strict'; 
    angular
        .module('app')
        .service('PSAEntryService',
        ['HttpRequestFactory', createPSAEntryService]);

    function createPSAEntryService(HttpRequestFactory) {

        var psaEntryService = {};

		psaEntryService.getPSAEntries = getPSAEntries;
		//psaEntryService.setPage = setPage;  
		 

        function getPSAEntries(email){
            
        	var emailObj = {
        		email : email
        	}
        	//alert(JSON.stringify(emailObj))
            return HttpRequestFactory.getWithParam(`/cview/get/psa/entries/by/email`, emailObj, false, true);            
		}*/
		/*
		function setPage()
		{
			return HttpRequestFactory.get('/cview/get/psa/entries/by/email/page/1/json')
		}*/
/*

        return psaEntryService
    }
})();*/

/*
var headers = {
	headers : {
		'Content-Type' : 'application/json'
	}
}
//get all psa entries here
app.service('PSAEntryService',function($http, $q){
	
	return {
		getPSAEntries: function (email){
			//var finalUrl = BASE_FOLDER+'/eview/candidates/sample/json?apikey='+API_KEY;
			finalUrl = BASE_FOLDER+"/cview/get/psa/entries/by/email?email="+email;
			return $http.get(finalUrl)
			.then(function(response){
				return response.data;
			},function(response){
                 return $q.reject(response.data);
			});			
		}
	}
});
/*
//get all psa entries here
app.service('LearningStrateyService',function($http, $q){
	
	page = 1;
	
	return {
		getLearningStrategies: function (page){
			finalUrl = BASE_FOLDER+"/cview/get/learning/strategies/"+page+"/json?apikey="+API_KEY;
			return $http.get(finalUrl)
			.then(function(response){
				return response.data;
			},function(response){
                 return $q.reject(response.data);
			});			
		}
	}
});
*/