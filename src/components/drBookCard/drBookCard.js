(function(){
	"use strict";

	angular.module('app').controller('drBookCardCtrl', drBookCardCtrl);

	angular.module('app').directive('drBookCard', function(){
		function drBookCardLink($scope, $element, $attrs, $timeout){

		}

		return {
			link: drBookCardLink,
			restrict: 'AEC',
			scope: {},
			templateUrl: './build/templates/drBookCard/drBookCard.html',
			controller: drBookCardCtrl,
			controllerAs: 'bCard',
			bindToController: {
				data: '=?',
				ctx: '=?',
				editLinkCb: '=?',
				deleteLinkCb: '=?'
			}
		};
	});

	function drBookCardCtrl($scope){
		this.$scope = $scope;

		this.init();
	}

	drBookCardCtrl.prototype.init = function(){
		if(!this.editLinkCb) this.editLinkCb = ()=>{};
		if(!this.deleteLinkCb) this.deleteLinkCb = ()=>{};
	};

	/**
	 * Функция клика по иконке редактирования книги в карточке. Вызывает переданный коллбек или ()={}
	 * @param e
	 * @param book
	 */
	drBookCardCtrl.prototype.editLink = function(e, book){
		e.preventDefault();
		e.stopPropagation();

		this.editLinkCb.call(this.ctx, book);
	};

	/**
	 * Функция клика по иконке удаления книги в карточке. Вызывает переданный коллбек или ()={}
	 * @param e
	 * @param book
	 */
	drBookCardCtrl.prototype.deleteLink = function(e, book){
		e.preventDefault();
		e.stopPropagation();

		this.deleteLinkCb.call(this.ctx, book);
	};
})();