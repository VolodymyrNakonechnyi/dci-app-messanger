import { Message } from "../../../domain/entities/Message";

export class MessageRepositoryMock implements IMessageRepository {
    private readonly messages: Message[] = [
      new Message({
        id: 1,
        content: "Hello, everyone!",
        roomId: 1,
        senderId: 1,
        status: "delivered",
        createdAt: new Date("2025-01-01T10:00:00"),
        updatedAt: new Date("2025-01-01T10:00:00"),
      }),
      new Message({
        id: 2,
        content: "Hey, what's up?",
        roomId: 2,
        senderId: 2,
        status: "sent",
        createdAt: new Date("2025-01-02T12:00:00"),
        updatedAt: new Date("2025-01-02T12:00:00"),
      }),
    ];
  
    async list(): Promise<Message[]> {
      if (this.messages.length === 0) {
        throw new Error("No messages found");
      }
      return this.messages;
    }
}