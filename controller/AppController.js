angular.module('configApp')
.controller('AppController',function($scope,$http,$rootScope) {
  $http.get('init.json')
    .success(function(res){
      $scope.data = res;
      console.log($scope.data);
    });

  $scope.cart = {
    products:{},
    count: 0,
    cost: 0,
    thirdprtycost: 0,
    vtcost: 0,
    vtcount: 0,
    thirdprtycount: 0
  };

  $scope.ChoiceCollapse = true;


});
