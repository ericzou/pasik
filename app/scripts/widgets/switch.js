'use strict';

var switchModule = angular.module('pasik.widgets.switch', []);

switchModule.controller('SwitchController', [function () {

  this.state = 'on';

  this.toggleState = function () {
    if (this.state === 'on') {
      console.log('switch on');
      this.state = 'off';
    } else {
      console.log('switch on');
      this.state = 'on';
    }
  };

}]);

switchModule.directive('switch', function () {
  return {
    restrict: 'E',
    controller: 'SwitchController',
    scope: {

    },
    templateUrl: 'templates/widgets/switch.html',
    link: function (scope, element, attributes, controller) {
      scope.state = controller.state;
      scope.toggle = controller.toggleState;
    }
  };
});


