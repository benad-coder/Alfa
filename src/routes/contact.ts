import { Router, type IRouter } from "express";
import { db, contactInquiriesTable } from "@workspace/db";
import {
  SubmitContactBody,
  ListInquiriesResponse,
  ListInquiriesResponseItem,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact form submission");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [inquiry] = await db
    .insert(contactInquiriesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(ListInquiriesResponseItem.parse({
    ...inquiry,
    createdAt: inquiry.createdAt.toISOString(),
  }));
});

router.get("/contact/inquiries", async (_req, res): Promise<void> => {
  const inquiries = await db
    .select()
    .from(contactInquiriesTable)
    .orderBy(contactInquiriesTable.createdAt);

  res.json(ListInquiriesResponse.parse(inquiries.map(i => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
  }))));
});

export default router;
