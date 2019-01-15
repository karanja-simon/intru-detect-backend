import * as socketIO from 'socket.io';
import * as mqtt from 'mqtt';
import {Server} from 'http';
import {MqttClient} from 'mqtt';
import {IDeviceHealth} from '../interfaces/IDeviceHealth';
import {saveDeviceHealth} from '../controllers/device.health';

const MQTT_BROKER_URL = 'tcp://broker.hivemq.com';
const MQTT_DEVICE_HEALTH_TOPIC = '/device/health';

class SocketServer {

    private io: SocketIO.Server;
    private client: MqttClient;

    constructor(server: Server) {
        this.io = socketIO(server);
        this.initMqtt();
        this.listen();
    }

    private initMqtt(): void {
        this.client = mqtt.connect(MQTT_BROKER_URL);
        this.client.on('connect', () => {
            console.log(`Connected to broker at: ${MQTT_BROKER_URL}`)
            this.client.subscribe(MQTT_DEVICE_HEALTH_TOPIC, (err) => {
                console.log(`Subscribed to topic: ${MQTT_DEVICE_HEALTH_TOPIC}`);
            });
        });

        this.client.on('message', (topic, message) => {
            console.log(`Message received. Topic: ${topic} Message: ${message}`);
            console.log(JSON.parse(message.toString()));
            let deviceHealthData:IDeviceHealth = JSON.parse(message.toString());
            saveDeviceHealth(deviceHealthData);
            this.emit('message', message.toString());
        });
    }

    private listen(): void {
        this.io.on('connect', (socket: any) => {
            console.log(`Client connected`);
            socket.on('message', (message: any) => {
                console.log(`New message ${message}`);

                this.emit('message', {message: 'Hello'});
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected`);
            });
        });
    }

    private emit(event: any, data: any): void {
        this.io.emit(event, data);
    }
}

export {SocketServer};