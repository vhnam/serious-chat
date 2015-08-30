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

			// check confirm is match
			if ($scope.user.password !== $scope.user.confirmPassword) {
				$event.preventDefault();
				$scope.error = 'Confirm password is not match.'
			}

			// using SHA-1 algorithm for encode
			var rusha = new Rusha(),
			password = $scope.user.password;
			$scope.user.confirmPassword = '';
			password = rusha.digest('4hj2g4j234gf' + password + 'f723hfh2r23h723');

			// using MD5 algorithm for encode
			$scope.user.password = md5('5n3k5h4ruhui45h' + password + '42b3jh423h42gj');
		};
	}])
;

})();