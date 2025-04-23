import { Room } from "../../entities/Room";

export interface IRoomRepository {
    list(): Promise<Room[]>
}