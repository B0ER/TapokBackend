import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity("Cart")
export class CartEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(type => UserEntity, { lazy: true, nullable: false })
  user!: Promise<UserEntity>;

  @ManyToOne(type => ProductEntity, { lazy: true, nullable: false })
  product!: Promise<ProductEntity>;

  @Column({ unsigned: true })
  count!: number;
}
