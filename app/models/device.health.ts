import {Schema, model} from 'mongoose';

let DeviceHealth: Schema = new Schema({
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

export default model('DeviceHealth', DeviceHealth);