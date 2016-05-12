// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller('webServerCtrl', function($scope, $http) {

  $scope.isHidden = true; // default hidden

  $scope.showHidden = function () {
    $scope.isHidden = false;
  }

  $scope.getData = function (cepParam) {
    $http.get("http://correiosapi.apphb.com/cep/" + cepParam)
      .success(function(data) {
        console.log(data);
        $scope.bairro           = data.bairro;
        $scope.tipoDeLogradouro = data.tipoDeLogradouro;
        $scope.logradouro       = data.logradouro;
        $scope.cidade           = data.cidade;
        $scope.estado           = data.estado;
        $scope.cep              = data.cep;

        $scope.showHidden();
      })
      .error(function(data){
        alert("não deu certo");
      })
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
