/* eslint-disable no-underscore-dangle */
const createError = require('http-errors')
const User = require('../models/user')

class DashboardController {
  static async getUsers (req, res, next) {
    const { organisation } = req.params
    let users
    try {
      users = await User.find(
        { organisation },
        { status: 1, userId: 1, name: 1, team: 1, organisation: 1, _id: 0 }
      )
    } catch (error) {
      console.log(error)
      console.log({ organisation })
      next(createError(500))
      return
    }
    if (users.length === 0) {
      res.status(404).json({
        message: 'No users found for the organisation',
        data: {}
      })
      return
    }
    res.status(201).json({
      message: `All users of ${organisation}`,
      data: users
    })
  }
}

module.exports = DashboardController
