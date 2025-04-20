import { MessageStatus } from "../entities/Message";

export interface IMessage {
    get getId(): number;
    get getContent(): string;
    get getRoomId(): number;
    get getSenderId(): number;
    get getStatus(): MessageStatus; 
    get getCreatedAtId(): Date;
    get getUpdatedAtId(): Date;

}