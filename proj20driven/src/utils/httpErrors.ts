export type AppError = {
    type: string;
    message: string;
};

// 404
export function notFound(message: string): AppError {
    return { type: "not_found", message };
}

// 409
export function conflict(message: string): AppError {
    return { type: "conflict", message };
}

// 422
export function unprocessable(message: string): AppError {
    return { type: "unprocessable_entity", message };
}