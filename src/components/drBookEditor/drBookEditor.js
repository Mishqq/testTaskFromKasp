(function(){
	angular.module('app').controller('drBookEditorCtrl', drBookEditorCtrl);

	angular.module('app').directive('drBookEditor', function(){
		function drBookEditorLink($scope, $element, $attrs, $timeout){

		}

		return {
			link: drBookEditorLink,
			restrict: 'AEC',
			scope: {},
			templateUrl: './build/templates/drBookEditor/drBookEditor.html',
			controller: drBookEditorCtrl,
			controllerAs: 'bkEdtr',
			bindToController: {
				data: '=?',
				ctx: '=',
				mode: '@?',
				saveCb: '=?'
			}
		};
	});

	function drBookEditorCtrl($scope){
		this.status = 'edit';
		this.$scope = $scope;

		this.init();
	}

	drBookEditorCtrl.prototype.init = function(){
		if(!this.mode || this.mode === 'create') this.data = {
			name: "",
			authors: [
				["", ""],
			],
			pages: "",
			publishing_house: "",
			publication: "",
			edition: "",
			isbn: "",
			image: ""
		}
	};

	drBookEditorCtrl.prototype.processFiles = function(files){
		angular.forEach(files, (flowFile, i)=>{
			let fileReader = new FileReader();
			fileReader.onload = (event)=>{
				let uri = event.target.result;
				this.data.image = uri;
				this.$scope.$digest();
			};
			fileReader.readAsDataURL(flowFile.file);
		});
	};

	drBookEditorCtrl.prototype.saveCard = function(e){
		e.preventDefault();
		e.stopPropagation();

		console.log('---=== this.data ===---', this.data);

		if(!this.mode || this.mode == 'create') {
			this.saveCb.call(this.ctx, this.data);
		} else {
			this.saveCb.call(this.ctx);
		}
	};

	drBookEditorCtrl.prototype.deleteAuthor = function(e, idx){
		e.preventDefault();
		e.stopPropagation();

		this.data.authors.splice(idx, 1);
	};

	drBookEditorCtrl.prototype.addAuthor = function(e){
		e.preventDefault();
		e.stopPropagation();

		this.data.authors.push(["", ""]);
	};
})();