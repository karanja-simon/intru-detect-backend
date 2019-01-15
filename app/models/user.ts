import {Schema, Document, model} from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(myPassword: string): Promise<boolean>;
}

let User: Schema = new Schema({
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
}, {timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}});

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



User.methods.comparePassword = (myPassword: string): Promise<boolean> => {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPassword, password, (err, success) => {
            if (err) return reject(err);
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

export const userModel =  model<IUser>("User", User);
