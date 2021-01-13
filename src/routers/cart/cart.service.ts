import { getManager, Repository } from "typeorm";
import { CartEntity, ProductEntity, UserEntity } from "../../shared/db/entities";
import { HttpException } from "../../shared/exceptions";


export class CartService {
  private readonly cartRepository: Repository<CartEntity>;
  private readonly productRepository: Repository<ProductEntity>;

  constructor() {
    const entityManager = getManager();
    this.cartRepository = entityManager.getRepository(CartEntity);
    this.productRepository = entityManager.getRepository(ProductEntity);
  }

  async getUserCart(user: UserEntity) {
    const response = await this.cartRepository.createQueryBuilder()
      .where("userId = :userId", { userId: user.id })
      .execute();

    return response;
  }

  async addToCart(user: UserEntity, productId: string) {
    const productEntity = await this.productRepository.findOne({ where: { id: productId } });
    if (!productEntity) {
      throw new HttpException("Product was not found!", 404);
    }

    const newCartEntity = new CartEntity();
    newCartEntity.user = Promise.resolve(user);
    newCartEntity.product = Promise.resolve(productEntity);
    newCartEntity.count = 1;

    await this.cartRepository.save(newCartEntity);
  }

  async deleteFromCart(user: UserEntity, productId: string) {
    await this.cartRepository.createQueryBuilder()
      .delete()
      .where('userId = :userId AND productId = :productId', { userId: user.id, productId: productId })
      .execute();
  }

  async incrementCount(user: UserEntity, productId: string) {
    const cartEntity = await this.cartRepository.createQueryBuilder()
      .where('userId = :userId AND productId = :productId', { userId: user.id, productId: productId })
      .getOne();

    if (!cartEntity) {
      throw new HttpException("Product was not found!", 404);
    }

    cartEntity.count++;
    await this.cartRepository.save(cartEntity);
  }

  async decrementCount(user: UserEntity, productId: string) {
    const cartEntity = await this.cartRepository.createQueryBuilder()
      .where('userId = :userId AND productId = :productId', { userId: user.id, productId: productId })
      .getOne();

    if (!cartEntity) {
      throw new HttpException("Product was not found!", 404);
    }

    cartEntity.count--;
    await this.cartRepository.save(cartEntity);
  }

  async buyCartItems(user: UserEntity) {


    //clear cart
    await this.cartRepository.createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId: user.id })
      .execute();
  }
}
