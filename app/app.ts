import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as cors from 'cors';

let config = require('./../config/config');

import * as deviceHealthCtlr from './controllers/device.health';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(cors({origin: '*'}));
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

    private routes(): void {
        let router: express.Router;
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

export default new App().app;