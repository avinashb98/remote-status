const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

require('./config/db')

const userRouter = require('./src/routes/user')
const dashboardRouter = require('./src/routes/dashboard')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/remote-status/static', express.static(path.join(__dirname, 'public')))

// Router Initialization
app.get('/health', (req, res) => {
  res.status(200).json({
    messsge: 'Remote Status is running healthy!'
  })
})

app.use('/user', userRouter)
app.use('/dashboard', dashboardRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
