import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import passport from 'passport';
import mongoose from 'mongoose';
import User from '../model/user.js';
import dotenv from 'dotenv';

dotenv.config();

// Using both the passport library and passport-google-oauth20 library
// The passport-google-oauth20 allows the use of a Google authentication strategy 
// which authenticates users using a Google account and OAuth 2.0 tokens
// This strategy requires us to verify the callback, which receives an accessToken
// Along with an optional refreshToken. Then further giving us the profile of the authenticated user
// Then use some general code given in the documentation, replacing things as needed
// We then have an async function, then within that function creating a newUser with the information
// that is needed from the google profiles
// we then use the .findOne method provided by mongoose to check if the user is in the mongoDB database
// if yes then return cb otherwise create the user and then return the cb
// serializeUser is then used to store the user ID for the session 
// deserializeUser is then used to retrieve the data based on the user ID session

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://screen-wise-ntsk.vercel.app/auth/google/callback',
        scope: ['profile'],
      },
      async(accessToken, refreshToken, profile, done) => {
        
        const newUser = {
          googleId: profile.id,
          username: profile.displayName,
        };
        
        try {

          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          } else {
            user = await User.create(newUser);
            return done(null, user);
          }
        } catch (err){
          console.log(err);
          return done(err, null);
        }
      }
    )
  )
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });


export default passport;
