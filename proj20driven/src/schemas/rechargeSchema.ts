import Joi from "joi";
import { NewRecharge } from "../protocols/recharge.js";

export const rechargeSchema = Joi.object<NewRecharge>({
    phoneId: Joi.number().integer().positive().required(),
    amount: Joi.number().integer().min(10).max(1000).required(), // R$ 10 a R$ 1000
});