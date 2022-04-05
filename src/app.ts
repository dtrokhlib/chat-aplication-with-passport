import bodyParser from "body-parser";
import express, { Express } from "express";
import { chatRouter } from "./routes/chat";

export class Application {
  app: Express;

  constructor() {
    this.app = express();
  }

  setup() {
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(bodyParser.json());
  }

  middlewares() {}

  routes() {
    this.app.use(chatRouter);
  }

  bootstrap() {
    this.setup();
    this.middlewares();
    this.routes();

    return this.app;
  }
}
