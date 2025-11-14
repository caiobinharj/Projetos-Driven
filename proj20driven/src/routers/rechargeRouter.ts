import { Router } from "express";
import { rechargeController } from "../controllers/rechargeController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { rechargeSchema } from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

// POST /recharges
rechargeRouter.post(
    "/recharges",
    validateSchema(rechargeSchema), // Middleware de validação
    rechargeController.createRecharge
);

// GET /recharges/:number
rechargeRouter.get("/recharges/:number", rechargeController.getRechargesByNumber);

export default rechargeRouter;