(function(){
	angular.module('app').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
		let pathToComponents = './src/components/';

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('main', {
				url: '/',
				views: {
					"": {
						templateUrl: './build/templates/main/index.html',
					},
					"booksList@main": {
						templateUrl: './build/templates/booksList/index.html',
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
						templateUrl: './build/templates/editBook/index.html'
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
						templateUrl: './build/templates/createBook/index.html'
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