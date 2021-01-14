import { Router } from "express";

import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";


export function createCartRouter(): Router {
  const router = Router();
  const productController = new CartController(new CartService());

  router.get("/", (req, res, next) => productController.getUserCart(req, res, next));
  router.put("/:productId", (req, res, next) => productController.addToCart(req, res, next));
  router.delete("/:cartProductId", (req, res, next) => productController.deleteFromCart(req, res, next));
  router.post("/:cartProductId/count", (req, res, next) => productController.saveCount(req, res, next));
  router.post("/buy", (req, res, next) => productController.buyCartItems(req, res, next));

  return router;
}
