(function(){
	'use strict';

	angular
		.module('app')
		.factory('bookStore', bookStore);

	bookStore.$inject = [];

	function bookStore(){
		let books;
		return {
			books: books
		}
	}
})();