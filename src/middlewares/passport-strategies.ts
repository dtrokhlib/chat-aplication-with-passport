import PassportLocal from 'passport-local';
import PassportFacebook from 'passport-facebook';
import PassportTwitter from 'passport-twitter';
import PassportGoogle from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../models/user';
import { IUserDocument } from '../models/interfaces/user.interface';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: IUserDocument, done) => done(null, user));

// LOCAL //
passport.use(
  new PassportLocal.Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (user && (await User.comparePasswords(password, user.password!))) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'local-signup',
  new PassportLocal.Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (user) {
          return done('This email is already taken', false);
        } else {
          const newUser = User.build({ ...req.body });
          await newUser.save();

          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// FACEBOOK //
passport.use(
  new PassportFacebook.Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
      profileFields: ['id', 'first_name', 'last_name', 'photos'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.name || !profile.photos) {
          return done('Profile data not provided', false);
        }
        const username = `${profile.name.familyName}-${profile.name.givenName}-${profile.id}`;

        const user = await User.findOne({ username });
        if (user) {
          return done(null, user);
        } else {
          const newUser = User.build({
            username,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            avatar: profile.photos[0].value,
          });
          await newUser.save();

          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// GOOGLE //
passport.use(
  new PassportGoogle.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.name || !profile.photos) {
          return done('Profile data not provided', false);
        }
        const username = `${profile.name.familyName}-${profile.name.givenName}-${profile.id}`;

        const user = await User.findOne({ username });
        if (user) {
          return done(null, user);
        } else {
          const newUser = User.build({
            username,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            avatar: profile.photos[0].value,
          });
          await newUser.save();

          return done(null, newUser);
        }
      } catch (err: any) {
        return done(err, false);
      }
    }
  )
);

// TWITTER //
passport.use(
  new PassportTwitter.Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY!,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
      callbackURL: process.env.TWITTER_CALLBACK_URL!,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        if (!profile.username || !profile.photos) {
          return done('Profile data not provided', false);
        }
        const username = `${profile.username}-${profile.id}`;

        const user = await User.findOne({ username });
        if (user) {
          return done(null, user);
        } else {
          const newUser = User.build({
            username,
            firstName: profile.displayName,
            lastName: profile.displayName,
            avatar: profile.photos[0].value,
          });
          await newUser.save();

          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
