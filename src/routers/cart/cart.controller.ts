import { Request, Response } from "express";
import { CartService } from "./cart.service";
import { UserEntity } from "../../shared/db/entities";


export class CartController {
  constructor(private readonly cartService: CartService) { }

  async getUserCart(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      const response = await this.cartService.getUserCart(user);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async addToCart(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      const response = await this.cartService.addToCart(user, req.params.productId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async deleteFromCart(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      const response = await this.cartService.deleteFromCart(user, req.params.productId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async incrementCount(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      await this.cartService.incrementCount(user, req.params.productId);
      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  }

  async decrementCount(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      await this.cartService.decrementCount(user, req.params.productId);
      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  }

  async buyCartItems(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      throw new Error("Not implemented!");
    } catch(err) {
      next(err);
    }
  }
}
