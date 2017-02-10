/**
 * Created by atomic on 2/9/17.
 */
// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
    // console.log(data);
    res.render('home', {title: 'Home'} );
};


