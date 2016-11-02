(function(){
	'use strict';

	angular
		.module('app')
		.controller('CreateBookCtrl', CreateBookCtrl);

	CreateBookCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'localStorageService'];

	function CreateBookCtrl($scope, $http, $state, $stateParams, localStorageService){
		this.$scope = $scope;
		this.$http = $http;
		this.$state = $state;
		this.localStorageService = localStorageService;

		this.init();
	}

	CreateBookCtrl.prototype.init = function(){
		this.book = angular.copy(this.localStorageService.get('editBook'));
	};

	CreateBookCtrl.prototype.saveBookCb = function(newBook){
		let books = this.localStorageService.get('bookList');
		newBook.id = '_' + books.length;
		books.push(newBook);
		this.localStorageService.set('bookList', books);
		this.$state.go('main');
	};


})();