import { IUser } from "@/domain/interface/user.interface";


export interface IUserRepository {
    findOne(id: number): IUser | undefined;
    findChatRoomUser(id: number): IUser | undefined;
    findOneByUsername(username: string): IUser | undefined;
}

export class UserRepository {
    constructor() {

    }

    findOne(id: number) {
        return 
    }
}