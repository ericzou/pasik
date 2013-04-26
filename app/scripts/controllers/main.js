'use strict';

angular.module('pasikApp')
  .controller('MainCtrl', function ($scope, $timeout) {

    $scope.foo = 87;
    $scope.bar = 21;

    $scope.first = 57.76;
    $scope.second = -3.76;

    $scope.dataset =
      [4.1, 7.2, 8.3, 7.4, 1.5, 2.6, 7.7, 9.8, 8.9, 7.0, 5.1, 3.2, 4.3, 3.4, 7.5, 8.6, 1.7, 7.8, 3.9, 5.0];

    $timeout(function  randomize() {
      $scope.foo = Math.round(Math.random() * 80 + 10);
      $scope.bar = Math.round(Math.random() * 80 + 10);
      $scope.first = (Math.random() * 80 + 10).toPrecision(4);
      $scope.second = (Math.random() * 80 + 10).toPrecision(4);
      $timeout(randomize, 5000);
    }, 5000);

    $timeout(function randomizeDataset() {
      $scope.dataset.shift();
      $scope.dataset.push((Math.random() * 10));
      $timeout(randomizeDataset, 1000);
    }, 1000);

  });

