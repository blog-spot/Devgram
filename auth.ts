export {};

declare global {
  namespace GoogleAuth {
    interface ProcessEnv {
      client_ID: string;
      GOOGLE_CLIENT_SECERT: string;
     
    }
  }
}

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:"738177854751-knvs60t3khpm6fo3d9qcvg03t7sjtomp.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://devgramco.herokuapp.com/api/google/account"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('ID: '+profile.id);
    console.log('Name: '+profile.displayName);
    console.log('Email : '+profile.emails[0].value);
    return done(null,profile);
   }
  
));