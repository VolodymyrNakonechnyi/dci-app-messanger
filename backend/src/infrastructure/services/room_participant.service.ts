import { IRoomParticipant } from "@/domain/interface/room_participant.interface";
import { IRoomParticipantRepository } from "../repositories/room_participant.repository";

export interface IRoomParticipantService {
  addParticipant(userId: number, roomId: number, role: string): Promise<IRoomParticipant>;
  getParticipantById(participantId: number): Promise<IRoomParticipant | null>;
  getParticipantsByUserId(userId: number): Promise<IRoomParticipant[]>;
  getParticipantsByRoomId(roomId: number): Promise<IRoomParticipant[]>;
  isUserInRoom(userId: number, roomId: number): Promise<boolean>;
  removeParticipant(userId: number, roomId: number): Promise<boolean>;
}

export class RoomParticipantService implements IRoomParticipantService {
  private roomParticipantRepository: IRoomParticipantRepository;
  
  constructor({ roomParticipantRepository }) {
    this.roomParticipantRepository = roomParticipantRepository;
  }
  
  async addParticipant(userId: number, roomId: number, role: string = "member"): Promise<IRoomParticipant> {
    const now = new Date();
    return await this.roomParticipantRepository.create({ 
      userId, 
      roomId, 
      joinedAt: now,
      role
    });
  }
  
  async getParticipantById(participantId: number): Promise<IRoomParticipant | null> {
    return await this.roomParticipantRepository.findById(participantId);
  }
  
  async getParticipantsByUserId(userId: number): Promise<IRoomParticipant[]> {
    return await this.roomParticipantRepository.findByUserId(userId);
  }
  
  async getParticipantsByRoomId(roomId: number): Promise<IRoomParticipant[]> {
    return await this.roomParticipantRepository.findByRoomId(roomId);
  }
  
  async isUserInRoom(userId: number, roomId: number): Promise<boolean> {
    const participant = await this.roomParticipantRepository.findByUserAndRoomId(userId, roomId);
    return participant !== null;
  }
  
  async removeParticipant(userId: number, roomId: number): Promise<boolean> {
    return await this.roomParticipantRepository.removeParticipant(userId, roomId);
  }
}