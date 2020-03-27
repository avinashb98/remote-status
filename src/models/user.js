const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  organisation: {
    type: String
  },
  team: {
    type: String
  },
  status: {
    type: String,
    enum: ['Online', 'Away', 'Offline'],
    default: 'Online'
  },
  message: {
    type: String,
    default: 'Online'
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

module.exports = mongoose.model('User', UserSchema)
