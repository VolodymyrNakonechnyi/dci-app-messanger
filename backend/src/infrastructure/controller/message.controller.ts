import { FastifyRequest, FastifyReply } from 'fastify';
import { IMessageService } from '../services/message.service';
import type { MessageStatus } from '../../domain/entities/Message';

export interface IMessageController {
  createMessage(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getMessages(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getMessageById(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getMessagesByRoomId(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export class MessageController implements IMessageController {
  private messageService: IMessageService;
  
  constructor({ messageService }) {
    this.messageService = messageService;
    
    this.createMessage = this.createMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.getMessageById = this.getMessageById.bind(this);
    this.getMessagesByRoomId = this.getMessagesByRoomId.bind(this);
  }
  
  async createMessage(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { content, roomId, senderId, status } = request.body as { 
        content: string; 
        roomId: number;
        senderId: number;
        status?: MessageStatus;
      };
      
      const message = await this.messageService.createMessage(content, roomId, senderId, status);
      
      return reply.code(201).send({
        success: true,
        data: message
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
  
  async getMessages(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { senderId } = request.query as { senderId: string };
      const senderIdNum = parseInt(senderId, 10);
      
      const messages = await this.messageService.getMessagesBySenderId(senderIdNum);
      
      return reply.code(200).send({
        success: true,
        data: messages
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
  
  async getMessageById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const messageId = parseInt(id, 10);
      
      const message = await this.messageService.getMessageById(messageId);
      
      if (!message) {
        return reply.code(404).send({
          success: false,
          message: 'Message not found'
        });
      }
      
      return reply.code(200).send({
        success: true,
        data: message
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
  
  async getMessagesByRoomId(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { roomId } = request.params as { roomId: string };
      const roomIdNum = parseInt(roomId, 10);
      
      const messages = await this.messageService.getMessagesByRoomId(roomIdNum);
      
      return reply.code(200).send({
        success: true,
        data: messages
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}