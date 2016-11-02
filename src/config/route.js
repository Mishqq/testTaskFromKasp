(function(){
	angular.module('app').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
		let pathToComponents = './src/components/';

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('main', {
				url: '/',
				views: {
					"": {
						templateUrl: './build/templates/viewMain/viewMain.html',
					},
					"booksList@main": {
						templateUrl: './build/templates/viewBooksList/viewBooksList.html',
					}
				}
			})
			.state('main.edit', {
				url: 'book/edit/:id',
				views: {
					"booksList@main": {
						template: '',
					},
					"editBookView": {
						templateUrl: './build/templates/viewEditBook/viewEditBook.html'
					}
				}
			})
			.state('main.create', {
				url: 'book/create',
				views: {
					"booksList@main": {
						template: '',
					},
					"createBookView": {
						templateUrl: './build/templates/viewCreateBook/viewCreateBook.html'
					}
				}
			})
			.state('main.form', {
				url: 'form',
				views: {
					"booksList@main": {
						template: '',
					},
					"createBookView": {
						templateUrl: './build/templates/form/index.html'
					}
				}
			});
	}]);
})();