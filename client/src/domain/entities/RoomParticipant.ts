export interface IRoomParticipant {
    get getId(): number;
    get getUserId(): number;
    get getRoomId(): number;
    get getJoinedAt(): Date;
    get getRole(): string;
  }
  
export interface JsonRoomParticipant {
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
  
    constructor({ id, userId, roomId, joinedAt, role }: JsonRoomParticipant) {
        this.id = id;
        this.userId = userId;
        this.roomId = roomId;
        this.joinedAt = joinedAt;
        this.role = role;
    }
  
    get getId() {
      return this.id;
    }
  
    get getUserId() {
      return this.userId;
    }
  
    get getRoomId() {
      return this.roomId;
    }
  
    get getJoinedAt() {
      return this.joinedAt;
    }
  
    get getRole() {
      return this.role;
    }
  
    static fromJson({ id, userId, roomId, joinedAt, role }: JsonRoomParticipant) {
      return new RoomParticipant({ id, userId, roomId, joinedAt, role });
    }
}