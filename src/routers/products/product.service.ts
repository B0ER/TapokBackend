import { getManager, Repository } from "typeorm";
import { ProductEntity } from "../../shared/db/entities";


export class ProductService {
  private readonly productRepository: Repository<ProductEntity>;

  constructor() {
    const manager = getManager();
    this.productRepository = manager.getRepository(ProductEntity);
  }

  async getAll() {
    return await this.productRepository.find();
  }
}
