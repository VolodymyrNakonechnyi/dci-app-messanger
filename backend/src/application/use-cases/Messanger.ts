import { ReceiveMessage } from "../interactions/ReceiveMessage";
import { SendMessage } from "../interactions/SendMessage";
import { IUser } from "@/domain/interface/user.interface";

export interface MessengerContextProps {
    sender: IUser;
    receiver: IUser;
}

export class MessengerContext {
    private sender: IUser;
    private receiver: IUser;
    private readonly MAX_MESSAGE_LENGTH = 4000;

    constructor({ sender, receiver }: MessengerContextProps) {
        this.sender = sender;
        this.receiver = receiver;
    }

    async sendAndReceive(message: string): Promise<void> {
        this.validateMessage(message);
        
        await SendMessage.execute(this.sender, message);
        await ReceiveMessage.execute(this.receiver, message);
    }

    private validateMessage(message: string): void {
        if (!message || typeof message !== 'string') {
            throw new Error("Message must be a non-empty string");
        }
        
        if (message.length > this.MAX_MESSAGE_LENGTH) {
            throw new Error(`Message exceeds maximum length of ${this.MAX_MESSAGE_LENGTH} characters`);
        }
    }
}