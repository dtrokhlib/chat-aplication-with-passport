import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { chatRouter } from './routes/chat';
import path from 'path';
import passport from 'passport';
import { authLocalRouter } from './routes/auth-local';
import './middlewares/passport-strategies';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import { authFacebookRouter } from './routes/auth-facebook';
import { authGoogleRouter } from './routes/auth-google';
import { authTwitterRouter } from './routes/auth-twitter';

export class Application {
  app: Express;

  constructor() {
    this.app = express();
  }

  setup() {
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET || 'test123rtest',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
      })
    );
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev')); // log every request to the console
    this.app.use(cookieParser());
  }

  middlewares() {}

  routes() {
    this.app.use(chatRouter);
    this.app.use(authLocalRouter);
    this.app.use(authFacebookRouter);
    this.app.use(authGoogleRouter);
    this.app.use(authTwitterRouter);
  }

  bootstrap() {
    this.setup();
    this.middlewares();
    this.routes();

    return this.app;
  }
}
