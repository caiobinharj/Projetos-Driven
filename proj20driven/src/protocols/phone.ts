export type Phone = {
    id: number;
    name: string;
    number: string;
    description: string;
    document: string;
    carrierId: number;
};

export type NewPhone = Omit<Phone, "id">;