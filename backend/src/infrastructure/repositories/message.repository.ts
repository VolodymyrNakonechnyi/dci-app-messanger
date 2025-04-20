import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { IMessage } from "../../domain/interface/message.interface";
import { Message, MessageStatus } from "../../domain/entities/Message";
import { messages } from "../database/migrations/message.schema";
import { eq } from "drizzle-orm";

export interface InsertProps {
  content: string;
  roomId: number;
  senderId: number;
  status: MessageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageRepository {
  create(params: InsertProps): Promise<IMessage>;
  findById(id: number): Promise<IMessage | null>;
  findByCreatorId(userId: number): Promise<IMessage[]>;
  findByRoomId(roomId: number): Promise<IMessage[]>;
}

export class MessageRepository implements IMessageRepository {
  private db: PostgresJsDatabase;
  
  constructor({ db }) {
    this.db = db.client;
  }
  
  private mapMessages(entities): IMessage[] {
    const mappedMessages = [];
    
    for (const entity of entities) {
      const message = new Message(entity);
      mappedMessages.push(message);
    }
    
    return mappedMessages;
  }

  async create(params): Promise<IMessage> {
    const [result] = await this.db.insert(messages).values(params).returning();
    
    return new Message(result);
  }
  
  async findById(id: number): Promise<IMessage | null> {
    const [message] = await this.db.select().from(messages).where(eq(messages.id, id));
    
    return message ? new Message(message) : null;
  }
  
  async findByCreatorId(userId: number): Promise<IMessage[]> {
    const entities = await this.db.select().from(messages).where(eq(messages.senderId, userId));
    
    return this.mapMessages(entities);
  }
  
  async findByRoomId(roomId: number): Promise<IMessage[]> {
    const entities = await this.db.select().from(messages).where(eq(messages.roomId, roomId));
    
    return this.mapMessages(entities);
  }
}