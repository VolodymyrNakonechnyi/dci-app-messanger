import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { messages } from "./message.schema";
import { roomParticipants } from "./room_participants";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
    messages: many(messages),
    roomParticipants: many(roomParticipants),
  }));