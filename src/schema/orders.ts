import {
  integer,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const producersTable = pgTable(
  "producers",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIndex: uniqueIndex("producers_email_unique").on(table.email),
  }),
);

export const ordersTable = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: text("order_number").notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone"),
    deliveryAddress: text("delivery_address").notNull(),
    notes: text("notes"),
    subtotalMinor: integer("subtotal_minor").notNull(),
    deliveryFeeMinor: integer("delivery_fee_minor").notNull(),
    totalMinor: integer("total_minor").notNull(),
    currency: text("currency").notNull().default("GHS"),
    status: text("status").notNull().default("Pending"),
    paymentStatus: text("payment_status").notNull().default("Pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderNumberUnique: uniqueIndex("orders_order_number_unique").on(table.orderNumber),
    idempotencyUnique: uniqueIndex("orders_idempotency_key_unique").on(table.idempotencyKey),
    statusIndex: index("orders_status_index").on(table.status),
    createdAtIndex: index("orders_created_at_index").on(table.createdAt),
  }),
);

export const orderItemsTable = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => ordersTable.id, { onDelete: "cascade" }),
    productId: integer("product_id"),
    producerId: integer("producer_id"),
    productName: text("product_name").notNull(),
    producerName: text("producer_name").notNull(),
    producerEmail: text("producer_email").notNull(),
    imageUrl: text("image_url").notNull(),
    unitPriceMinor: integer("unit_price_minor").notNull(),
    quantity: integer("quantity").notNull(),
    lineTotalMinor: integer("line_total_minor").notNull(),
  },
  (table) => ({
    orderIndex: index("order_items_order_id_index").on(table.orderId),
    producerIndex: index("order_items_producer_id_index").on(table.producerId),
  }),
);

export const paymentsTable = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => ordersTable.id, { onDelete: "cascade" }),
    provider: text("provider").notNull().default("paystack"),
    providerReference: text("provider_reference").notNull(),
    accessCode: text("access_code"),
    authorizationUrl: text("authorization_url"),
    amountMinor: integer("amount_minor").notNull(),
    currency: text("currency").notNull().default("GHS"),
    status: text("status").notNull().default("Pending"),
    gatewayResponse: text("gateway_response"),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    referenceUnique: uniqueIndex("payments_provider_reference_unique").on(table.providerReference),
    orderUnique: uniqueIndex("payments_order_id_unique").on(table.orderId),
    statusIndex: index("payments_status_index").on(table.status),
  }),
);

export const notificationsTable = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => ordersTable.id, { onDelete: "cascade" }),
    kind: text("kind").notNull(),
    recipient: text("recipient").notNull(),
    producerId: integer("producer_id"),
    status: text("status").notNull().default("Pending"),
    attempts: integer("attempts").notNull().default(0),
    lastError: text("last_error"),
    sentAt: timestamp("sent_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    deliveryUnique: uniqueIndex("notifications_order_kind_recipient_unique").on(
      table.orderId,
      table.kind,
      table.recipient,
    ),
    pendingIndex: index("notifications_status_index").on(table.status),
  }),
);

export type Producer = typeof producersTable.$inferSelect;
export type Order = typeof ordersTable.$inferSelect;
export type OrderItem = typeof orderItemsTable.$inferSelect;
export type Payment = typeof paymentsTable.$inferSelect;
export type Notification = typeof notificationsTable.$inferSelect;