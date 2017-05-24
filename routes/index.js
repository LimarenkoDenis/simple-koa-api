const Router = require('koa-router');

const router = module.exports = new Router();

const controller = require('./../controllers/user');

router.get('/', controller.get);
