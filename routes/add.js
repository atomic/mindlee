var data = require("../data.json");

exports.add_view = function (req, res) {
    // res.render('add', { title   : 'Add Activity' ,
    //     is_edit: false,
    //     alternative: false,
    // });
    //
    res.redirect('/add_A'); // for Google Analytics
};

exports.edit_view = function (req, res) {
    res.render('add', {
        title   : 'Edit Activity',
        activity: data.activities[req.query.id],
        edit_id : req.query.id,
        is_edit : true,
        alternative: false
    });
};


// Used for A/B testing
exports.add_view_A = function (req, res) {
    res.render('add_A', { title   : 'Add Activity(A)' ,
        layout: false,
        is_edit: false,
        alternative: false,
    });
};

exports.add_view_B = function (req, res) {
    res.render('add_B', { title   : 'Add Activity(B)' ,
        layout: false,
        is_edit: false,
        alternative: true
    });
};
