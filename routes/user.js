const Router = require('koa-router');
const router = new Router({prefix: '/users'});

const ctrl = require('./../controllers/user');

router.get('/', ctrl.list);
router.get('/:id', ctrl.detail);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.del('/:id', ctrl.remove);

module.exports = router.routes();
