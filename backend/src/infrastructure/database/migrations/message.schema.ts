import { pgTable, serial, text, integer, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { rooms } from "./rooms";
import { users } from "./user.schema";

export const messageStatusEnum = pgEnum("message_status", ["sent", "delivered", "read"]);


export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    roomId: integer("room_id").references(() => rooms.id).notNull(),
    senderId: integer("sender_id").references(() => users.id).notNull(),
    status: messageStatusEnum("status").default("sent").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
});

export const messagesRelations = relations(messages, ({ one }) => ({
    room: one(rooms, {
      fields: [messages.roomId],
      references: [rooms.id],
    }),
    sender: one(users, {
      fields: [messages.senderId],
      references: [users.id],
    })
}));