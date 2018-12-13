// grab the loop model we just created
var Loop = require('./models/loop');
var request = require('request');

var handlers = require('../public/js/handlers.js');
var accessToken = "a6ad1955a732cd7f2c2cf56f016d0dcb31af5a2b"


   module.exports = function(app) {
     var engines = require('consolidate');

     app.set('views', __dirname + '/views');
     app.engine('html', engines.mustache);
     app.set('view engine', 'html');
       // server routes ===========================================================
       // handle things like api calls
       // authentication routes

       // sample api route
       app.get('/api/loops', function(req, res) {
           // use mongoose to get all loops in the database
           Loop.find(function(err, loops) {

               // if there is an error retrieving, send the error.
                               // nothing after res.send(err) will execute
               if (err)
                   res.send(err);

               res.json(loops); // return all loops in JSON format
           });
       });

       // route to handle creating goes here (app.post)
       // route to handle delete goes here (app.delete)

       // frontend routes =========================================================
       // route to handle all angular requests
       app.get('/test2/:id', function(req, res) {
         handlers.test2(req.params);
         res.sendfile('./public/views/home.html'); // load our public/index.html file
       });
       app.get('/test', handlers.test, function(req, res) {
           res.sendfile('./public/views/home.html'); // load our public/index.html file
       });


       app.get('/segments/:id', function(req, res) {
         handlers.getSegmentInfo(req.body.id);
         res.sendfile('./public/views/segments/index.html'); // load our public/index.html file
       });
       app.get('/segments', function(req, res) {
         var id = 0;
         if(req.query['id'])
           id = req.query['id'];

         if(req.query['token'] != "" && req.query['token'])
           accessToken = req.query['token'];

        var endpoint = "https://www.strava.com/api/v3/segments/" + id + "/all_efforts?page=1&per_page=30&access_token=" + accessToken


         request(endpoint, function (error, response, data) {
                //console.log(endpoint)
                //console.log(data)
                var d = JSON.parse(data)
                //console.log(d["message"])

                if (!d.hasOwnProperty('message') && d.length > 0){
                  d["message"] = "Success"
                res.render('./segments/index.html', {
                  message: d['message'],
                  name: d[0]['name'],
                  time: d[0]['elapsed_time'],
                  starttime: d[0]['start_date'],
                  distance: d[0]['distance'],
                  grade: d[0]['segment']['average_grade'],
                  city: d[0]['segment']['city'],
                  maxgrade: d[0]['segment']['maximum_grade'],
                  type: d[0]['segment']['activity_type']
                }); // load our public/index.html file
              }else
                res.render('./segments/index.html', {
                  message: d['message']
                });
              });
       });


       app.get('/races/:id', function(req, res) {
         handlers.getRaceInfo(req.body.id);
         res.sendfile('./public/views/races/index.html'); // load our public/index.html file
       });
       app.get('/races', function(req, res) {
         var races = handlers.getAllRaces(req.query);
         //res.send("this is a test")
         //res.sendfile('./public/views/races/index.html' , {name:'mike'}); // load our public/index.html file
         res.render('./races/index.html', {races:'races'})
      });


       app.get('/loops/:id', function(req, res) {
         handlers.getRouteInfo(req.params);
         res.sendfile('./public/views/loops/index.html'); // load our public/index.html file
       });
       app.get('/loops', function(req, res) {
         handlers.getRoutes(req.params);
         res.sendfile('./public/views/loops/index.html'); // load our public/index.html file
       });


       app.get('*', function(req, res) {
           res.sendfile('./public/views/index.html'); // load our public/index.html file
       });

   };
