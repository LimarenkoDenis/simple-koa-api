const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/test');

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, },
  displayName: {type: String, required: true, unique: true}
}, {
  timestamps: true, // createdAt, updatedAt
});

// schema.methods.toJSON = function toJSON() {
//   return {
//     id: this._id,
//     email: this.email
//   };
// };

module.exports = mongoose.model('User', schema);


(async () => {

  await mongoose.model('User').remove({});

  let pete = await mongoose.model('User').create({email: 'pete@gmail.com', displayName: 'Petr'});
  let john = await mongoose.model('User').create({email: 'john@gmail.com', displayName: 'john'});
  let ann = await mongoose.model('User').create({email: 'ann@gmail.com', displayName: 'ann'});

  pete = await mongoose.model('User').findOne({
    email: 'pete@gmail.com'
  })

  // console.log(pete);

  // deep (multi-level) populate: http://mongoosejs.com/docs/populate.html#deep-populate

})().catch(console.error)

