/**
 * Created by atomic on 2/14/17.
 */
var data = require("../data.json");
var fs = require('fs');


exports.addActivity = function (req, res) {

    //
    var total = parseInt(data.total_activities);

    var title =         req.query["title"];
    var date =          req.query["date"];
    var time =          req.query["time"];
    var stress_level =  req.query["stress_level"];

    var newact = { "title": title, "date": date, "time": time, "stress_level": stress_level};

    data.activities[total.toString()] = newact;

    data.total_activities = total + 1;

    // console.log(data.activities);
    // fs.writeFile('../data.json', JSON.stringify(data), function (err) {
    //     if(err) throw err;
    // });

    res.render('schedule', {title: 'Schedule', 'data' : data} );
};
