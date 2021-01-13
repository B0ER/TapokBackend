import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserEntity } from "../../shared/db/entities";
import { HttpException } from "../../shared/exceptions";
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
      const userEntity: UserEntity = req.user as UserEntity;
      if (!userEntity) {
        throw new HttpException(undefined, StatusCodes.UNAUTHORIZED);
      }

      const response = await this.authService.login(userEntity);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

}
