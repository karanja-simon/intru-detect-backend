"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let DeviceHealth = new mongoose_1.Schema({
    availableExtMemory: String,
    availableIntMemory: String,
    mobileDataStatus: Boolean,
    totalExtMemory: String,
    totalIntMemory: String,
    batteryLevel: Number,
    availableRam: Number,
    wifiStatus: Boolean,
    timestamp: Number,
    deviceID: String,
    ramUsage: Number
});
exports.default = mongoose_1.model('DeviceHealth', DeviceHealth);
//# sourceMappingURL=device.health.js.map