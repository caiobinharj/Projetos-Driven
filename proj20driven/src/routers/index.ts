import { Router } from "express";
import phoneRouter from "./phoneRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import summaryRouter from "./summaryRouter.js";

const mainRouter = Router();

mainRouter.use(phoneRouter);
mainRouter.use(rechargeRouter);
mainRouter.use(summaryRouter);

export default mainRouter;