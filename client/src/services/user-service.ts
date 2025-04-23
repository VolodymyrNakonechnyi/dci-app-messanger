import { IUserService } from "../domain/interfaces/user/user-service.interface"
import { GetUserListUseCase } from "../application/use-case/get-user-list-usecase"
import { User } from "../domain/entities/User"

class UserService implements IUserService {
  private getUserListUseCase: GetUserListUseCase

  constructor(
    getUserListUseCase: GetUserListUseCase = new GetUserListUseCase(),

  ) {
    this.getUserListUseCase = getUserListUseCase
  }

  async getAllContacts(): Promise<User[]> {
    return await this.getUserListUseCase.execute()
  }
}

export const userService = new UserService();