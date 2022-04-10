import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { chatRouter } from './routes/chat';
import path from 'path';
import PassportLocal from 'passport-local';
import passport from 'passport';
import { User } from './models/user';
import { authRouter } from './routes/auth';
import './middlewares/passport-strategies';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

export class Application {
  app: Express;

  constructor() {
    this.app = express();
  }

  setup() {
    this.app.use(passport.initialize());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev')); // log every request to the console
    this.app.use(cookieParser());
  }

  middlewares() {}

  routes() {
    this.app.use(chatRouter);
    this.app.use(authRouter);
  }

  bootstrap() {
    this.setup();
    this.middlewares();
    this.routes();

    return this.app;
  }
}
