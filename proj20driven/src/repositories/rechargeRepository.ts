import { db } from "../database/db.js";
import { NewRecharge, Recharge } from "../protocols/recharge.js";
import { QueryResult } from "pg";

async function create(recharge: NewRecharge): Promise<QueryResult<Recharge>> {
    const { phoneId, amount } = recharge;
    return db.query<Recharge>(
        `INSERT INTO recharges ("phoneId", amount) VALUES ($1, $2) RETURNING *;`,
        [phoneId, amount]
    );
}

async function findByNumber(number: string): Promise<QueryResult<Recharge>> {
    return db.query<Recharge>(
        `SELECT r.* FROM recharges r
     JOIN phones p ON r."phoneId" = p.id
     WHERE p.number = $1
     ORDER BY r.timestamp DESC;`,
        [number]
    );
}

async function findByPhoneId(phoneId: number): Promise<QueryResult<Recharge>> {
    return db.query<Recharge>(
        `SELECT * FROM recharges WHERE "phoneId" = $1 ORDER BY timestamp DESC;`,
        [phoneId]
    );
}

export const rechargeRepository = {
    create,
    findByNumber,
    findByPhoneId,
};