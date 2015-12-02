angular.module('Collapse',['ngAnimate'])
.directive('bnCollapse',function($animate) {
  return {
    restrict:'A',
    link: function(scope,element,attrs) {

      var duration = (attrs.duration || '0.2s');

      var padding = attrs.padding;

      function expand () {
        //I use dom to insert class instead of ng-class
        //is because ng-animate will also add the animate pre-fix to the class
        //if I use ng-class
        element
          .css({paddingBottom:padding,paddingTop:padding})
          .addClass('collapsing')
          .removeClass('collapse')

        $animate.addClass(element,'in',{
          to:{height: element[0].scrollHeight + 'px'},
          duration:duration
        }).then(expandDone);
      }

      function expandDone () {
        element
          .addClass('collapse')
          .removeClass('collapsing')
          .css({height:'auto'});
      }

      function collapse () {
        if (!element.hasClass('collapse') && !element.hasClass('in')) {
          return collapseDone();
        }

        //CAUTION : Must define css before adding class or weird things
        //will happen

        element
          .css({height: element[0].scrollHeight + 'px',paddingBottom: '0',paddingTop: '0'})
          .addClass('collapsing')
          .removeClass('collapse');


        $animate.removeClass(element,'in', {
          to:{height: '0'},
          duration:duration
        }).then(collapseDone);
      }

      function collapseDone () {
        element
          .addClass('collapse')
          .removeClass('collapsing')
          .css('height','0');

      }

      scope.$watch(attrs.bnCollapse,function(newCollapse) {
        if(newCollapse) {
          expand();
        } else {
          collapse();
        }
      })
    }
  }
});
