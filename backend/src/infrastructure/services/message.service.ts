import { IMessage } from "@/domain/interface/message.interface";
import { MessageStatus } from "@/domain/entities/Message";
import { IMessageRepository } from "../repositories/message.repository";

export interface IMessageService {
  createMessage(content: string, roomId: number, senderId: number, status?: MessageStatus): Promise<IMessage>;
  getMessagesBySenderId(senderId: number): Promise<IMessage[]>;
  getMessageById(messageId: number): Promise<IMessage | null>;
  getMessagesByRoomId(roomId: number): Promise<IMessage[]>;
}

export class MessageService implements IMessageService {
  private messageRepository: IMessageRepository;
  
  constructor({ messageRepository }) {
    this.messageRepository = messageRepository;
  }
  
  async createMessage(content: string, roomId: number, senderId: number, status: MessageStatus = "sent"): Promise<IMessage> {
    const now = new Date();
    return await this.messageRepository.create({ 
      content, 
      roomId, 
      senderId,
      status,
      createdAt: now,
      updatedAt: now
    });
  }
  
  async getMessageById(messageId: number): Promise<IMessage | null> {
    return await this.messageRepository.findById(messageId);
  }
  
  async getMessagesBySenderId(senderId: number): Promise<IMessage[]> {
    return await this.messageRepository.findByCreatorId(senderId);
  }
  
  async getMessagesByRoomId(roomId: number): Promise<IMessage[]> {
    return await this.messageRepository.findByRoomId(roomId);
  }
}