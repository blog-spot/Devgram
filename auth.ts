const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: "4287*****************************ent.com",
    clientSecret: "513z***********t1XU",
    callbackURL: "http://localhost:8000/api/account/google"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));