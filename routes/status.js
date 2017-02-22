/**
 * Created by atomic on 2/9/17.
 */
var data = require('../data.json');

exports.view = function(req, res){
    res.render('status', { link:'/status', title: 'Status'});
};
