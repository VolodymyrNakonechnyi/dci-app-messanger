import { Room } from "../../../domain/entities/Room";
import { IRoomRepository } from "../../../domain/interfaces/room/room-repository.interface";

export class RoomRepositoryMock implements IRoomRepository {
    private readonly rooms: Room[] = [
      new Room({ id: 1, name: "General Chat", isGroup: true, createdById: 1 }),
      new Room({ id: 2, name: "Private DM", isGroup: false, createdById: 2 }),
      new Room({ id: 3, name: "Team Meeting", isGroup: true, createdById: 3 }),
    ];
  
    async list(): Promise<Room[]> {
      if (this.rooms.length === 0) {
        throw new Error("No rooms found");
      }
      return this.rooms;
    }
  }