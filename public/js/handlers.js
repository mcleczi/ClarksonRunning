var StravaApiV3 = require('strava-v3');
var http = require('http');
var request = require('request');
//var defaultClient = StravaApiV3.ApiClient.instance;

// Configure OAuth2 access token for authorization: strava_oauth
//var strava_oauth = defaultClient.authentications['strava_oauth'];

var accessToken = "a6ad1955a732cd7f2c2cf56f016d0dcb31af5a2b"



var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};



module.exports = {

  test: function(req, res){
    console.log("hey it worked");
  },
  test2: function(params){
    console.log("it worked b");

    console.log("id is: " + params['id']);
  },


  getRoutes: function(params){



  },
  getRouteInfo: function(params){



  },
  getSegmentInfo: function(params){

    var id = 0;
    if(params['id'])
      id = params['id'];

    console.log(params);

    var endpoint = "https://www.strava.com/api/v3/segments/" + id + "/page=1&per_page=30&access_token=" + accessToken

    var sendback
    request(endpoint, function (error, response, data) {
      console.log(endpoint)
      console.log(data)
      sendback = data;
    });

    return sendback
  },
  getSegmentLeaderboard: function(params){

      var id = 0;
      if(params['id'])
        id = params['id'];

      console.log(params);

      //var id = params['zip'];
      //var endpoint = "https://www.strava.com/api/v3/segments/" + id + "/all_efforts?access_token=" + accessToken
      var endpoint = "https://www.strava.com/api/v3/segments/" + id + "/all_efforts?page=1&per_page=30&access_token=" + accessToken


      var sendback = "";

    //   function parse( sendback , callback ){
    //     sendback = sendback || "Init value";;
    //
    //     var d = request(endpoint, function (error, response, data) {
    //       console.log(endpoint)
    //       console.log(data)
    //       return callback( data )
    //     });
    //     console.log("sendback: " + sendback)
    //     return sendback;
    // }

    function getRoutes(callback){
        request(endpoint, function(error, response, body) {
            if (!error) {
                result = JSON.stringify(JSON.parse(body));
                console.log(result)
                return callback(result, false);
            } else {
                return callback(null, error);;
            }
        });
    }

    var test = getRoutes(function(err, data){
        console.log("data: " + err)
        if(err) return err;
        return data;
    });

    console.log("test: " + test)

  },
  getAllRaces: function(params){


  },
  getRaceInfo: function(params){


  }


};
