import logger from "../utils/logger";

export interface ISendMessage {
    sendMessage(message: string): void;
}

export interface ISendMessageContext {
    sink: {
        receiveMessage(message: string): void;
    };
}

export class SendMessage implements ISendMessage {
    context!: ISendMessageContext;
    saveout!: (message: string) => void;

    constructor() {}

    sendMessage(message: string): void {
        logger.warn(`class SendMessage (sendMessage): ${message}`);
        this.saveout(message);
        this.context.sink.receiveMessage(message);
    }
}