const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
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
    { googleId: profile.id },
    { googleId: profile.id, photo: profile._json.picture, name: profile.displayName },
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

module.exports = passport
