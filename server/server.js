'use strict';
/*
require('babel-register')({
    presets: ['es2015']  //, 'react'
})
*/
var compression = require('compression');
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var http = require('http');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
//Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead
//http://mongoosejs.com/docs/promises.html
// Use native promises
mongoose.Promise = global.Promise;
    
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');


var app = express();
app.use(compression()); //enable gzip compressoin

var isDeveloping = process.env.NODE_ENV !== 'production';
//console.log("env",process.env.NODE_ENV, isDeveloping);

if(isDeveloping){
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true
  };  
  require('dotenv').config();

  var webpack = require('webpack');
  var webpackConfig =require('../webpack.config.js');
  //import webpack from 'webpack';  
  var webpackMiddleware =require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var compiler = webpack(webpackConfig);
  
  app.use(webpackMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
//      hot: true,
  }));
  
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
  
  // populate DB
  //require('./seed');
}// end isDeveloping



var config={
  mongo:{
    options:{
      db:{safe:true}
    },
    uri : process.env.MONGO_URI || 'mongodb://localhost/mediateca'
  },
  secret:'supers3cretpassw0rd.dont.tell,any1'
};

/// connect to db
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err){
  console.error("error connecting to the DB "+ err);
  process.exit(-1);
});

/////////////////

// middlewares
console.log(__dirname);
app.set('view engine', 'pug')
app.set('views', __dirname+'/../client/views')
app.locals.pretty = true // indent produces HTML for clarity

app.use(express.static(path.resolve(path.join(__dirname,".."), 'public'))); // this above session/cookie middlewares prevent create for static files
app.use(favicon(__dirname+'/../public/favicon.ico'));



app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({mongooseConnection: mongoose.connection, db: 'mediateca'})
}));



//form process
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride());

// request logger
app.use(morgan('dev'));


/// passport
app.use(passport.initialize());
app.use(passport.session());

////////////////************* end passport


///////////// routes


//// CORS
/*
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        return res.end();
    }
    next();
});
*/

// api 

  app.use('/api/media', require('./api/media'));
  app.use('/api/user', require('./api/user'));
  app.use('/auth', require('./api/auth').router);

/*
// all undefined asset or api routes should return 404 (from yeoman code)
app.route('/:url(api|auth|components)/*').get(function(req,res){
  console.log("herer url regex");
  return res.status(404).json({status:404});
});

*/

//all others resources should redirect to the index.html


app.route('*').get(function(req,res){


//app.get('/*',function(req,res){
  res.render('index');
});



/*
app.use(function(req, res){
   res.sendStatus(404);
});
*/

var server = http.createServer(app);
//var io = require('socket.io')(server);

server.listen(""+process.env.PORT || "3000", process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});

