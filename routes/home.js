/**
 * Created by atomic on 2/9/17.
 */
// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
    // console.log(data);
    var stres_warning_level = nextStressLevel(data.total_stress);
    var advices = data.advices;
    message = null;
    for (var i in advices) {
        if (advices[i].priority <= stres_warning_level) {
            message = advices[i].message;
        }
    }
    res.render('home', {title: 'Home', 'data': data, 'message' : message} );
};


function nextStressLevel(n) {
    return n + (10 - n % 10);
}
