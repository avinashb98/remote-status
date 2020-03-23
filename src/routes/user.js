const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')

router.post(
  '/',
  controller.addUser
)

router.get(
  '/',
  controller.renderAddUser
)

router.patch(
  '/',
  controller.updateUser
)

module.exports = router
