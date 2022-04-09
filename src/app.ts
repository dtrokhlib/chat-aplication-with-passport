import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { chatRouter } from './routes/chat';
import path from 'path';
import PassportLocal from 'passport-local';
import passport from 'passport';
import { User } from './models/user';

export class Application {
  app: Express;

  constructor() {
    this.app = express();
  }

  setup() {
    this.app.use(passport.initialize());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.json());
  }

  passportSetup() {
    passport.use(
      new PassportLocal.Strategy(
        { usernameField: 'email' },
        async (email, passport, done) => {
          try {
            const user = await User.findOne({ email });
          } catch (err) {
            done(err);
          }
        }
      )
    );
  }

  middlewares() {}

  routes() {
    this.app.use(chatRouter);
  }

  bootstrap() {
    this.passportSetup();
    this.setup();
    this.middlewares();
    this.routes();

    return this.app;
  }
}
