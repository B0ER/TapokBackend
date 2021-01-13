import { Router } from "express";
import passport from "passport";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export function createAuthRouter(): Router {
  const authController = new AuthController(new AuthService());
  const router = Router();

  router.post('/register', (req, res, next) => authController.register(req, res, next));
  router.post('/login', passport.authenticate('local', { session: false }), (req, res, next) => authController.login(req, res, next));

  return router;
}
