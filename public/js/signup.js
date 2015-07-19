'use strict';

(function() {

angular.module('serious-chat', ['ngMaterial'])

	.config(function($interpolateProvider){
		$interpolateProvider
			.startSymbol('[[')
			.endSymbol(']]')
		;
	})

	.controller('signupController', ['$scope', function($scope) {
		$scope.submit = function($event) {
			// reset error message
			$scope.error = undefined;

			if ($scope.user.password !== $scope.user.confirmPassword) {
				$event.preventDefault();
				$scope.error = 'Confirm password is not match.'
			}

			var rusha = new Rusha();
			$scope.user.password = rusha.digest($scope.user.password);
		};
	}])
;

})();