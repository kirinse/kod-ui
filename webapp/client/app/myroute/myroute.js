'use strict';

angular.module('angularWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myroute', {
        url: 'game',
        templateUrl: 'app/myroute/myroute.html',
        controller: 'MyrouteCtrl'
      });
  });
