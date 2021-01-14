import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("Transactions")
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  status!: 'approved' | 'rejected' | 'in progress';

  @Column()
  orderId!: string;

  @ManyToOne(type => UserEntity, { lazy: true })
  user!: Promise<UserEntity>;
}
