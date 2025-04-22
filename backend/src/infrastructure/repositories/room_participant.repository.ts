import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { IRoomParticipant } from "../../domain/interface/room_participant.interface";
import { RoomParticipant } from "../../domain/entities/RoomParticipant";
import { roomParticipants } from "../database/migrations/room_participants";
import { eq, and } from "drizzle-orm";

export interface InsertRoomParticipantProps {
  userId: number;
  roomId: number;
  joinedAt: Date;
  role: string;
}

export interface IRoomParticipantRepository {
  create(params: InsertRoomParticipantProps): Promise<IRoomParticipant>;
  findById(id: number): Promise<IRoomParticipant | null>;
  findByUserId(userId: number): Promise<IRoomParticipant[]>;
  findByRoomId(roomId: number): Promise<IRoomParticipant[]>;
  findByUserAndRoomId(userId: number, roomId: number): Promise<IRoomParticipant | null>;
  removeParticipant(userId: number, roomId: number): Promise<boolean>;
}

export class RoomParticipantRepository implements IRoomParticipantRepository {
  private db: PostgresJsDatabase;
  
  constructor({ db }) {
    this.db = db.client;
  }
  
  private mapParticipants(entities): IRoomParticipant[] {
    const mappedParticipants = [];
    
    for (const entity of entities) {
      const participant = new RoomParticipant(entity);
      mappedParticipants.push(participant);
    }
    
    return mappedParticipants;
  }

  async create(params: InsertRoomParticipantProps): Promise<IRoomParticipant> {
    const [result] = await this.db.insert(roomParticipants).values(params).returning();
    
    return new RoomParticipant(result);
  }
  
  async findById(id: number): Promise<IRoomParticipant | null> {
    const [participant] = await this.db.select().from(roomParticipants).where(eq(roomParticipants.id, id));
    
    return participant ? new RoomParticipant(participant) : null;
  }
  
  async findByUserId(userId: number): Promise<IRoomParticipant[]> {
    const entities = await this.db.select().from(roomParticipants).where(eq(roomParticipants.userId, userId));
    
    return this.mapParticipants(entities);
  }
  
  async findByRoomId(roomId: number): Promise<IRoomParticipant[]> {
    const entities = await this.db.select().from(roomParticipants).where(eq(roomParticipants.roomId, roomId));
    
    return this.mapParticipants(entities);
  }
  
  async findByUserAndRoomId(userId: number, roomId: number): Promise<IRoomParticipant | null> {
    const [participant] = await this.db.select().from(roomParticipants).where(
      and(
        eq(roomParticipants.userId, userId),
        eq(roomParticipants.roomId, roomId)
      )
    );
    
    return participant ? new RoomParticipant(participant) : null;
  }
  
  async removeParticipant(userId: number, roomId: number): Promise<boolean> {
    const result = await this.db.delete(roomParticipants).where(
      and(
        eq(roomParticipants.userId, userId),
        eq(roomParticipants.roomId, roomId)
      )
    );
    
    return !!result;
  }
}