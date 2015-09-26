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
				}

				socket.on(eventName, wrapper);

				return function () {
					socket.removeListener(eventName, wrapper);
				}
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

		$scope.stop = false;

		$scope.message = '';

		$scope.search = function() {
			$scope.isSearching = true;
			$('#search-keyword').show().focus();
		};

		$scope.back = function() {
			$scope.isSearching = false;
			$('#search-keyword').hide();
		}

		$scope.showMenu = function() {
			$mdSidenav('aside-menu').toggle();
		}


		/**
		 * function send message
		 *
		 *<div class="chat-post">
		 *	 <img src="img/anonymous-face.png" alt="User" class="chat-avatar">
		 *	 <span class="post-content">
		 *	 	<h4 class="post-nickname">Harry James</h4>
		 *		Color in material design is inspired by bold hues juxtaposed with muted environments, deep shadows, and bright highlights. Material takes cues from contemporary architecture, road signs, pavement marking tape, and athletic courts. Color should be unexpected and vibrant.
		 *	 </span>
		 *</div>
		 *<div class="clear"></div>
		 *<div class="chat-post">
		 *   <span class="post-content me">
		 *	 Treehouse is where you go to learn HTML, CSS, and how to build iOS apps.
		 *	 </span>
		 *</div>
		 */
		$scope.sendMessage = function(){
			var message = $scope.message;
			$scope.stop = true;
			if(message) {
				socket.emit('sendMessage', {user: $scope.user, message: message});
				$('.chat-content').append('<div class="clear"></div>');
				var msgHtml = '<div class="chat-post">' +
					'<span class="post-content me">' + message + '</span></div>';
				$('.chat-content').append(msgHtml);
				$scope.message = '';
				if($('.chat-content>div').length > 3) {
					$('.md-default-theme').scrollTop(($('.chat-content')[0]).lastChild.offsetTop);
				}
			}
		};
		$scope.submitForm = function(event){
			if(event.which == 13 || event.keyCode == 13){
				event.preventDefault();
				$scope.sendMessage();
			}
		};

		$scope.sendMsg = function(message){
			if(message) {
				socket.emit('sendMessage', {user: $scope.user, message: message});
				$('.chat-content').append('<div class="clear"></div>');
				var msgHtml = '<div class="chat-post">' +
					'<span class="post-content me">' + message + '</span></div>';
				$('.chat-content').append(msgHtml);
				if($('.chat-content>div').length > 3) {
					$('.md-default-theme').scrollTop(($('.chat-content')[0]).lastChild.offsetTop);
				}
				setTimeout(function(){
					if(!$scope.stop) {
						$scope.sendMsg("TEST CAC KIEU");
					}
				},100);
			}
		};
		socket.on('newUserConnect', function (data) {
			if(!$scope.user.unique) {
				$scope.user = data;
			}
		});

		socket.emit('newLogin', $scope.user);
		$scope.sendMsg("TEST HAM NÈ");
		/**
		 * Function new message
		 * data {
		 *     .user {
		 *     		.unique,
		 *     		.nickname,
		 	*     	.avatar
		 *     },
		 *     .message
		 * }
		 */
		socket.on('newMessage', function (data) {
			if(data.user.unique != $scope.user.unique) {
				$('.chat-content').append('<div class="clear"></div>');
				var msgHtml = '<div class="chat-post">' +
					'<img src="img/anonymous-face.png" alt="User" class="chat-avatar">' +
					'<span class="post-content">' +
					'<h4 class="post-nickname">' + data.user.nickname + '</h4>' + data.message + '</span></div>';
				$('.chat-content').append(msgHtml);
				if($('.chat-content>div').length > 3) {
					$('.md-default-theme').scrollTop(($('.chat-content')[0]).lastChild.offsetTop);
				}
			}
		});
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
