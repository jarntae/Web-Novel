import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const images = sqliteTable("images", {
    id: text("id").primaryKey(),
    chapterId: text("chapter_id").notNull(),
    url: text("url").notNull(),
});
