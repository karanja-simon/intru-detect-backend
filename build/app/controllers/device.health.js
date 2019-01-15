"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const device_health_1 = require("./../models/device.health");
exports.getDeviceHealthHistory = (req, res) => {
    res.status(200).json({ health: 'OK!' });
};
exports.saveDeviceHealth = (deviceHealthData) => {
    let newDevice = new device_health_1.default(deviceHealthData);
    newDevice.save().then((data) => {
        console.log(`Device saved: ${data}`);
    }).catch((err) => {
        console.log(err);
    });
};
exports.getDeviceHealth = (req, res) => {
    device_health_1.default.find().then((docs) => {
        res.status(200).json({ success: true, data: docs });
    }).then((err) => {
        console.log(err);
    });
};
//# sourceMappingURL=device.health.js.map