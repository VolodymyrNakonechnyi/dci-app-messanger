import { IRoomParticipant } from "../interface/room_participant.interface";

export interface RoomParticipatnsProps {
    id: number;
    userId: number;
    roomId: number;
    joinedAt: Date;
    role: string;
} 

export class RoomParticipant implements IRoomParticipant {
    private id: number;
    private userId: number;
    private roomId: number;
    private joinedAt: Date;
    private role: string;
    
    constructor({
        id,
        userId,
        roomId,
        joinedAt,
        role
    }: RoomParticipatnsProps) {
        this.id = id;
        this.userId = userId;
        this.roomId = roomId;
        this.joinedAt = joinedAt;
        this.role = role;
    }

    get getId(): number {
        return this.id;
      }
    
    get getUserId(): number {
      return this.userId;
    }
    
    get getRoomId(): number {
      return this.roomId;
    }
    
    get getJoinedAt(): Date {
      return this.joinedAt;
    }
    
    get getRole(): string {
      return this.role;
    }
}