const express = require('express')
const router = express.Router()

const controller = require('../controllers/dashboard')

router.get(
  '/:organisation',
  controller.getUsers
)

module.exports = router
