import { Customer } from "./customer.model";

export interface Invoice {
    id: number;
    customerId: number;
    amount: number;
    status: string; // Billed, Paid, Void
    billedDate: Date;
    paidDate?: Date | null;
    createdAt: Date;
    updatedAt?: Date | null;
    customer?: Customer;
}
