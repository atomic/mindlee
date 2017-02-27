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


    let stress = data.activities[req.body.id].stress_level;
    delete data.activities[req.body.id];

    data.total_activities--;
    data.total_stress = data.total_stress - stress;

    console.log('(server) id to delete : ' + req.body.id);
    res.json(data.activities);
};
