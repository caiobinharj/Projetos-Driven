import { Router } from "express";
import { phoneController } from "../controllers/phoneController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { phoneSchema } from "../schemas/phoneSchema.js";

const phoneRouter = Router();

// POST /phones
phoneRouter.post(
    "/phones",
    validateSchema(phoneSchema), // Middleware de validação
    phoneController.createPhone
);

// GET /phones/:document
phoneRouter.get("/phones/:document", phoneController.getPhonesByDocument);

export default phoneRouter;