import { eq } from "drizzle-orm";
import { rooms } from "../database/migrations/rooms";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { IRoom } from "../../domain/interface/room.interface";
import { Room } from "../../domain/entities/Room";

export interface IRoomRepository {
  create(params: { name: string; isGroup: boolean; createdById: number }): Promise<IRoom>;
  findById(id: number): Promise<IRoom | null>;
  findByCreatorId(userId: number): Promise<IRoom[]>;
}

export class RoomRepository implements IRoomRepository {
  private db: PostgresJsDatabase;
  
  constructor({ db }) {
    this.db = db.client;
  }
  
  private mapRooms(entities): IRoom[] {
    const mappedRooms = [];
    
    for (const entity of entities) {
      const room = new Room(entity);
      mappedRooms.push(room);
    }
    
    return mappedRooms;
  }
  
  async create({ name, isGroup, createdById }): Promise<IRoom> {
    const [room] = await this.db.insert(rooms)
      .values({ name, isGroup, createdById })
      .returning();
    
    return new Room(room);
  }
  
  async findById(id): Promise<IRoom | null> {
    const [room] = await this.db.select().from(rooms).where(eq(rooms.id, id));
    
    return room ? new Room(room) : null;
  }
  
  async findByCreatorId(userId): Promise<IRoom[]> {
    const entities = await this.db.select().from(rooms).where(eq(rooms.createdById, userId));
    
    return this.mapRooms(entities);
  }
}