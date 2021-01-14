import { getManager, Repository } from "typeorm";
import { CartEntity, ProductEntity, UserEntity } from "../../shared/db/entities";
import { TransactionEntity } from "../../shared/db/entities/transaction.entity";
import { HttpException } from "../../shared/exceptions";
import { PaypalClient } from "../../shared/libs/paypal";


export class CartService {
  private readonly cartRepository: Repository<CartEntity>;
  private readonly productRepository: Repository<ProductEntity>;
  private readonly transactionRepository: Repository<TransactionEntity>;
  private readonly paypalClient: PaypalClient;

  constructor() {
    const entityManager = getManager();
    this.cartRepository = entityManager.getRepository(CartEntity);
    this.productRepository = entityManager.getRepository(ProductEntity);
    this.transactionRepository = entityManager.getRepository(TransactionEntity);

    this.paypalClient = new PaypalClient();
  }

  async getUserCart(user: UserEntity) {
    const cartEntities = await this.cartRepository.createQueryBuilder('Cart')
      .where("Cart.userId = :userId", { userId: user.id })
      .innerJoinAndMapOne('Cart.product', 'Products', 'Products', 'Cart.productId = Products.id')
      .getMany();

    const response: {
      id: string;
      title: string;
      count: number;
      storeCount: number;
      price: number;
      imageUrl: string;
    }[] = [];
    for (const cartEntity of cartEntities) {
      const productEntity: ProductEntity = await cartEntity.product;
      const viewModel = {
        id: cartEntity.id,
        title: productEntity.title,
        count: cartEntity.count,
        storeCount: productEntity.count,
        price: productEntity.price,
        imageUrl: productEntity.imageUrl
      };
      response.push(viewModel);
    }

    return response;
  }

  async addToCart(user: UserEntity, productId: string) {
    const productEntity = await this.productRepository.findOne({ where: { id: productId } });
    if (!productEntity) {
      throw new HttpException("Product was not found!", 404);
    }

    const cartProductEntity = await this.cartRepository.createQueryBuilder('Cart')
      .where("Cart.userId = :userId AND Cart.productId = :productId", { userId: user.id, productId: productId })
      .getOne();

    if (cartProductEntity) {
      return;
    }

    const newCartEntity = new CartEntity();
    newCartEntity.user = Promise.resolve(user);
    newCartEntity.product = Promise.resolve(productEntity);
    newCartEntity.count = 1;

    await this.cartRepository.save(newCartEntity);
  }

  async deleteFromCart(user: UserEntity, cartProductId: string) {
    await this.cartRepository.createQueryBuilder()
      .delete()
      .from(CartEntity)
      .where('userId = :userId AND id = :cartProductId', { userId: user.id, cartProductId: cartProductId })
      .execute();
  }

  async saveCount(user: UserEntity, cartProductId: string, count: number) {
    const cartEntity = await this.cartRepository.createQueryBuilder()
      .where('id = :cartProductId', { cartProductId: cartProductId })
      .getOne();

    if (!cartEntity) {
      throw new HttpException("Product was not found!", 404);
    }

    cartEntity.count = count;
    await this.cartRepository.save(cartEntity);
  }

  async buyCartItems(user: UserEntity, paypalOrderId: string) {

    const paypalOrder = await this.paypalClient.getOrder(paypalOrderId);

    const orderStatus: TransactionEntity['status'] = paypalOrder.result.status === 'COMPLETED' ? 'approved' : 'rejected';

    const transactionEntity = new TransactionEntity();
    transactionEntity.orderId = paypalOrderId;
    transactionEntity.status = orderStatus;
    transactionEntity.user = Promise.resolve(user);

    await this.transactionRepository.save(transactionEntity);

    const cartEntities = await this.cartRepository.createQueryBuilder('Cart')
      .where('userId = :userId', { userId: user.id })
      .innerJoinAndMapOne('Cart.product', 'Products', 'Products', 'Cart.productId = Products.id')
      .getMany();

    for (const cartEntity of cartEntities) {
      const productEntity = await cartEntity.product;
      productEntity.count -= cartEntity.count;

      await this.productRepository.save(productEntity);
    }

    //clear cart
    await this.cartRepository.createQueryBuilder()
      .delete()
      .from(CartEntity)
      .where('userId = :userId', { userId: user.id })
      .execute();
  }
}
