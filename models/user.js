const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/test');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: function checkEmail(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg: 'Укажите, пожалуйста, корректный email.'
      },
    ],
    lowercase: true,
    trim: true,
  },
}, {
  timestamps: true, // createdAt, updatedAt
});

module.exports = mongoose.model('User', userSchema);


(async () => {

  await mongoose.model('User').remove({});

  let pete = await mongoose.model('User').create({email: 'pete@gmail.com'});
  let john = await mongoose.model('User').create({email: 'john@gmail.com'});
  let ann = await mongoose.model('User').create({email: 'ann@gmail.com'});

  pete = await mongoose.model('User').findOne({
    email: 'pete@gmail.com'
  })

  // console.log(pete);

  // deep (multi-level) populate: http://mongoosejs.com/docs/populate.html#deep-populate

})().catch(console.error).then(() => mongoose.disconnect());

