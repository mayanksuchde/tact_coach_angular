/**
* Tact
*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('SevenPiratesCtrl', SevenPiratesCtrl);

        function SevenPiratesCtrl($scope, $state, $stateParams, Notification, sevenPirates)
        {
            var vm = this;
            vm.questIndex = 0;
            vm.userAndMail = true;
            vm.thankYou = false;
            vm.feedback = false;

            vm.company = $stateParams.company ? $stateParams.company : 'tact';
            vm.technology = $stateParams.technology ? $stateParams.technology : 'java';

            
            vm.batInfo = {}
            vm.getBATQuestions = getBATQuestions
            vm.submitAnswer = submitAnswer
            vm.submitFeedback = submitFeedback


            vm.user = {}

            function getBATQuestions()
            {

                vm.user.fullname = vm.fullname;
                vm.user.email = vm.email;

                //alert(JSON.stringify(vm.user));

                //alert(vm.company+ '-' +vm.technology+' - '+vm.fullname);

                if(vm.fullname !== undefined && vm.email !== undefined)
                {
                    $('#seven-backdrop').show();
                    sevenPirates.getBATQuestions(vm.user).then(function(res) 
                    {
                        if(res['apivalue'])
                        {
                            //alert(JSON.stringify(res.apivalue));
                            vm.questionDetails = res.apivalue;
                        }
                        $('#seven-backdrop').hide();
                        vm.userAndMail = false;
                            
                    },
                    function(err)
                    {
                        Notification.error(err);
                    }
                );
                }
            }

            function submitAnswer(ans)
            {
                var userAnswer ={};
                if( vm.questionDetails !== undefined 
                    && vm.questionDetails.question_key !== undefined 
                    && vm.questionDetails.current_answer !== undefined){
                    // userAnswer.questionid = ans.questionid;
                	
                	userAnswer.current_question = vm.questionDetails.question;
                    userAnswer.current_answer = vm.questionDetails.current_answer;
                    userAnswer.question_key = vm.questionDetails.question_key;
                    if( userAnswer && userAnswer.question_key) {
                    	
                    	//alert(userAnswer.current_question);
                    	
                        sevenPirates.submitAnswer(userAnswer).then(function(res) {
                            if(res['apivalue'] && res['apivalue'].test_status_code == 0){
                                vm.questionDetails = angular.copy(res['apivalue']);
                                vm.questIndex++;
                                vm.userAndMail = false;
                            } else if(res['apivalue'] && res['apivalue'].test_status_code == 1){
                            	
                            	//alert(JSON.stringify(vm.questionDetails));
                            	//alert('finished the test');
                            	vm.userFeedback = {question_key : vm.questionDetails.question_key};
                            	
                            	vm.questionDetails = null;                            	
                                vm.feedback = true;
                            }
                        }, function(err) {
                            vm.questIndex++;
                            //vm.userAndMail = false;
                            Notification.error(err);
                        });
                    } else {
                        vm.questions = null;
                        vm.feedback = true;
                    }
                } else {
                    Notification.error('Please fill the answer');
                }
            
            }

            //vm.userFeedback = {}
            function submitFeedback()
            {   var userFeedback ={
                    'question_key' : vm.question_key,
                    'comment' : vm.comment
                }
                vm.userFeedback = {question_key : vm.questionDetails.question_key,comment : vm.feedback};

                alert(JSON.stringify(userFeedback));
                //return;
                
            	sevenPirates.submitFeedback(userFeedback).then(function(res) {
                   // alert(JSON.stringify(res));
                   // return;
            		alert(res['apiresult']);
            		//alert(res['apiresult'] == 0);
                    if(res['apiresult'] == 0){
                    	vm.feedback = true;
                        vm.thankYou = true;
                    } else {
                        alert('Error');
                    }
                }, function(err) {                                        
                    Notification.error(err);
                });
            }  
            
        }

})();


   