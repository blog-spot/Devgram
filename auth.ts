const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function(user:any, done:any) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: "738177854751-knvs60t3khpm6fo3d9qcvg03t7sjtomp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/api/google/account"
  },
  function(accessToken, refreshToken, profile:any, done) {
    return done(null, profile);
  }
));