/**
 * Created by atomic on 2/14/17.
 */
var data = require("../data.json");
var fs = require('fs');


exports.addActivity = function (req, res) {

    //
    var total        = parseInt(data.total_activities);
    var next_id      = parseInt(data.next_activity_id);
    var total_stress = parseInt(data.total_stress);

    var title =         req.query["title"];
    var date =          req.query["date"];
    var time =          req.query["time"];
    var stress_level =  req.query["stress_level"];

    // the date object from the activity
    var date_obj      =   new Date(date.replace(/-/g, "/") + ' ' + time);

    let now = new Date();

    var newact = { "title": title, "date": date, "time": time, "stress_level": stress_level, "date_object": date_obj};

    data.activities[ data.next_activity_id ] = newact;

    data.total_activities++;
    data.next_activity_id++;
    // data.total_stress = total_stress + parseInt(stress_level);

    // console.log(data.activities);
    // fs.writeFile('../data.json', JSON.stringify(data), function (err) {
    //     if(err) throw err;
    // });

    fs.writeFile('data.json', JSON.stringify(data, null, '\t'), function (err) {
        if (err) throw err;
        console.log('Activity is saved!');
    });


    res.render('schedule', {title: 'Schedule', 'data' : data} );
};

exports.editActivity = function (req, res) {

    var title =         req.query["title"];
    var date =          req.query["date"];
    var time =          req.query["time"];
    var stress_level =  req.query["stress_level"];

    // the date object from the activity
    var date_obj      =   new Date(date.replace(/-/g, "/") + ' ' + time);

    let now = new Date();

    var newact = { "title": title, "date": date, "time": time, "stress_level": stress_level, "date_object": date_obj};

    // data.activities[ data.next_activity_id ] = newact;
    // data.activities[ id] TODO: finish this

    // data.total_activities++;
    // data.next_activity_id++;
    fs.writeFile('data.json', JSON.stringify(data, null, '\t'), function (err) {
        if (err) throw err;
        console.log('Activity is saved!');
    });


    res.render('schedule', {title: 'Schedule', 'data' : data} );
};
