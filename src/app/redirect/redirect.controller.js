'use strict';

    angular
      .module('myApp', [
        'ngCookies',        
        'ngRoute',
        'restangular'        
      ])
      .config(function ($routeProvider,RestangularProvider, $provide) {

        //this will store info for the referrer page
        $provide.decorator('$document',function($delegate){
            $delegate.referrer = null;
            $delegate.params = {};
            return $delegate; 
        });

        // Set the base URL for Restangular.
        RestangularProvider
                .setBaseUrl('/')
                .setDefaultHttpFields({withCredentials: true});

        //routes
        $routeProvider      
          .when('/restricted', {
            templateUrl: 'views/restricted.html',
            controller: 'RestrictedCtrl',             
            access: { requiredLogin: true }
          })         
          .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',   
            access: { requiredLogin: false }
          })
          .otherwise({
            redirectTo: '/login',
            access: { requiredLogin: false }
          });

      }).run(function($rootScope, $location, $cookies, $document) {
          $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {        
                if (nextRoute.access.requiredLogin && !$cookies.get('login')) {       

                    //store the referrer page for redirect after logged-in
                    $document.params = nextRoute.params; //store the parameters                       
                    $document.referrer = nextRoute.$$route.originalPath; //store the original url

                    //redirect user to the login page 
                    $location.path("/login");

                }
          });    
      });