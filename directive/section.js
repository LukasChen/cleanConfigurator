angular.module('configApp')

.directive('section',function($rootScope) {
  return {
    restrict:'E',
    templateUrl:"view/section.html",
    controller: function($scope,$rootScope) {

      this.openSection = true;


      //init the poroduct to the corresponding object in $scope.cart
      $scope.initProduct = function(button,section,chapter) {
        var products = $scope.cart.products;

        if(products[chapter.name] === undefined) {
          products[chapter.name] = {};
          products[chapter.name].cost = 0;
          products[chapter.name].count = 0;
        }
        if(products[chapter.name][section.name] === undefined) {
          products[chapter.name][section.name] = {};
          products[chapter.name][section.name].cost = 0;
          products[chapter.name][section.name].lastclicked = null;
          products[chapter.name][section.name].lastclickedChildren = null;
          //products[chapter.name][section.name].group = group;
        }
        $scope.cart.products = products;
      }



      $scope.radioClick = function(button,section,chapter) {
        cart = $scope.cart,
        chap = $scope.cart.products[chapter.name],
        sec = $scope.cart.products[chapter.name][section.name];

        if(button.name != sec.lastclicked){
          //if there was already a button click in same section
          //and not equal None

          button.value = parseInt(button.value);


          if(sec.lastclicked != null && sec.lastclicked != "None") {

            //broadcast to the radioButton directive
            //I use directive because disable and enable require
            //modifying the DOM

            //call enabeButton function every time user click different
            //button in the same section

            //in order to make this work I need to call enableButton
            //before disabeButton
            $rootScope.$broadcast('enabeButton',sec.lastclickedChildren);

            cart.count --;
            chap.count --;

            cart.cost -= sec.cost;
            chap.cost -= sec.cost;

          }
          if(button.name != "None") {

            //call disableButton function everytime a button click
            //in radioButton directive
            $rootScope.$broadcast('disableButton',button);

            cart.count++;
            chap.count++;

            cart.cost += button.value;
            chap.cost += button.value;
          }

          sec.lastclickedChildren = button.Child_Name;
          sec.lastclicked = button.name;
          sec.lastclickedImg = button.img;
          sec.lastclickedLink = button.link;
          sec.cost = button.value;
        }
      }



    },
    link: function(scope,element,attrs,controller) {

      //receiving broadcast from app controller

      scope.$on('enabeButton',function(event,arg) {
        enableButton(arg);
      })



      scope.$on('disableButton',function(event,arg) {
        disableButton(arg);
      });




      function enableButton (disabledButton) {

        angular.forEach(disabledButton,function(value,i) {
          angular.element(value).prop('disabled',false);
        });
      }





      function disableButton (button) {
        var disableButton = button.Child_Name;

        angular.forEach(disableButton,function(value,i) {
          angular.element(value).prop('disabled',true);
        });
      }

    }
  }
})


.directive('buttonTrigger',function($rootScope) {
  return {
    restrict:'A',
    require:"^section",
    link: function (scope,element,attrs,controller) {

      element.bind('click',radioClick);

      function radioClick( event ) {

        //close this section and open next section
        //if it's the first time they click on a button
        //in that section
        openNextSection();

        scope.$apply();
      }

      function openNextSection () {

        if(controller.openSection) {


          //get the section DOM
          var section = element.closest('section');

          section.scope().SectionCollapse = false;

          var targetScope = section.next().scope();


          //If it's the last section in the chapter
          if(!targetScope) {
            return;
          }

          targetScope.SectionCollapse = true;

          controller.openSection = false;
        }

      }



    }
  }
})
