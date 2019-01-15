"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
let config = require('./../config/config');
const deviceHealthCtlr = require("./controllers/device.health");
class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(cors({ origin: '*' }));
        // setup mongoose
        const MONGO_URI = "mongodb://localhost:25006/intruder_detect";
        const options = {
            poolSize: 2,
            promiseLibrary: global.Promise
        };
        mongoose.connect(MONGO_URI || process.env.MONGO_URI, options)
            .then(() => {
            console.log('IDBackend connected to DB @', MONGO_URI);
        }, (err) => {
            throw err;
        });
    }
    routes() {
        let router;
        router = express.Router();
        this.app.use('/', router.get('/', (req, res) => {
            res.json({
                success: true,
                message: 'Welcome to IntruderDetect backend!'
            });
        }));
        this.app.get('/health', deviceHealthCtlr.getDeviceHealth);
        this.app.get('/register', deviceHealthCtlr.getDeviceHealth);
        this.app.get('/users', deviceHealthCtlr.getDeviceHealth);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map