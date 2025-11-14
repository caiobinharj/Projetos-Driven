import { Request, Response } from "express";
import { NewRecharge } from "../protocols/recharge.js";
import { rechargeService } from "../services/rechargeService.js";

async function createRecharge(req: Request, res: Response) {
    const recharge = req.body as NewRecharge;
    const newRecharge = await rechargeService.createRecharge(recharge);
    res.status(201).send(newRecharge); // 201 Created
}

async function getRechargesByNumber(req: Request, res: Response) {
    const { number } = req.params;
    const recharges = await rechargeService.getRechargesByNumber(number);
    res.status(200).send(recharges);
}

export const rechargeController = {
    createRecharge,
    getRechargesByNumber,
};