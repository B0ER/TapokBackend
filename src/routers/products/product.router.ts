import { Router } from "express";

import { isAuthorizedMiddleware } from "../../shared/libs/passport";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";


export function createProductRouter(): Router {
  const router = Router();
  const productController = new ProductController(new ProductService());

  router.get("/", isAuthorizedMiddleware, (req, res, next) => productController.getAll(req, res, next));

  return router;
}
