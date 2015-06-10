angular.module('marvelComics.controllers',['marvelComics.services'])

	.controller('ComicSearchCtrl', function($scope, Character){

		$scope.showresultCard = false;
		$scope.showloadingCard = false;
		$scope.shownoResultCard = false;
		$scope.searchText = "";
		var data = null;

		$scope.clearTheSearch = function(){

			$scope.searchText = "";
			$scope.heroName = "";
			$scope.heroImg = "";
			$scope.attributionText = "";
			$scope.cId = ""; 

			$scope.showresultCard = false;
			$scope.showloadingCard = false;
			$scope.shownoResultCard = false;

			data = null;

		}

		$scope.search = function(){
			//$scope.comics = Comics.findByQuery($scope.searchText);
			$scope.showloadingCard = true;
			$scope.showresultCard = false;
			$scope.shownoResultCard = false;

			$scope.heroName = "";
			$scope.heroImg = "";
			$scope.attributionText = "";
			$scope.cId = ""; 
			data = null;

			if ($scope.searchText.length > 0){
				Character.findByQuery($scope.searchText).then(function(result){

					data = result.data.results[0];

					if (data == null || data == ""){

						$scope.showloadingCard = false;
						$scope.shownoResultCard = true;

					}else{

						$scope.showloadingCard = false;
						$scope.shownoResultCard = false;
						$scope.showresultCard = true;

						$scope.heroName = data.name;
						$scope.heroImg = data.thumbnail.path+'.'+data.thumbnail.extension;
						$scope.attributionText = result.attributionText;
						$scope.cId = data.id; 

						var desc = data.description;

						if(desc.length <=0){
							desc = "No description for this character >:C";
						}

						$scope.heroDescription = desc;

						console.log('El nombre es: '+ data.name);
						console.log('Descripcion: '+ data.description);

						
					}
				});
			}else{
				$scope.showloadingCard = false;
				$scope.shownoResultCard = true;
			}	
		}
	})

       .controller('ComicListCtrl', function($scope, $stateParams, Character){

	var characterId = $stateParams.characterID; 
	var characterName = $stateParams.characterName;
	
	console.log("el id del personaje es: "+characterId);
	
	$scope.heroName = characterName; 

       	Character.comicsByID(characterId).then(function(result){
				var data = result.data.results;
				$scope.comics = data;
				console.log(data);
			});

	})


       .controller('ComicDetailCtrl', function($scope, $stateParams, Character){

			var comicId = $stateParams.comicID;
	
			console.log("el id del personaje es: "+ comicId);

			$scope.showloadingCard = true;
			$scope.showresultCard = false;
	 
       			Character.comicByID(comicId).then(function(result){

					var data = result.data.results[0];
				
					$scope.showloadingCard = false;
					$scope.showresultCard = true;
					
					$scope.comicTitle = data.title;
					$scope.diamondCode = data.diamondCode
					$scope.comicImg = data.thumbnail.path+'.'+data.thumbnail.extension;
					$scope.comicDesc = data.description; 
				
					console.log(data);
				});
		});
