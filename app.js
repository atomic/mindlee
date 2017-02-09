
/**
 * Module dependencies.
 */

var express    = require('express');
var http       = require('http');
var path       = require('path');
var handlebars = require('express3-handlebars');

// Define all the views here
var index = require('./routes/index');

var unimplemented = require('./routes/unimplemented');
// Screens
var home            = require('./routes/home'            ); // home screen with stress level bar
// var schedule        = require('./routes/schedule'        ); // schedule page with a lot of schedules
// var add             = require('./routes/add'             ); // add activity and stress page
// var stats           = require('./routes/stats'           ); // shows weekly status
// var help            = require('./routes/help'            ); // show help and faq about the app
// var contact         = require('./routes/contact'         ); // contact us form
// var contact_confirm = require('./routes/contact_confirm' ); // confirmation of contact
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port'          , process.env.PORT || 3000);
app.set('views'         , path.join(__dirname        , 'views'));
app.engine('handlebars' , handlebars());
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/'                , home.view);
app.get('/add'             , unimplemented.view);
app.get('/schedule'        , unimplemented.view);
app.get('/stats'           , unimplemented.view);
app.get('/contact'         , unimplemented.view);
app.get('/contact_confirm' , unimplemented.view);
app.get('/contact'         , unimplemented.view);
app.get('/contact'         , unimplemented.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
