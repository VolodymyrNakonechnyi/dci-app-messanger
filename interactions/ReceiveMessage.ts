import logger from "../utils/logger";

export class ReceiveMessage {
    receiveMessage(message) {
        logger.warn(`class ReceiveMessage (receiveMessage): ${message}`);
        this.savein(message);
    } 
}