import { IRoomParticipantRepository } from "../../../domain/interfaces/room-participants/room-participants-repository.interface"

export class RoomParticipantRepositoryHttp implements IRoomParticipantRepository {
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