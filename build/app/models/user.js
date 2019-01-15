"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let User = new mongoose_1.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });
User.pre("save", (next) => {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});
User.pre("update", (next) => {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});
User.methods.comparePassword = (myPassword) => {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPassword, password, (err, success) => {
            if (err)
                return reject(err);
            return resolve(success);
        });
    });
};
User.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt((expiry.getTime() / 1000).toString()),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
exports.userModel = mongoose_1.model("User", User);
//# sourceMappingURL=user.js.map