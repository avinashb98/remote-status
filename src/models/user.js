const mongoose = require('mongoose')

const { Schema } = mongoose
const TeamSchema = new Schema({
  teamName: {
    type: String,
    enum: ['Tech', 'Product', 'Language', 'Finance', 'Law', 'Admin', 'Design', 'Business and Marketing']
  }
})

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  teams: {
    type: [TeamSchema]
  },
  status: {
    type: String,
    enum: ['Online', 'Away', 'Offline'],
    default: 'Online'
  },
  backBy: {
    type: Date
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

module.exports = mongoose.model('User', UserSchema)
