import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import galleryRouter from "./gallery";
import contactRouter from "./contact";
import ordersRouter from "./orders";
import paymentsRouter from "./payments";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(galleryRouter);
router.use(contactRouter);
router.use(ordersRouter);
router.use(paymentsRouter);

export default router;
