import { IUserRepository } from "../repositories/user.repository";

export interface IAuthService {
    login(username: string): Promise<string>
    register(username: string): Promise<string>
}

export class AuthService implements IAuthService { 
    private userRepository: IUserRepository;
    
    constructor({ userRepository }) {
        this.userRepository = userRepository;

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(username: string): Promise<string> {
        const user = await this.userRepository.findOneByUsername(username);

        return `Login ${user.getName()}`;
    }

    async register(username: string): Promise<string> {
        const user = await this.userRepository.createOne({username});

        return `Register ${user.getName()}`;
    }
}