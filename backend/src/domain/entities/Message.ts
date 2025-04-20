import { IMessage } from "../interface/message.interface";

export type MessageStatus = "sent" | "delivered" | "read";

export interface MessageProps {
    id: number;
    content: string;
    roomId: number;
    senderId: number;
    status: MessageStatus;
    createdAt: Date;
    updatedAt: Date;
}

export class Message implements IMessage {
    private id: number;
    private content: string;
    private roomId: number;
    private senderId: number;
    private status: MessageStatus;
    private createdAt: Date;
    private updatedAt: Date;
    
    constructor({ 
        id, 
        content, 
        roomId, 
        senderId,
        status,
        createdAt,
        updatedAt
    }: MessageProps) {
        this.id = id; 
        this.content = content;
        this.roomId = roomId;
        this.senderId = senderId;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    get getId() {
        return this.id;
    }

    get getContent() {
        return this.content;
    }

    get getRoomId() {
        return this.roomId;
    }

    get getSenderId() {
        return this.senderId;
    }

    get getStatus() {
        return this.status;
    }

    get getCreatedAtId() {
        return this.createdAt;
    }

    get getUpdatedAtId() {
        return this.updatedAt;
    }
}