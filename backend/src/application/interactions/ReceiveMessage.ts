import { IUser } from "@/domain/interface/user.interface"

export class ReceiveMessage {
    static async execute(receiver: IUser, message: string): Promise<void> {
        await receiver.savein(message);
    }
}