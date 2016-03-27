angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Food', function($scope, $http, Food) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.total = 0;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Food.get()
		  .success(function(data){
				console.log("Success?");
				console.log(data);
				$scope.food = data;
				$scope.loading = false;
				calculateTotalPrice();
			});


			var calculateTotalPrice = function() {
				Food.total()
				.success(function(totalPrice) {
					console.log("Recalculate the total price");
					$scope.total = totalPrice;
				});
			}

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			// if ($scope.formData.text != undefined) {

			/*
			formData = {
			name: "xxxx in the input",
			price: 'some integer'
		}
			*/
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Food.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.food = data; // assign our new list of todos
					});
			}
			calculateTotalPrice();
		};

		// DELETE ==================================================================
		// delete a todo after checking it

		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Food.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.food = data; // assign our new list of todos
				});
			calculateTotalPrice();
		};
		// Total ==================================================================
		// delete a todo after checking it
		// $scope.total = function(){
		// 	$scope.loading = true;
    //    Food.total()
		// 	  .success(function(data){
		// 			$scope.loading = false;
		// 			$scope.total = data;
		// 		});
		// };



	}]);
