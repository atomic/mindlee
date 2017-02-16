/**
 * Created by atomic on 2/16/17.
 */
var data = require('../data.json');

exports.getJSON = function(req, res) {
    // get a random palette from the top ones
    // var randomPalette = palettes[Math.floor(palettes.length * Math.random())];
    // res.send('Your random palette is called: ' + randomPalette['title']);
    res.json(data.activities);
};

exports.removeActivity = function (req, res) {

    // TODO: implement the deletion here

    res.json(data.activities);
};
