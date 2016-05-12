angular.module('starter', ['ionic'])

.controller('webServerCtrl', function($scope, $http) {

  $scope.isHidden      = true; // default hidden
  $scope.isHiddenError = true;

  $scope.showHidden = function (error) {
    if (error) { 
      $scope.isHiddenError = false; 
      $scope.isHidden = true; 
    } else { 
      $scope.isHidden = false;
      $scope.isHiddenError = true;  
    }
  }


  $scope.getData = function (cepParam) {
    
    var cepParamFunction = String(cepParam).replace("-", "");

    var regExp = /[0-9]{8}/;

    if(! regExp.test(cepParamFunction)) {
      alert("Verifique o formato do CEP!");
      return;
    }

    $http.get("http://correiosapi.apphb.com/cep/" + cepParamFunction)
      .success(function(data) {
        console.log(data);
        $scope.bairro           = data.bairro;
        $scope.tipoDeLogradouro = data.tipoDeLogradouro;
        $scope.logradouro       = data.logradouro;
        $scope.cidade           = data.cidade;
        $scope.estado           = data.estado;
        $scope.cep              = data.cep;

        $scope.showHidden(false);
      })
      .error(function(data){
        $scope.showHidden(true);
      })
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
