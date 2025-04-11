import logger from "../utils/logger";

export class SendMessage {
    sendMessage(message) {
        logger.warn(`class SendMessage (sendMessage): ${message}`);
        this.saveout(message);
        this.context.sink.receiveMessage(message);
    } 
}