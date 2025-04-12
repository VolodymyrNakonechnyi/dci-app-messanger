export interface IUser {
    getName(): string;
    savein(message: string): void;
    saveout(message: string): void;
    getLatestReceive(): string;
    getLatestSend(): string;
}