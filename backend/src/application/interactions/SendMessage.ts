import { IUser } from "@/domain/interface/user.interface"

export class SendMessage {
    static async execute(sender: IUser, message: string): Promise<void> {
        await sender.saveout(message);
    }
}