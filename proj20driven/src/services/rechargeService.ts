import { NewRecharge } from "../protocols/recharge.js";
import { phoneRepository } from "../repositories/phoneRepository.js";
import { rechargeRepository } from "../repositories/rechargeRepository.js";
import { notFound } from "../utils/httpErrors.js";

async function createRecharge(recharge: NewRecharge) {
    const phone = await phoneRepository.findById(recharge.phoneId);
    if (phone.rowCount === 0) {
        throw notFound("O telefone informado não foi encontrado."); // 404
    }

    const newRecharge = await rechargeRepository.create(recharge);
    return newRecharge.rows[0];
}

async function getRechargesByNumber(number: string) {
    const phone = await phoneRepository.findByNumber(number);
    if (phone.rowCount === 0) {
        throw notFound("O telefone informado não foi encontrado."); // 404
    }

    const recharges = await rechargeRepository.findByNumber(number);
    return recharges.rows;
}

export const rechargeService = {
    createRecharge,
    getRechargesByNumber,
};