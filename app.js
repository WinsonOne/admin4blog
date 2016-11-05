var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var indexRoutes = require('./routes/index');
var loginRoutes = require('./routes/login');
var homeRoutes = require('./routes/home');

var settings = require('./settings');

// 生成一个express实例 app
var app = express();

// 设置模板引擎
app.engine('html', require('ejs').renderFile);
// 设置 views 文件夹为存放视图文件的目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// 加载 session 中间件
app.use(session({
  name : settings.session.key,
  secret : settings.session.secret,
  cookie : {
    maxAge : settings.session.maxAge
  },
  store : new MongoStore({
    url : settings.mongodb
  })
}));
// 加载 flash 中间件，用来显示通知
app.use(flash());
// 加载日志中间件
app.use(logger('dev'));
// 加载解析json的中间件
app.use(bodyParser.json());
// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 加载解析cookie的中间件
app.use(cookieParser());
// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

// 添加路由
app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/home', homeRoutes);

// 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
