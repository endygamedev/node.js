var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

// Set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });

// Connect own library
var fortune = require('./lib/fortune.js');


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);


app.get('/', function(req, res) {
    res.render('home');
});


app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});


// Tests mocha.js chai.js
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});


// Custom 404 page
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});


// Custom 500 page
app.use(function(req, res) {
    console.error(err.stack);
    res.staus(500);
    res.render('500');
});


app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});