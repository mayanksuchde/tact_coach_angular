/**
 * Tact
 */

(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProjectInfoController', ProjectInfoController);

    function ProjectInfoController($scope, $location, $q, $stateParams, $window, $timeout, Authentication, projectInfoService, Notification, $state, Global) {
        var vm = this;
        vm.currentState = {
            name: $state.current.name,
            params: $stateParams
        }
        vm.projectid = $stateParams.projectid ? $stateParams.projectid : '';
        // initalize commentid
        vm.commentid = $stateParams.commentid ? $stateParams.commentid : '';
        
        vm.projectInfo = {};
        vm.isLogin = Authentication.isUserLoggedIn();
        vm.getProjectInfo = getProjectInfo;
        vm.getProjectLikes = getProjectLikes;
        // post comments like
        vm.getProjectCommentLike = getProjectCommentLike;
        vm.saveProjectComment = saveProjectComment;
        vm.saveProjectTechComponent = saveProjectTechComponent;
        vm.expertAddTags = expertAddTags;
        vm.expertTags = [];
        
        vm.makeUserLogin = makeUserLogin;
        vm.updateTags = updateTags;
        vm.peerComment = {
            "comments": "",
            "project_id": vm.projectid,
            "updated_by": Authentication.getCurrentUser() ? Authentication.getCurrentUser().username : "",
            "updated_date": Date.now(),
            "title": "",
            "updated_by_type": 2
        };
        vm.peerTechComponent = {
	        "components": ""
        };

        vm.expertTags = {
	        "tags": ""
        };        
        
        vm.apiresult = 0;
        vm.gaveProjectCommentsByPeer = false;
        vm.gaveProjectTechComponentsByPeer = false;
        vm.gaveTagsByExpert = false;

        function getProjectCommentLike(commentid,updated_date){

            // var like = {}

            // add animation while making voting
            $('.comment-heart-'+commentid).addClass("is-active"); 

            var deferred = $q.defer();

            var promise = projectInfoService.getProjectCommentLike(commentid);

            promise.then(function (response) {
            	if (response.apiresult == 0) {
            		vm.projectInfo.like ++;
            		Notification.success({message: 'Thanks for the likes!', delay: 2000});
            		$timeout(reloadPage, 2000);
            	}
            	
            	// if user already like this content
            	if(response.apiresult == 1203){
            		Notification.error({message: 'Already liked!', delay: 2000});
            	}

            	deferred.resolve(response);
            }, function (rejection) {
            	deferred.reject(rejection);
            });
            
            return deferred.promise;
         }

        function getProjectLikes()
        {
            // var like = {}
            
            // add animation while making voting
            $('.project-vote-'+vm.projectid).addClass("is-active"); 

            var deferred = $q.defer();

            var promise = projectInfoService.getProjectLikes(vm.projectid);

            promise.then(function (response) {
                if (response.apiresult == 0) {
                    
                    vm.projectInfo.like ++;
                    Notification.success({message: 'Thanks for the likes!', delay: 2000});
                    $timeout(reloadPage, 2000);
                    
                }
                // if user already like this content
                if(response.apiresult == 1203){

                    Notification.error({message: 'Already liked!', delay: 2000});
                }

                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        var reloadPage = function() {
        	$window.location.reload();
        }

        function makeUserLogin() {
            Global.setToRequestState(vm.currentState);
            $state.go('login');
        }

        function saveProjectComment(isFormValid) {
            if (!isFormValid) {
            	return;
            }
            
            var deferred = $q.defer();
            var promise = projectInfoService.saveProjectComment(vm.peerComment, vm.projectid);
            promise.then(function (response) {
                if (response.apiresult == 0) {
                    Notification.success({ message: 'Successfully Saved', delay: 2000 });
                    $timeout(reloadPage, 2000);
                    vm.projectInfo.peer_comments.push(vm.peerComment);
                    vm.gaveProjectCommentsByPeer = true;
                } else {
                    Notification.error({ message: 'Not updated properly', delay: 2000 });
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });

            return deferred.promise;            
        }
        
        var reloadPage = function() {
        	$window.location.reload();
        }
        
        function saveProjectTechComponent(isFormValid) {
        	if (!isFormValid) {
        		return;
        	}
            
            var deferred = $q.defer();
            var promise = projectInfoService.saveProjectTechComponent(vm.peerTechComponent, vm.projectid);
            promise.then(function (response) {
                if (vm.isLogin) {
                    var userId = Authentication.getCurrentUser().userid;
                
                    if (response.apiresult == 0) {
                        Notification.success({ message: 'Successfully Saved', delay: 2000 });
                        vm.projectInfo.tech_components.push(vm.peerTechComponent.components);
                        vm.gaveProjectTechComponentsByPeer = true;
                    } else {
                        Notification.error({ message: 'Not updated properly', delay: 2000 });
                    }
            }
                deferred.resolve(response);
            
            }, function (rejection) {
                deferred.reject(rejection);
            });

            return deferred.promise;            
        }

        var reloadPage = function() {
        	$window.location.reload();
        }
        


        function init() {
            getProjectInfo();
        }

       
        function getProjectInfo() {
            var deferred = $q.defer();
            var promise = projectInfoService.getProjectInfo(vm.projectid);
            promise.then(function (response) {
                vm.projectInfo = response.apivalue;
                console.log(projectInfo)
                vm.apiresult = response.apiresult;
                //alert(JSON.stringify(vm.projectInfo));
                //return;

                if (vm.isLogin) {
                    var userId = Authentication.getCurrentUser().userid;
                    
                    // check current user made comments already
                    angular.forEach(vm.projectInfo.peer_comments, function (comment) {
                        if (comment.updated_by === userId) {
                        	//alert('current user gave comments already');
                        	vm.gaveProjectCommentsByPeer = true;
                        }
                    });
                    
                    angular.forEach(vm.projectInfo.expert_comments, function (comment) {
                        if (comment.updated_by === userId) {
                        	//alert('current user gave comments already');
                        	vm.gaveProjectCommentsByPeer = true;
                        }
                    });
                    
                }
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        function updateTags(tags){
            var deferred = $q.defer();
            var promise = projectInfoService.updateTags(tags, vm.projectid);
            promise.then(function (response) {
                alert(JSON.stringify(response.apivalue ) );
                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }

        //  add new tags for expert users
        function expertAddTags(isFormValid)
        {

            if (!isFormValid) {
        		return;
        	}   
            var deferred = $q.defer();

            var promise = projectInfoService.expertAddTags(vm.expertTags, vm.projectid);

            promise.then(function (response) {

                if (vm.isLogin) {
                    var userId = Authentication.getCurrentUser().userid;
                
                    if (response.apiresult == 0) {
                        Notification.success({ message: 'Successfully Saved', delay: 2000 });
                        vm.projectInfo.tags.push(vm.expertAddTags.tags);
                        vm.gaveTagsByExpert = true;
                        $timeout(reloadPage, 2000);
                    } else {
                        Notification.error({ message: 'Not updated properly', delay: 2000 });
                    }
            }

                deferred.resolve(response);
            }, function (rejection) {
                deferred.reject(rejection);
            });
            return deferred.promise;
        }        

        init();

    }
})();