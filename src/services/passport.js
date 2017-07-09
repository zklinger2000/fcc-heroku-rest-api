import passport from 'passport';
// const Strategy = require('passport-facebook').Strategy;
import { Strategy } from 'passport-facebook';
// import jwt from 'jsonwebtoken';
const User = require('../models/User');
require('dotenv').config({ silent: true });

// Facebook strategy
const facebookStrategy = new Strategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: `${process.env.WEB_APP_URL}/login/facebook/return`
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    console.log(profile);
    /*
    // See if a user with the given Google id exists
    User.findOne({ 'facebook.id': profile.id })
      .then(user => {
        // If a user DOES exist, return token and whitelisted user info
        if (user) {
          // Could update the user here if we wanted
          // user.save();
          res.send({
            token: jwt.sign({ _id: user._id }, 'sssshshshsh'),
            user: {
              displayName: user.displayName
            }
          });
        } else {
          // Else, create new user and return token
          const newUser = new User(profile);
          newUser.save()
            .then(() => {
              // res.send({
              //   token: tokenForUser(newUser),
              //   user: {
              //     username: newUser.username,
              //     email: newUser.email,
              //     givenName: newUser.givenName,
              //     surname: newUser.surname,
              //     fullName: newUser.fullName,
              //   }
              // });
            })
            .catch(cb);
        }
      })
      .catch(cb);
    */
    profile._id = '12345028398908';
    return cb(null, profile);
  });


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Tell passport to use this strategy
passport.use(facebookStrategy);
