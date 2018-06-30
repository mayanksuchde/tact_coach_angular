(function () {
    'use strict';
    angular
        .module('app')
        //.constant('api_base', 'http://devapi.talentaccurate.com')
        //.constant('api_base', 'http://betaapi.talentaccurate.com')
        .constant('api_base', 'http://localhost:8035/tactbase')        
        .service('HttpRequestFactory',
        ['api_base', 'Authentication', '$http', '$q', '$httpParamSerializer', HttpRequestFactory]);

    function HttpRequestFactory(api_base, Authentication, $http, $q, $httpParamSerializer) {
    	
    	const SESSION_EXPIRED = 4004;
       
        var urlBase = api_base;        
        var apikey = "wf2537572d6f7b795a713c5e6w"
        var requestFactory = {};
        var SESSION_ID = Authentication.getCurrentUser() ? Authentication.getCurrentUser().sessionid : undefined;
        
        requestFactory.subscribeNewsletter = subscribeNewsletter;

        requestFactory.fetchCompanyDetails = fetchCompanyDetails;
        requestFactory.submitRockstarLogin = submitRockstarLogin;
        requestFactory.submitRockstarForgot = submitRockstarForgot;
        requestFactory.submitRockstarResetPass = submitRockstarResetPass; 

        requestFactory.getAboutMeInfo = getAboutMeInfo;
        requestFactory.updateAboutMeInfo = updateAboutMeInfo;

        requestFactory.getSkillsInfo = getSkillsInfo;
        requestFactory.updateSkillsInfo = updateSkillsInfo;

        requestFactory.getCodingActivitiesInfo = getCodingActivitiesInfo;
        requestFactory.updateCodingActivitiesInfo = updateCodingActivitiesInfo;

        requestFactory.getProblemSolvedInfo = getProblemSolvedInfo;
        requestFactory.updateProblemSolvedInfo = updateProblemSolvedInfo;

        requestFactory.getLearnedInfo = getLearnedInfo;
        requestFactory.updateLearnedInfo = updateLearnedInfo;

        requestFactory.getSubscription = getSubscription;
        requestFactory.updateSubscription = updateSubscription;

        requestFactory.getBasicDetailInfo = getBasicDetailInfo;
        requestFactory.updateBasicDetailInfo = updateBasicDetailInfo;

        requestFactory.getAddressInfo = getAddressInfo;
        requestFactory. updateAddressInfo= updateAddressInfo;

        //requestFactory.updatePasswordByToken = updatePasswordByToken;
        requestFactory.savePasswordDetails= savePasswordDetails;

        requestFactory.getCreditsBySession = getCreditsBySession;
        requestFactory.sendInvitesByEmail= sendInvitesByEmail;



       // requestFactory.getRecipients = getRecipients;
       // requestFactory.sendRequest= sendRequest;
        
       //goal request factory

        requestFactory.getCurrentGoals = getCurrentGoals;
        requestFactory.saveGoalDetails = saveGoalDetails;
        requestFactory.addGoalEntry = addGoalEntry;
        requestFactory.deleteGoalEntry = deleteGoalEntry;
        requestFactory.getAllGoalEntries = getAllGoalEntries;

        requestFactory.googleLogin = googleLogin;        
        
        //requestFactory.getprojectLinks = getprojectLinks;
        requestFactory.saveProjectLinks = saveProjectLinks;
       // requestFactory.addLinks = addLinks;

       //requestFactory.acceptChallenge = acceptChallenge;

       //company job info request factory
       // requestFactory.createStory = createStory;

       requestFactory.getMessageInfo = getMessageInfo;

       requestFactory.submitEmployerLogin = submitEmployerLogin;

        requestFactory.get = get;
        requestFactory.getWithParam = getWithParam;
        requestFactory.post = post;
        requestFactory.putRequest = putRequest;
        requestFactory.deleteRequest = deleteRequest;        

        // accounts : about me
        function getAboutMeInfo() {
            return get('/cview/get/aboutme/json');
        }

        function updateAboutMeInfo(aboutMeInfo) {
            return post('/cview/update/aboutme/json', aboutMeInfo, false, true)
        }

        // accounts : skills
        function getSkillsInfo() {
            return get('/cview/get/skills/json');
        }

        function updateSkillsInfo(skillsInfo) {
            return post('/cview/add/skills/json', skillsInfo, false, true)
        }

        // accounts: coding activities
        function getCodingActivitiesInfo() {
            return get('/cview/get/career/network/links/json');
        }

        function updateCodingActivitiesInfo(activitiesInfo) {
            return post('/cview/update/career/network/links/json', activitiesInfo, false, true)
        }

        // accounts: problem solved
        function getProblemSolvedInfo() {
            return get('/cview/get/ps/lines/json');
        }

        function updateProblemSolvedInfo(psInfo) {
            return post('/cview/add/ps/lines/json', psInfo, false, true)
        }

        // accounts: learned from collegues
        function getLearnedInfo() {
            return get('/cview/get/learned/json');
        }

        function updateLearnedInfo(learnedInfo) {
            return post('/cview/add/learned/json', learnedInfo, false, true)
        }
        //setting:
        function getSubscription() {
            return get('/cview/get/subscriptions/json');
        }

        function updateSubscription(subscriptionDetailsObj) {
            return post('/cview/update/subscriptions/json', subscriptionDetailsObj, false, true)
        }
       
        // settings: Basic details
        function getBasicDetailInfo() {
            return get('/cview/get/basic/details/json');
        }

        function updateBasicDetailInfo(basicDetailInfo) {
            return post('/cview/update/basic/details/json',basicDetailInfo, false, true)
        }

        // settings : Address
        function getAddressInfo() {
            return get('/cview/get/address/json');
        }

        function updateAddressInfo(addressInfo) {
            return post('/cview/update/address/json', addressInfo, false, true)
        }
        //settings : password change
        function savePasswordDetails(data) {
            return post('/cview/update/password/json',data,false,true);
        }
        /*
        function updatePasswordByToken(data, token) {
            return post('/cview/update/password/by/token/',data, token, false, true)
        }
        */

        //settings : credits
        function getCreditsBySession() {
            return get('/cview/get/credits/json');   
        }

        function sendInvitesByEmail(requestParamsObj) {
            return post('/cview/refer/emails',requestParamsObj, false, true)
        }


        /*
        // settings : Password
        function getRecipients() {
            return get('/cview/is/email/existing/json');
        }

        function sendRequest(requestParamsObj) {
            return post('/cview/send/recommendation/request/json', requestParamsObj, false, true)
        }
        */

        //settings : Goals
        function getCurrentGoals() {
            return get('/cview/get/rockstar/current/goals/json');
        }

        function saveGoalDetails(requestParamsObj) {
            return post('/cview/add/rockstargoals/info/json',requestParamsObj,false,true);
        }

        function addGoalEntry(requestParamsObj) {
            return post('/cview/add/rockstargoals/entry/json',requestParamsObj,false,true);
        }

        function deleteGoalEntry(entryId) {
            return post('/cview/delete/rockstar/goal/entry/json',entryId,false,true);
        }

        function  getAllGoalEntries(requestParamsObj) {
            return post('/cview/get/rockstargoals/entries/json',requestParamsObj,false,true);
           
        }

        //settings : Project Links
        function saveProjectLinks(requestParamsObj) {
            return post('/cview/add/project/json',requestParamsObj,false,true);
        }
        
        function submitRockstarLogin(loginInfo) {
            return post('/cview/login/json', loginInfo, false, true)
        }
        
        function subscribeNewsletter(userInfo) {
            return post('/add/early/adopter/json', userInfo, false, true)
        }
        
        function submitRockstarForgot(forgotInfo) {
            return post('/cview/send/forgot/pass/token', forgotInfo, false, true)
        }       
        
        function submitRockstarResetPass(obj) {
            return post('/cview/update/password/by/token', obj, false, true)
        }

        function fetchCompanyDetails(companyId) {
            return get(`/cview/get/public/company/info/${companyId}/json`);
        }

        function googleLogin(loginDetails){
            return post('/cview/login_google/json', loginDetails, false, true)
        }
        /*
        //company job info
        function createStory(storyDetails){
            return post('/cview/get/jobs/description/json', storyDetails, false, true)
        }
        */

       function getMessageInfo() {
        return get('/cview/get/inbox/json');
        }

        // Employer Login
        function submitEmployerLogin(loginInfo) {
            return post('/eview/login/json', loginInfo, false, true)
        }




        function get(url) {
            var SESSION_ID = Authentication.getCurrentUser() ? Authentication.getCurrentUser().sessionid : undefined;

            var obj = $httpParamSerializer({
                sessionid: SESSION_ID,
                apikey: apikey
            })
            var result = $http.get(urlBase + url + '?' + obj);
            var deferred = $q.defer();
            result.then(function (response) {
                if (response.data.apiresult == SESSION_EXPIRED) {
                    Authentication.logout();
                }
                deferred.resolve(response.data);
            }, function (rejection) {
                checkRequestServerErrors(rejection);
                deferred.reject(rejection);
            });
            return deferred.promise;
        };

        function getWithParam(url, obj) {
            var SESSION_ID = Authentication.getCurrentUser() ? Authentication.getCurrentUser().sessionid : undefined;

            obj = {
                ...obj,
                apikey,
                sessionid: SESSION_ID
            }
            obj = $httpParamSerializer(obj)

            var result = $http.get(urlBase + url + '?' + obj);
            var deferred = $q.defer();
            result.then(function (response) {
                if (response.data.apiresult == SESSION_EXPIRED) {
                    Authentication.logout();
                }
                deferred.resolve(response.data);
            }, function (rejection) {
                checkRequestServerErrors(rejection);
                deferred.reject(rejection);
            });
            return deferred.promise;
        };

        function post(url, obj, isMultipartFormData, isFormUrlEncoded, isOctetStream) {
            var SESSION_ID = Authentication.getCurrentUser() ? Authentication.getCurrentUser().sessionid : undefined;

            var headers = null;
            var data = null;
            if( isMultipartFormData ){
                url += '?' + $httpParamSerializer({
                    apikey,
                    sessionid: SESSION_ID
                });
            }else{
                obj = $httpParamSerializer({
                    ...obj,
                    apikey,
                    sessionid: SESSION_ID
                });
            }
           
            if (isMultipartFormData) {
                headers = {
                    'Content-Type': undefined
                };
               
                data = new FormData();
                for ( var key in obj ) {
                    data.append(key, obj[key]);
                }
            } else if (isFormUrlEncoded) {
                headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
                data = obj;
            } else if (isOctetStream) {
                headers = {
                    'Content-Type': 'application/octet-stream'
                };
                data = obj;
            } else {
                headers = {
                    'Content-Type': 'application/json'
                };
                data = JSON.stringify(obj);
            }

            var result = $http.post(
                urlBase + url,
                data,
                {
                    headers: headers
                });
            var deferred = $q.defer();
            result.then(function (response) {
                if (response.data.apiresult == SESSION_EXPIRED) {
                    Authentication.logout();
                }
                deferred.resolve(response.data);
            }, function (rejection) {
                checkRequestServerErrors(rejection);
                deferred.reject(rejection);
            });
            return deferred.promise;
        };

        function putRequest(url, obj) {
            var SESSION_ID = Authentication.getCurrentUser() ? Authentication.getCurrentUser().sessionid : undefined;
            var headers = {
                'Content-Type': 'application/json'
            };

            var data;
            if (obj)
                data = JSON.stringify(obj);

            var result = $http.put(
                urlBase + url,
                data,
                {
                    headers: headers
                });

            var deferred = $q.defer();
            result.then(function (response) {
                if (response.data.apiresult == SESSION_EXPIRED) {
                    // authentication.logout();
                }
                deferred.resolve(response.data);
            }, function (rejection) {
                checkRequestServerErrors(rejection);
                deferred.reject(rejection);
            });
            return deferred.promise;
        };

        function deleteRequest(url) {
            var SESSION_ID = Authentication.getCurrentUser() ? Authentication.getCurrentUser().sessionid : undefined;
            var headers = {
                'Content-Type': 'application/json'
            };

            var result = $http.delete(
                urlBase + url,
                undefined,
                {
                    headers: headers
                });

            var deferred = $q.defer();
            result.then(function (response) {
                if (response.data.apiresult == SESSION_EXPIRED) {
                    // authentication.logout();
                }
                deferred.resolve(response.data);
            }, function (rejection) {
                checkRequestServerErrors(rejection);
                deferred.reject(rejection);
            });
            return deferred.promise;
        };

        function checkRequestServerErrors(rejection) {
            var errorMessage = rejection.apimessage ? rejection.apimessage : "Unknown error!"
            if (rejection.apiresult === SESSION_EXPIRED) {
                // authentication.logout();
                errorMessage = "Not authorized. If your sesssion expired, log in again.";
            }
            // Notification.error(errorMessage);
        }

        function getSessionId() {
            var userInfo = Authentication.getCurrentUser();
            if (userInfo) {
                return userInfo.sessionid;
            } else {
                $state.go('candidate-login');
            }
        }

        return requestFactory;
    }
}())