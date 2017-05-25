const Router = require('koa-router');
const router = module.exports = new Router({ prefix: '/users' });

// const controller = require('./../controllers/user');

const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', async (ctx, next) => {
  const user = await User.find();
  ctx.body = user;
});

router.get('/:id', async (ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(422, 'Invalid Report id');
  }
  const user = await User.findById(ctx.params.id);
  if (!user) {
    ctx.throw(404, 'User not found');
  }
  ctx.body = user;
});

router.post('/', async (ctx, next) => {
  if (ctx.errors) {
    this.throw(422, 'Invalid params');
  }
  console.log(ctx.request.body)
  // ctx.body = 'ok';
  ctx.body = await User.create(ctx.request.body);
  ctx.status = 201;
});

