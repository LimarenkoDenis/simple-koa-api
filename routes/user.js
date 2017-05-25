const Router = require('koa-router');
const router = new Router();

const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', async (ctx, next) => {
  const user = await User.find();
  ctx.body = user;
});

router.get('/:id', async (ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(404, 'Invalid Report id');
  }
  const user = await User.findById(ctx.params.id);
  if (!user) {
    ctx.throw(404, 'User not found');
  }
  ctx.body = user;
});

router.post('/', async (ctx, next) => {
  // console.log(ctx)
  // fix
  const user = await User.create(ctx.request.body);
  ctx.body = user;
  ctx.status = 201;
});

router.put('/:id', async (ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(404, 'Invalid Report id');
  }
  const user = await User.findById(ctx.params.id);
  if (!user) {
    ctx.throw(404, 'User not found');
  }

  const updatedUser = await user.set(ctx.request.body).save();
  ctx.body = updatedUser;
});

router.del('/:id', async (ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(404, 'Invalid Report id');
  }

  const user = await User.findById(ctx.params.id);
  if (!user) {
    ctx.throw(404, 'User not found');
  }
  user.remove();

  ctx.status = 200;
});


// router.post('/users/login', ctrl.login)
// router.post('/users', ctrl.post)

// router.get('/user', auth, ctrl.get)
// router.put('/user', auth, ctrl.put)

module.exports = router.routes();
