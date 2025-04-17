import { FastifyRequest, FastifyReply } from 'fastify';
import { IRoomService } from '../services/room.service';

export interface IRoomController {
  createRoom(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getRooms(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getRoomById(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export class RoomController implements IRoomController {
  private roomService: IRoomService;
  
  constructor({ roomService }) {
    this.roomService = roomService;
    
    this.createRoom = this.createRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.getRoomById = this.getRoomById.bind(this);
  }
  
  async createRoom(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, isGroup, createdById } = request.body as { name: string; isGroup: boolean, createdById: number };
      
      const room = await this.roomService.createRoom(name, isGroup, createdById);
      
      return reply.code(201).send({
        success: true,
        data: room
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
  
  async getRooms(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { createdById } = request.body as { createdById: number };
      
      const rooms = await this.roomService.getRoomsByCreatorId(createdById);
      
      return reply.code(200).send({
        success: true,
        data: rooms
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
  
  async getRoomById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const roomId = parseInt(id, 10);
      
      const room = await this.roomService.getRoomById(roomId);
      
      if (!room) {
        return reply.code(404).send({
          success: false,
          message: 'Room not found'
        });
      }
      
      return reply.code(200).send({
        success: true,
        data: room
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