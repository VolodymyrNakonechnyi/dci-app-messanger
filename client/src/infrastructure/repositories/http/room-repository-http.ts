import { IRoomRepository } from "../../../domain/interfaces/room/room-repository.interface";

export class RoomRepositoryHttp implements IRoomRepository {
    async list() {
        try {
            return []
        } catch(error) {
            throw new Error(
                'Something went wrong on list users: ' + (error as Error).message
            )
        }
    }
}