const Router = require('koa-router');
const router = new Router();

router.use(require('./user'));

module.exports = router;
