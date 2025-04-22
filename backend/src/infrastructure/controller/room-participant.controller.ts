import { FastifyRequest, FastifyReply } from 'fastify';
import { IRoomParticipantService } from '../services/room_participant.service';

export interface IRoomParticipantController {
  addParticipant(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
  getParticipantsByUserId(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
  getParticipantsByRoomId(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
  removeParticipant(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
}

export class RoomParticipantController implements IRoomParticipantController {
  private roomParticipantService: IRoomParticipantService;

  constructor({ roomParticipantService }) {
    this.roomParticipantService = roomParticipantService;
  }

  async addParticipant(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId, roomId, role } = request.body as { userId: number; roomId: number; role: string };

      const participant = await this.roomParticipantService.addParticipant(userId, roomId, role);

      return reply.code(201).send({ 
        success: true, 
        data: {
          id: participant.getId,
          userId: participant.getUserId,
          roomId: participant.getRoomId,
          joinedAt: participant.getJoinedAt,
          role: participant.getRole
        }
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }

  async getParticipantsByUserId(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.query as { userId: string };
      const numericUserId = parseInt(userId, 10);

      const participants = await this.roomParticipantService.getParticipantsByUserId(numericUserId);
      
      return reply.code(200).send({ 
        success: true, 
        data: participants.map(participant => ({
          id: participant.getId,
          userId: participant.getUserId,
          roomId: participant.getRoomId,
          joinedAt: participant.getJoinedAt,
          role: participant.getRole
        }))
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }

  async getParticipantsByRoomId(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { roomId } = request.params as { roomId: string };
      const numericRoomId = parseInt(roomId, 10);

      const participants = await this.roomParticipantService.getParticipantsByRoomId(numericRoomId);
      
      return reply.code(200).send({ 
        success: true, 
        data: participants.map(participant => ({
          id: participant.getId,
          userId: participant.getUserId,
          roomId: participant.getRoomId,
          joinedAt: participant.getJoinedAt,
          role: participant.getRole
        }))
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }

  async removeParticipant(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId, roomId } = request.body as { userId: number; roomId: number };

      const success = await this.roomParticipantService.removeParticipant(userId, roomId);
      
      if (!success) {
        return reply.code(404).send({
          success: false,
          message: 'Participant not found'
        });
      }

      return reply.code(200).send({ 
        success: true, 
        message: 'Participant removed successfully'
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