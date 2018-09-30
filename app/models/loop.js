// grab the mongoose module
var mongoose = require('mongoose');

// define our loops model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Loop', {
    name : {type : String, default: ''},
    distance : {type : String, default: ''},
    startPoint : {type : String, defaults: ''},
    endPoint : {type : String, defaults: ''}
});
