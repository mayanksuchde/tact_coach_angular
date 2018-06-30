(function () {
    'use strict';
    angular
        .module('app')
        .service('sevenPirates',
        ['HttpRequestFactory', createSevenPirates]);

        function createSevenPirates(HttpRequestFactory)
        {
            var sevenPiratesServive = {};

            sevenPiratesServive.getBATQuestions = getBATQuestions;
            sevenPiratesServive.submitAnswer = submitAnswer;
            sevenPiratesServive.submitFeedback = submitFeedback;

            function getBATQuestions(obj){
                //alert('service get bat : '+JSON.stringify(obj))
                return HttpRequestFactory.getWithParam(`/cview/get/seven_pirates/base/question/json`,obj,false, true);            
            }

            function submitAnswer(userAnswer){
                //alert(JSON.stringify(obj))
                return HttpRequestFactory.post(`/cview/submit/seven_pirates/answer/json`, userAnswer, false, true);            
            }
            
            function submitFeedback(userFeedback){
            	return HttpRequestFactory.post(`/cview/finish/seven_pirate/test/json`, userFeedback, false, true);
            }
    
            return sevenPiratesServive;


        }


})();
