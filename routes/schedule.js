// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
    res.render('schedule', {title: 'Schedule', data} );
};
