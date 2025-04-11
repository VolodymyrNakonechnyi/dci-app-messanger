import logger from "../utils/logger";

export interface IReceiveMessage {
    receiveMessage(message: string): void;
}

export interface IReceiveMessageContext {
    savein(message: string): void;
}

export class ReceiveMessage implements IReceiveMessage {
    context!: any;
    savein!: (message: string) => void;

    receiveMessage(message: string): void {
        logger.warn(`class ReceiveMessage (receiveMessage): ${message}`);
        this.savein(message);
    } 
}