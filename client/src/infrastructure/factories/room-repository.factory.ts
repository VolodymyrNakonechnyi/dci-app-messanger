import { environments } from '../../utils/env/enviroments'
import { RoomRepositoryMock } from '../repositories/mock/room-repository-mock'
import { STAGE } from '../../utils/enums/stage'
import { IRoomRepository } from '../../domain/interfaces/room/room-repository.interface'
import { RoomRepositoryHttp } from '../repositories/http/room-repository-http' 

export class RoomRepositoryFactory {
  static create(stage: STAGE = environments.stage): IRoomRepository {
    switch (stage) {
      case 'test':
        return new RoomRepositoryMock()
      case 'prod':
        return new RoomRepositoryHttp()
      case 'homolog':
        return new RoomRepositoryHttp()
      case 'dev':
        return new RoomRepositoryHttp()
      default:
        throw new Error(`No repository found for stage: ${stage}`)
    }
  }
}