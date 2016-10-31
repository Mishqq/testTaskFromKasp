(function(){
	'use strict';

	angular
		.module('app')
		.controller('booksListCtrl', booksListCtrl);

	booksListCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'localStorageService'];

	function booksListCtrl($scope, $http, $state, $stateParams, localStorageService){
		this.$scope = $scope;
		this.$http = $http;
		this.$state = $state;
		this.localStorageService = localStorageService;

		this.bookList = this.localStorageService.get('bookList');

		this.filters = [
			{name: 'Названию', type: 'name'},
			{name: 'Автору', type: '_author'},
			{name: 'Дате публикации', type: 'publication'},
			{name: 'Количеству страниц', type: 'pages'}
		];
		this.sortType = 'name';
		this.sortReverse = false;

		this.init();

	}

	booksListCtrl.prototype.init = function(){};

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
			for(let i=0; i<resp.data.length; i+=1){
				resp.data[i]._author = resp.data[i].authors[0]['s_name'];
			}
			this.localStorageService.set('bookList', resp.data);
			this.$state.reload();
		});
	};
})();