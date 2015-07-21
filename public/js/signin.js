'use strict';

(function() {

angular.module('serious-chat', ['ngMaterial'])

	.config(function($interpolateProvider){
		$interpolateProvider
			.startSymbol('[[')
			.endSymbol(']]')
		;
	})

	.controller('signinController', ['$scope', function($scope) {
		$scope.submit = function() {
			// using SHA-1 algorithm for encode
			var rusha = new Rusha();
			$scope.user.hash = rusha.digest('4hj2g4j234gf' + $scope.user.password + 'f723hfh2r23h723');

			// using MD5 algorithm for encode
			$scope.user.hash = md5('5n3k5h4ruhui45h' + $scope.user.hash + '42b3jh423h42gj');
		};
	}])
;

})();