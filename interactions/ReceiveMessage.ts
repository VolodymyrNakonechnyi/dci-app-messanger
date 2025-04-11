export class ReceiveMessage {
    receiveMessage(message) {
        log.warn(`class ReceiveMessage (receiveMessage): ${message}`);
        this.savein(message);
    } 
}