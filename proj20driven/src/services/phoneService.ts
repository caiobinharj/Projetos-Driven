import { NewPhone } from "../protocols/phone.js";
import { phoneRepository } from "../repositories/phoneRepository.js";
import { carrierRepository } from "../repositories/carrierRepository.js";
import { rechargeRepository } from "../repositories/rechargeRepository.js";
import { conflict, notFound } from "../utils/httpErrors.js";

async function createPhone(phone: NewPhone) {
    const existingNumber = await phoneRepository.findByNumber(phone.number);
    if (existingNumber.rowCount && existingNumber.rowCount > 0) {
        throw conflict("Este número de telefone já está cadastrado."); // 409
    }

    const userPhones = await phoneRepository.findByDocument(phone.document);
    if (userPhones.rowCount && userPhones.rowCount >= 3) {
        throw conflict("Este cliente já atingiu o limite de 3 telefones."); // 409
    }

    const carrier = await carrierRepository.findById(phone.carrierId);
    if (carrier.rowCount === 0) {
        throw notFound("A operadora informada não existe."); // 404
    }

    const newPhone = await phoneRepository.create(phone);
    return newPhone.rows[0];
}

async function getPhonesByDocument(document: string) {
    const phones = await phoneRepository.findByDocument(document);
    return phones.rows;
}

async function getSummaryByDocument(document: string) {
    const phones = (await phoneRepository.findByDocument(document)).rows;

    if (phones.length === 0) {
        return { document, phones: [] };
    }

    const phonesSummary = await Promise.all(
        phones.map(async (phone) => {
            const carrier = (await carrierRepository.findById(phone.carrierId)).rows[0];
            const recharges = (await rechargeRepository.findByPhoneId(phone.id)).rows;

            return {
                ...phone,
                carrier: carrier,
                recharges: recharges,
            };
        })
    );

    return {
        document: document,
        phones: phonesSummary,
    };
}

export const phoneService = {
    createPhone,
    getPhonesByDocument,
    getSummaryByDocument,
};