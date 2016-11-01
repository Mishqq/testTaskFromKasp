"use strict";!function(){angular.module("app",["ngAnimate","ngMaterial","ngMessages","ui.router","LocalStorageModule","flow"])}(),function(){angular.module("app").config(["flowFactoryProvider",function(t){t.defaults={target:"/upload",permanentErrors:[404,500,501]},t.on("catchAll",function(t){})}])}(),function(){angular.module("app").config(["localStorageServiceProvider",function(t){t.setPrefix("app").setNotify(!0,!0)}])}(),function(){angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/"),t.state("main",{url:"/",views:{"":{templateUrl:"./build/templates/main/index.html"},"booksList@main":{templateUrl:"./build/templates/booksList/index.html"}}}).state("main.edit",{url:"book/edit/:id",views:{"booksList@main":{template:""},editBookView:{templateUrl:"./build/templates/editBook/index.html"}}}).state("main.create",{url:"book/create",views:{"booksList@main":{template:""},createBookView:{templateUrl:"./build/templates/createBook/index.html"}}}).state("main.form",{url:"form",views:{"booksList@main":{template:""},createBookView:{templateUrl:"./build/templates/form/index.html"}}})}])}(),function(){function t(t,e,o,i,a){this.$scope=t,this.$http=e,this.$state=o,this.localStorageService=a,this.bookList=this.localStorageService.get("bookList"),this.filters=[{name:"Названию",type:"name"},{name:"Автору",type:"_author"},{name:"Дате публикации",type:"publication"},{name:"Количеству страниц",type:"pages"}],this.init()}angular.module("app").controller("booksListCtrl",t),t.$inject=["$scope","$http","$state","$stateParams","localStorageService"],t.prototype.init=function(){this.getSortConfFromStorage()},t.prototype.getSortConfFromStorage=function(){var t=this.localStorageService.get("sortConf");t||(t={type:"name",reverse:!1},this.localStorageService.set("sortConf",t)),this.sortType=t.type,this.sortReverse=t.reverse},t.prototype.editBook=function(t,e){t.preventDefault(),t.stopPropagation(),this.localStorageService.set("editBook",e),this.$state.go("main.edit",{id:e.id})},t.prototype.addBook=function(t){t.preventDefault(),t.stopPropagation(),this.$state.go("main.create")},t.prototype.deleteBook=function(t,e){t.preventDefault(),t.stopPropagation();for(var o=0;o<this.bookList.length;o+=1)e.id===this.bookList[o].id&&this.bookList.splice(o,1);this.localStorageService.set("bookList",this.bookList)},t.prototype.sortBooks=function(t,e){t.preventDefault(),t.stopPropagation(),this.sortType===e?this.sortReverse=!this.sortReverse:(this.sortReverse=!1,this.sortType=e),this.localStorageService.set("sortConf",{type:this.sortType,reverse:this.sortReverse})},t.prototype.updateFromJson=function(t){var e=this;t.preventDefault(),t.stopPropagation(),this.$http.get("./src/fixtures/books.json").then(function(t){for(var o=0;o<t.data.length;o+=1)t.data[o]._author=t.data[o].authors[0].s_name;e.localStorageService.set("bookList",t.data),e.$state.reload()})}}(),function(){function t(t,e,o,i,a){this.$scope=t,this.$http=e,this.$state=o,this.localStorageService=a,this.init()}angular.module("app").controller("CreateBookCtrl",t),t.$inject=["$scope","$http","$state","$stateParams","localStorageService"],t.prototype.init=function(){this.book=angular.copy(this.localStorageService.get("editBook"))},t.prototype.saveBookCb=function(t){var e=this.localStorageService.get("bookList");t.id="_"+e.length,e.push(t),this.localStorageService.set("bookList",e),this.$state.go("main")}}(),function(){function t(t){this.status="edit",this.$scope=t,this.init()}t.$inject=["$scope"],angular.module("app").controller("drBookEditorCtrl",t),angular.module("app").directive("drBookEditor",function(){function e(t,e,o,i){}return{link:e,restrict:"AEC",scope:{},templateUrl:"./build/templates/drBookEditor/drBookEditor.html",controller:t,controllerAs:"bkEdtr",bindToController:{data:"=?",ctx:"=",mode:"@?",saveCb:"=?"}}}),t.prototype.init=function(){this.mode&&"create"!==this.mode||(this.data={name:"",authors:[["",""]],pages:"",publishing_house:"",publication:"",edition:"",isbn:"",image:""}),this.returnIsbnConfig(this.data.isbn)},t.prototype.processFiles=function(t){var e=this;angular.forEach(t,function(t,o){var i=new FileReader;i.onload=function(t){var o=t.target.result;e.data.image=o,e.$scope.$digest()},i.readAsDataURL(t.file)})},t.prototype.saveCard=function(t){t.preventDefault(),t.stopPropagation(),console.log("---=== this.data ===---",this.data),this.mode&&"create"!=this.mode?this.saveCb.call(this.ctx):this.saveCb.call(this.ctx,this.data)},t.prototype.deleteAuthor=function(t,e){t.preventDefault(),t.stopPropagation(),this.data.authors.splice(e,1)},t.prototype.addAuthor=function(t){t.preventDefault(),t.stopPropagation(),this.data.authors.push(["",""])},t.prototype.returnIsbnConfig=function(t){console.log("---=== isbn ===---",this.data.isbn);var e=t;e=e.split("-"),this.isbnConfig=1==e[0].length?{length:13,pattern:"x-xxx-xxxxx-x",re:new RegExp("^(?:ISBN(?:-10)?:?●)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})[-●0-9X]{13}$)[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9X]$")}:{length:17,pattern:"9xx-x-xx-xxxxxx-x",re:new RegExp("^(?:ISBN(?:-13)?:?●)?(?=[0-9]{13}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)97[89][-●]?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9]$")}}}(),function(){function t(t,e,o,i,a){this.$scope=t,this.$http=e,this.$state=o,this.localStorageService=a,this.init()}angular.module("app").controller("EditBookCtrl",t),t.$inject=["$scope","$http","$state","$stateParams","localStorageService"],t.prototype.init=function(){this.book=angular.copy(this.localStorageService.get("editBook"))},t.prototype.saveBookCb=function(){console.log("---=== callback ===---");for(var t=this.localStorageService.get("bookList"),e=0;e<t.length;e+=1)this.book.id==t[e].id&&(t[e]=this.book);this.localStorageService.set("bookList",t),this.localStorageService.remove("editBook"),this.$state.go("main")}}(),function(){function t(t,e,o,i,a){this.$scope=t,this.$http=e,this.$state=o,this.localStorageService=a,this.init()}angular.module("app").controller("mainCtrl",t),t.$inject=["$scope","$http","$state","$stateParams","localStorageService"],t.prototype.init=function(){this.getBooks()},t.prototype.getBooks=function(){var t=this;this.localStorageService.get("bookList")||this.$http.get("./src/fixtures/books.json").then(function(e){for(var o=0;o<e.data.length;o+=1)e.data[o]._author=e.data[o].authors[0].s_name;t.localStorageService.set("bookList",e.data)})}}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiZmxvd0ZhY3RvcnlQcm92aWRlciIsImRlZmF1bHRzIiwidGFyZ2V0IiwicGVybWFuZW50RXJyb3JzIiwib24iLCJldmVudCIsImxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlciIsInNldFByZWZpeCIsInNldE5vdGlmeSIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwib3RoZXJ3aXNlIiwic3RhdGUiLCJ1cmwiLCJ2aWV3cyIsIiIsInRlbXBsYXRlVXJsIiwiYm9va3NMaXN0QG1haW4iLCJ0ZW1wbGF0ZSIsImVkaXRCb29rVmlldyIsImNyZWF0ZUJvb2tWaWV3IiwiYm9va3NMaXN0Q3RybCIsIiRzY29wZSIsIiRodHRwIiwiJHN0YXRlIiwiJHN0YXRlUGFyYW1zIiwibG9jYWxTdG9yYWdlU2VydmljZSIsInRoaXMiLCJib29rTGlzdCIsImdldCIsImZpbHRlcnMiLCJuYW1lIiwidHlwZSIsImluaXQiLCJjb250cm9sbGVyIiwiJGluamVjdCIsInByb3RvdHlwZSIsImdldFNvcnRDb25mRnJvbVN0b3JhZ2UiLCJzb3J0Q29uZiIsInJldmVyc2UiLCJzZXQiLCJzb3J0VHlwZSIsInNvcnRSZXZlcnNlIiwiZWRpdEJvb2siLCJlIiwiaXRlbSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZ28iLCJpZCIsImFkZEJvb2siLCJkZWxldGVCb29rIiwiYm9vayIsImkiLCJsZW5ndGgiLCJzcGxpY2UiLCJzb3J0Qm9va3MiLCJ1cGRhdGVGcm9tSnNvbiIsIl90aGlzIiwidGhlbiIsInJlc3AiLCJkYXRhIiwiX2F1dGhvciIsImF1dGhvcnMiLCJyZWxvYWQiLCJDcmVhdGVCb29rQ3RybCIsImNvcHkiLCJzYXZlQm9va0NiIiwibmV3Qm9vayIsImJvb2tzIiwicHVzaCIsImRyQm9va0VkaXRvckN0cmwiLCJzdGF0dXMiLCJkaXJlY3RpdmUiLCJkckJvb2tFZGl0b3JMaW5rIiwiJGVsZW1lbnQiLCIkYXR0cnMiLCIkdGltZW91dCIsImxpbmsiLCJyZXN0cmljdCIsInNjb3BlIiwiY29udHJvbGxlckFzIiwiYmluZFRvQ29udHJvbGxlciIsImN0eCIsIm1vZGUiLCJzYXZlQ2IiLCJwYWdlcyIsInB1Ymxpc2hpbmdfaG91c2UiLCJwdWJsaWNhdGlvbiIsImVkaXRpb24iLCJpc2JuIiwiaW1hZ2UiLCJyZXR1cm5Jc2JuQ29uZmlnIiwicHJvY2Vzc0ZpbGVzIiwiZmlsZXMiLCJmb3JFYWNoIiwiZmxvd0ZpbGUiLCJmaWxlUmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsInVyaSIsInJlc3VsdCIsIiRkaWdlc3QiLCJyZWFkQXNEYXRhVVJMIiwiZmlsZSIsInNhdmVDYXJkIiwiY29uc29sZSIsImxvZyIsImNhbGwiLCJkZWxldGVBdXRob3IiLCJpZHgiLCJhZGRBdXRob3IiLCJhcnIiLCJzcGxpdCIsImlzYm5Db25maWciLCJwYXR0ZXJuIiwicmUiLCJSZWdFeHAiLCJFZGl0Qm9va0N0cmwiLCJyZW1vdmUiLCJtYWluQ3RybCIsImdldEJvb2tzIl0sIm1hcHBpbmdzIjoiQUFBQSxjQUVBLFdBQ0NBLFFBQVFDLE9BQU8sT0FBUSxZQUFhLGFBQWMsYUFBYyxZQUFhLHFCQUFzQixZQUlwRyxXQUNDRCxRQUFRQyxPQUFPLE9BQU9DLFFBQVEsc0JBQXVCLFNBQVVDLEdBQzlEQSxFQUFvQkMsVUFDbkJDLE9BQVEsVUFDUkMsaUJBQWtCLElBQUssSUFBSyxNQUU3QkgsRUFBb0JJLEdBQUcsV0FBWSxTQUFVQyxZQUsvQyxXQUNDUixRQUFRQyxPQUFPLE9BQU9DLFFBQVEsOEJBQStCLFNBQVVPLEdBQ3RFQSxFQUE0QkMsVUFBVSxPQUFPQyxXQUFVLEdBQU0sU0FLL0QsV0FDQ1gsUUFBUUMsT0FBTyxPQUFPQyxRQUFRLGlCQUFrQixxQkFBc0IsU0FBVVUsRUFBZ0JDLEdBRy9GQSxFQUFtQkMsVUFBVSxLQUU3QkYsRUFBZUcsTUFBTSxRQUNwQkMsSUFBSyxJ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U3JGLFNBQVcsU0FBVSxRQUFTLFNBQVUsZUFBZ0IsdUJBV2pFcUYsRUFBU3BGLFVBQVVILEtBQU8sV0FDekJOLEtBQUs4RixZQUdORCxFQUFTcEYsVUFBVXFGLFNBQVcsV0FDN0IsR0FBSS9ELEdBQVEvQixJQUVQQSxNQUFLRCxvQkFBb0JHLElBQUksYUFDakNGLEtBQUtKLE1BQU1NLElBQUksNkJBQTZCOEIsS0FBSyxTQUFVQyxHQUMxRCxJQUFLLEdBQUlQLEdBQUksRUFBR0EsRUFBSU8sRUFBS0MsS0FBS1AsT0FBUUQsR0FBSyxFQUMxQ08sRUFBS0MsS0FBS1IsR0FBR1MsUUFBVUYsRUFBS0MsS0FBS1IsR0FBR1UsUUFBUSxHQUFXLE1BRXhETCxHQUFNaEMsb0JBQW9CYyxJQUFJLFdBQVlvQixFQUFLQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nQW5pbWF0ZScsICduZ01hdGVyaWFsJywgJ25nTWVzc2FnZXMnLCAndWkucm91dGVyJywgJ0xvY2FsU3RvcmFnZU1vZHVsZScsICdmbG93J10pO1xufSkoKTtcbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbmZpZyhbJ2Zsb3dGYWN0b3J5UHJvdmlkZXInLCBmdW5jdGlvbiAoZmxvd0ZhY3RvcnlQcm92aWRlcikge1xuXHRcdGZsb3dGYWN0b3J5UHJvdmlkZXIuZGVmYXVsdHMgPSB7XG5cdFx0XHR0YXJnZXQ6ICcvdXBsb2FkJyxcblx0XHRcdHBlcm1hbmVudEVycm9yczogWzQwNCwgNTAwLCA1MDFdXG5cdFx0fTtcblx0XHRmbG93RmFjdG9yeVByb3ZpZGVyLm9uKCdjYXRjaEFsbCcsIGZ1bmN0aW9uIChldmVudCkge30pO1xuXHR9XSk7XG59KSgpO1xuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29uZmlnKFtcImxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlclwiLCBmdW5jdGlvbiAobG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyKSB7XG5cdFx0bG9jYWxTdG9yYWdlU2VydmljZVByb3ZpZGVyLnNldFByZWZpeCgnYXBwJykuc2V0Tm90aWZ5KHRydWUsIHRydWUpO1xuXHR9XSk7XG59KSgpO1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb25maWcoW1wiJHN0YXRlUHJvdmlkZXJcIiwgXCIkdXJsUm91dGVyUHJvdmlkZXJcIiwgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblx0XHR2YXIgcGF0aFRvQ29tcG9uZW50cyA9ICcuL3NyYy9jb21wb25lbnRzLyc7XG5cblx0XHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbicsIHtcblx0XHRcdHVybDogJy8nLFxuXHRcdFx0dmlld3M6IHtcblx0XHRcdFx0XCJcIjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAnLi9idWlsZC90ZW1wbGF0ZXMvbWFpbi9pbmRleC5odG1sJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImJvb2tzTGlzdEBtYWluXCI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4vYnVpbGQvdGVtcGxhdGVzL2Jvb2tzTGlzdC9pbmRleC5odG1sJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkuc3RhdGUoJ21haW4uZWRpdCcsIHtcblx0XHRcdHVybDogJ2Jvb2svZWRpdC86aWQnLFxuXHRcdFx0dmlld3M6IHtcblx0XHRcdFx0XCJib29rc0xpc3RAbWFpblwiOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGU6ICcnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiZWRpdEJvb2tWaWV3XCI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4vYnVpbGQvdGVtcGxhdGVzL2VkaXRCb29rL2luZGV4Lmh0bWwnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5zdGF0ZSgnbWFpbi5jcmVhdGUnLCB7XG5cdFx0XHR1cmw6ICdib29rL2NyZWF0ZScsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcImJvb2tzTGlzdEBtYWluXCI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZTogJydcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjcmVhdGVCb29rVmlld1wiOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICcuL2J1aWxkL3RlbXBsYXRlcy9jcmVhdGVCb29rL2luZGV4Lmh0bWwnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5zdGF0ZSgnbWFpbi5mb3JtJywge1xuXHRcdFx0dXJsOiAnZm9ybScsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcImJvb2tzTGlzdEBtYWluXCI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZTogJydcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjcmVhdGVCb29rVmlld1wiOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICcuL2J1aWxkL3RlbXBsYXRlcy9mb3JtL2luZGV4Lmh0bWwnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fV0pO1xufSkoKTtcbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHt9KTtcbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdib29rc0xpc3RDdHJsJywgYm9va3NMaXN0Q3RybCk7XG5cblx0Ym9va3NMaXN0Q3RybC4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGh0dHAnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICdsb2NhbFN0b3JhZ2VTZXJ2aWNlJ107XG5cblx0ZnVuY3Rpb24gYm9va3NMaXN0Q3RybCgkc2NvcGUsICRodHRwLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgbG9jYWxTdG9yYWdlU2VydmljZSkge1xuXHRcdHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuXHRcdHRoaXMuJGh0dHAgPSAkaHR0cDtcblx0XHR0aGlzLiRzdGF0ZSA9ICRzdGF0ZTtcblx0XHR0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlO1xuXG5cdFx0dGhpcy5ib29rTGlzdCA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2Jvb2tMaXN0Jyk7XG5cblx0XHR0aGlzLmZpbHRlcnMgPSBbeyBuYW1lOiAn0J3QsNC30LLQsNC90LjRjicsIHR5cGU6ICduYW1lJyB9LCB7IG5hbWU6ICfQkNCy0YLQvtGA0YMnLCB0eXBlOiAnX2F1dGhvcicgfSwgeyBuYW1lOiAn0JTQsNGC0LUg0L/Rg9Cx0LvQuNC60LDRhtC40LgnLCB0eXBlOiAncHVibGljYXRpb24nIH0sIHsgbmFtZTogJ9Ca0L7Qu9C40YfQtdGB0YLQstGDINGB0YLRgNCw0L3QuNGGJywgdHlwZTogJ3BhZ2VzJyB9XTtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0Ym9va3NMaXN0Q3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLmdldFNvcnRDb25mRnJvbVN0b3JhZ2UoKTtcblx0fTtcblxuXHRib29rc0xpc3RDdHJsLnByb3RvdHlwZS5nZXRTb3J0Q29uZkZyb21TdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzb3J0Q29uZiA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3NvcnRDb25mJyk7XG5cdFx0aWYgKCFzb3J0Q29uZikge1xuXHRcdFx0c29ydENvbmYgPSB7IHR5cGU6ICduYW1lJywgcmV2ZXJzZTogZmFsc2UgfTtcblx0XHRcdHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3NvcnRDb25mJywgc29ydENvbmYpO1xuXHRcdH1cblx0XHR0aGlzLnNvcnRUeXBlID0gc29ydENvbmYudHlwZTtcblx0XHR0aGlzLnNvcnRSZXZlcnNlID0gc29ydENvbmYucmV2ZXJzZTtcblx0fTtcblxuXHRib29rc0xpc3RDdHJsLnByb3RvdHlwZS5lZGl0Qm9vayA9IGZ1bmN0aW9uIChlLCBpdGVtKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHR0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdlZGl0Qm9vaycsIGl0ZW0pO1xuXHRcdHRoaXMuJHN0YXRlLmdvKCdtYWluLmVkaXQnLCB7IGlkOiBpdGVtLmlkIH0pO1xuXHR9O1xuXG5cdGJvb2tzTGlzdEN0cmwucHJvdG90eXBlLmFkZEJvb2sgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0dGhpcy4kc3RhdGUuZ28oJ21haW4uY3JlYXRlJyk7XG5cdH07XG5cblx0Ym9va3NMaXN0Q3RybC5wcm90b3R5cGUuZGVsZXRlQm9vayA9IGZ1bmN0aW9uIChlLCBib29rKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYm9va0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGlmIChib29rLmlkID09PSB0aGlzLmJvb2tMaXN0W2ldLmlkKSB0aGlzLmJvb2tMaXN0LnNwbGljZShpLCAxKTtcblx0XHR9XG5cdFx0dGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnYm9va0xpc3QnLCB0aGlzLmJvb2tMaXN0KTtcblx0fTtcblxuXHRib29rc0xpc3RDdHJsLnByb3RvdHlwZS5zb3J0Qm9va3MgPSBmdW5jdGlvbiAoZSwgdHlwZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuc29ydFR5cGUgPT09IHR5cGUpIHtcblx0XHRcdHRoaXMuc29ydFJldmVyc2UgPSAhdGhpcy5zb3J0UmV2ZXJzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zb3J0UmV2ZXJzZSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5zb3J0VHlwZSA9IHR5cGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnc29ydENvbmYnLCB7IHR5cGU6IHRoaXMuc29ydFR5cGUsIHJldmVyc2U6IHRoaXMuc29ydFJldmVyc2UgfSk7XG5cdH07XG5cblx0Ym9va3NMaXN0Q3RybC5wcm90b3R5cGUudXBkYXRlRnJvbUpzb24gPSBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdHRoaXMuJGh0dHAuZ2V0KCcuL3NyYy9maXh0dXJlcy9ib29rcy5qc29uJykudGhlbihmdW5jdGlvbiAocmVzcCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZXNwLmRhdGEubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0cmVzcC5kYXRhW2ldLl9hdXRob3IgPSByZXNwLmRhdGFbaV0uYXV0aG9yc1swXVsnc19uYW1lJ107XG5cdFx0XHR9XG5cdFx0XHRfdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnYm9va0xpc3QnLCByZXNwLmRhdGEpO1xuXHRcdFx0X3RoaXMuJHN0YXRlLnJlbG9hZCgpO1xuXHRcdH0pO1xuXHR9O1xufSkoKTtcbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdDcmVhdGVCb29rQ3RybCcsIENyZWF0ZUJvb2tDdHJsKTtcblxuXHRDcmVhdGVCb29rQ3RybC4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGh0dHAnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICdsb2NhbFN0b3JhZ2VTZXJ2aWNlJ107XG5cblx0ZnVuY3Rpb24gQ3JlYXRlQm9va0N0cmwoJHNjb3BlLCAkaHR0cCwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsIGxvY2FsU3RvcmFnZVNlcnZpY2UpIHtcblx0XHR0aGlzLiRzY29wZSA9ICRzY29wZTtcblx0XHR0aGlzLiRodHRwID0gJGh0dHA7XG5cdFx0dGhpcy4kc3RhdGUgPSAkc3RhdGU7XG5cdFx0dGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlID0gbG9jYWxTdG9yYWdlU2VydmljZTtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0Q3JlYXRlQm9va0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5ib29rID0gYW5ndWxhci5jb3B5KHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2VkaXRCb29rJykpO1xuXHR9O1xuXG5cdENyZWF0ZUJvb2tDdHJsLnByb3RvdHlwZS5zYXZlQm9va0NiID0gZnVuY3Rpb24gKG5ld0Jvb2spIHtcblx0XHR2YXIgYm9va3MgPSB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdib29rTGlzdCcpO1xuXHRcdG5ld0Jvb2suaWQgPSAnXycgKyBib29rcy5sZW5ndGg7XG5cdFx0Ym9va3MucHVzaChuZXdCb29rKTtcblx0XHR0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdib29rTGlzdCcsIGJvb2tzKTtcblx0XHR0aGlzLiRzdGF0ZS5nbygnbWFpbicpO1xuXHR9O1xufSkoKTtcbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0ZHJCb29rRWRpdG9yQ3RybC4kaW5qZWN0ID0gW1wiJHNjb3BlXCJdO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignZHJCb29rRWRpdG9yQ3RybCcsIGRyQm9va0VkaXRvckN0cmwpO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5kaXJlY3RpdmUoJ2RyQm9va0VkaXRvcicsIGZ1bmN0aW9uICgpIHtcblx0XHRmdW5jdGlvbiBkckJvb2tFZGl0b3JMaW5rKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJHRpbWVvdXQpIHt9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bGluazogZHJCb29rRWRpdG9yTGluayxcblx0XHRcdHJlc3RyaWN0OiAnQUVDJyxcblx0XHRcdHNjb3BlOiB7fSxcblx0XHRcdHRlbXBsYXRlVXJsOiAnLi9idWlsZC90ZW1wbGF0ZXMvZHJCb29rRWRpdG9yL2RyQm9va0VkaXRvci5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6IGRyQm9va0VkaXRvckN0cmwsXG5cdFx0XHRjb250cm9sbGVyQXM6ICdia0VkdHInLFxuXHRcdFx0YmluZFRvQ29udHJvbGxlcjoge1xuXHRcdFx0XHRkYXRhOiAnPT8nLFxuXHRcdFx0XHRjdHg6ICc9Jyxcblx0XHRcdFx0bW9kZTogJ0A/Jyxcblx0XHRcdFx0c2F2ZUNiOiAnPT8nXG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZHJCb29rRWRpdG9yQ3RybCgkc2NvcGUpIHtcblx0XHR0aGlzLnN0YXR1cyA9ICdlZGl0Jztcblx0XHR0aGlzLiRzY29wZSA9ICRzY29wZTtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0ZHJCb29rRWRpdG9yQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMubW9kZSB8fCB0aGlzLm1vZGUgPT09ICdjcmVhdGUnKSB0aGlzLmRhdGEgPSB7XG5cdFx0XHRuYW1lOiBcIlwiLFxuXHRcdFx0YXV0aG9yczogW1tcIlwiLCBcIlwiXV0sXG5cdFx0XHRwYWdlczogXCJcIixcblx0XHRcdHB1Ymxpc2hpbmdfaG91c2U6IFwiXCIsXG5cdFx0XHRwdWJsaWNhdGlvbjogXCJcIixcblx0XHRcdGVkaXRpb246IFwiXCIsXG5cdFx0XHRpc2JuOiBcIlwiLFxuXHRcdFx0aW1hZ2U6IFwiXCJcblx0XHR9O1xuXG5cdFx0dGhpcy5yZXR1cm5Jc2JuQ29uZmlnKHRoaXMuZGF0YS5pc2JuKTtcblx0fTtcblxuXHRkckJvb2tFZGl0b3JDdHJsLnByb3RvdHlwZS5wcm9jZXNzRmlsZXMgPSBmdW5jdGlvbiAoZmlsZXMpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0YW5ndWxhci5mb3JFYWNoKGZpbGVzLCBmdW5jdGlvbiAoZmxvd0ZpbGUsIGkpIHtcblx0XHRcdHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZhciB1cmkgPSBldmVudC50YXJnZXQucmVzdWx0O1xuXHRcdFx0XHRfdGhpcy5kYXRhLmltYWdlID0gdXJpO1xuXHRcdFx0XHRfdGhpcy4kc2NvcGUuJGRpZ2VzdCgpO1xuXHRcdFx0fTtcblx0XHRcdGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmbG93RmlsZS5maWxlKTtcblx0XHR9KTtcblx0fTtcblxuXHRkckJvb2tFZGl0b3JDdHJsLnByb3RvdHlwZS5zYXZlQ2FyZCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRjb25zb2xlLmxvZygnLS0tPT09IHRoaXMuZGF0YSA9PT0tLS0nLCB0aGlzLmRhdGEpO1xuXG5cdFx0aWYgKCF0aGlzLm1vZGUgfHwgdGhpcy5tb2RlID09ICdjcmVhdGUnKSB7XG5cdFx0XHR0aGlzLnNhdmVDYi5jYWxsKHRoaXMuY3R4LCB0aGlzLmRhdGEpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNhdmVDYi5jYWxsKHRoaXMuY3R4KTtcblx0XHR9XG5cdH07XG5cblx0ZHJCb29rRWRpdG9yQ3RybC5wcm90b3R5cGUuZGVsZXRlQXV0aG9yID0gZnVuY3Rpb24gKGUsIGlkeCkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0dGhpcy5kYXRhLmF1dGhvcnMuc3BsaWNlKGlkeCwgMSk7XG5cdH07XG5cblx0ZHJCb29rRWRpdG9yQ3RybC5wcm90b3R5cGUuYWRkQXV0aG9yID0gZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdHRoaXMuZGF0YS5hdXRob3JzLnB1c2goW1wiXCIsIFwiXCJdKTtcblx0fTtcblxuXHRkckJvb2tFZGl0b3JDdHJsLnByb3RvdHlwZS5yZXR1cm5Jc2JuQ29uZmlnID0gZnVuY3Rpb24gKGlzYm4pIHtcblx0XHRjb25zb2xlLmxvZygnLS0tPT09IGlzYm4gPT09LS0tJywgdGhpcy5kYXRhLmlzYm4pO1xuXHRcdHZhciBhcnIgPSBpc2JuO1xuXHRcdGFyciA9IGFyci5zcGxpdCgnLScpO1xuXHRcdHRoaXMuaXNibkNvbmZpZyA9IGFyclswXS5sZW5ndGggPT0gMSA/IHtcblx0XHRcdGxlbmd0aDogMTMsXG5cdFx0XHRwYXR0ZXJuOiAneC14eHgteHh4eHgteCcsXG5cdFx0XHRyZTogbmV3IFJlZ0V4cCgnXig/OklTQk4oPzotMTApPzo/4pePKT8oPz1bMC05WF17MTB9JHwoPz0oPzpbMC05XStbLeKXj10pezN9KVst4pePMC05WF17MTN9JClbMC05XXsxLDV9Wy3il49dP1swLTldK1st4pePXT9bMC05XStbLeKXj10/WzAtOVhdJCcpXG5cdFx0fSA6IHtcblx0XHRcdGxlbmd0aDogMTcsXG5cdFx0XHRwYXR0ZXJuOiAnOXh4LXgteHgteHh4eHh4LXgnLFxuXHRcdFx0cmU6IG5ldyBSZWdFeHAoJ14oPzpJU0JOKD86LTEzKT86P+KXjyk/KD89WzAtOV17MTN9JHwoPz0oPzpbMC05XStbLeKXj10pezR9KVst4pePMC05XXsxN30kKTk3Wzg5XVst4pePXT9bMC05XXsxLDV9Wy3il49dP1swLTldK1st4pePXT9bMC05XStbLeKXj10/WzAtOV0kJylcblx0XHR9O1xuXHR9O1xufSkoKTtcbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdFZGl0Qm9va0N0cmwnLCBFZGl0Qm9va0N0cmwpO1xuXG5cdEVkaXRCb29rQ3RybC4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGh0dHAnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICdsb2NhbFN0b3JhZ2VTZXJ2aWNlJ107XG5cblx0ZnVuY3Rpb24gRWRpdEJvb2tDdHJsKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7XG5cdFx0dGhpcy4kc2NvcGUgPSAkc2NvcGU7XG5cdFx0dGhpcy4kaHR0cCA9ICRodHRwO1xuXHRcdHRoaXMuJHN0YXRlID0gJHN0YXRlO1xuXHRcdHRoaXMubG9jYWxTdG9yYWdlU2VydmljZSA9IGxvY2FsU3RvcmFnZVNlcnZpY2U7XG5cblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdEVkaXRCb29rQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLmJvb2sgPSBhbmd1bGFyLmNvcHkodGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnZWRpdEJvb2snKSk7XG5cdH07XG5cblx0RWRpdEJvb2tDdHJsLnByb3RvdHlwZS5zYXZlQm9va0NiID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCctLS09PT0gY2FsbGJhY2sgPT09LS0tJyk7XG5cblx0XHR2YXIgYm9va3MgPSB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdib29rTGlzdCcpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYm9va3MubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGlmICh0aGlzLmJvb2suaWQgPT0gYm9va3NbaV0uaWQpIHtcblx0XHRcdFx0Ym9va3NbaV0gPSB0aGlzLmJvb2s7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2Jvb2tMaXN0JywgYm9va3MpO1xuXHRcdHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoJ2VkaXRCb29rJyk7XG5cdFx0dGhpcy4kc3RhdGUuZ28oJ21haW4nKTtcblx0fTtcbn0pKCk7XG4ndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignbWFpbkN0cmwnLCBtYWluQ3RybCk7XG5cblx0bWFpbkN0cmwuJGluamVjdCA9IFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICckc3RhdGVQYXJhbXMnLCAnbG9jYWxTdG9yYWdlU2VydmljZSddO1xuXG5cdGZ1bmN0aW9uIG1haW5DdHJsKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7XG5cdFx0dGhpcy4kc2NvcGUgPSAkc2NvcGU7XG5cdFx0dGhpcy4kaHR0cCA9ICRodHRwO1xuXHRcdHRoaXMuJHN0YXRlID0gJHN0YXRlO1xuXHRcdHRoaXMubG9jYWxTdG9yYWdlU2VydmljZSA9IGxvY2FsU3RvcmFnZVNlcnZpY2U7XG5cblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdG1haW5DdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuZ2V0Qm9va3MoKTtcblx0fTtcblxuXHRtYWluQ3RybC5wcm90b3R5cGUuZ2V0Qm9va3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdGlmICghdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYm9va0xpc3QnKSkge1xuXHRcdFx0dGhpcy4kaHR0cC5nZXQoJy4vc3JjL2ZpeHR1cmVzL2Jvb2tzLmpzb24nKS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcC5kYXRhLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdFx0cmVzcC5kYXRhW2ldLl9hdXRob3IgPSByZXNwLmRhdGFbaV0uYXV0aG9yc1swXVsnc19uYW1lJ107XG5cdFx0XHRcdH1cblx0XHRcdFx0X3RoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2Jvb2tMaXN0JywgcmVzcC5kYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn0pKCk7Il19
