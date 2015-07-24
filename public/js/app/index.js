'use strict';

(function() {

angular.module('serious-chat', ['ngMaterial'])

	.config(function($interpolateProvider){
		$interpolateProvider
			.startSymbol('[[')
			.endSymbol(']]')
		;
	})

	.controller('mainController', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
		$scope.showMenu = function() {
			$mdSidenav('aside-menu').toggle();
		};
	}])

	.controller('asideMenuController', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
		$scope.closeMenu = function() {
			$mdSidenav('aside-menu').close();
		};
	}])
;

})();