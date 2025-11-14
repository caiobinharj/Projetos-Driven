import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/httpErrors.js";

export default function errorHandler(
    error: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("An error occurred!", error);

    if ("type" in error) {
        if (error.type === "conflict") return res.status(409).send(error.message);
        if (error.type === "not_found") return res.status(404).send(error.message);
        if (error.type === "unprocessable_entity") return res.status(422).send(error.message);
    }

    return res.status(500).send("Something went wrong.");
}