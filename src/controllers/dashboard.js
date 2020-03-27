/* eslint-disable no-underscore-dangle */
const createError = require('http-errors')
const User = require('../models/user')

const arrangeUsersByTeam = (users) => {
  function compare (a, b) {
    // Use toUpperCase() to ignore character casing
    const userA = a.name.toUpperCase()
    const userB = b.name.toUpperCase()

    let comparison = 0
    if (userA > userB) {
      comparison = 1
    } else if (userA < userB) {
      comparison = -1
    }
    return comparison
  }

  users = users.map(u => (
    {
      ...u._doc,
      isOnline: u.status === 'Online',
      isAway: u.status === 'Away',
      isOffline: u.status === 'Offline',
      test: 'agfghhjksdkhfhasdhjk'
    }
  )).sort(compare)

  const dashboard = []
  const teams = {}
  for (const user of users) {
    if (!teams[user.team]) {
      teams[user.team] = [user]
    } else {
      teams[user.team].push(user)
    }
  }

  for (const team in teams) {
    dashboard.push({
      team,
      users: teams[team]
    })
  }
  return dashboard
}

class DashboardController {
  static async getUsers (req, res, next) {
    const { organisation } = req.params
    let users
    try {
      users = await User.find(
        { organisation },
        { status: 1, userId: 1, name: 1, team: 1, organisation: 1, message: 1, _id: 0 }
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
    const teams = arrangeUsersByTeam(users)
    res.render('index', {
      dashboard: { teams }
    })
  }
}

module.exports = DashboardController
