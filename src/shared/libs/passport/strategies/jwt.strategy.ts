import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { getManager } from "typeorm";
import { StatusCodes } from "http-status-codes";

import { UserEntity } from "../../../db/entities";
import { HttpException } from "../../../exceptions";


passport.use("jwt", new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 's9LeL2LWbjxjVsrp'
},
  function (jwtPayload, done) {
    const userRepository = getManager().getRepository(UserEntity);

    userRepository.findOne({ where: { username: jwtPayload.username } })
      .then(async (userEntity) => {
        if (!userEntity) {
          return done(new HttpException("Jwt is invalid!"), StatusCodes.UNAUTHORIZED);
        }

        return done(null, userEntity);
      })
      .catch(err => done(err));
  }
));