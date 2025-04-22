export interface IRoomParticipant {
    getId: number;
    getUserId: number;
    getRoomId: number;
    getJoinedAt: Date;
    getRole: string;
  }