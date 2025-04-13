
import { pgTable, serial, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user.schema";
import { roomParticipants } from "./room_participants";
import { messages } from "./message.schema";

export const rooms = pgTable("rooms", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    isGroup: boolean("is_group").default(false).notNull(),
    createdById: integer("created_by_id").references(() => users.id)
});

export const roomsRelations = relations(rooms, ({ many, one }) => ({
    participants: many(roomParticipants),
    messages: many(messages),
    createdBy: one(users, {
      fields: [rooms.createdById],
      references: [users.id],
    }),
  }));