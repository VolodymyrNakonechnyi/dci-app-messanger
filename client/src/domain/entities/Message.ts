export interface IMessage {
    get getId(): number;
    get getContent(): string;
    get getRoomId(): number;
    get getSenderId(): number;
    get getStatus(): MessageStatus;
    get getCreatedAt(): Date;
    get getUpdatedAt(): Date;
}
  
export type MessageStatus = "sent" | "delivered" | "read";
  
export interface JsonMessage {
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
      updatedAt,
    }: JsonMessage) {
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
  
    get getCreatedAt() {
      return this.createdAt;
    }
  
    get getUpdatedAt() {
      return this.updatedAt;
    }
  
    static fromJson({
      id,
      content,
      roomId,
      senderId,
      status,
      createdAt,
      updatedAt,
    }: JsonMessage) {
      return new Message({
        id,
        content,
        roomId,
        senderId,
        status,
        createdAt,
        updatedAt,
      });
    }
}