import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterModel } from "./models";


export class AuthController {
  constructor(private readonly authService: AuthService) { }

  async register(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const registerModel: RegisterModel = { username: req.body.username, password: req.body.password };
      await this.authService.register(registerModel);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

}
