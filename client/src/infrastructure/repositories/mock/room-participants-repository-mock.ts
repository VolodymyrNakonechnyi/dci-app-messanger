import { RoomParticipant } from "../../../domain/entities/RoomParticipant";

export class RoomParticipantRepositoryMock implements IRoomParticipantRepository {
    private readonly participants: RoomParticipant[] = [
      new RoomParticipant({ id: 1, userId: 1, roomId: 1, joinedAt: new Date("2025-01-01"), role: "admin" }),
      new RoomParticipant({ id: 2, userId: 2, roomId: 1, joinedAt: new Date("2025-01-02"), role: "member" }),
      new RoomParticipant({ id: 3, userId: 3, roomId: 2, joinedAt: new Date("2025-01-03"), role: "member" }),
    ];
  
    async list(): Promise<RoomParticipant[]> {
      if (this.participants.length === 0) {
        throw new Error("No participants found");
      }
      return this.participants;
    }
  }