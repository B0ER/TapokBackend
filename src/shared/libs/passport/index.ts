import passport from "passport";


passport.serializeUser((user: Express.User, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));


export * from "./middlewares";
export * from "./strategies";
export { passport };
