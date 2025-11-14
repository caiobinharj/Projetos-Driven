import Joi from "joi";
import { NewPhone } from "../protocols/phone.js";

export const phoneSchema = Joi.object<NewPhone>({
    name: Joi.string().required(),
    number: Joi.string().pattern(/^[0-9]{11}$/).required(), // Ex: 11987654321
    description: Joi.string().required(),
    document: Joi.string().pattern(/^[0-9]{11}$/).required(), // CPF
    carrierId: Joi.number().integer().positive().required(),
});