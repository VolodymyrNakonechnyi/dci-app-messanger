export interface IUser {
    getName(): string;
    savein(message: string): void;
    saveout(message: string): void;
    getLatestReceive(): string;
    getLatestSend(): string;

}

export class User implements IUser {
    private inbox: string[] = [];
    private outbox: string[] = [];
    protected username =  "";

    constructor(username) {
        this.username = username;
    }
    
    getName() {
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
}