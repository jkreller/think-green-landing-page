require('dotenv').config({path: __dirname + '/.env'});

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const minify = require('express-minify');

const indexRouter = require('./routes/index');
const database = require('./database');
const cronjobs = require('./cronjobs');

const app = express();

app.set('trust proxy', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());
app.use(minify({cache: path.join(__dirname, 'minify-cache')}));
// Set maxAge for cache to one year
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31536000000}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {status: err.status};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
