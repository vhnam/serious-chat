(function() {

'use strict';

angular.module('serious-chat', ['ngMaterial'])

	// Replace symbol, prevent duplicate with Handlebars
	.config(function($interpolateProvider){
		$interpolateProvider
			.startSymbol('[[')
			.endSymbol(']]')
		;
	})

	// Cache template
	.run(function($templateCache) {
		$templateCache.put('message.html',
			'<div class="chat-post">' +
                '<img ng-src="img/{{avatar}}" alt="{{nickname}}" class="chat-avatar" ng-hide="isme">' +
                '<span class="post-content" ng-class="isme">' +
                    '<h4 class="post-nickname" ng-hide="isme">{{nickname}}</h4>' +
                    '{{content}}' +
                '</span>' +
            '</div>' +
            '<div class="clear"></div>'
		);
	})

	// Socket.io service
	.factory('socket', ['$rootScope', function ($rootScope) {
		var socket = io.connect();
		return {

			/**
			 * Subscribe event
			 *
			 * @param  {string} eventName
			 * @param  {function} callback
			 */
			on: function (eventName, callback) {
				function wrapper() {
					var args = arguments;
					$rootScope.$apply(function (){
						callback.apply(socket, args)
					})
				}

				socket.on(eventName, wrapper);

				return function () {
					socket.removeListener(eventName, wrapper);
				}
			},

			/**
			 * Publish event
			 *
			 * @param  {string} eventName
			 * @param  {object} data
			 * @param  {function} callback
			 */
			emit: function (eventName, data, callback) {
				socket.emit(eventName, data, function () {
					var args = arguments;
					$rootScope.$apply(function () {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				});
			}
		}
	}])

	// ngEnter directive
	.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
	})


	// Message directive
	.directive('message', function() {
		return {
			restrict: 'AE',
			scope: {
				avatar: '@',
				nickname: '@',
				isme: '@',
				content: '@'
			},
			templateUrl: 'message.html'
		}
	})


	// Main Controller
	.controller('mainController', ['$scope', '$mdSidenav', 'socket', function($scope, $mdSidenav, socket) {
		$(window).on('beforeunload', function(){
		    socket.close();
		});

		$scope.user = {};

		$scope.stop = false;

		// Messages of users
		$scope.messages = [];

		$scope.message = '';

		/**
		 * Show search form
		 *
		 */
		$scope.search = function () {
			$scope.isSearching = true;
			$('#search-keyword').show().focus();
		};

		/**
		 * Hide search form
		 *
		 */
		$scope.back = function () {
			$scope.isSearching = false;
			$('#search-keyword').hide();
		}

		/**
		 * Show sidenav
		 *
		 */
		$scope.showSidenav = function () {
			$mdSidenav('aside-menu').toggle();
		}


		$scope.sendMessage = function() {
			if ($scope.message) {
				socket.emit('sendMessage', {
					user: $scope.user,
					message: $scope.message
				});

				$scope.messages.push({
					user: {
						avatar: ($scope.user.avatar) ? $scope.user.avatar : 'anonymous-face.png',
						nickname: $scope.user.nickname,
						isme: 'me'
					},
					content: $scope.message
				});

				$scope.message = '';
			}
		}

		socket.on('newUserConnect', function (data) {
			if(!$scope.user.unique) {
				$scope.user = data;
			}
		});

		socket.emit('newLogin', $scope.user);

		socket.on('newMessage', function (data) {
			$scope.messages.push({
				user: {
					avatar: (data.user.avatar) ? data.user.avatar : 'anonymous-face.png',
					nickname: data.user.nickname
				},
				content: data.message
			});

			if ($('.chat-content > div').length > 3) {
				$('.md-default-theme').scrollTop(($('.chat-content')[0]).lastChild.offsetTop);
			}
		});
	}])

	// Aside menu controller
	.controller('asideMenuController', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {

		/**
		 * Redirect when user clicked on menu
		 *
		 * @param  {string}
		 */
		$scope.redirect = function(item) {
			if ('Sign out' === item) {
				window.location.href = 'app/signout';
			}
		}
	}]);
})();
