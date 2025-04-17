import { IUser } from "../interface/user.interface.js";

export interface Props {
    id: number,
    username: string
}
export class User implements IUser {
    private inbox: string[] = [];
    private outbox: string[] = [];
    private id: number;
    private username: string = "";

    constructor({ id, username }: Props) {
        this.id = id;
        this.username = username;
    }
    
    getId() {
        return this.id;
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
        const latestReceive = this.inbox[this.inbox.length - 1];
        
        if(!latestReceive) {
            return ""
        }

        return latestReceive;
    }   

    getLatestSend() {
        const latestSend = this.outbox[this.outbox.length - 1];
        
        if(!latestSend) {
            return ""
        }

        return latestSend; 
    }
}