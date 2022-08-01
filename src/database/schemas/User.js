const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  profilePicture: {
    type: mongoose.SchemaTypes.String,
    default: '',
  },
  links: {
    type: [mongoose.SchemaTypes.Mixed],
    default: [],
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
})

module.exports = mongoose.model('users', UserSchema)