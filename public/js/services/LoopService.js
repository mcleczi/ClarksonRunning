// probably won't use this one as we dont need to have an api...
angular.module('LoopService', []).factory('Loop', ['$http', function($http) {

    return {
        // call to get all loops
        get : function() {
            return $http.get('/api/loops');
        },

                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new loop
        create : function(loopData) {
            return $http.post('/api/loops', nerdData);
        },

        // call to DELETE a loop
        delete : function(id) {
            return $http.delete('/api/loops/' + id);
        }
    }

}]);
