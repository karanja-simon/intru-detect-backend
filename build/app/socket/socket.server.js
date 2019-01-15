"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require("socket.io");
const mqtt = require("mqtt");
const device_health_1 = require("../controllers/device.health");
const MQTT_BROKER_URL = 'tcp://broker.hivemq.com';
const MQTT_DEVICE_HEALTH_TOPIC = '/device/health';
class SocketServer {
    constructor(server) {
        this.io = socketIO(server);
        this.initMqtt();
        this.listen();
    }
    initMqtt() {
        this.client = mqtt.connect(MQTT_BROKER_URL);
        this.client.on('connect', () => {
            console.log(`Connected to broker at: ${MQTT_BROKER_URL}`);
            this.client.subscribe(MQTT_DEVICE_HEALTH_TOPIC, (err) => {
                console.log(`Subscribed to topic: ${MQTT_DEVICE_HEALTH_TOPIC}`);
            });
        });
        this.client.on('message', (topic, message) => {
            console.log(`Message received. Topic: ${topic} Message: ${message}`);
            console.log(JSON.parse(message.toString()));
            let deviceHealthData = JSON.parse(message.toString());
            device_health_1.saveDeviceHealth(deviceHealthData);
            this.emit('message', message.toString());
        });
    }
    listen() {
        this.io.on('connect', (socket) => {
            console.log(`Client connected`);
            socket.on('message', (message) => {
                console.log(`New message ${message}`);
                this.emit('message', { message: 'Hello' });
            });
            socket.on('disconnect', () => {
                console.log(`Client disconnected`);
            });
        });
    }
    emit(event, data) {
        this.io.emit(event, data);
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=socket.server.js.map