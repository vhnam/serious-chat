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

		$scope.search = function() {
			$scope.isSearching = true;
			$('#search-keyword').show().focus();
		}

		$scope.back = function() {
			$scope.isSearching = false;
			$('#search-keyword').hide();
		}

		$scope.showMenu = function() {
			$mdSidenav('aside-menu').toggle();
		};
	}])

	.controller('asideMenuController', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
		$scope.closeMenu = function() {
			$mdSidenav('aside-menu').close();
		};

		$scope.move = function(item) {
			if ('Sign out' === item) {
				window.location.href = 'app/signout';
			}
		}
	}])
;

})();