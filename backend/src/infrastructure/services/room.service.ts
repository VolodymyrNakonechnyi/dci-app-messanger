import { IRoom } from "@/domain/interface/room.interface";
import { IRoomRepository } from "../repositories/room.repository";

export interface IRoomService {
  createRoom(name: string, isGroup: boolean, createdById: number): Promise<IRoom>;
  getRoomsByCreatorId(userId: number): Promise<IRoom[]>;
  getRoomById(roomId: number): Promise<IRoom | null>;
}

export class RoomService implements IRoomService {
  private roomRepository: IRoomRepository;
  
  constructor({ roomRepository }) {
    this.roomRepository = roomRepository;
  }
  
  async createRoom(name: string, isGroup: boolean, createdById: number): Promise<IRoom> {
    return await this.roomRepository.create({ name, isGroup, createdById });
  }
  
  async getRoomById(roomId: number): Promise<IRoom | null> {
    return await this.roomRepository.findById(roomId);
  }
  
  async getRoomsByCreatorId(userId: number): Promise<IRoom[]> {
    return await this.roomRepository.findByCreatorId(userId);
  }
}