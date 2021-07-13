/* eslint-disable global-require */
// Module dependencies.
const express = require('express');
const http = require('http');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const mongoUtil = require('./dbconnection');


const app = express();


// All environments
app.set('port', 1666);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.cookieParser('61d333a8-6325-4506-96e7-a180035cc26f'));
app.use(
  session({
    secret: 'forkpoint training',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);


app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.use(express.errorHandler());

const routes = {
  index: require('./routes/index'),
  gender: require('./routes/gender'),
  category: require('./routes/category')
};

// App routes
app.get('/', routes.index);
app.get('/:gender', routes.gender);
app.get('/:gender/:category', routes.category);

// Database connection
mongoUtil.connectToServer((err) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err);

  app.locals.db = mongoUtil.getDb();
});

// Run server
http.createServer(app).listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${app.get('port')}`);
});
