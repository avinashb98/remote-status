const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// const RememberMeStrategy = require('passport-remember-me')
const User = require('../src/models/user')

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/redirect'
},
function (accessToken, refreshToken, profile, done) {
  console.log({ accessToken, refreshToken, profile, done })
  User.updateOne(
    { userId: profile.id },
    { userId: profile.id, photo: profile._json.picture, name: profile.displayName },
    { upsert: true },
    (err, user) => {
      if (err) {
        console.log(err)
      }
      console.log({ user })
      return done(null, profile)
    }
  )
}
))

// passport.use(new RememberMeStrategy(
//   function (token, done) {
//     Token.consume(token, function (err, user) {
//       if (err) { return done(err) }
//       if (!user) { return done(null, false) }
//       return done(null, user)
//     })
//   },
//   function (user, done) {
//     var token = utils.generateToken(64)
//     Token.save(token, { userId: user.id }, function (err) {
//       if (err) { return done(err) }
//       return done(null, token)
//     })
//   }
// ))

module.exports = passport
