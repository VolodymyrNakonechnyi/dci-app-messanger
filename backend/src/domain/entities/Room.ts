import { IRoom } from "../interface/room.interface";

export interface RoomProps {
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
    
    constructor({ 
        id, 
        name, 
        isGroup, 
        createdById 
    }: RoomProps) {
        this.id = id; 
        this.name = name;
        this.isGroup = isGroup;
        this.createdById = createdById;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getIsGroup() {
        return this.isGroup;
    }

    getCreatorId() {
        return this.createdById;
    }
}