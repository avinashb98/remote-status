const mongoose = require('mongoose')

const { Schema } = mongoose
const TeamSchema = new Schema({
  teamName: {
    type: String,
    enum: ['Tech', 'Product', 'Language', 'Finance', 'Law', 'Admin', 'Design', 'Business and Marketing', 'Other']
  }
})

const UserSchema = new Schema({
  googleId: {
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
