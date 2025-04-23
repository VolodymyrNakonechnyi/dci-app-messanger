import { User } from "../../entities/User";

export interface IUserRepository {
    list(): Promise<User[]>
}