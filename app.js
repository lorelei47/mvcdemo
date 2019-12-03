var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MonitorMain = require('./compoent/MonitorMain');
var ServerInfo = require('./compoent/ServerInfo');
var MailOptions = require('./compoent/MailOptions');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var errorOptions1 = new MailOptions('948866419@qq.com', '1003395207@qq.com', '工程1', '工程1挂掉了,请尽快修复');
var restartOptions1 = new MailOptions('948866419@qq.com', '1003395207@qq.com', '工程1', '工程1已恢复');
var options1 = new ServerInfo(true, 'localhost', '2026', '/', 'GET');
var errorOptions2 = new MailOptions('948866419@qq.com', '1003395207@qq.com', '工程2', '工程2挂掉了,请尽快修复');
var restartOptions2 = new MailOptions('948866419@qq.com', '1003395207@qq.com', '工程2', '工程2已恢复');
var options2 = new ServerInfo(true, 'localhost', '2025', '/', 'GET');

var ay = [{options:options1,restartOptions:restartOptions1,errorOptions:errorOptions1},{options:options2,restartOptions:restartOptions2,errorOptions:errorOptions2}]

//监听
setInterval(function(){
  ay.forEach(function(item){
    new MonitorMain(item.options, item.restartOptions, item.errorOptions);
  })
},10000);


module.exports = app;
