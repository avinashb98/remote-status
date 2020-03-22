/* eslint-disable no-underscore-dangle */
const createError = require('http-errors')
const User = require('../models/user')
const uuid = require('uuid').v4

class UserController {
  static async addUser (req, res, next) {
    const { name, team, organisation, status } = req.body
    try {
      await User.create({
        userId: uuid(),
        name,
        team,
        organisation,
        status
      })
    } catch (error) {
      console.log(error)
      console.log({ name, team, organisation, status })
      next(createError(500))
      return
    }
    res.status(201).json({
      message: 'User successfully created'
    })
  }

  static async updateUser (req, res, next) {
    const { userId, name, team, organisation, status } = req.body

    const updateFields = {}
    if (name) {
      updateFields.name = name
    }
    if (organisation) {
      updateFields.organisation = organisation
    }
    if (team) {
      updateFields.team = team
    }
    if (status) {
      updateFields.status = status
    }
    try {
      const user = await User.findOne({ userId })
      if (!user) {
        res.status(404).json({
          message: 'User not found'
        })
        return
      }
      for (const field in updateFields) {
        user[field] = updateFields[field]
      }
      await user.save()
    } catch (error) {
      console.log(error)
      console.log({ userId, name, team, organisation, status })
      next(createError(500))
      return
    }
    res.status(201).json({
      message: 'User details successfully updated'
    })
  }
}

module.exports = UserController
