'use strict';

(function() {

angular.module('serious-chat', ['ngMaterial'])

	.controller('MainController', ['$scope', function($scope) {
		$scope.scrollDown = function($event) {
			$event.preventDefault();
			$('html, body').animate({
				scrollTop: $("#sub-content").offset().top
			}, 500);
		};
	}])
;
})();