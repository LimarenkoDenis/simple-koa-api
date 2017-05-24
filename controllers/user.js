const User = require('../models/user');

module.exports = {
  * list() {
    this.body = yield User.find();
  }
}
