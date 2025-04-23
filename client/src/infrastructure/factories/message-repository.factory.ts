import { environments } from '../../utils/env/enviroments'
import { STAGE } from '../../utils/enums/stage'
import { MessageRepositoryMock } from '../repositories/mock/message-repository-mock'
import { MessageRepositoryHttp } from '../repositories/http/message-repository-http'
import { IMessageRepository } from '../../domain/interfaces/message/message-repository.interface'

export class MessageRepositoryFactory {
  static create(stage: STAGE = environments.stage): IMessageRepository {
    switch (stage) {
      case 'test':
        return new MessageRepositoryMock()
      case 'prod':
        return new MessageRepositoryHttp()
      case 'homolog':
        return new MessageRepositoryHttp()
      case 'dev':
        return new MessageRepositoryHttp()
      default:
        throw new Error(`No repository found for stage: ${stage}`)
    }
  }
}