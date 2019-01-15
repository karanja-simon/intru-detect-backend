import DeviceHealth from './../models/device.health';
import {Request, Response} from 'express';
import {IDeviceHealth} from "../interfaces/IDeviceHealth";

export let getDeviceHealthHistory = (req: Request, res: Response) => {
        res.status(200).json({health: 'OK!'});
};

export let saveDeviceHealth = (deviceHealthData: IDeviceHealth) => {
        let newDevice = new DeviceHealth(deviceHealthData);
        newDevice.save().then((data) => {
                console.log(`Device saved: ${data}`);
        }).catch((err) => {
                console.log(err);
        });
};

export let getDeviceHealth = (req: Request, res: Response) => {
        DeviceHealth.find().then((docs) => {
            res.status(200).json({success: true, data: docs});
        })  .then((err) => {
            console.log(err);
        });
};



