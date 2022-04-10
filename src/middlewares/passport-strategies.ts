import PassportLocal from 'passport-local';
import passport from 'passport';
import { User } from '../models/user';
import { IUser, IUserDocument } from '../models/interfaces/user.interface';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: IUserDocument, done) => done(null, user));

passport.use(
  new PassportLocal.Strategy(
    { usernameField: 'email', session: false },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (
          user &&
          (await User.comparePasswords(password, user.passwordHashed))
        ) {
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
