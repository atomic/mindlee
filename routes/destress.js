/**
 * Created by atomic on 2/9/17.
 */
var destress = require('../destress.json');

exports.view = function(req, res){
    res.render('destress', { link:'/destress', title: 'Destress', 'destress' : destress});
};
