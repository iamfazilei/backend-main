const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true},
  lname: { type: String, required: true},
  password: { type: String, required: true },
  registeredClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

// Password comparison method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  // Direct comparison
};

const User = mongoose.model('User', userSchema);
module.exports = User;
