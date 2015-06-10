// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic'])

angular.module('marvelComics', ['ionic', 'marvelComics.controllers', 'marvelComics.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function ($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('search', {
			url:'/search',
			templateUrl: 'templates/comic-search.html',
			controller: 'ComicSearchCtrl'
		})

		.state('comics',{
			url:'/comics/:characterID/:characterName',
			templateUrl:'templates/comic-list.html',
			controller: 'ComicListCtrl'
		})



		.state('comicDetail',{
			url:'/comicDetail/:comicID',
			templateUrl: 'templates/comic-detail.html',
			controller: 'ComicDetailCtrl'
		});

	$urlRouterProvider.otherwise('/search');

});

