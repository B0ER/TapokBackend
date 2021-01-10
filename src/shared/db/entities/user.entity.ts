import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column()
  passwordHash!: string;
}
