(function(){
	angular.module('app').config(function (localStorageServiceProvider) {
		localStorageServiceProvider
			.setPrefix('app')
			.setNotify(true, true)
	});
})();