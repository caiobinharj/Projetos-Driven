import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export function validateSchema<T>(schema: Schema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((err) => err.message).join(", ");
            return res.status(422).send(errorMessages);
        }

        next();
    };
}