/**
 * Created by atomic on 2/16/17.
 */
var data = require('../data.json');
var hist = require('../history.json');
var destress = require('../destress.json');
var fs = require("fs");

exports.getJSON = function(req, res) {
    // get a random palette from the top ones
    // var randomPalette = palettes[Math.floor(palettes.length * Math.random())];
    // res.send('Your random palette is called: ' + randomPalette['title']);
    res.json(data.activities);
};

exports.removeActivity = function (req, res) {

    deleteActivity(req.body.id, true);
    res.json(data.activities);
};


exports.checkActivity = function (req, res) {

    let now = new Date();
    let deleted = false;
    for (let act_id in data.activities) {
        let x = new Date(data.activities[act_id].date_object);
        let diff = new Date(now - x);
        console.log('now: ' + now + ', x: ' + x);
        console.log('diff: ' + diff.getTime());
        console.log('minutes difference : ' + diff.getMinutes());
        if(diff.getTime() > 0) {
            deleteActivity(act_id, false);
            deleted = true;
        }
    }
    res.send(deleted);
};

exports.removeDestress = function (req, res) {
    console.log('message : ' + req.body.message);
    destress.custom = destress.custom.filter(function(e){
        return e.message != req.body.message;
    });
    fs.writeFile('destress.json', JSON.stringify(destress, null, '\t'), function (err) {
        if (err) throw err;
        console.log('destress activity: [' + req.body.message + ']  is saved!');
    });
    res.json(destress);
};

exports.getHistory = function (req, res) {
    res.json(hist);
};

/**
 *
 * @param id   : id of the activty that can be queried from json
 * @param safe : with safe option, stress will not increase upon deletion, if false, stress will increase
 */
function deleteActivity(id, safe) {
    let stress = parseInt(data.activities[id].stress_level);
    data.activities[id].total_stress = data.total_stress + stress;
    hist.push( data.activities[id] );

    delete data.activities[id];

    data.total_activities--;
    if (!safe) {
        data.total_stress = data.total_stress + stress;
    }

    console.log('(server) id to delete : ' + id);

    fs.writeFile('data.json', JSON.stringify(data, null, '\t'), function (err) {
        if (err) throw err;
        console.log('Activity is saved!');
    });

    fs.writefile('history.json', JSON.stringify(hist, null, '\t'), function (err) {
        if (err) throw err;
        console.log('activity is saved!');
    });
}