const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/redirect'
},
function (accessToken, refreshToken, profile, done) {
  console.log({ accessToken, refreshToken, profile, done })
}
))

module.exports = passport
