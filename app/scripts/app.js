'use strict';

angular.module('pasikApp', ['pasik.charts.pieChart', 'pasik.charts.barChart', 'pasik.widgets.switch'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
