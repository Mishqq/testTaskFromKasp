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

		this.init();

	}

	booksListCtrl.prototype.init = function(){
		this.getSortConfFromStorage();
	};

	booksListCtrl.prototype.getSortConfFromStorage = function(){
		let sortConf = this.localStorageService.get('sortConf');
		if(!sortConf){
			sortConf = {type:'name', reverse: false};
			this.localStorageService.set('sortConf', sortConf)
		}
		this.sortType = sortConf.type;
		this.sortReverse = sortConf.reverse;
	};

	/**
	 * Функция перехода в редактор книги
	 * Передается как коллбек в директиву dr-book-card => edit-book-cb
	 * @param book
	 */
	booksListCtrl.prototype.editBook = function(book){
		this.localStorageService.set('editBook', book);
		this.$state.go('main.edit', {id: book.id});
	};

	/**
	 * Функция удаления книги
	 * Передается как коллбек в директиву dr-book-card => delete-book-cb
	 * @param book
	 */
	booksListCtrl.prototype.deleteBook = function(book){
		for(let i=0; i<this.bookList.length; i+=1){
			if(book.id === this.bookList[i].id) this.bookList.splice(i, 1);
		}
		this.localStorageService.set('bookList', this.bookList);
	};

	/**
	 * Функция добавления книги
	 */
	booksListCtrl.prototype.addBook = function(e){
		e.preventDefault();
		e.stopPropagation();

		this.$state.go('main.create');
	};

	/**
	 * Функция сортировки книг по клику на фильтр
	 * Передается как коллбек в директиву dr-sort-books => click-cb
	 */
	booksListCtrl.prototype.sortBooks = function(type){
		console.log('---=== type ===---', type);
		if(this.sortType === type) {
			this.sortReverse = !this.sortReverse;
		} else {
			this.sortReverse = false;
			this.sortType = type;
		}

		this.localStorageService.set('sortConf', {type:this.sortType, reverse: this.sortReverse})
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