var data = require("../data.json");

exports.add_view = function (req, res) {
    console.log(req.body);
    res.render('add', { title   : 'Add Activity' ,
        is_edit: false
    });
};

exports.edit_view = function (req, res) {
    res.render('add', {
        title   : 'Edit Activity',
        activity: data.activities[req.query.id],
        edit_id : req.query.id,
        is_edit : true
    });
};
