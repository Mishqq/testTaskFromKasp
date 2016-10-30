(function(){
	'use strict';

	angular
		.module('app')
		.controller('EditBookCtrl', EditBookCtrl);

	EditBookCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'localStorageService'];

	function EditBookCtrl($scope, $http, $state, $stateParams, localStorageService){
		this.$scope = $scope;
		this.$http = $http;
		this.$state = $state;
		this.localStorageService = localStorageService;

		this.init();
	}

	EditBookCtrl.prototype.init = function(){
		this.book = angular.copy(this.localStorageService.get('editBook'));
	};

	EditBookCtrl.prototype.saveBookCb = function(){
		console.log('---=== callback ===---');

		let books = this.localStorageService.get('bookList');
		for(let i=0; i<books.length; i+=1){
			if(this.book.id == books[i].id) {
				books[i] = this.book;
			}
		}
		this.localStorageService.set('bookList', books);
		this.localStorageService.remove('editBook');
		this.$state.go('main');
	};


})();