const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./src/views/login.html');
})

router.post('/custom', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user === false) {
      ctx.body = { success: false };
      ctx.throw(401);
    } else {
      ctx.body = { success: true };
      return ctx.login(user)
    }
  })(ctx)
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)

router.get('/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
})

router.get('/app', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/views/app.html');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
})

module.exports = router;
