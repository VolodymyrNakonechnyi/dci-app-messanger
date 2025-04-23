export interface IRoom {
    get getId(): number;
    get getName(): string;
    get getIsGroup(): boolean;
    get getCreatorId(): number;
}
  
export interface JsonRoom {
    id: number;
    name: string;
    isGroup: boolean;
    createdById: number;
}
  
export class Room implements IRoom {
    private id: number;
    private name: string;
    private isGroup: boolean;
    private createdById: number;
  
    constructor({ id, name, isGroup, createdById }: JsonRoom) {
        this.id = id;
        this.name = name;
        this.isGroup = isGroup;
        this.createdById = createdById;
    }
  
    get getId() {
        return this.id;
    }
  
    get getName() {
        return this.name;
    }
  
    get getIsGroup() {
        return this.isGroup;
    }
  
    get getCreatorId() {
        return this.createdById;
    }
  
    static fromJson({ id, name, isGroup, createdById }: JsonRoom) {
        return new Room({ id, name, isGroup, createdById });
    }
}