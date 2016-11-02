(function(){
	"use strict";

	angular.module('app').controller('drSortBooksCtrl', drSortBooksCtrl);

	angular.module('app').directive('drSortBooks', function(){
		function drSortBooksLink($scope, $element, $attrs, $timeout){

		}

		return {
			link: drSortBooksLink,
			restrict: 'AEC',
			scope: {},
			templateUrl: './build/templates/drSortBooks/drSortBooks.html',
			controller: drSortBooksCtrl,
			controllerAs: 'sb',
			bindToController: {
				data: '=?',
				ctx: '=?',
				clickCb: '=?',
				activeFilter: '=?',
				reverseStatus: '=?'
			}
		};
	});

	function drSortBooksCtrl($scope){
		this.$scope = $scope;

		this.init();
	}

	drSortBooksCtrl.prototype.init = function(){
		if(!this.clickCb) this.clickCb = ()=>{};
	};

	/**
	 * Клик по фильтру. Вызываем переданный коллбек или ()=>{}
	 * @param e
	 * @param filterType
	 */
	drSortBooksCtrl.prototype.filterClick = function(e, filterType){
		e.preventDefault();
		e.stopPropagation();

		this.clickCb.call(this.ctx, filterType);
	};
})();