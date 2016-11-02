(function(){
	angular.module('app').controller('drBookListCtrl', drBookListCtrl);

	angular.module('app').directive('drBookList', function(){
		function drBookListLink($scope, $element, $attrs, $timeout){

		}

		return {
			link: drBookListLink,
			restrict: 'AEC',
			scope: {},
			templateUrl: './build/templates/drBookList/drBookList.html',
			controller: drBookListCtrl,
			controllerAs: 'bList',
			transclude: {
				'bCard': '?drBookCard',
			},
			bindToController: {
				data: '=?',
				ctx: '='
			}
		};
	});

	function drBookListCtrl($scope){
		this.$scope = $scope;

		this.init();
	}

	drBookListCtrl.prototype.init = function(){};
})();