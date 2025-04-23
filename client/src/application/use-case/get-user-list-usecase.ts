import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/interfaces/user/user-repository.interface'
import { UserRepositoryFactory } from '../../infrastructure/factories/user-repository.factory'

interface GetUserListUseCaseInterface {
  execute(): Promise<User[]>
}

export class GetUserListUseCase implements GetUserListUseCaseInterface {
  private readonly userRepository: IUserRepository

  constructor(
    userRepository: IUserRepository = UserRepositoryFactory.create()
  ) {
    this.userRepository = userRepository
  }
  async execute() {
    return this.userRepository.list()
  }
}