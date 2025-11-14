import { Router } from "express";
import { phoneController } from "../controllers/phoneController.js";

const summaryRouter = Router();

// GET /summary/:document
summaryRouter.get("/summary/:document", phoneController.getSummaryByDocument);

export default summaryRouter;