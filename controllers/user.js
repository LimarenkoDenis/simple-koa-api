const mongoose = require('mongoose');
const user = mongoose.model('User');

class User {
  get(req, res, next) {
    user.find().exec()
      .then((data) => {
        console.log(data)
        res.json(data);
      })
      .catch(next);
  }
}
module.exports = new User;
