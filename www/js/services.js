angular.module('marvelComics.services', ['ngResource'])

.factory('Character', function($http,$q){
	var publicKey = 'b85f8070be78df52843c949aa0317d6b'
	var privateKey = 'd290ad294284c981ee3413577a3f960e0385350c'
	var baseUrl = 'http://gateway.marvel.com/v1/';
        var limit = 50;
	//var date = new Date().getTime();
	//var toHash = date+privateKey+publicKey;
	//var hash = md5.createHash(toHash);

	// Para el hash md5(ts+privateKey+publicKey)	
	var momentHash = '494bbae6ae425fc2b51840e400edfdcc';
	var momentTs = '1433870299';
	console.log(momentHash);


   	var findByQuery = function(queryText){
		var def = $q.defer();
		var url = baseUrl + 'public/characters?name=' + queryText + '&ts='+ momentTs + '&apikey='+ publicKey + '&hash='+ momentHash;

	console.log('the url is '+ url);        

	$http.get(url).success(def.resolve).error(def.reject);
	return def.promise;
	
	};


   	var comicsByID = function(characterId){
		var def = $q.defer();
		var url = baseUrl + 'public/characters/' + characterId + '/comics?limit=50&ts='+ momentTs + '&apikey='+ publicKey + '&hash='+ momentHash;

	console.log('the url is '+ url);        

	$http.get(url).success(def.resolve).error(def.reject);
	return def.promise;
	
	};


	var comicByID = function(comicId){
		var def = $q.defer();
		var url = baseUrl + 'public/comics/' + comicId + '?&ts='+ momentTs + '&apikey='+ publicKey + '&hash='+ momentHash;

	console.log('the url is '+ url);        

	$http.get(url).success(def.resolve).error(def.reject);
	return def.promise;
	
	};


	return {findByQuery: findByQuery,
			comicsByID: comicsByID, 
			comicByID: comicByID};
})
