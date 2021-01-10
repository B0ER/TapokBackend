import { Request, Response } from "express";

export function isAuthorizedMiddleware(req: Request, res: Response, next: (err?: Error) => void) {
  if (req.user) {
    next();
  }
  else {
    res.redirect('/login');
  }
}
