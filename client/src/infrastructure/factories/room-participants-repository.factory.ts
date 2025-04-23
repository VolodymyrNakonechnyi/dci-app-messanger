import { environments } from '../../utils/env/enviroments'
import { STAGE } from '../../utils/enums/stage'
import { RoomParticipantRepositoryMock } from '../repositories/mock/room-participants-repository-mock'
import { RoomParticipantRepositoryHttp } from '../repositories/http/room-participant-repository-http'
import { IRoomParticipantRepository } from '../../domain/interfaces/room-participants/room-participants-repository.interface'

export class RoomParticipantRepositoryFactory {
  static create(stage: STAGE = environments.stage): IRoomParticipantRepository {
    switch (stage) {
      case 'test':
        return new RoomParticipantRepositoryMock()
      case 'prod':
        return new RoomParticipantRepositoryHttp()
      case 'homolog':
        return new RoomParticipantRepositoryHttp()
      case 'dev':
        return new RoomParticipantRepositoryHttp()
      default:
        throw new Error(`No repository found for stage: ${stage}`)
    }
  }
}