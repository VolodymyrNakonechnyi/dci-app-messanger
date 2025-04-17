import { IUser } from "@/domain/interface/user.interface";
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { users } from "../database/migrations/user.schema";
import { eq } from 'drizzle-orm';
import { User } from "../../domain/entities/User";

export interface IUserRepository {
    findOne(id: number): Promise<IUser | undefined>;
    findOneByUsername(username: string): Promise<IUser | undefined>;
    createOne({ username }: CreateOne): Promise<IUser>;
}

export interface CreateOne {
    username: string;
}

export class UserRepository implements IUserRepository {
    private db: PostgresJsDatabase;

    constructor({ db }) {
        this.db = db.client;
    }

    async createOne({ username }: CreateOne): Promise<IUser> {
        const [user] = await this.db
            .insert(users)
            .values({username})
            .returning();
            
        return new User(user);                
    }

    async findOne(id: number): Promise<IUser | undefined> {
        const result = await this.db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

        const user = new User(result[0]);

        return user;
    }

    async findOneByUsername(username: string): Promise<IUser | undefined> {
        const result = await this.db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1);
            
        const user = new User(result[0]);


        return user;
    }
}