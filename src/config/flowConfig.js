(function(){
	angular.module('app').config(['flowFactoryProvider', function (flowFactoryProvider) {
		flowFactoryProvider.defaults = {
			target: '/upload',
			permanentErrors:[404, 500, 501]
		};
		flowFactoryProvider.on('catchAll', function (event) {});
	}]);
})();