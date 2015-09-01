'use strict';
(function() {
angular.module('serious-chat', ['ngMaterial'])

	.config(function($interpolateProvider){
		$interpolateProvider
			.startSymbol('[[')
			.endSymbol(']]')
		;
	})

	.factory('socket', ['$rootScope', function ($rootScope) {
		var socket = io.connect();
		return {
			on: function (eventName, callback) {
				function wrapper() {
					var args = arguments;
					$rootScope.$apply(function (){
						callback.apply(socket, args)
					})
				};

				socket.on(eventName, wrapper);

				return function () {
					socket.removeListener(eventName, wrapper);
				};
			},
			emit: function (eventName, data, callback) {
				socket.emit(eventName, data, function () {
					var args = arguments;
					$rootScope.$apply(function () {
						if(callback) {
							callback.apply(socket, args);
						}
					});
				});
			}
		}
	}])

	.controller('mainController', ['$scope', '$mdSidenav', 'socket', function($scope, $mdSidenav, socket) {

		$scope.user = {};

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

		socket.on('new user connect', function (data) {
			console.log(data);
		});

		socket.emit('new login', {data: $scope.user});

		
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
	}]);
})();
