import { db } from "../database/db.js";
import { Carrier } from "../protocols/carrier.js";
import { QueryResult } from "pg";

async function findById(id: number): Promise<QueryResult<Carrier>> {
    return db.query<Carrier>("SELECT * FROM carriers WHERE id = $1;", [id]);
}

export const carrierRepository = {
    findById,
};