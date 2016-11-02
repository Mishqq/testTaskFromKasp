(function(){
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'localStorageService'];

	function mainCtrl($scope, $http, $state, $stateParams, localStorageService){
		this.$scope = $scope;
		this.$http = $http;
		this.$state = $state;
		this.localStorageService = localStorageService;

		this.init();
	}

	mainCtrl.prototype.init = function(){
		this.getBooks();
	};

	mainCtrl.prototype.getBooks = function(){
		if(!this.localStorageService.get('bookList')){
			this.$http.get('./src/fixtures/books.json').then((resp)=>{
				for(let i=0; i<resp.data.length; i+=1){
					resp.data[i]._author = resp.data[i].authors[0]['s_name'];
				}
				this.localStorageService.set('bookList', resp.data);
			});
		}
	};
})();