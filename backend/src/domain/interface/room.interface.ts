export interface IRoom {
    getId(): number;
    getName(): string;
    getIsGroup(): boolean;
    getCreatorId(): number;
}