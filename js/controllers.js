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
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
  /*
  $scope.login = function(data) {
	  
	var formData = "username="+data.username+"&password="+data.password;
	
	$.ajax({
		type: "GET",
		url:base_url+"checklogin",
		async: 'true',
		cache: false,
		dataType: 'json',
		data: formData,
		success: onSuccess,
		error:onError
	});
             
	function onSuccess(data)
	{
	
			if(data.status=="1"){
				//localStorage.userId= data.userId;
				//localStorage.username= data.username;
				//localStorage.cntr_Id=data.cntr_Id;
                $state.go('main.dash', {}, {//reload: true
				});
                $scope.setCurrentUsername(data.username);
				}
			else if(data.status== '0'){
			var alertPopup = $ionicPopup.alert({
				  title: 'Login failed!',
				  template: 'Please check your credentials!'
					 });
			} 
			else if(data.status== '2'){
				var alertPopup = $ionicPopup.alert({
				  title: 'Login failed!',
				  template: 'You are not registered!'
					 });

			}
			else if(data.status== '3'){
				var alertPopup = $ionicPopup.alert({
				  title: 'Login failed!',
				  template: 'Please Check your UserType'
					 });
			}
	}
	function onError()
	{
		var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'Connection Error'
      });
	} 
 };*/
})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
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
});
