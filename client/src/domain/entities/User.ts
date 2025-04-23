export interface IUser {
    get getId(): number;
    get getName(): string;
    savein(message: string): void;
    saveout(message: string): void;
    getLatestReceive(): string;
    getLatestSend(): string;
}

export interface JsonUser {
    id: number;
    username: string;
}

export class User implements IUser {
    private inbox: string[] = [];
    private outbox: string[] = [];
    private id: number; 
    private username: string;

    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }
    
    get getId() {
        return this.id;
    }

    get getName() {
        return this.username;
    }

    savein(message: string) {
        this.inbox.push(message)
    }
    
    saveout(message: string) {
        this.outbox.push(message)
    }
    
    getLatestReceive() {
        return this.inbox[this.inbox.length - 1]
    }   

    getLatestSend() {
        return this.outbox[this.outbox.length - 1]
    }

    static fromJson({ id, username }: JsonUser) {
        return new User(id, username);
    }
}