import { Invoice } from "./invoice.model";

export interface Customer {
    id?: number;
    name: string;
    type: string; // Individual or Business
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    createdAt: Date;
    updatedAt: Date | null;
    invoices?: Invoice[] | null;
}
