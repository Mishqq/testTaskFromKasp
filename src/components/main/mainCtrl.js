(function(){
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'bookStore', 'localStorageService'];

	function mainCtrl($scope, $http, $state, $stateParams, bookStore, localStorageService){
		this.$scope = $scope;
		this.$http = $http;
		this.$state = $state;
		this.bookStore = bookStore;
		this.localStorageService = localStorageService;

		this.init();

	}

	mainCtrl.prototype.init = function(){
		console.log('---=== mainCtrl init ===---');
		this.getBooks();
	};

	mainCtrl.prototype.getBooks = function(){
		if(!this.localStorageService.get('bookList')){
			this.$http.get('./src/fixtures/books.json').then((resp)=>{
				this.localStorageService.set('bookList', resp.data);
			});
		}
	};
})();