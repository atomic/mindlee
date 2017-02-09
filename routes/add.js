var data = require("../data.json");


exports.addSchedule = function (req, res) {
    res.render('unimplemented', data);
};

// TODO: remove this
exports.addFriend = function(req, res) { 
	// Your code goes here
    var n = req.query["name"];
    var d = req.query["description"];

    var newfriend = { "name": n, "description": d, imageURL: 'http://lorempixel.com/400/400/people'};
    data.friends.push(newfriend);
    res.render('index',data);
 };

