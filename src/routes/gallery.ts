import { Router, type IRouter } from "express";
import { db, galleryTable } from "@workspace/db";
import { ListGalleryItemsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/gallery", async (_req, res): Promise<void> => {
  const items = await db
    .select()
    .from(galleryTable)
    .orderBy(galleryTable.createdAt);

  res.json(ListGalleryItemsResponse.parse(items));
});

export default router;
