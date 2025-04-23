import { RoomParticipant } from "../../entities/RoomParticipant";

export interface IRoomParticipantRepository {
    list(): Promise<RoomParticipant[]>
}