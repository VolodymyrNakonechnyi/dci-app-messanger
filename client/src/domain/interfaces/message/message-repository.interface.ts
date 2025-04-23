import { Message } from "../../entities/Message";

export interface IMessageRepository {
    list(): Promise<Message[]>
}