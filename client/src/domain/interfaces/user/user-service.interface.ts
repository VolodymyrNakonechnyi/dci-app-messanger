import { User } from "../../entities/User"

export interface IUserService {
  getAllContacts(): Promise<User[]>
//   getUser(id: number): Promise<User>
//   createUser(user: User): Promise<User>
//   deleteUser(id: number): Promise<User>
}