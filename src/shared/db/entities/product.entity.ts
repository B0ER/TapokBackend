import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Products")
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  price!: number;

  @Column()
  count!: number;

  @Column()
  imageUrl!: string;
}
