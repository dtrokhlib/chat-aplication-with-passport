import PassportLocal from 'passport-local';
import passport from 'passport';
import { User } from '../models/user';
import { IUser, IUserDocument } from '../models/interfaces/user.interface';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: IUserDocument, done) => done(null, user));

passport.use(
  new PassportLocal.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (user && (await User.comparePasswords(password, user.password))) {
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
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          return done('This email is already taken', false);
        } else {
          console.log(req.body);
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
