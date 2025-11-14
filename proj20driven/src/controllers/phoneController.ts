import { Request, Response } from "express";
import { NewPhone } from "../protocols/phone.js";
import { phoneService } from "../services/phoneService.js";

async function createPhone(req: Request, res: Response) {
    const phone = req.body as NewPhone;
    const newPhone = await phoneService.createPhone(phone);
    res.status(201).send(newPhone); // 201 Created
}

async function getPhonesByDocument(req: Request, res: Response) {
    const { document } = req.params;
    const phones = await phoneService.getPhonesByDocument(document);
    res.status(200).send(phones);
}

async function getSummaryByDocument(req: Request, res: Response) {
    const { document } = req.params;
    const summary = await phoneService.getSummaryByDocument(document);
    res.status(200).send(summary);
}

export const phoneController = {
    createPhone,
    getPhonesByDocument,
    getSummaryByDocument,
};