import { Router } from "express";

import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";


export function createCartRouter(): Router {
  const router = Router();
  const productController = new CartController(new CartService());

  router.get("/", (req, res, next) => productController.getUserCart(req, res, next));
  router.put("/:productId", (req, res, next) => productController.addToCart(req, res, next));
  router.delete("/:productId", (req, res, next) => productController.deleteFromCart(req, res, next));
  router.post("/:productId/increment", (req, res, next) => productController.incrementCount(req, res, next));
  router.post("/:productId/decrement", (req, res, next) => productController.decrementCount(req, res, next));
  router.post("/buy", (req, res, next) => productController.buyCartItems(req, res, next));

  return router;
}
