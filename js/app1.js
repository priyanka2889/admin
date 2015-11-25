// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMockE2E'])
// bower install angular-mocks --save
// <script src="lib/angular-mocks/angular-mocks.js"></script>
// https://docs.angularjs.org/api/ngMockE2E
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    $stateProvider.state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'AppCtrl'
    })

	.state('app.splash', {
      url: '/',
      templateUrl: 'splash.html',
      controller: 'SplashController'
    })
	
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

   .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })
  
  .state('app.login-into-menucontent', {
    url: "/login-into-menucontent",
    views: {
      'menuContent' :{
        templateUrl: "login.html",
        controller: 'LoginCtrl'
      }
    }
  })
		
	.state('login', {
      url: "/login",
      templateUrl: "login.html",
      controller: 'LoginCtrl'
    });
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SplashController', function($scope, $stateParams) {
})

.controller('LoginCtrl', function($scope, $state) {
  
  $scope.LogIn = function(user) {
    $state.go('app.playlists');
  };
  
});