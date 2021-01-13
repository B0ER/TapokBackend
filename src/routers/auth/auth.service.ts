import { getManager, Repository } from "typeorm";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

import { UserEntity } from "../../shared/db/entities";
import { HttpException } from "../../shared/exceptions";
import { RegisterModel as RegisterRequest } from "./models";

export class AuthService {
  private readonly userRepository: Repository<UserEntity>;

  constructor() {
    const manager = getManager();
    this.userRepository = manager.getRepository(UserEntity);
  }

  async register(registerModel: RegisterRequest) {
    const userExistEntity: UserEntity | undefined = await this.userRepository.findOne({ where: { username: registerModel.username } });
    if (userExistEntity) {
      throw new HttpException("User is exists already!", StatusCodes.BAD_REQUEST);
    }

    const newUser: UserEntity = new UserEntity();
    newUser.username = registerModel.username;
    newUser.passwordHash = await bcrypt.hash(registerModel.password, await bcrypt.genSalt());

    await this.userRepository.save(newUser);
  }

  async login(userEntity: UserEntity) {
    const token = jwt.sign({ id: userEntity.id, username: userEntity.username }, 's9LeL2LWbjxjVsrp');
    return { token };
  }
}
