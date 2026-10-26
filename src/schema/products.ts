import { pgTable, serial, text, boolean, numeric, timestamp, integer, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { producersTable } from "./orders";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  producerId: integer("producer_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  producerReference: foreignKey({
    columns: [table.producerId],
    foreignColumns: [producersTable.id],
    name: "products_producer_id_fkey",
  }).onDelete("set null"),
}));

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, createdAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
