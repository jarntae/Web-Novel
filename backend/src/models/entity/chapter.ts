import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const chapters = sqliteTable("chapters", {
    id: text("id").primaryKey(),
    novelId: text("novel_id").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    order: integer("order").notNull(),
});
