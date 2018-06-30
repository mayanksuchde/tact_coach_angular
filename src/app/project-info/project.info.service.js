(function () {
    'use strict';
    angular
        .module('app')
        .service('projectInfoService',
        ['HttpRequestFactory', createProjectInfoService]);

    function createProjectInfoService(HttpRequestFactory) {
    	
        var projectService = {};
        //correct

        projectService.getProjectInfo = getProjectInfo;  
        projectService.saveProjectComment = saveProjectComment;
        projectService.saveProjectTechComponent = saveProjectTechComponent;
        projectService.getProjectLikes = getProjectLikes;
        projectService.updateTags = updateTags;
        projectService.expertAddTags = expertAddTags;
        projectService.getProjectCommentLike = getProjectCommentLike;
    
        function getProjectInfo(projectid) {
            return HttpRequestFactory.getWithParam(`/cview/get/project/details/${projectid}/json`, projectid, false, true);
        }

        function saveProjectComment(peerCommentObj, projectid){
            return HttpRequestFactory.post(`/cview/add/project/${projectid}/comments/json`, peerCommentObj, false, true);
        }
        
        function saveProjectTechComponent(peerTechComponentObj, projectid){
            return HttpRequestFactory.post(`/cview/add/project/${projectid}/tech/components/json`, peerTechComponentObj, false, true);
        }

        
        function getProjectLikes(projectid){
            return HttpRequestFactory.post(`/cview/like/project/${projectid}/json`, projectid, false, true);
        }

        function updateTags(tags, projectid){
            return HttpRequestFactory.post(`/coachview/add/project/${projectid}/json`, {tags : tags.toString()}, false, true);
        }

        function expertAddTags(expertTagsObj, projectid){
           return HttpRequestFactory.post(`/exview/add/project/${projectid}/tags/json`,expertTagsObj, false, true);
        }        

        function getProjectCommentLike(commentid){
            return HttpRequestFactory.post(`/cview/like/project/comment/${commentid}/json`,commentid, false, true);
        }

        return projectService
    }
    
})();