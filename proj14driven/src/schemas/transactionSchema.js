import joi from 'joi';

export const transactionsSchema = joi.object({
    value: joi.number().positive().required(),
    description: joi.string().required(),
    type: joi.string().valid('deposit', 'withdraw').required()
});