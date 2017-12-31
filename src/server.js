const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const mainRoutes = require('./routes');

const app = new Koa();
const PORT = process.env.PORT || 3000;

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(mainRoutes.routes());

// server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
