/**
 * Created by atomic on 2/16/17.
 */
var data = require('../data.json');
var hist = require('../history.json');
var destress = require('../destress.json');
var fs = require("fs");

exports.getActivities = function(req, res) {
    res.json(data.activities);
};

/**
 * server method to remove an activity given a json containing id for activity to delete
 *
 * @param req: { id: .... }
 * @param res:
 */
exports.removeActivity = function (req, res) {
    let safe = (req.body.safe == 'true');
    let deleted_activity = deleteActivity(req.body.id, safe );
    res.json(deleted_activity);
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

exports.doDestress = function (req, res) {

    let val = parseInt(req.body.value);
    let now = req.body.now;
    let time = req.body.time;
    let date = req.body.date;
    let minstress = false;

    data.total_stress = data.total_stress - val;
    if (data.total_stress < 0) {
        data.total_stress = 0;  // prevent negative stress value
        minstress = true;
    }


    fs.writeFile('data.json', JSON.stringify(data, null, '\t'), function (err) {
        if (err) throw err;
        console.log('Activity is saved!');
    });

    if (minstress) {
        res.json( {} );
        return;
    }


    let new_hist = { 'title': req.body.message,
        'date': date ,
        'time': time,
        'stress_level': -val,
        'total_stress': data.total_stress,
        'date_object': now
    };

    hist.push( new_hist );
    fs.writeFile('history.json', JSON.stringify(hist, null, '\t'), function (err) {
        if (err) throw err;
        console.log('history is saved!');
    });

    res.json(new_hist);
};

exports.storeName = function (req, res) {
    data.name = req.body.name;
    fs.writeFile('data.json', JSON.stringify(data, null, '\t'), function (err) {
        if (err) throw err;
    });
};

exports.getHistory = function (req, res) {
    res.json(hist);
};

/**
 *
 * @param id   : id of the activty that can be queried from json
 * @param safe : with safe option, stress will not increase upon deletion, if false, stress will increase
 *
 * return json of activity that was deleted
 */
function deleteActivity(id, safe) {
    let stress = parseInt(data.activities[id].stress_level);
    data.activities[id].total_stress = data.total_stress + stress;
    // data.activities[id].date_object = new Date(data.activities[id].date.replace(/-/g, "/") + ' ' + data.activities[id].time);
    hist.push( data.activities[id] );

    let tmp_activities = data.activities[id];
    delete data.activities[id];

    data.total_activities--;
    if (!safe) {
        data.total_stress = data.total_stress + stress;
    }

    fs.writeFile('data.json', JSON.stringify(data, null, '\t'), function (err) {
        if (err) throw err;
    });

    fs.writeFile('history.json', JSON.stringify(hist, null, '\t'), function (err) {
        if (err) throw err;
    });
    return tmp_activities;
}