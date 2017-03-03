
/**
 * Module dependencies.
 */

var express    = require('express');
var http       = require('http');
var path       = require('path');
var handlebars = require('express3-handlebars');
var bodyParser = require('body-parser');

// Define all the views here
var unimplemented = require('./routes/unimplemented');
// Screens
var login           = require('./routes/login'            ); // Login Screen
var home            = require('./routes/home'            ); // home screen with stress level bar
var schedule        = require('./routes/schedule'        ); // schedule page with a lot of schedules
var add             = require('./routes/add'             ); // add activity and stress page
var activity        = require('./routes/activity'    ); // add act
var status          = require('./routes/status'           ); // shows weekly status
var contact         = require('./routes/contact'         ); // contact us form
var help            = require('./routes/help'            ); // show help and faq about the app
var contact_confirm = require('./routes/contact_confirm' ); // confirmation of contact
var activities_json = require('./routes/activities_json');  // for ajax request data
var destress        = require('./routes/destress');
var thanks          = require('./routes/thanks');           //Thank You Page after contact

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port'          , process.env.PORT || 3000);
app.set('views'         , path.join(__dirname        , 'views'));
app.engine('handlebars' , handlebars({

    defaultLayout: __dirname + '/views/layouts/default.handlebars',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    helpers: {
        choose: function (val, backup) { return val ? val : backup; },
        ifCond: function (v1, operator, v2, options) {
                    switch (operator) {
                        case '==':
                            return (v1 == v2) ? options.fn(this) : options.inverse(this);
                        case '===':
                            return (v1 === v2) ? options.fn(this) : options.inverse(this);
                        case '!=':
                            return (v1 != v2) ? options.fn(this) : options.inverse(this);
                        case '!==':
                            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                        case '<':
                            return (v1 < v2) ? options.fn(this) : options.inverse(this);
                        case '<=':
                            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                        case '>':
                            return (v1 > v2) ? options.fn(this) : options.inverse(this);
                        case '>=':
                            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                        case '&&':
                            return (v1 && v2) ? options.fn(this) : options.inverse(this);
                        case '||':
                            return (v1 || v2) ? options.fn(this) : options.inverse(this);
                        default:
                            return options.inverse(this);
                    }
        }
    }
}));
app.set('view engine'   , 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false}));
//parse application/json
// app.use(bodyParser.json());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Add routes here
var jsonParser = bodyParser.json();

app.get('/'                , login.view);
app.get('/home'            , home.view);
app.get('/add'             , jsonParser, add.add_view);
app.get('/edit'            , jsonParser, add.edit_view);

app.get('/add_activity'    , jsonParser, activity.addActivity);
app.get('/edit_activity'    , jsonParser, activity.editActivity);
app.get('/thanks'          , thanks.view    );

app.post('/delete_activity' , jsonParser, activities_json.removeActivity);
app.post('/check_activity'  , jsonParser, activities_json.checkActivity);
app.get( '/get_history'     , jsonParser, activities_json.getHistory);
app.post('/delete_destress_activity' , jsonParser, activities_json.removeDestress);
app.post('/do_destress'     , jsonParser, activities_json.doDestress);

app.get('/schedule'        , schedule.view);
app.get('/status'           , status.view);
app.get('/contact'         , contact.view);
app.get('/faq'             , help.view);
app.get('/help'             , help.view);
app.get('/contact_confirm' , unimplemented.view);
app.get('/error'            , unimplemented.view);

app.get('/destress'             , destress.view);
app.get('/add_destress'         , destress.add);
app.get('/add_destress_activity', destress.addDestress);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
