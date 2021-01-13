import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getManager } from "typeorm";
import * as bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

import { UserEntity } from "../../../db/entities";
import { HttpException } from "../../../exceptions";


passport.use('local', new LocalStrategy((username, password, done) => {
  const userRepository = getManager().getRepository(UserEntity);
  userRepository.findOne({ where: { username: username } })
    .then(async (userEntity) => {
      if (!userEntity) {
        return done(new HttpException("Username or password is wrong!"), StatusCodes.UNAUTHORIZED);
      }

      const passwordIsCorrect = await bcrypt.compare(password, userEntity.passwordHash);
      if (!passwordIsCorrect) {
        return done(new HttpException("Username or password is wrong!"), StatusCodes.UNAUTHORIZED);
      }

      return done(null, userEntity);
    })
    .catch(err => done(err));
}));

