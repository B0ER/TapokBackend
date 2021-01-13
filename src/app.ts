import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { passport } from './shared/libs/passport';
import { createRootRouter } from "./routers";

function createApp() {
  const expressApp = express();

  expressApp.use(bodyParser.json());
  expressApp.use(cors());
  expressApp.use(passport.initialize());


  expressApp.use('/', createRootRouter());

  expressApp.use((err: Error & { code?: number }, req: Request, res: Response, next: (err?: Error) => void) => {
    console.error(err.stack);
    res.status(err.code || 500).json({ error: err.message });
  });

  return expressApp;
}

export { createApp };
