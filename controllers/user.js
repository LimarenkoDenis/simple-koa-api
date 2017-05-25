const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = {

  async list (ctx) {
    const user = await User.find();
    ctx.body = user;
  },

  async detail (ctx) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
      ctx.throw(404, 'Invalid Report id');
    }
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, 'User not found');
    }
    ctx.body = user;
  },

  async create (ctx) {
    const user = await User.create(ctx.request.body);
    ctx.body = user;
    ctx.status = 201;
  },

  async update (ctx) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
      ctx.throw(404, 'Invalid Report id');
    }
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, 'User not found');
    }

    const updatedUser = await user.set(ctx.request.body).save();
    ctx.body = updatedUser;
  },

  async remove (ctx) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
      ctx.throw(404, 'Invalid Report id');
    }

    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, 'User not found');
    }
    user.remove();

    ctx.status = 200;
  }

}
