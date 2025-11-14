export type Recharge = {
    id: number;
    phoneId: number;
    amount: number;
    timestamp: string; // ou Date
};

export type NewRecharge = Pick<Recharge, "phoneId" | "amount">;