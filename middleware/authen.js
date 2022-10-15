import { Strategy, ExtractJwt } from "passport-jwt";
// var JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
import passport from "passport";
import { JWTSECRET } from "../configure/index.js";
import User from "../model/User.js";

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWTSECRET;
passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.sub);
      if (!user) {
        return done(err, null);
      }
      return done(null, user);
    } catch (error) {}
  })
);

const auth = passport.authenticate("jwt", { session: false });
const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({
      resultCode: 40300,
      resultDescription: "Forbidden",
    });
  }
  next();
};
export { auth, isAdmin };
