/**
 * Created by atomic on 2/9/17.
 */
var destress = require('../destress.json');
var fs = require('fs');
var data = require('../data.json');

exports.view = function(req, res){
    res.render('destress', { link:'/destress', title: 'Destress', 'destress' : destress, 'data': data});
};

exports.add = function (req, res) {
    res.render('add_destress', { link:'/add_destress', title: 'Add Custom De-stress', 'destress' : destress});
};

exports.addDestress = function (req, res) {
     var title =         req.query["title"];
     var stress_level =  req.query["stress_level"];

     destress.custom.push( {"message" : title, "stress_reduce": stress_level} );

    fs.writeFile('destress.json', JSON.stringify(destress, null, '\t'), function (err) {
        if (err) throw err;
        console.log('New de-stress activity is saved!');
    });


    res.render('destress', { link:'/destress', title: 'Destress', 'destress' : destress});
};
