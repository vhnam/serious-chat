'use strict';

(function() {

angular.module('serious-chat', ['ngMaterial'])

	.config(function($interpolateProvider){
		$interpolateProvider
			.startSymbol('[[')
			.endSymbol(']]')
		;
	})

	.controller('mainController', ['$scope', function($scope) {
		
	}])
;

})();