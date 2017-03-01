/**
 * Created by atomic on 2/16/17.
 */
var data = require('../data.json');
var hist = require('../history.json');
var fs = require("fs");

exports.getJSON = function(req, res) {
    // get a random palette from the top ones
    // var randomPalette = palettes[Math.floor(palettes.length * Math.random())];
    // res.send('Your random palette is called: ' + randomPalette['title']);
    res.json(data.activities);
};

exports.removeActivity = function (req, res) {

    deleteActivity(req.body.id);
    res.json(data.activities);
};

exports.checkActivity = function (req, res) {

    let now = new Date();
    let deleted = false;
    for (let act_id in data.activities) {
        let x = new Date(data.activities[act_id].date_object);
        let diff = new Date(now - x);
        // console.log('now: ' + now.toDateString() + 'x: ' + x.toDateString());
        // console.log('diff: ' + diff.getTime());
        // console.log('minutes difference : ' + diff.getMinutes());
        if(diff.getTime() > 0) {
            deleteActivity(act_id);
            deleted = true;
        }
    }
    res.send(deleted);
};

exports.getHistory = function (req, res) {
    res.json(hist);
};

function deleteActivity(id) {
    let stress = data.activities[id].stress_level;
    // let title = data.activities[id].title;
    // let date   = new Date(data.activities[id].date_object);
    hist.push( data.activities[id] );

    delete data.activities[id];

    data.total_activities--;
    data.total_stress = data.total_stress - stress;

    console.log('(server) id to delete : ' + id);

    fs.writeFile('data.json', JSON.stringify(data, null, '\t'), function (err) {
        if (err) throw err;
        console.log('Activity is saved!');
    });

    fs.writeFile('history.json', JSON.stringify(hist, null, '\t'), function (err) {
        if (err) throw err;
        console.log('Activity is saved!');
    });
}