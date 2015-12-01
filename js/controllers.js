var base_url="http://bluesys.in/dev/mschoolapp/public/";
//var base_url="http://localhost/schoolapp/public/";
angular.module('starter')

// .controller('AppCtrl', function() {})
// .controller('LoginCtrl', function() {})
// .controller('DashCtrl', function() {});
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};

  $scope.login = function(data) {
	 AuthService.login(data.username, data.password).then(function(authenticated) 
	  {
	  $scope.setCurrentUsername(localStorage.getItem('name'));
      $state.go('main.dash', {}, {reload: true});
      
	  }, function(err) 
	  {
		   var alertPopup = $ionicPopup.alert({
			title: 'Login failed!',
			template: 'Please check your credentials!'
		   });
      });
  };

})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.performValidRequest = function() {
    $http.get('http://localhost/schoolapp/public/listcenter?_=1448856387546').then(
      function(result) {
        $scope.response = result;
      });
  };

  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };

  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
})

.controller('MasterCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
	$scope.listcenter = function() {
	$state.go('listcenter');
   
	
  };
})

.controller('CenterCtrl', function($scope,$state,$ionicPopup, $http) {
	$scope.data = {};
	
	$scope.init=function() {
		getCenterList();
	};
   getCenterList = function() {
	$.ajax({
		type: "GET",
		url:base_url+"listcenter",
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {
			$scope.items=data;},
		error:onError
	});
	  getCenterList();
	function onError()
	{
	var alertPopup = $ionicPopup.alert({
			title: 'No Data',
			template: 'No Centers Found'
		   });
	}
	};
	
    $scope.insert = function() {
	$state.go('addcenter');
    };

	$scope.addcenter = function(data) 
	{
		$.ajax({
				type: "GET",
				url: base_url+"center/create",
				cache: false,
				dataType:"json",
				data: data,
				success: function(data){
					if(data.status=="1")
					{
						$state.go('listcenter');
					    var alertPopup = $ionicPopup.alert({
						title: 'Success',
						template: 'Added Successfully'});
					}
					else
					{
						var alertPopup = $ionicPopup.alert({
						title: 'Fail',
						template: 'Error'});
					}
					
				},
				error: function(){var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			});
    };
	
})
