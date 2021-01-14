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
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  async deleteFromCart(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      const response = await this.cartService.deleteFromCart(user, req.params.cartProductId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async saveCount(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      const count: number = req.body.count as number;
      await this.cartService.saveCount(user, req.params.cartProductId, count);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  async buyCartItems(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const user: UserEntity = req.user as UserEntity;
      const paypalOrderId: string = req.body.orderId;
      const response = await this.cartService.buyCartItems(user, paypalOrderId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
