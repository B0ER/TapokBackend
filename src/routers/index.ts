import { Router } from "express";
import { isAuthorizedMiddleware, passport } from "../shared/libs/passport";
import { createAuthRouter } from "./auth/auth.router";
import { createCartRouter } from "./cart/cart.router";
import { createProductRouter } from "./products/product.router";


export function createRootRouter(): Router {
  const router = Router();

  router.use('/auth', createAuthRouter());
  router.use('/products', createProductRouter());
  router.use('/cart', passport.authenticate('jwt', { session: false }), isAuthorizedMiddleware, createCartRouter());

  return router;
}
