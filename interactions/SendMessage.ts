export class SendMessage {
    sendMessage(message) {
        log.warn(`class SendMessage (sendMessage): ${message}`);
        this.saveout(message);
        this.context.sink.receiveMessage(message);
    } 
}