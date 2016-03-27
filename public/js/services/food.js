angular.module('foodService', [])

	// super simple service
	// each function returns a promise object
	.factory('Food', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/food');
			},
			create : function(foodData) {
        // postData = {};
        // postData.name = foodData.text;
        // postData.price = 0;
				return $http.post('/api/food', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/food/' + id);
			},
      total : function() {
        return $http.get('/api/total');
      }
		}
	}]);
