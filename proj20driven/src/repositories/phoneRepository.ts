import { db } from "../database/db.js";
import { NewPhone, Phone } from "../protocols/phone.js";
import { QueryResult } from "pg";

async function findByNumber(number: string): Promise<QueryResult<Phone>> {
    return db.query<Phone>("SELECT * FROM phones WHERE number = $1;", [number]);
}

async function findById(id: number): Promise<QueryResult<Phone>> {
    return db.query<Phone>("SELECT * FROM phones WHERE id = $1;", [id]);
}

async function findByDocument(document: string): Promise<QueryResult<Phone>> {
    return db.query<Phone>("SELECT * FROM phones WHERE document = $1;", [document]);
}

async function create(phone: NewPhone): Promise<QueryResult<Phone>> {
    const { name, number, description, document, carrierId } = phone;
    return db.query<Phone>(
        `INSERT INTO phones (name, "number", description, document, "carrierId")
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *;`,
        [name, number, description, document, carrierId]
    );
}

export const phoneRepository = {
    findByNumber,
    findById,
    findByDocument,
    create,
};