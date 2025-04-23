import { User } from '../../../domain/entities/User'
import { HttpClient, HttpResponse } from '../../http/http'
import { StatusCodes } from 'http-status-codes'
import { environments } from '../../../utils/env/enviroments'
import { JsonUser } from '../../../domain/entities/User'

interface GetUserList {
  load(): Promise<HttpResponse<User[]>>
}

class GetUserListGateway implements GetUserList {
  constructor(private readonly httpClient: HttpClient<HttpResponse<User[]>>) {}

  async load(): Promise<HttpResponse<User[]>> {
    return await this.httpClient.request({
      method: 'get',
      url: '/users'
    })
  }
}

const fetchHttpClient: HttpClient<HttpResponse<User[]>> = {
    async request(data) {
      try {
        const response = await fetch(environments + data.url, {
          method: data.method
        })

        if (response.status === StatusCodes.NOT_FOUND) {
          throw new Error('Users not found')
        }

        if (!response.ok) {
          throw new Error('Error fetching: ' + response.statusText)
        }

        const dataResponse = ((await response.json()) as JsonUser[]).map((user) =>
          User.fromJson(user)
        )

        return {
          statusCode: response.status,
          data: dataResponse
        }
      } catch (error) {
        throw new Error((error as Error).message)
      }
    }
}

export const getUserListGateway = new GetUserListGateway(fetchHttpClient);