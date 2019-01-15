export interface IDeviceHealth {
    availableExtMemory: string;
    availableIntMemory: string;
    mobileDataStatus: boolean;
    totalExtMemory: string;
    totalIntMemory: string;
    batteryLevel: number;
    availableRam: number;
    wifiStatus: boolean;
    timestamp: number;
    deviceID: string;
    ramUsage: number;
}