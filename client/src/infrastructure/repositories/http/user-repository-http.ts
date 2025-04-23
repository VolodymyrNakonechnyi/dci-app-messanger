import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/user/user-repository.interface"
import { getUserListGateway } from "../../gateways/users/get-users-list.gateway"

export class UserRepositoryHttp implements IUserRepository {
    async list() {
        try {
            const response =  await getUserListGateway.load();

            return response.data as User[];
        } catch(error) {
            throw new Error(
                'Something went wrong on list users: ' + (error as Error).message
            )
        }
    }
}