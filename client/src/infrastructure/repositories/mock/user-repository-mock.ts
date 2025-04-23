import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/user/user-repository.interface"

export class UserRepositoryMock implements IUserRepository {
    private readonly users: User[] = [
        new User(1, "Aoo"),
        new User(2, "Boo"),
        new User(3, "Coo"),
        new User(4, "Doo"),
        new User(5, "Eoo")
    ]

    async list(): Promise<User[]> {
        if (this.users.length === 0) {
          throw new Error('No users found')
        }
    
        return this.users
    }
}