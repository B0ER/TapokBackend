import express, { Request, Response } from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';

import { passport } from './shared/libs/passport';
import { createRootRouter } from "./routers";

const sessionSecret = "s9LeL2LWbjxjVsrp";

function createApp() {
  const expressApp = express();

  expressApp.use(bodyParser.json());
  expressApp.use(expressSession({ secret: sessionSecret, resave: false, saveUninitialized: false }));
  expressApp.use(passport.initialize());
  expressApp.use(passport.session());


  expressApp.use('/', createRootRouter());

  expressApp.use((err: Error & { code?: number }, req: Request, res: Response, next: (err?: Error) => void) => {
    console.error(err.stack);
    res.status(err.code || 500).json({ error: err.message });
  });

  return expressApp;
}

export { createApp };
