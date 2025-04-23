import { IMessageRepository } from "../../../domain/interfaces/message/message-repository.interface"

export class MessageRepositoryHttp implements IMessageRepository {
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