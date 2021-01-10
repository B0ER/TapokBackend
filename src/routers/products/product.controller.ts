import { Request, Response } from "express";
import { ProductService } from "./product.service";


export class ProductController {

  constructor(private readonly productService: ProductService) { }

  async getAll(req: Request, res: Response, next: (err?: Error) => void) {
    try {
      const response = await this.productService.getAll();
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
