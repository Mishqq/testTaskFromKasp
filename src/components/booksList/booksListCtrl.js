(function(){
	'use strict';

	angular
		.module('app')
		.controller('booksListCtrl', booksListCtrl);

	booksListCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'bookStore', 'localStorageService'];

	function booksListCtrl($scope, $http, $state, $stateParams, bookStore, localStorageService){
		this.$scope = $scope;
		this.$http = $http;
		this.$state = $state;
		this.bookStore = bookStore;
		this.localStorageService = localStorageService;

		this.bookList = this.localStorageService.get('bookList');

		this.sortType = 'name';
		this.sortReverse = false;

		this.init();

	}

	booksListCtrl.prototype.init = function(){
		console.log('---=== bookList ===---');
	};

	booksListCtrl.prototype.editBook = function(e, item){
		e.preventDefault();
		e.stopPropagation();

		this.localStorageService.set('editBook', item);
		this.$state.go('main.edit', {id: item.id});
	};

	booksListCtrl.prototype.addBook = function(e){
		e.preventDefault();
		e.stopPropagation();

		this.$state.go('main.create');
	};

	booksListCtrl.prototype.deleteBook = function(e, book){
		e.preventDefault();
		e.stopPropagation();

		for(let i=0; i<this.bookList.length; i+=1){
			if(book.id === this.bookList[i].id) this.bookList.splice(i, 1);
		}
		this.localStorageService.set('bookList', this.bookList);
	};

	booksListCtrl.prototype.sortBooks = function(e, type){
		e.preventDefault();
		e.stopPropagation();

		if(this.sortType === type) {
			this.sortReverse = !this.sortReverse;
		} else {
			this.sortType = type;
		}
	};

	booksListCtrl.prototype.updateFromJson = function(e){
		e.preventDefault();
		e.stopPropagation();

		this.$http.get('./src/fixtures/books.json').then((resp)=>{
			this.localStorageService.set('bookList', resp.data);
		});
	};
})();