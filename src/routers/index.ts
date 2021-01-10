import { Router } from "express";
import { createAuthRouter } from "./auth/auth.router";
import { createProductRouter } from "./products/product.router";


export function createRootRouter(): Router {
  const router = Router();

  router.use('/auth', createAuthRouter());
  router.use('/products', createProductRouter());

  return router;
}
