"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
const passport = require("passport");
const moment = require("moment");
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../models/user");
class Auth {
    constructor() {
        this.initialize = () => {
            passport.use("jwt", this.getStrategy());
            return passport.initialize();
        };
        this.authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);
        this.genToken = (user) => {
            let expires = moment().utc().add({ days: 7 }).unix();
            let token = jwt.encode({
                exp: expires,
                username: user.email
            }, process.env.JWT_SECRET);
            return {
                token: "JWT " + token,
                expires: moment.unix(expires).format(),
                user: user._id
            };
        };
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.checkBody("email", "Invalid email").notEmpty();
                req.checkBody("password", "Invalid password").notEmpty();
                let errors = req.validationErrors();
                if (errors)
                    throw errors;
                let user = yield user_1.userModel.findOne({ "email": req.body.email }).exec();
                if (user === null)
                    throw "User not found";
                let success = yield user.comparePassword(req.body.password);
                if (success === false)
                    throw "";
                res.status(200).json(this.genToken(user));
            }
            catch (err) {
                res.status(401).json({ "message": "Invalid credentials", "errors": err });
            }
        });
        this.getStrategy = () => {
            const params = {
                secretOrKey: 'ogA9ppB$S!dy!hu3Rauvg!L96',
                jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
                passReqToCallback: true
            };
            return new passport_jwt_1.Strategy(params, (req, payload, done) => {
                user_1.userModel.findOne({ "email": payload.email }, (err, user) => {
                    /* istanbul ignore next: passport response */
                    if (err) {
                        return done(err);
                    }
                    /* istanbul ignore next: passport response */
                    if (user === null) {
                        return done(null, false, { message: "The user in the token was not found" });
                    }
                    return done(null, { _id: user._id, email: user.email });
                });
            });
        };
    }
}
exports.default = new Auth();
//# sourceMappingURL=auth.js.map