/**
 * Created by atomic on 2/9/17.
 */
var hist = require('../history.json');

exports.view = function(req, res){
    res.render('status', { link:'/status', title: 'Status', 'hist': hist});
};
