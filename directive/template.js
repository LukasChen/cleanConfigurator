angular.module('configApp')
.directive('navbar',function() {
  return {
    restrict:'E',
    replace:true,
    templateUrl:'templates/navbar.html'
  }
})
.directive('jumbotron',function() {
  return {
    restrict:'E',
    replace:true,
    templateUrl:'templates/jumbotron.html'
  }
});
