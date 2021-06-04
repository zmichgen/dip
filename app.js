// 'use strict';
var express = require('express');
var createError = require('http-errors');
var path = require('path');
const hbs = require('hbs');
const logger = require('morgan');
var indexRouter = require('./routes/index');
var resultsRouter = require('./routes/results');
const adminRouter = require('./routes/admin');
const bodyParser = require('body-parser');

hbs.registerHelper('inc', function (value, options) {
    return parseInt(value) + 1;
});

const livereload = require('livereload');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});
const connectLivereload = require('connect-livereload');

liveReloadServer.watch(path.join(__dirname, 'public'));

var app = express();
app.use(connectLivereload());

var port = 3333;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// main app routes
app.use('/', indexRouter);
app.use('/results', resultsRouter);
app.use('/admin', adminRouter);

// download help
app.get('/help', function (req, res) {
    res.download(__dirname + '/public/help/help.chm', 'help.chm');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port);
